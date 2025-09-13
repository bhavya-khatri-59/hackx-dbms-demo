import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTeam } from '../contexts/TeamContext.jsx';

/**
 * A wrapper component that checks for user authentication.
 * If the user is authenticated, it renders the requested page.
 * Otherwise, it redirects the user to the landing/login page.
 * It also handles the initial loading state.
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useTeam();

  // 1. While the app is checking for a logged-in user, show a loading message.
  // This prevents a "flash" of the login page for already-logged-in users.
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>Loading...</div>
      </div>
    );
  }

  // 2. If loading is finished and the user is NOT authenticated, redirect them.
  if (!isAuthenticated) {
    // The 'replace' prop is important: it replaces the current entry in the
    // history stack instead of pushing a new one, so the user can't click
    // the "back" button to get to the protected page they were redirected from.
    return <Navigate to="/" replace />;
  }

  // 3. If loading is finished and the user IS authenticated, render the page.
  return children;
};

export default ProtectedRoute;

