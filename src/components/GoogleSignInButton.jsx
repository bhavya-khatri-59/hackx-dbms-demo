import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTeam } from '../contexts/TeamContext'; // Import the useTeam hook

/**
 * Decodes a JWT token to extract its payload.
 * @param {string} token The JWT token string.
 * @returns {object|null} The decoded payload object or null if decoding fails.
 */
const jwtDecode = (token) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window.atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};


// Student details modal
const StudentDetailsModal = ({ open, onClose, userProfile }) => {
  const navigate = useNavigate();
  const { login } = useTeam(); // Get the login function from the context
  const [collegeName, setCollegeName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  if (!open || !userProfile) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const studentData = {
      name: userProfile.name,
      email: userProfile.email,
      college: collegeName,
      regno: registrationNumber,
    };

    try {
      const response = await fetch('/api/participants', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(studentData),
      });

      // Get the JSON data from the response once
      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Failed to submit data.');
      }

      console.log("Successfully saved participant data:", responseData);
      
      // *** THIS IS THE FIX ***
      // Call the login function with the user data from the backend
      login(responseData);

      onClose();
      navigate('/dashboard');

    } catch (error) {
      console.error("Submission Error:", error);
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl w-full max-w-md relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="text-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Welcome, {userProfile.name}!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
                Please provide the remaining details to complete your profile.
            </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="w-full px-4 py-2 rounded-lg border bg-gray-100 dark:bg-gray-700">
            <label className="text-xs text-gray-500">Email</label>
            <p className="text-gray-900 dark:text-white">{userProfile.email}</p>
          </div>
          <input
            type="text"
            placeholder="College Name"
            value={collegeName}
            onChange={(e) => setCollegeName(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          <input
            type="text"
            placeholder="Registration Number"
            value={registrationNumber}
            onChange={(e) => setRegistrationNumber(e.target.value)}
            required
            className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          
          {submitError && (
            <div className="text-red-500 text-sm text-center p-2 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-md">
                {submitError}
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

const GoogleSignInButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isGoogleReady, setIsGoogleReady] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const hiddenDivRef = useRef(null);

  useEffect(() => {
    if (document.querySelector('script[src="https://accounts.google.com/gsi/client"]')) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    script.onerror = () => console.error('Failed to load Google Sign-In script');
    document.head.appendChild(script);

    return () => {
      const scriptTag = document.querySelector(`script[src="${script.src}"]`);
      if (scriptTag) document.head.removeChild(scriptTag);
    };
  }, []);

  const initializeGoogle = () => {
    if (window.google && window.google.accounts) {
      try {
        window.google.accounts.id.initialize({
          client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });

        setTimeout(() => {
          if (hiddenDivRef.current) {
            window.google.accounts.id.renderButton(
              hiddenDivRef.current,
              { theme: "outline", size: "large", type: "standard" }
            );
            setIsGoogleReady(true);
          }
        }, 100);
      } catch (error) {
        console.error('Error initializing Google Sign-In:', error);
      }
    }
  };
  
  const handleCredentialResponse = (response) => {
  const decodedToken = jwtDecode(response.credential);
    
  if (decodedToken) {
    setUserProfile({
      name: decodedToken.name,
      email: decodedToken.email,
    });
    setOpenModal(true);
  }
  };

  const handleCustomButtonClick = () => {
    if (!isGoogleReady || !hiddenDivRef.current) {
      console.warn('Google Sign-In not ready yet');
      return;
    }

    try {
      const googleButton = hiddenDivRef.current.querySelector('[role="button"]');
      if (googleButton) {
        googleButton.click();
      } else {
        console.error('Could not find Google button element to click');
      }
    } catch (error) {
      console.error('Error triggering Google button click:', error);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleCustomButtonClick}
        disabled={!isGoogleReady}
        className={`inline-flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ${
          !isGoogleReady ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        <svg className="w-5 h-5" viewBox="0 0 48 48" aria-hidden="true">
          <g>
            <path fill="#4285F4" d="M24 9.5c3.54 0 6.7 1.22 9.19 3.22l6.85-6.85C35.53 2.54 30.13 0 24 0 14.64 0 6.4 5.74 2.44 14.1l8.01 6.23C12.6 14.16 17.82 9.5 24 9.5z"/>
            <path fill="#34A853" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9.02h12.44c-.54 2.92-2.18 5.39-4.65 7.06l7.19 5.59C43.98 37.13 46.1 31.27 46.1 24.5z"/>
            <path fill="#FBBC05" d="M10.45 28.33c-.62-1.85-.98-3.81-.98-5.83s.36-3.98.98-5.83l-8.01-6.23C1.49 13.98 0 18.76 0 24s1.49 10.02 4.44 14.57l8.01-6.24z"/>
            <path fill="#EA4335" d="M24 48c6.13 0 11.53-2.02 15.38-5.5l-7.19-5.59c-2.01 1.35-4.59 2.16-8.19 2.16-6.18 0-11.4-4.66-13.55-11.1l-8.01 6.24C6.4 42.26 14.64 48 24 48z"/>
          </g>
        </svg>
        <span>{isGoogleReady ? 'Sign in with Google' : 'Loading...'}</span>
      </motion.button>

      <div 
        ref={hiddenDivRef}
        id="hiddenGoogleDiv"
        style={{ 
          position: 'absolute',
          left: '-9999px',
          visibility: 'hidden'
        }}
      />

      <StudentDetailsModal 
        open={openModal} 
        onClose={() => setOpenModal(false)}
        userProfile={userProfile} 
      />
    </>
  );
};

export default GoogleSignInButton;

