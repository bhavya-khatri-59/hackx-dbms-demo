import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Calendar, Pen, Code, Bug, Trophy, Clock } from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';
import TeamGateModal from '../components/TeamGateModal';

const timelineEvents = [
  {
    id: 1,
    title: 'Registration & Team Formation',
    description: 'Register for the hackathon and form your team. Maximum 4 members per team.',
    date: 'Jan 15, 2025',
    time: '09:00 AM',
    icon: Calendar,
    status: 'completed'
  },
  {
    id: 2,
    title: 'Ideation & Design Phase',
    description: 'Brainstorm ideas, create wireframes, and design your solution using Figma or similar tools.',
    date: 'Jan 16, 2025',
    time: '10:00 AM',
    icon: Pen,
    status: 'current'
  },
  {
    id: 3,
    title: 'Development Sprint',
    description: 'Build your solution! This is where the magic happens. Code, implement, and bring your ideas to life.',
    date: 'Jan 17-18, 2025',
    time: '48 Hours',
    icon: Code,
    status: 'upcoming'
  },
  {
    id: 4,
    title: 'Testing & Demo Preparation',
    description: 'Test your application thoroughly and prepare your demo presentation for the judges.',
    date: 'Jan 19, 2025',
    time: '02:00 PM',
    icon: Bug,
    status: 'upcoming'
  },
  {
    id: 5,
    title: 'Final Submission & Evaluation',
    description: 'Submit your project and present to our panel of expert judges. Winners will be announced!',
    date: 'Jan 19, 2025',
    time: '06:00 PM',
    icon: Trophy,
    status: 'upcoming'
  }
];

const TimelineEvent = ({ event, index, isLeft }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.3 });
  const Icon = event.icon;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'from-green-500 to-emerald-500';
      case 'current':
        return 'from-blue-500 to-purple-500';
      default:
        return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        x: isLeft ? -100 : 100,
        scale: 0.8 
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0,
        scale: 1 
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
      className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Event Card */}
      <div className={`w-5/12 ${isLeft ? 'text-right' : 'text-left'}`}>
        <motion.div
          whileHover={{ scale: 1.02, y: -5 }}
          className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50 hover:shadow-xl transition-all duration-500 ${
            event.status === 'current' ? 'ring-2 ring-blue-500/30 shadow-blue-500/20' : ''
          }`}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full flex items-center justify-center shadow-lg`}>
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
          
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{event.description}</p>
          
          {event.status === 'current' && (
            <div className="mt-3 text-sm font-semibold text-blue-600 dark:text-blue-400">
              📍 Current Phase
            </div>
          )}
        </motion.div>
      </div>

      {/* Timeline Node */}
      <div className="w-2/12 flex justify-center relative">
        <motion.div
          animate={isInView ? {
            scale: event.status === 'current' ? [1, 1.2, 1] : 1,
            boxShadow: event.status === 'current' 
              ? ['0 0 0 0 rgba(59, 130, 246, 0.4)', '0 0 0 20px rgba(59, 130, 246, 0)', '0 0 0 0 rgba(59, 130, 246, 0)']
              : 'none'
          } : {}}
          transition={{ 
            repeat: event.status === 'current' ? Infinity : 0,
            duration: 2,
            ease: "easeInOut"
          }}
          className={`w-6 h-6 bg-gradient-to-r ${getStatusColor(event.status)} rounded-full shadow-lg z-10 relative`}
        />
        
        {/* Connector Line */}
        {index < timelineEvents.length - 1 && (
          <div className="absolute top-6 w-0.5 h-16 bg-gradient-to-b from-blue-300 to-purple-300 dark:from-blue-600 dark:to-purple-600" />
        )}
      </div>

      {/* Empty space for opposite side */}
      <div className="w-5/12" />
    </motion.div>
  );
};

const Timeline = () => {
  const { hasTeam } = useTeam();

  if (!hasTeam) {
    return <TeamGateModal />;
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
            Follow the journey from idea to implementation
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 dark:from-blue-600 dark:via-purple-600 dark:to-pink-600" />

          {/* Timeline Events */}
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
  );
};

export default Timeline;