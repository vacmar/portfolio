// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 }
  },
  
  slideDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0 }
  },
  
  slideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 }
  },
  
  slideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  },
  
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  
  stagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }
};

// Common transition configurations
export const TRANSITIONS = {
  default: { duration: 0.3, ease: "easeOut" },
  fast: { duration: 0.15, ease: "easeOut" },
  slow: { duration: 0.5, ease: "easeOut" },
  bounce: { duration: 0.5, type: "spring", damping: 15 },
  smooth: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  xs: '360px',
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  xxl: '1440px'
};

// Common spacing values
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  xxl: '3rem',
  xxxl: '4rem'
};

// Z-index layers
export const Z_INDEX = {
  background: -1,
  content: 1,
  overlay: 100,
  modal: 200,
  tooltip: 300,
  dropdown: 400,
  header: 1000,
  max: 9999
};

// Common border radius values
export const BORDER_RADIUS = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  round: '50%',
  pill: '9999px'
};

// Common duration values (in milliseconds)
export const DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  animation: 1000,
  long: 2000
};

// API endpoints (if any)
export const API_ENDPOINTS = {
  // Add any API endpoints here
};

// File paths and assets
export const ASSETS = {
  profile: '/src/assets/profile.jpg',
  resume: '/resume.pdf',
  music: '/music/ambient-focus.mp3'
};

// Social media links
export const SOCIAL_LINKS = {
  github: 'https://github.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  email: 'mailto:your.email@example.com'
};

// Navigation items
export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'roadmaps', label: 'Roadmaps' },
  { id: 'contact', label: 'Contact' }
];

// Common error messages
export const ERROR_MESSAGES = {
  generic: 'Something went wrong. Please try again.',
  network: 'Network error. Please check your connection.',
  notFound: 'The requested resource was not found.',
  validation: 'Please check your input and try again.'
};

// Success messages
export const SUCCESS_MESSAGES = {
  messageSent: 'Message sent successfully!',
  resumeDownloaded: 'Resume downloaded successfully!',
  copied: 'Copied to clipboard!'
};
