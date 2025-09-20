import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Pen, Code, Bug, Trophy, Clock } from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';
import TeamGateModal from '../components/TeamGateModal';

// Base data for the timeline events. The 'status' will be set dynamically.
const staticTimelineEvents = [
  {
    id: 1,
    title: 'Registration & Team Formation',
    description: 'Register for the hackathon and form your team. Maximum 4 members per team.',
    date: 'Jan 15, 2025',
    time: '09:00 AM',
    icon: Calendar,
  },
  {
    id: 2,
    title: 'Ideation & Design Phase',
    description: 'Brainstorm ideas, create wireframes, and design your solution using Figma or similar tools.',
    date: 'Jan 16, 2025',
    time: '10:00 AM',
    icon: Pen,
  },
  {
    id: 3,
    title: 'Development Sprint',
    description: 'Build your solution! This is where the magic happens. Code, implement, and bring your ideas to life.',
    date: 'Jan 17-18, 2025',
    time: '48 Hours',
    icon: Code,
  },
  {
    id: 4,
    title: 'Testing & Demo Preparation',
    description: 'Test your application thoroughly and prepare your demo presentation for the judges.',
    date: 'Jan 19, 2025',
    time: '02:00 PM',
    icon: Bug,
  },
  {
    id: 5,
    title: 'Final Submission & Evaluation',
    description: 'Submit your project and present to our panel of expert judges. Winners will be announced!',
    date: 'Jan 19, 2025',
    time: '06:00 PM',
    icon: Trophy,
  }
];

const TimelineEvent = ({ event, index, isLeft }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const Icon = event.icon;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'current':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500 dark:from-gray-500 dark:to-gray-600';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center w-full"
    >
      {/* Event Card */}
      <div className={`w-5/12 ${isLeft ? '' : 'order-3'}`}>
        <motion.div
          whileHover={{ y: -5 }}
          className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-shadow duration-300 ${
            event.status === 'current' ? 'ring-2 ring-offset-4 ring-offset-slate-50 dark:ring-offset-gray-900 ring-blue-500' : ''
          }`}
        >
          <div className="flex items-start space-x-4 mb-3">
            <div className={`mt-1 w-10 h-10 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4" />
                <span>{event.date} at {event.time}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">{event.description}</p>
          {event.status === 'current' && (
            <div className="mt-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
              📍 Current Phase
            </div>
          )}
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="w-2/12 flex justify-center order-2">
        <motion.div
          animate={isInView && event.status === 'current' ? {
            scale: [1, 1.2, 1],
            boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.4)', '0 0 0 15px rgba(59, 130, 246, 0)', '0 0 0 0px rgba(59, 130, 246, 0)']
          } : {}}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className={`w-5 h-5 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full shadow-lg z-10`}
        />
      </div>

      {/* Empty space for opposite side */}
      <div className={`w-5/12 ${isLeft ? 'order-3' : ''}`} />
    </motion.div>
  );
};

const Timeline = () => {
  const { hasTeam } = useTeam();
  const [timelineEvents, setTimelineEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentEvent = async () => {
      try {
        const response = await fetch('/api/events/current');
        if (!response.ok) {
          // If the endpoint fails, default to the first event
          processEvents(1); 
          return;
        }
        const data = await response.json();
        // *** FIX: Use the correct casing 'currentID' from the database response ***
        processEvents(data.currentID);
      } catch (error) {
        console.error("Failed to fetch current event, defaulting:", error);
        processEvents(1); // Default to the first event on error
      }
    };

    if (hasTeam) {
        fetchCurrentEvent();
    } else {
        setIsLoading(false); // If no team, no need to load anything
    }
  }, [hasTeam]);

  const processEvents = (currentId) => {
    const dynamicEvents = staticTimelineEvents.map(event => {
      let status = 'upcoming';
      if (event.id < currentId) {
        status = 'completed';
      } else if (event.id === currentId) {
        status = 'current';
      }
      return { ...event, status };
    });
    setTimelineEvents(dynamicEvents);
    setIsLoading(false);
  };

  if (!hasTeam && !isLoading) {
    return <TeamGateModal />;
  }

  if (isLoading) {
    return <div className="min-h-screen text-center py-20 dark:text-white">Loading timeline...</div>;
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Hackathon Timeline
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Follow the journey from idea to implementation.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-200 via-purple-200 to-pink-200 dark:from-blue-800 dark:via-purple-800 dark:to-pink-800 rounded-full" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
                <TimelineEvent
                  key={event.id}
                  event={event}
                  index={index}
                  isLeft={index % 2 === 0}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

