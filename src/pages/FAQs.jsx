import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Users, Trophy, Gavel } from 'lucide-react';

const faqCategories = {
  'Registration & Teams': {
    icon: Users,
    faqs: [
      {
        question: 'What is the maximum team size?',
        answer: 'Teams can have up to 4 members. Cross-domain and cross-expertise collaborations are highly encouraged.'
      },
      {
        question: 'What if I don\'t have a team?',
        answer: 'Don\'t worry! You can approach the management, and they will help assign you to a team so you can participate smoothly.'
      },
      {
        question: 'How long is the hackathon?',
        answer: 'The hackathon will span two days, covering brainstorming, coding, design, and presentations.'
      },
      {
        question: 'Where will the event be held?',
        answer: 'The event will take place at VIT Vellore:\n\nDay 1: Kamaraj Auditorium\nDay 2: CDMM 303\n\nWorkspaces, charging stations, and Wi-Fi will be available to support all participants.'
      },
      {
        question: 'When will the OD be updated?',
        answer: 'The OD (On Duty) will be processed and updated before CAT-2 exams.'
      },
      {
        question: 'Do I need to carry my college ID card?',
        answer: 'Yes. A valid college ID card is mandatory for check-in. Without it, entry will not be permitted.'
      },
      {
        question: 'What should I bring with me?',
        answer: 'Bring your laptop + charger, mobile phone + accessories, extension cords, adapters, and personal essentials.'
      },
      {
        question: 'Is Wi-Fi available?',
        answer: 'Yes. Stable Wi-Fi will be available throughout the venue, but carrying a mobile hotspot as a backup is advised.'
      },
      {
        question: 'Do I need to install any tools beforehand?',
        answer: 'It\'s not mandatory, but we recommend setting up Figma, GitHub, and VSCode in advance to save time during the event.'
      },
      {
        question: 'Can I work on a pre-existing project?',
        answer: 'No. All projects must be started from scratch at the hackathon. Open-source libraries, frameworks, or tools are allowed, but not pre-built projects. Figma files and GitHub repos will be reviewed to ensure fairness.'
      },
      {
        question: 'What kind of projects are expected?',
        answer: 'Projects should be software-based only, such as Figma designs or basic frontend implementations, aligned with the given theme. They will be judged on creativity, usability, technical execution, and impact.'
      }
    ]
  },
  'Event Details': {
    icon: Trophy,
    faqs: [

    ]
  },
  'Requirements & Preparation': {
    icon: Users,
    faqs: [
      
    ]
  },
  'Project Guidelines': {
    icon: Gavel,
    faqs: [

    ]
  }
};

const CategorySection = ({ category, data, searchTerm }) => {
  const [openItems, setOpenItems] = useState(new Set());
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, threshold: 0.1 });
  const Icon = data.icon;

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const filteredFaqs = data.faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredFaqs.length === 0) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="space-y-4">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openItems.has(index);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-black/80 backdrop-blur-xl rounded-xl shadow-lg border border-gray-700/50 overflow-hidden"
            >
              <motion.button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500/50 hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-300"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4" style={{ color: '#ffffff' }}>
                    {faq.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </motion.div>
                </div>
              </motion.button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

const FAQs = () => {
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        {/* FAQ Categories */}
        {Object.entries(faqCategories).map(([category, data]) => (
          <CategorySection
            key={category}
            category={category}
            data={data}
            searchTerm=""
          />
        ))}
      </div>
    </div>
  );
};

export default FAQs;