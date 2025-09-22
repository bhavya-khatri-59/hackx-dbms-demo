import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
    Calendar, 
    Pen, 
    Code, 
    ClipboardCheck, 
    Trophy, 
    Clock, 
    Lightbulb, 
    Figma, 
    Sparkles, 
    Github, 
    Upload 
} from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';
import TeamGateModal from '../components/TeamGateModal';

// Base data for the timeline events. The 'status' will be set dynamically.
const staticTimelineEvents = [
    // Day 1: Workshop
    {
      id: 1,
      title: 'Hackathon Introduction',
      description: 'A session on what a hackathon is, what to expect, and strategies for success.',
      icon: Lightbulb,
      day: 'Day 1: Workshop',
    },
    {
      id: 2,
      title: 'Figma Basics Workshop',
      description: 'Learn the fundamentals of UI/UX design with a hands-on session on Figma basics.',
      icon: Figma,
    },
    {
      id: 3,
      title: 'Guest Session: Figma AI',
      description: 'Explore the cutting-edge of design with a guest session on leveraging AI tools within Figma.',
      icon: Sparkles,
    },
    {
      id: 4,
      title: 'GitHub Essentials Session',
      description: 'Master version control and collaboration with an essential workshop on GitHub.',
      icon: Github,
    },
    {
      id: 5,
      title: 'Ideathon Submission (Round 1)',
      description: 'Night submission of your initial idea and presentation template for the ideathon phase.',
      icon: Upload,
    },
    {
      id: 6,
      title: 'Review 1',
      description: 'Judges will review the Round 1 submissions to select teams for the hackathon.',
      icon: ClipboardCheck,
    },
    // Day 2: Hackathon
    {
      id: 7,
      title: 'Hackathon Kick-off',
      description: 'Selected teams begin the hackathon sprint. Let the coding begin!',
      icon: Code,
      day: 'Day 2: Hackathon',
    },
    {
      id: 8,
      title: 'Review 2',
      description: 'Final project demos and evaluations by the judging panel.',
      icon: ClipboardCheck,
    },
    {
      id: 9,
      title: 'Winner Declaration & Prize Distribution',
      description: 'The moment of truth! Announcement of winners and prize ceremony to conclude the event.',
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
      initial={{ 
        opacity: 0, 
        x: isLeft && window.innerWidth >= 768 ? -100 : window.innerWidth >= 768 ? 100 : 0, 
        y: window.innerWidth < 768 ? 50 : 0 
      }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex items-center w-full"
    >
      {/* Day Marker */}
      {event.day && (
          <div className="absolute left-1/2 -translate-x-1/2 -mt-12 md:-mt-16">
              <div className="bg-purple-500/10 text-purple-300 text-sm font-semibold px-4 py-1 rounded-full backdrop-blur-sm border border-purple-500/20">
                  {event.day}
              </div>
          </div>
      )}

      {/* Mobile Layout - Single Column */}
      <div className="md:hidden w-full flex items-start space-x-4">
        {/* Timeline Node for Mobile */}
        <div className="flex-shrink-0 mt-2">
          <motion.div
            animate={isInView && event.status === 'current' ? {
              scale: [1, 1.2, 1],
              boxShadow: ['0 0 0 0px rgba(59, 130, 246, 0.4)', '0 0 0 15px rgba(59, 130, 246, 0)', '0 0 0 0px rgba(59, 130, 246, 0)']
            } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`w-4 h-4 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full shadow-lg z-10`}
          />
        </div>
        
        {/* Event Card for Mobile */}
        <div className="flex-1">
          <motion.div
            whileHover={{ y: -2 }}
            className={`bg-black/80 backdrop-blur-xl rounded-xl p-4 shadow-lg border border-gray-700/50 hover:shadow-xl transition-shadow duration-300 ${
              event.status === 'current' ? 'ring-2 ring-purple-500' : ''
            }`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`mt-1 w-8 h-8 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-white">{event.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">{event.description}</p>
            {event.status === 'current' && (
              <div className="mt-3 text-xs font-semibold text-purple-400">
                📍 Current Phase
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Desktop Layout - Zigzag Pattern */}
      <div className="hidden md:flex items-center w-full">
        {/* Event Card */}
        <div className={`w-5/12 ${isLeft ? '' : 'order-3'}`}>
          <motion.div
            whileHover={{ y: -5 }}
            className={`bg-black/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-gray-700/50 hover:shadow-xl transition-shadow duration-300 ${
              event.status === 'current' ? 'ring-2 ring-offset-4 ring-offset-black ring-purple-500' : ''
            }`}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
          >
            <div className="flex items-start space-x-4 mb-3">
              <div className={`mt-1 w-10 h-10 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{event.title}</h3>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm">{event.description}</p>
            {event.status === 'current' && (
              <div className="mt-4 text-sm font-semibold text-purple-400">
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
              boxShadow: ['0 0 0 0px rgba(168, 85, 247, 0.4)', '0 0 0 15px rgba(168, 85, 247, 0)', '0 0 0 0px rgba(168, 85, 247, 0)']
            } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`w-5 h-5 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full shadow-lg z-10`}
          />
        </div>

        {/* Empty space for opposite side */}
        <div className={`w-5/12 ${isLeft ? 'order-3' : ''}`} />
      </div>
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
          processEvents(1); 
          return;
        }
        const data = await response.json();
        processEvents(data.currentID);
      } catch (error) {
        console.error("Failed to fetch current event, defaulting:", error);
        processEvents(1); 
      }
    };

    if (hasTeam) {
        fetchCurrentEvent();
    } else {
        setIsLoading(false); 
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
    return <div className="min-h-screen text-center pt-32 text-white">Loading timeline...</div>;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Hackathon Timeline
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Follow the journey from idea to implementation.
          </p>
        </motion.div>
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-pink-500/50 rounded-full hidden md:block" />
          <div className="md:hidden absolute left-4 top-0 w-0.5 h-full bg-gradient-to-b from-purple-500/50 via-blue-500/50 to-pink-500/50 rounded-full" />
          <div className="space-y-12 md:space-y-0">
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

