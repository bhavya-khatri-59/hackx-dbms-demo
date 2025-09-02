import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqsData = [
  {
    id: 1,
    question: 'Who can participate in HackXpertise?',
    answer: 'HackXpertise is open to all undergraduate and graduate students from any discipline. You can participate individually or form teams of up to 4 members.'
  },
  {
    id: 2,
    question: 'What is the duration of the hackathon?',
    answer: 'HackXpertise is a 48-hour hackathon that runs from February 1st 10:00 AM to February 2nd 8:00 PM, followed by judging and results on February 3rd.'
  },
  {
    id: 3,
    question: 'Do I need to have prior coding experience?',
    answer: 'While coding experience is helpful, it\'s not mandatory. We welcome participants from all backgrounds including designers, researchers, and business students. Teams often benefit from diverse skill sets.'
  },
  {
    id: 4,
    question: 'What should I bring to the hackathon?',
    answer: 'Bring your laptop, chargers, any hardware you might need, and your creativity! We\'ll provide internet, workspace, meals, and mentorship throughout the event.'
  },
  {
    id: 5,
    question: 'Are there any prizes or rewards?',
    answer: 'Yes! We have exciting prizes for winners including cash rewards, internship opportunities, and recognition certificates. Special category prizes are also available for innovation, design, and social impact.'
  },
  {
    id: 6,
    question: 'How do I form a team?',
    answer: 'You can form teams before the event or during the team formation session. Use our platform to create a team and share your unique team code with members, or join an existing team with their code.'
  },
  {
    id: 7,
    question: 'Will mentors be available during the hackathon?',
    answer: 'Absolutely! We have experienced mentors from industry and academia who will be available throughout the event to guide teams, provide technical assistance, and help with ideation.'
  },
  {
    id: 8,
    question: 'What technologies can I use?',
    answer: 'You\'re free to use any programming languages, frameworks, APIs, or tools you prefer. We encourage innovation and creativity in your choice of technology stack.'
  }
];

const FAQs: React.FC = () => {
  const { isDark } = useTheme();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-center ${
          isDark ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400' 
          : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600'
        }`}>
          Frequently Asked Questions
        </h1>
        <p className={`text-center text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          Everything you need to know about HackXpertise
        </p>
      </motion.div>

      <div className="space-y-4">
        {faqsData.map((faq, index) => (
          <motion.div
            key={faq.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            whileHover={{ 
              scale: 1.01,
              boxShadow: isDark 
                ? '0 10px 30px rgba(0, 255, 255, 0.1)' 
                : '0 10px 30px rgba(59, 130, 246, 0.1)'
            }}
            className={`rounded-2xl backdrop-blur-md border transition-all duration-300 ${
              isDark 
                ? 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-cyan-500/30' 
                : 'bg-white/80 border-white/40 hover:bg-white/90 hover:border-blue-500/30'
            }`}
          >
            <button
              onClick={() => toggleFAQ(faq.id)}
              className="w-full p-6 text-left flex items-center justify-between"
            >
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>
                {faq.question}
              </h3>
              <motion.div
                animate={{ rotate: openFAQ === faq.id ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${isDark ? 'text-cyan-400' : 'text-blue-600'}`}
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            
            <AnimatePresence>
              {openFAQ === faq.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <div className={`pt-4 border-t ${
                    isDark ? 'border-white/10' : 'border-gray-200/50'
                  }`}>
                    <p className={`text-base leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;