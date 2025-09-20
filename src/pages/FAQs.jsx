import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ChevronDown, Search, Users, Trophy, Upload, Gavel } from 'lucide-react';

const faqCategories = {
  'Registration & Teams': {
    icon: Users,
    faqs: [
      {
        question: 'How do I register for HackXpertise 2.0?',
        answer: 'Simply create an account on our platform using your email. Once registered, you can create or join a team to participate in the hackathon.'
      },
      {
        question: 'What is the maximum team size?',
        answer: 'Teams can have a maximum of 4 members. You can participate individually or form teams with 2-4 people.'
      },
      {
        question: 'Can I join multiple teams?',
        answer: 'No, participants can only be part of one team per hackathon. Choose your team wisely!'
      },
      {
        question: 'What if I don\'t have a team?',
        answer: 'You can participate individually or use our platform to find team members. We also have team formation sessions during the opening ceremony.'
      }
    ]
  },
  'Hackathon Rules': {
    icon: Gavel,
    faqs: [
      {
        question: 'What are the hackathon rules?',
        answer: 'All code must be written during the hackathon period. You can use open-source libraries and frameworks. Pre-existing code or solutions are not allowed.'
      },
      {
        question: 'Can we use external APIs?',
        answer: 'Yes, you can use any publicly available APIs and services. However, make sure to follow their terms of service and usage limits.'
      },
      {
        question: 'Are there any technology restrictions?',
        answer: 'You are free to use any programming language, framework, or technology stack. Choose what works best for your solution.'
      },
      {
        question: 'What happens if we submit late?',
        answer: 'Late submissions will not be accepted. Make sure to submit your project before the deadline to be eligible for judging.'
      }
    ]
  },
  'Submissions': {
    icon: Upload,
    faqs: [
      {
        question: 'What do we need to submit?',
        answer: 'You need to submit your source code (GitHub repository), design files (Figma), a demo video (max 5 minutes), and technical documentation.'
      },
      {
        question: 'How should we prepare the demo video?',
        answer: 'Create a 5-minute video showcasing your solution, explaining the problem you\'re solving, demonstrating key features, and highlighting technical innovations.'
      },
      {
        question: 'Can we update our submission?',
        answer: 'Yes, you can update your submission until the final deadline. Only the latest submission will be considered for judging.'
      },
      {
        question: 'Do we need to deploy our application?',
        answer: 'While not mandatory, having a deployed version of your application is highly recommended and will be viewed favorably by judges.'
      }
    ]
  },
  'Evaluation': {
    icon: Trophy,
    faqs: [
      {
        question: 'How will projects be evaluated?',
        answer: 'Projects are evaluated based on innovation, technical implementation, user experience, feasibility, and presentation quality.'
      },
      {
        question: 'Who are the judges?',
        answer: 'Our panel consists of industry experts, startup founders, senior developers, and academic researchers with diverse backgrounds.'
      },
      {
        question: 'When will winners be announced?',
        answer: 'Winners will be announced during the closing ceremony on January 19, 2025, at 8:00 PM.'
      },
      {
        question: 'What are the prizes?',
        answer: 'We have cash prizes, internship opportunities, mentorship programs, and tech gadgets for winners across multiple categories.'
      }
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
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{category}</h2>
      </div>

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
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
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
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about HackXpertise
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-12"
        >
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search FAQs..."
              className="w-full px-6 py-4 pl-12 bg-black/80 backdrop-blur-xl border border-gray-600/50 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300 shadow-lg"
            />
            <Search className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
          </div>
        </motion.div>

        {/* FAQ Categories */}
        {Object.entries(faqCategories).map(([category, data]) => (
          <CategorySection
            key={category}
            category={category}
            data={data}
            searchTerm={searchTerm}
          />
        ))}

        {/* No Results */}
        {searchTerm && !Object.values(faqCategories).some(data => 
          data.faqs.some(faq =>
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
          )
        ) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search terms or browse the categories above
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FAQs;