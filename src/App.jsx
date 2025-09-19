import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { TeamProvider } from './contexts/TeamContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ProblemStatements from './pages/ProblemStatements';
import Timeline from './pages/Timeline';
import SubmissionDetails from './pages/SubmissionDetails';
import TeamDetails from './pages/TeamDetails';
//import About from './pages/About';
import FAQs from './pages/FAQs';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider>
      <TeamProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-500 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-slate-800">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/*" element={
                <>
                  <Navbar />
                  <main className="pt-20">
                    <Routes>
                      {/* Protected Routes */}
                      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/problems" element={<ProtectedRoute><ProblemStatements /></ProtectedRoute>} />
                      <Route path="/timeline" element={<ProtectedRoute><Timeline /></ProtectedRoute>} />
                      <Route path="/submission" element={<ProtectedRoute><SubmissionDetails /></ProtectedRoute>} />
                      <Route path="/team" element={<ProtectedRoute><TeamDetails /></ProtectedRoute>} />
                      {/*<Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />*/}
                      <Route path="/faq" element={<ProtectedRoute><FAQs /></ProtectedRoute>} />
                    </Routes>
                  </main>
                </>
              } />
            </Routes>
          </div>
        </Router>
      </TeamProvider>
    </ThemeProvider>
  );
}

export default App;

