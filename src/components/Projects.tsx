import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useIsMobile } from '../hooks';
import { resumeData } from '../data/resumeData';
import './Projects.css';

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set());
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set());
  const projectsGridRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Individual project visibility tracking
  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const projectIndex = parseInt(entry.target.getAttribute('data-project-index') || '0');
        if (entry.isIntersecting) {
          setVisibleProjects(prev => new Set([...prev, projectIndex]));
        } else {
          // Allow removal for flickering effect during fast scrolling
          setVisibleProjects(prev => {
            const newSet = new Set(prev);
            newSet.delete(projectIndex);
            return newSet;
          });
        }
      });
    }, observerOptions);

    if (projectsGridRef.current) {
      const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
      projectCards.forEach((card, index) => {
        card.setAttribute('data-project-index', index.toString());
        observer.observe(card);
      });
    }

    return () => {
      if (projectsGridRef.current) {
        const projectCards = projectsGridRef.current.querySelectorAll('.project-card');
        projectCards.forEach(card => observer.unobserve(card));
      }
    };
  }, [inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    }
  };

  return (
    <section id="projects" className="projects" ref={ref}>
      <motion.div
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="projects-header" variants={itemVariants}>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Showcasing interactive experiences with cutting-edge animations
          </p>
        </motion.div>

        <motion.div 
          className="projects-grid" 
          variants={containerVariants}
          ref={projectsGridRef}
        >
          {resumeData.projects.map((project, index) => {
            const isVisible = visibleProjects.has(index);
            
            return (
              <motion.div
                key={project.id}
                className="project-card"
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
              >
              <div className="project-card-inner">
                <div className="project-header">
                  <h3 className="project-title">{project.name}</h3>
                  <div className="project-links">
                    <div
                      className="github-link"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.github, '_blank');
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <p className="project-description">{project.description}</p>

                {(!isMobile || expandedProjects.has(index)) && (
                  <div className="project-features">
                    <h4>Key Features:</h4>
                    <ul>
                      {project.features.map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {isMobile && (
                  <button
                    className="know-more-btn"
                    onClick={() => {
                      setExpandedProjects(prev => {
                        const newSet = new Set(prev);
                        if (newSet.has(index)) {
                          newSet.delete(index);
                        } else {
                          newSet.add(index);
                        }
                        return newSet;
                      });
                    }}
                  >
                    {expandedProjects.has(index) ? 'Show Less' : 'Know More'}
                  </button>
                )}

                <div className="project-tech">
                  {project.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="projects-cta"
          variants={itemVariants}
        >
          <p>Want to see more of my work?</p>
          <button
            className="cta-button"
            onClick={() => window.open('https://github.com/vacmar', '_blank')}
          >
            Visit My GitHub
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Projects;
