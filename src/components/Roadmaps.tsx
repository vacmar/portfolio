import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import type { Variants } from 'framer-motion';
import { useIsMobile } from '../hooks';
import { useScrollLock } from '../hooks';
import { ANIMATION_VARIANTS, TRANSITIONS } from '../constants';
import './Roadmaps.css';

interface TimelineItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'planned';
  type: 'learning' | 'project';
  category: string;
  skills: string[];
  duration: string;
  date: string;
  progress?: number;
  features?: string[];
  techStack?: string[];
  github?: string;
  demo?: string;
  position: { x: number; y: number };
  connections: number[];
}

const Roadmaps: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [filter, setFilter] = useState<'all' | 'learning' | 'project'>('all');
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { lockScroll, unlockScroll } = useScrollLock();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const pathProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Handle filter change with auto-scroll
  const handleFilterChange = (newFilter: 'all' | 'learning' | 'project') => {
    setFilter(newFilter);
    // Scroll to canvas after a short delay
    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center'
        });
      }
    }, 100);
  };

  // Individual item visibility tracking
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const itemId = parseInt(entry.target.getAttribute('data-item-id') || '0');
        if (entry.isIntersecting) {
          setVisibleItems(prev => new Set([...prev, itemId]));
        }
      });
    }, observerOptions);

    // Create invisible markers for each timeline item
    const filteredItems = filter === 'all' ? timelineItems : timelineItems.filter(item => item.type === filter);
    
    const markers: HTMLElement[] = [];
    filteredItems.forEach(item => {
      const marker = document.createElement('div');
      marker.setAttribute('data-item-id', item.id.toString());
      marker.style.position = 'absolute';
      marker.style.left = `${item.position.x}%`;
      marker.style.top = `${item.position.y}%`;
      marker.style.width = '1px';
      marker.style.height = '1px';
      marker.style.pointerEvents = 'none';
      marker.style.opacity = '0';
      
      if (canvasRef.current) {
        canvasRef.current.appendChild(marker);
        observer.observe(marker);
        markers.push(marker);
      }
    });

    return () => {
      markers.forEach(marker => {
        observer.unobserve(marker);
        if (marker.parentNode) {
          marker.parentNode.removeChild(marker);
        }
      });
    };
  }, [filter, inView]);

  // Reset visible items when filter changes
  useEffect(() => {
    setVisibleItems(new Set());
  }, [filter]);

  // Disable body scrolling when modal is open
  useEffect(() => {
    if (selectedItem) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Cleanup on unmount
    return () => {
      unlockScroll();
    };
  }, [selectedItem, lockScroll, unlockScroll]);

  const timelineItems: TimelineItem[] = [
    // Learning Journey
    {
      id: 1,
      title: "Frontend Foundations",
      description: "Mastered HTML, CSS, JavaScript fundamentals and responsive design principles",
      status: 'completed',
      type: 'learning',
      category: 'Frontend',
      skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design', 'Flexbox', 'Grid'],
      duration: '10 months',
      date: 'Jan 2024',
      position: { x: 15, y: 10 },
      connections: [2, 3]
    },
    {
      id: 2,
      title: "React Ecosystem",
      description: "Deep dive into React development with hooks, context, and state management",
      status: 'completed',
      type: 'learning',
      category: 'Frontend',
      skills: ['React', 'Redux', 'React Router', 'Hooks', 'Context API', 'JSX'],
      duration: '4 months',
      date: 'Nov 2024',
      position: { x: 35, y: 15 },
      connections: [4, 5]
    },
    {
      id: 3,
      title: "Styling & Animation",
      description: "Advanced CSS techniques, animations, and modern styling frameworks",
      status: 'completed',
      type: 'learning',
      category: 'Design',
      skills: ['Tailwind CSS', 'Framer Motion', 'SCSS', 'CSS Animations', 'Material-UI'],
      duration: '2 months',
      date: 'Jan 2025',
      position: { x: 25, y: 25 },
      connections: [4]
    },
    {
      id: 4,
      title: "TypeScript Mastery",
      description: "Type-safe JavaScript development with advanced TypeScript features",
      status: 'completed',
      type: 'learning',
      category: 'Language',
      skills: ['TypeScript', 'Type Systems', 'Generics', 'Interfaces', 'Advanced Types'],
      duration: '3 months',
      date: 'Mar 2025',
      position: { x: 55, y: 20 },
      connections: [6, 7]
    },
    {
      id: 5,
      title: "Backend Development",
      description: "Server-side development with Node.js and Python frameworks",
      status: 'current',
      type: 'learning',
      category: 'Backend',
      skills: ['Node.js', 'Express', 'Django', 'RESTful APIs', 'Authentication'],
      duration: '6 months',
      date: 'Jun 2025',
      position: { x: 15, y: 40 },
      connections: [8, 9]
    },
    {
      id: 6,
      title: "Database Systems",
      description: "SQL and NoSQL databases, data modeling, and optimization techniques",
      status: 'completed',
      type: 'learning',
      category: 'Database',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Database Design', 'Query Optimization'],
      duration: '4 months',
      date: 'Nov 2024',
      position: { x: 75, y: 35 },
      connections: [9, 10]
    },

    // Major Projects
    {
      id: 7,
      title: "Elevatr",
      description: "Comprehensive fitness and wellness platform with social features",
      status: 'current',
      type: 'project',
      category: 'Full-Stack App',
      skills: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Socket.io'],
      techStack: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'JWT'],
      features: ['Auth System', 'User Roles', 'Profiles Mgmt', 'Job Posts', 'Bookmarks', 'Resume Upload'],
      duration: '8 months',
      date: 'May 2025',
      progress: 26,
      github: 'https://github.com/vacmar/elevatr',
      position: { x: 45, y: 50 },
      connections: [8, 11]
    },
    {
      id: 8,
      title: "Spendly",
      description: "Smart expense tracking and budget management application",
      status: 'current',
      type: 'project',
      category: 'Financial App',
      skills: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Chart.js'],
      techStack: ['React Native', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'Chart.js', 'Plaid API'],
      features: ['Expense Tracking', 'Budget Planning', 'Financial Analytics', 'Receipt Scanning', 'Bank Integration'],
      duration: '8 months',
      date: 'May 2025',
      progress: 30,
      github: 'https://github.com/vacmar/spendly',
      position: { x: 25, y: 65 },
      connections: [9, 12]
    },
    {
      id: 9,
      title: "MindSync+",
      description: "AI-powered mental health and productivity platform",
      status: 'planned',
      type: 'project',
      category: 'AI Platform',
      skills: ['Next.js', 'TypeScript', 'Python', 'TensorFlow', 'OpenAI API'],
      techStack: ['Next.js', 'TypeScript', 'Python', 'FastAPI', 'TensorFlow', 'OpenAI API', 'PostgreSQL'],
      features: ['AI Mood Analysis', 'Productivity Insights', 'Personalized Recommendations', 'Progress Tracking', 'Community Support'],
      duration: '5 months',
      date: 'Jun 2025',
      progress: 0,
      position: { x: 65, y: 70 },
      connections: [10, 13]
    },

    // Advanced Learning
    {
      id: 10,
      title: "DevOps & Cloud",
      description: "CI/CD, containerization, and cloud deployment strategies",
      status: 'planned',
      type: 'learning',
      category: 'DevOps',
      skills: ['Docker', 'AWS', 'CI/CD', 'Kubernetes', 'Terraform'],
      duration: '5 months',
      date: 'Sept 2025',
      position: { x: 85, y: 55 },
      connections: [11, 12]
    },
    {
      id: 11,
      title: "Mobile Development",
      description: "Cross-platform mobile app development with React Native",
      status: 'planned',
      type: 'learning',
      category: 'Mobile',
      skills: ['React Native', 'Kotlin', 'Expo', 'Mobile UI/UX', 'App Store Deployment'],
      duration: '6 months',
      date: 'Jan 2026',
      position: { x: 35, y: 80 },
      connections: [13]
    },
    {
      id: 12,
      title: "AI/ML Integration",
      description: "Integrating AI and machine learning into web applications",
      status: 'planned',
      type: 'learning',
      category: 'AI/ML',
      skills: ['TensorFlow.js', 'OpenAI API', 'Python ML', 'Data Science', 'Neural Networks'],
      duration: '6 months',
      date: 'Aug 2025',
      position: { x: 55, y: 85 },
      connections: [13]
    },
    {
      id: 13,
      title: "System Architecture",
      description: "Scalable system design and enterprise-level architectural patterns",
      status: 'planned',
      type: 'learning',
      category: 'Architecture',
      skills: ['System Design', 'Microservices', 'Load Balancing', 'Caching', 'Security'],
      duration: '4 months',
      date: 'Nov 2025',
      position: { x: 75, y: 90 },
      connections: []
    }
  ];

  const filteredItems = filter === 'all' ? timelineItems : timelineItems.filter(item => item.type === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#10B981';
      case 'current': return '#8B5CF6';
      case 'planned': return '#6B7280';
      default: return '#6B7280';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'project' ? '#F59E0B' : '#3B82F6';
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      'Frontend': '#3B82F6',
      'Backend': '#EF4444',
      'Database': '#F59E0B',
      'DevOps': '#06B6D4',
      'Design': '#EC4899',
      'Language': '#8B5CF6',
      'Mobile': '#6366F1',
      'Architecture': '#84CC16',
      'AI/ML': '#F43F5E',
      'Full-Stack App': '#10B981',
      'Financial App': '#F97316',
      'AI Platform': '#8B5CF6'
    };
    return colors[category] || '#6B7280';
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const nodeVariants: Variants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="roadmaps" className="roadmaps" ref={containerRef}>
      <motion.div
        className="roadmaps-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        ref={ref}
      >
        <motion.div className="roadmaps-header" variants={nodeVariants}>
          <h2 className="section-title">Learning Journey & Project Timeline</h2>
          <p className="section-subtitle">
            My development path from foundations to full-stack mastery, plus the exciting projects bringing it all together
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div className="filter-tabs" variants={nodeVariants}>
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Items
          </button>
          <button 
            className={`filter-tab ${filter === 'learning' ? 'active' : ''}`}
            onClick={() => handleFilterChange('learning')}
          >
            Learning Path
          </button>
          <button 
            className={`filter-tab ${filter === 'project' ? 'active' : ''}`}
            onClick={() => handleFilterChange('project')}
          >
            Major Projects
          </button>
        </motion.div>

        <motion.div className="roadmap-stats" variants={nodeVariants}>
          <div className="stat-item">
            <motion.div
              className="stat-content"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            >
              <span className="stat-number">{timelineItems.filter(n => n.status === 'completed').length}</span>
              <span className="stat-label">Completed</span>
            </motion.div>
          </div>
          <div className="stat-item">
            <motion.div
              className="stat-content"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
            >
              <span className="stat-number current">{timelineItems.filter(n => n.status === 'current').length}</span>
              <span className="stat-label">In Progress</span>
            </motion.div>
          </div>
          <div className="stat-item">
            <motion.div
              className="stat-content"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
            >
              <span className="stat-number planned">{timelineItems.filter(n => n.status === 'planned').length}</span>
              <span className="stat-label">Planned</span>
            </motion.div>
          </div>
        </motion.div>

        <motion.div className="roadmap-canvas" variants={nodeVariants} ref={canvasRef}>
          <svg className="roadmap-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="0.5"/>
              </pattern>
              <linearGradient id="projectGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8"/>
                <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" opacity="0.3"/>
            
            {/* Animated Connections */}
            {filteredItems.map(item =>
              item.connections.map(targetId => {
                const targetItem = filteredItems.find(n => n.id === targetId);
                if (!targetItem) return null;
                
                const isVisible = visibleItems.has(item.id) && visibleItems.has(targetId);
                
                return (
                  <motion.line
                    key={`${item.id}-${targetId}`}
                    x1={item.position.x}
                    y1={item.position.y}
                    x2={targetItem.position.x}
                    y2={targetItem.position.y}
                    stroke={item.type === 'project' ? 'rgba(245, 158, 11, 0.4)' : 'rgba(139, 92, 246, 0.3)'}
                    strokeWidth={item.type === 'project' ? '0.3' : '0.2'}
                    strokeDasharray={item.type === 'project' ? '2 1' : '1 0.5'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ 
                      pathLength: isVisible ? 1 : 0, 
                      opacity: isVisible ? 1 : 0 
                    }}
                    transition={{ 
                      duration: 1.5, 
                      delay: 0.3,
                      ease: "easeInOut"
                    }}
                  />
                );
              })
            )}

            {/* Timeline Items */}
            {filteredItems.map((item, index) => {
              const isVisible = visibleItems.has(item.id);
              const animationDelay = index * 0.1;

              return (
                <g key={item.id} className="roadmap-node" data-status={item.status}>
                  {/* Glow Effect for Projects */}
                  {item.type === 'project' && (
                    <motion.circle
                      cx={item.position.x}
                      cy={item.position.y}
                      r="3"
                      fill="url(#projectGradient)"
                      opacity="0.2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ 
                        scale: isVisible ? 1 : 0,
                        opacity: isVisible ? 0.2 : 0
                      }}
                      transition={{ 
                        delay: animationDelay,
                        duration: 0.8,
                        type: "spring",
                        stiffness: 100
                      }}
                    />
                  )}
                  
                  {/* Main Node */}
                  <motion.circle
                    cx={item.position.x}
                    cy={item.position.y}
                    r="1.2"
                    fill={getStatusColor(item.status)}
                    stroke={item.type === 'project' ? getTypeColor(item.type) : getCategoryColor(item.category)}
                    strokeWidth={item.type === 'project' ? '0.4' : '0.3'}
                    data-status={item.status}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isVisible ? 1 : 0,
                      opacity: isVisible ? 1 : 0
                    }}
                    transition={{ 
                      delay: animationDelay,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 120,
                      damping: 15
                    }}
                    whileHover={{ 
                      scale: 1.5,
                      transition: { duration: 0.2 }
                    }}
                    onClick={() => setSelectedItem(item.id)}
                    onMouseEnter={() => setHoveredItem(item.id)}
                    onMouseLeave={() => setHoveredItem(null)}
                    style={{ cursor: 'pointer' }}
                  />

                  {/* Progress Ring for Projects */}
                  {item.type === 'project' && item.progress !== undefined && (
                    <motion.circle
                      cx={item.position.x}
                      cy={item.position.y}
                      r="2.2"
                      fill="none"
                      stroke="rgba(245, 158, 11, 0.3)"
                      strokeWidth="0.2"
                      strokeDasharray={`${2 * Math.PI * 2.2 * (item.progress / 100)} ${2 * Math.PI * 2.2}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ 
                        pathLength: isVisible ? 1 : 0,
                        opacity: isVisible ? 1 : 0
                      }}
                      transition={{ delay: animationDelay + 0.5, duration: 1.5 }}
                      transform={`rotate(-90 ${item.position.x} ${item.position.y})`}
                    />
                  )}

                  {/* Pulse Animation for Current Items */}
                  {item.status === 'current' && isVisible && (
                    <motion.circle
                      cx={item.position.x}
                      cy={item.position.y}
                      r="1.2"
                      fill="none"
                      stroke={getStatusColor(item.status)}
                      strokeWidth="0.2"
                      initial={{ scale: 1, opacity: 1 }}
                      animate={{ 
                        scale: [1, 2, 1], 
                        opacity: [1, 0, 1] 
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        delay: animationDelay + 0.8
                      }}
                    />
                  )}

                  {/* Type Indicator */}
                  <motion.text
                    x={item.position.x}
                    y={item.position.y + 0.15}
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.8)"
                    fontSize={item.type === 'project' ? '0.06' : '0.05'}
                    fontWeight="600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: animationDelay + 0.8, duration: 0.5 }}
                    style={{ pointerEvents: 'none' }}
                  >
                    {item.type === 'project' ? '★' : index + 1}
                  </motion.text>

                  {/* Hover Label - Always visible on mobile/tablet */}
                  {(hoveredItem === item.id || isMobile) && isVisible && (
                    <g>
                      <motion.text
                        x={item.position.x < 20 ? item.position.x + 3 : item.position.x > 80 ? item.position.x - 3 : item.position.x}
                        y={item.position.y - 4}
                        textAnchor={item.position.x < 20 ? "start" : item.position.x > 80 ? "end" : "middle"}
                        fill="rgba(255, 255, 255, 0.95)"
                        fontSize="0.15"
                        fontWeight="600"
                        className={`roadmap-label ${isMobile ? 'mobile-visible' : ''}`}
                        initial={{ opacity: 0, scale: isMobile ? 0.9 : 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: isMobile ? 0.3 : 0.2 }}
                        style={{ pointerEvents: 'none' }}
                      >
                        {item.title}
                      </motion.text>
                      <motion.text
                        x={item.position.x < 20 ? item.position.x + 3 : item.position.x > 80 ? item.position.x - 3 : item.position.x}
                        y={item.position.y - 2.5}
                        textAnchor={item.position.x < 20 ? "start" : item.position.x > 80 ? "end" : "middle"}
                        fill={item.type === 'project' ? '#F59E0B' : '#8B5CF6'}
                        fontSize="0.1"
                        fontWeight="500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.1 }}
                        style={{ pointerEvents: 'none' }}
                      >
                        {item.type === 'project' ? `${item.progress}% Complete` : item.date}
                      </motion.text>
                    </g>
                  )}
                </g>
              );
            })}

            {/* Animated Particles */}
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.circle
                key={`particle-${i}`}
                r="0.1"
                fill={i % 3 === 0 ? "rgba(245, 158, 11, 0.6)" : "rgba(139, 92, 246, 0.6)"}
                initial={{
                  cx: Math.random() * 100,
                  cy: Math.random() * 100,
                  opacity: 0
                }}
                animate={{
                  cx: Math.random() * 100,
                  cy: Math.random() * 100,
                  opacity: inView ? [0, 0.8, 0] : 0
                }}
                transition={{
                  duration: Math.random() * 12 + 8,
                  repeat: Infinity,
                  delay: Math.random() * 3
                }}
              />
            ))}
          </svg>
        </motion.div>

        <motion.div className="roadmap-legend" variants={nodeVariants}>
          <div className="legend-item">
            <div className="legend-dot completed"></div>
            <span>Completed</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot current"></div>
            <span>In Progress</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot planned"></div>
            <span>Planned</span>
          </div>
          <div className="legend-item">
            <div className="legend-dot project"></div>
            <span>Major Projects</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Item Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            className="node-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="node-modal"
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              {timelineItems
                .filter(item => item.id === selectedItem)
                .map(item => (
                  <div key={item.id} className="modal-content">
                    <div className="modal-header">
                      <div className="node-info">
                        <h3>{item.title}</h3>
                        <div className="node-meta">
                          <span className={`status-badge ${item.status}`}>
                            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                          </span>
                          <span className={`type-badge ${item.type}`}>
                            {item.type === 'project' ? '★ Project' : '📚 Learning'}
                          </span>
                          <span className={`category-badge ${item.category.replace(/[\s\/]/g, '_')}`}>
                            {item.category}
                          </span>
                          <span className="duration-badge">{item.duration}</span>
                          <span className="date-badge">{item.date}</span>
                        </div>
                      </div>
                      <button
                        className="close-btn"
                        onClick={() => setSelectedItem(null)}
                      >
                        ×
                      </button>
                    </div>
                    
                    <div className="modal-body">
                      <p className="node-description">{item.description}</p>
                      
                      {/* Progress Bar for Projects */}
                      {item.type === 'project' && item.progress !== undefined && (
                        <div className="progress-section">
                          <h4>Project Progress</h4>
                          <div className="progress-bar">
                            <motion.div 
                              className="progress-fill"
                              initial={{ width: 0 }}
                              animate={{ width: `${item.progress}%` }}
                              transition={{ duration: 1, delay: 0.2 }}
                            />
                            <span className="progress-text">{item.progress}%</span>
                          </div>
                        </div>
                      )}

                      {/* Project Features */}
                      {item.features && (
                        <div className="features-section">
                          <h4>Key Features</h4>
                          <div className="features-grid">
                            {item.features.map((feature, idx) => (
                              <motion.div
                                key={idx}
                                className="feature-tag"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                {feature}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tech Stack for Projects */}
                      {item.techStack && (
                        <div className="techstack-section">
                          <h4>Technology Stack</h4>
                          <div className="skills-grid">
                            {item.techStack.map((tech, idx) => (
                              <motion.div
                                key={idx}
                                className="skill-tag tech-tag"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                {tech}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Skills for Learning Items */}
                      {item.type === 'learning' && (
                        <div className="skills-section">
                          <h4>Skills & Technologies</h4>
                          <div className="skills-grid">
                            {item.skills.map((skill, idx) => (
                              <motion.div
                                key={idx}
                                className="skill-tag"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                              >
                                {skill}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Project Links */}
                      {item.type === 'project' && (item.github || item.demo) && (
                        <div className="project-links">
                          <h4>Project Links</h4>
                          <div className="links-container">
                            {item.github && (
                              <motion.a
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link github"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span>View Code</span>
                              </motion.a>
                            )}
                            {item.demo && (
                              <motion.a
                                href={item.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link demo"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                <span>Live Demo</span>
                              </motion.a>
                            )}
                          </div>
                        </div>
                      )}
                      
                      {item.connections.length > 0 && (
                        <div className="connections-section">
                          <h4>Connected To</h4>
                          <div className="connections-list">
                            {item.connections.map(connId => {
                              const connectedItem = timelineItems.find(n => n.id === connId);
                              return connectedItem ? (
                                <motion.button
                                  key={connId}
                                  className="connection-item"
                                  onClick={() => setSelectedItem(connId)}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                >
                                  {connectedItem.type === 'project' ? '★' : '📚'} {connectedItem.title}
                                </motion.button>
                              ) : null;
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Roadmaps;
