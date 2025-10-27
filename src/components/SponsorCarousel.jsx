import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const sponsors = [
  { name: 'Microsoft', logo: 'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?w=200&h=100&fit=crop', url: 'https://microsoft.com' },
  { name: 'Google', logo: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=200&h=100&fit=crop', url: 'https://google.com' },
  { name: 'Amazon', logo: 'https://images.pexels.com/photos/1549200/pexels-photo-1549200.jpeg?w=200&h=100&fit=crop', url: 'https://amazon.com' },
  { name: 'Meta', logo: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?w=200&h=100&fit=crop', url: 'https://meta.com' },
  { name: 'Apple', logo: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?w=200&h=100&fit=crop', url: 'https://apple.com' },
  { name: 'Netflix', logo: 'https://images.pexels.com/photos/4009402/pexels-photo-4009402.jpeg?w=200&h=100&fit=crop', url: 'https://netflix.com' }
];

const SponsorCarousel = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    const items = carousel.children;
    
    // GSAP infinite loop animation
    gsap.set(items, { x: (i) => i * 220 });
    
    gsap.to(items, {
      x: "-=220",
      duration: 2,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x, target) => {
          const totalWidth = items.length * 220;
          return `${(parseFloat(x) % totalWidth)}px`;
        }
      }
    });
  }, []);

  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-xl py-12 border-y border-gray-200/50 dark:border-gray-700/50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Our Sponsors</h2>
          <p className="text-gray-600 dark:text-gray-400">Powered by industry leaders</p>
        </motion.div>

        <div className="overflow-hidden">
          <div ref={carouselRef} className="flex">
            {[...sponsors, ...sponsors].map((sponsor, index) => (
              <motion.a
                key={`${sponsor.name}-${index}`}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex-shrink-0 w-52 mx-2 bg-white/80 dark:bg-gray-700/80 backdrop-blur-sm rounded-lg p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200/50 dark:border-gray-600/50"
              >
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {sponsor.name}
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorCarousel;