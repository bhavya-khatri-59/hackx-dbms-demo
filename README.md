# HackXpertise - Complete Hackathon Portal

A modern, elegant hackathon management portal built with React, featuring sophisticated animations and a refined design system.

## Features

- 🎨 Beautiful glassmorphism design with soft accent glows
- 🌙 Global dark/light mode toggle with smooth transitions
- 👥 Team creation and management system
- 🔒 Team-gated access for Timeline and Problem Statements
- 📱 Fully responsive design for all devices
- ♿ Accessible with keyboard navigation and ARIA support
- ⚡ Smooth animations with Framer Motion and GSAP

## Tech Stack

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - React animation library for UI elements
- **GSAP** - Professional animation library for background effects
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Main navigation with theme toggle
│   ├── TeamGateModal.jsx # Modal for team-gated content
│   ├── SponsorCarousel.jsx # Animated sponsor showcase
│   └── Footer.jsx      # Site footer with social links
├── contexts/           # React context providers
│   ├── ThemeContext.jsx # Dark/light mode management
│   └── TeamContext.jsx # Team state management
├── pages/              # Main application pages
│   ├── LandingPage.jsx # Hero page with auth forms
│   ├── Dashboard.jsx   # Team creation/joining
│   ├── ProblemStatements.jsx # Challenge showcase
│   ├── Timeline.jsx    # Zig-zag timeline view
│   ├── SubmissionDetails.jsx # Project submission
│   ├── TeamDetails.jsx # Team management
│   ├── About.jsx      # About sections
│   └── FAQs.jsx       # Searchable FAQ accordion
└── App.jsx           # Main app component with routing
```

## Animations

### Framer Motion
- Page transitions and component animations
- Form toggles and card interactions
- Scroll-triggered reveals and timeline animations

### GSAP
- Background particle effects on landing page
- Sponsor carousel auto-loop animation
- Subtle floating animations for decorative elements

## Design System

### Colors
- **Primary**: Blue (#3B82F6) to Purple (#8B5CF6) gradients
- **Secondary**: Teal (#14B8A6) and Green (#10B981)
- **Accent**: Soft purple (#8B5CF6) and pink (#EC4899)
- **Background**: Light (#F9FAFB) / Dark (#111827)

### Typography
- **Font**: Inter (Google Fonts)
- **Headings**: Bold (600-800 weight)
- **Body**: Regular (400-500 weight)
- **Line Height**: 1.5 for body, 1.2 for headings

### Spacing
- Uses 8px base grid system
- Consistent padding and margins
- Generous whitespace for readability

## Customization

### Theme Colors
Edit the color values in `tailwind.config.js` and the CSS custom properties in `src/index.css`.

### Animations
- Framer Motion animations are defined in component files
- GSAP animations are primarily in `LandingPage.jsx` and `SponsorCarousel.jsx`
- Timing and easing can be adjusted in the respective components

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment.