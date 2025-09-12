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
import About from './pages/About';
import FAQs from './pages/FAQs';

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
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/problems" element={<ProblemStatements />} />
                      <Route path="/timeline" element={<Timeline />} />
                      <Route path="/submission" element={<SubmissionDetails />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/faq" element={<FAQs />} />
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