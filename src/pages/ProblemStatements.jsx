import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Tag, X, Users, ArrowRight } from 'lucide-react';
import { useTeam } from '../contexts/TeamContext';
import TeamGateModal from '../components/TeamGateModal';
import { gsap } from 'gsap';
import '../MagicBento/MagicBento.css';

// Custom styles for problem statements grid
const gridStyles = `
  .problem-statements-grid {
    display: grid !important;
    grid-template-columns: repeat(3, 1fr) !important;
    grid-template-rows: repeat(2, 1fr) !important;
    gap: 1rem !important;
    padding: 1rem !important;
    max-width: 900px !important;
    margin: 0 auto !important;
    font-size: clamp(1rem, 0.9rem + 0.5vw, 1.5rem) !important;
  }
  
  @media (max-width: 768px) {
    .problem-statements-grid {
      grid-template-columns: repeat(2, 1fr) !important;
      grid-template-rows: repeat(3, 1fr) !important;
      max-width: 600px !important;
    }
  }
  
  @media (max-width: 480px) {
    .problem-statements-grid {
      grid-template-columns: 1fr !important;
      grid-template-rows: repeat(6, 1fr) !important;
      max-width: 400px !important;
    }
  }
  
  .problem-statements-grid .card {
    aspect-ratio: 1 !important;
    grid-column: auto !important;
    grid-row: auto !important;
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = gridStyles;
  document.head.appendChild(styleElement);
}

const problemStatements = [
  {
    id: 1,
    title: 'Paranormal Digital Archive',
    description: 'Build a digital archive featuring a found document or anomaly report from a secretive organization investigating unexplained paranormal phenomena.',
    tags: ['Horror', 'Archive', 'Interactive'],
    requirements: [
      'A compelling, thematic user interface that enhances the mystery.',
      'Ability to view and interact with "found documents" (e.g., images, text).',
      'Incorporate subtle audio/visual cues to build atmosphere.',
      'A system for redacting or revealing "sensitive" information within documents.'
    ],
    constraints: [
      'Must be accessible and readable on both desktop and mobile devices.',
      'Atmosphere and user experience are key evaluation criteria.',
      'Use of open-source or public domain assets for documents is encouraged.'
    ],
    submission: 'Submit a deployed web application with at least three sample documents or reports for users to explore.'
  },
  {
    id: 2,
    title: 'Extraterrestrial Hospital Portal',
    description: 'Design a hospital portal for extraterrestrial patients that accommodates diverse species with unique physiologies, communication methods, and medical needs.',
    tags: ['Health', 'Sci-Fi', 'UX/UI'],
    requirements: [
      'Patient intake form that accounts for non-humanoid anatomy.',
      'A "universal translator" feature for communication (can be simulated).',
      'Appointment scheduling across different planetary time zones.',
      'Display for vital signs that are not human-centric (e.g., number of tentacles).'
    ],
    constraints: [
      'The design must prioritize clarity and usability for non-human users.',
      'Creativity in designing for alien physiologies is highly encouraged.',
      'Focus on a single, well-realized patient workflow.'
    ],
    submission: 'Provide a clickable prototype or deployed frontend demonstrating the patient portal\'s key features.'
  },
  {
    id: 3,
    title: 'Post-Apocalyptic Travel Guide',
    description: 'Develop a Post-Apocalyptic Travel Guide that helps survivors navigate a world after a fictional apocalypse, offering safe routes, resource caches, and community-sourced survival tips.',
    tags: ['Travel', 'Survival', 'Community'],
    requirements: [
      'An interactive map displaying safe zones, danger areas, and resource points.',
      'A system for users to submit and rate survival tips or sightings.',
      'An inventory management feature for a user\'s "survival kit".',
      'Offline access to essential map data and survival guides.'
    ],
    constraints: [
      'Must function in a low-bandwidth or offline environment.',
      'The UI should be clear and usable under stressful conditions.',
      'The type of apocalypse (zombies, nuclear, etc.) is up to the team to define.'
    ],
    submission: 'Deploy a functional web/mobile app demonstrating the core features with sample data.'
  },
  {
    id: 4,
    title: 'Yard Sale Surprise',
    description: 'Create a Yard Sale Surprise platform that delivers a monthly subscription of quirky, unexpected items sourced from local yard sales and flea markets.',
    tags: ['Commerce', 'Subscription', 'Local'],
    requirements: [
      'A user profile system to specify interests (e.g., vintage, weird, practical).',
      'An "unboxing" feature where users can share photos/videos of their items.',
      'A system for local "pickers" to source and list items.',
      'Subscription management and payment processing.'
    ],
    constraints: [
      'The business model must be clearly explained.',
      'Focus on the user experience of surprise and discovery.',
      'The platform must handle variable and unpredictable inventory.'
    ],
    submission: 'Provide a clickable prototype or deployed website that showcases the user subscription and unboxing flow.'
  },
  {
    id: 5,
    title: 'Fashion Time Traveler',
    description: 'Design an educational and stylish app that lets users explore fashion trends from different historical eras.',
    tags: ['Fashion', 'Education', 'History'],
    requirements: [
      'An interactive timeline of fashion from different decades/centuries.',
      'A "virtual try-on" feature using AR or image overlays.',
      'Detailed information on the cultural context of different fashion items.',
      'Ability for users to create and share their own historically-inspired mood boards.'
    ],
    constraints: [
      'The application must be visually appealing and fashion-forward.',
      'Historical information must be accurate (sources can be cited).',
      'The "try-on" feature can be a simplified simulation.'
    ],
    submission: 'Submit a working prototype demonstrating the timeline and at least one interactive feature.'
  },
  {
    id: 6,
    title: 'Upcycled Product Marketplace',
    description: 'Create an Upcycled Product Marketplace where users can buy and sell goods made from repurposed or recycled materials, highlighting the story and transformation behind each product.',
    tags: ['Sustainability', 'Marketplace', 'Crafts'],
    requirements: [
      'A two-sided marketplace for buyers and sellers.',
      'Product listings must feature "before" and "after" images.',
      'A rating and review system for both products and sellers.',
      'Search and filter functionality based on materials used or product category.'
    ],
    constraints: [
      'The platform must emphasize the story and craftsmanship of each item.',
      'User interface should be clean, modern, and inspiring.',
      'A clear and fair commission/payment system must be outlined.'
    ],
    submission: 'Deploy a functional web application with the ability for users to list and view upcycled products.'
  }
];

// Global Spotlight Effect
const GlobalSpotlight = ({ gridRef, enabled = true, spotlightRadius = 300, glowColor = '132, 0, 255' }) => {
  const spotlightRef = useRef(null);

  useEffect(() => {
    if (!gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = e => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll('.card');
      const proximity = spotlightRadius * 0.5;
      const fadeDistance = spotlightRadius * 0.75;

      if (!mouseInside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
        cards.forEach(card => card.style.setProperty('--glow-intensity', '0'));
        return;
      }

      let minDistance = Infinity;

      cards.forEach(card => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY) - Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        const relativeX = ((e.clientX - cardRect.left) / cardRect.width) * 100;
        const relativeY = ((e.clientY - cardRect.top) / cardRect.height) * 100;

        card.style.setProperty('--glow-x', `${relativeX}%`);
        card.style.setProperty('--glow-y', `${relativeY}%`);
        card.style.setProperty('--glow-intensity', glowIntensity.toString());
        card.style.setProperty('--glow-radius', `${spotlightRadius}px`);
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
      });

      const targetOpacity = minDistance <= proximity ? 0.8 : minDistance <= fadeDistance ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out'
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, enabled, spotlightRadius, glowColor]);

  return null;
};

// Custom Magic Bento component for Problem Statements
const ProblemMagicBento = ({ problems, onProblemSelect }) => {
  const gridRef = useRef(null);
  
  return (
    <>
      <GlobalSpotlight 
        gridRef={gridRef} 
        enabled={true}
        spotlightRadius={300}
        glowColor="132, 0, 255"
      />
      <div className="bento-section max-w-6xl mx-auto">
        <div 
          className="problem-statements-grid" 
          ref={gridRef}
        >
          {problems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card card--border-glow"
              style={{
                backgroundColor: '#060010',
                '--glow-color': '132, 0, 255',
                cursor: 'pointer',
                aspectRatio: '1',
                minHeight: '250px',
                width: '100%',
                maxWidth: '100%',
                padding: '1.25em',
                borderRadius: '20px',
                border: '1px solid #392e4e',
                background: '#060010',
                fontWeight: '300',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                '--glow-x': '50%',
                '--glow-y': '50%',
                '--glow-intensity': '0',
                '--glow-radius': '200px'
              }}
              // onClick={() => onProblemSelect(problem)}
              whileHover={{ y: -5 }}
            >
              <div className="card__header">
                <div className="card__label">{problem.tags[0]}</div>
              </div>
              <div className="card__content">
                <h2 className="card__title">{problem.title}</h2>
                <p className="card__description">
                  {problem.description.substring(0, 100)}...
                </p>
                <div className="flex flex-wrap gap-1 mt-3">
                  {problem.tags.slice(1, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

const ProblemStatements = () => {
  const [selectedProblem, setSelectedProblem] = useState(null);
  const { hasTeam } = useTeam();

  if (!hasTeam) {
    return <TeamGateModal />;
  }

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Problem Statements
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Choose your challenge and build something extraordinary
          </p>
        </motion.div>

        <ProblemMagicBento 
          problems={problemStatements} 
          onProblemSelect={setSelectedProblem}
        />
      </div>

      {/* Problem Detail Modal */}
      <AnimatePresence>
        {selectedProblem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProblem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gray-900 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-purple-500/20"
            >
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold text-white">{selectedProblem.title}</h2>
                <button
                  onClick={() => setSelectedProblem(null)}
                  className="p-2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{selectedProblem.description}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedProblem.requirements.map((req, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Constraints</h3>
                  <ul className="space-y-2">
                    {selectedProblem.constraints.map((constraint, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{constraint}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Submission Notes</h3>
                  <p className="text-gray-300">{selectedProblem.submission}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {selectedProblem.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProblemStatements;