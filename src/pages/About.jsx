


// import React, { useRef } from 'react';
// import { motion, useInView } from 'framer-motion';
// import { Award, Globe, Zap, Heart } from 'lucide-react';

// const aboutSections = [
//   {
//     title: 'About HackXpertise',
//     content: 'HackXpertise is more than just a hackathon - it\'s a platform for innovation, creativity, and technological advancement. We bring together the brightest minds to solve real-world problems and create solutions that matter.',
//     icon: Zap,
//     image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg'
//   },
//   {
//     title: 'About Gravitas',
//     content: 'Gravitas is VIT Vellore\'s annual technical festival, celebrating innovation and technical excellence. As one of India\'s largest technical festivals, Gravitas provides a platform for students to showcase their skills and connect with industry leaders.',
//     icon: Award,
//     image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg'
//   },
//   {
//     title: 'About IEEE TEMS',
//     content: 'IEEE Technology and Engineering Management Society (TEMS) focuses on the management of technology and engineering. We bridge the gap between technology and business, fostering innovation through effective management practices.',
//     icon: Globe,
//     image: 'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg'
//   },
//   {
//     title: 'About VIT Vellore',
//     content: 'Vellore Institute of Technology is a premier educational institution committed to excellence in engineering education, research, and innovation. VIT has been at the forefront of technological advancement and continues to shape future leaders.',
//     icon: Heart,
//     image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg'
//   }
// ];

// const AboutSection = ({ section, index, isReversed }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, threshold: 0.2 });
//   const Icon = section.icon;

//   return (
//     <motion.div
//       ref={ref}
//       initial={{ opacity: 0, y: 50 }}
//       animate={isInView ? { opacity: 1, y: 0 } : {}}
//       transition={{ duration: 0.6, delay: index * 0.2 }}
//       className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 mb-20`}
//     >
//       {/* Image */}
//       <motion.div
//         whileHover={{ scale: 1.05 }}
//         className="w-full lg:w-1/2"
//       >
//         <div className="relative overflow-hidden rounded-2xl shadow-2xl">
//           <img
//             src={section.image}
//             alt={section.title}
//             className="w-full h-80 object-cover transition-transform duration-700 hover:scale-110"
//           />
//           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
//         </div>
//       </motion.div>

//       {/* Content */}
//       <div className="w-full lg:w-1/2 space-y-6">
//         <motion.div
//           initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: index * 0.2 + 0.2 }}
//           className="flex items-center space-x-4"
//         >
//           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
//             <Icon className="w-8 h-8 text-white" />
//           </div>
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{section.title}</h2>
//         </motion.div>

//         <motion.p
//           initial={{ opacity: 0, x: isReversed ? 50 : -50 }}
//           animate={isInView ? { opacity: 1, x: 0 } : {}}
//           transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
//           className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed"
//         >
//           {section.content}
//         </motion.p>
//       </div>
//     </motion.div>
//   );
// };

// const About = () => {
//   return (
//     <div className="min-h-screen py-12 px-4">
//       <div className="max-w-6xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-20"
//         >
//           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
//             <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
//               About Us
//             </span>
//           </h1>
//           <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
//             Discover the organizations and institutions behind HackXpertise and learn about our mission to drive innovation and technological excellence.
//           </p>
//         </motion.div>

//         {/* About Sections */}
//         {aboutSections.map((section, index) => (
//           <AboutSection
//             key={section.title}
//             section={section}
//             index={index}
//             isReversed={index % 2 === 1}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default About;