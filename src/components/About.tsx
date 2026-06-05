import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resumeData } from '../data/resumeData';
import './About.css';

const About: React.FC = () => {
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set());
  const skillsRef = useRef<HTMLDivElement>(null);
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  // Individual skill group visibility tracking
  useEffect(() => {
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '50px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const skillGroup = entry.target.getAttribute('data-skill-group') || '';
        if (entry.isIntersecting) {
          setVisibleSkills(prev => new Set([...prev, skillGroup]));
        } else {
          setVisibleSkills(prev => {
            const newSet = new Set(prev);
            newSet.delete(skillGroup);
            return newSet;
          });
        }
      });
    }, observerOptions);

    if (skillsRef.current) {
      const skillGroups = skillsRef.current.querySelectorAll('.skill-group');
      skillGroups.forEach((group) => {
        observer.observe(group);
      });
    }

    return () => {
      if (skillsRef.current) {
        const skillGroups = skillsRef.current.querySelectorAll('.skill-group');
        skillGroups.forEach(group => observer.unobserve(group));
      }
    };
  }, [inView]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="about" className="about" ref={ref}>
      <motion.div
        className="about-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="about-header" variants={itemVariants}>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            Computer Science Engineering student with hands-on full-stack & backend experience
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-summary" variants={itemVariants}>
            <h3>Summary</h3>
            <p>
              {resumeData.summary}
            </p>
            
            <div className="resume-download-section">
              <motion.button
                className="resume-download-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  try {
                    const link = document.createElement('a');
                    link.href = '/Vaaheesan-Resume.pdf';
                    link.download = 'Vaaheesan-Resume.pdf';
                    link.target = '_blank';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  } catch (error) {
                    console.error('Error downloading resume:', error);
                    window.open('/Vaaheesan-Resume.pdf', '_blank');
                  }
                }}
              >
                Download Resume
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7,10 12,15 17,10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              </motion.button>
            </div>
          </motion.div>

          <motion.div className="skills-section" variants={itemVariants}>
            <h3>Technical Skills</h3>
            
            <div className="skills-container" ref={skillsRef}>
              <div className="skills-scroll">
                {Object.entries(resumeData.skills).map(([category, skillList]) => {
                  const isVisible = visibleSkills.has(category);
                  
                  return (
                    <motion.div 
                      key={category} 
                      className="skill-group"
                      data-skill-group={category}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <h4 className="skill-group-title">
                        {category === 'aiml' ? 'AI / ML' : category === 'devops' ? 'DevOps & Cloud' : category.charAt(0).toUpperCase() + category.slice(1)}
                      </h4>
                      <div className="skill-badges">
                        {skillList.map((skill, index) => (
                          <motion.div 
                            key={skill} 
                            className="skill-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ 
                              delay: index * 0.08,
                              duration: 0.3,
                              ease: "easeOut"
                            }}
                          >
                            {skill}
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div className="education-section" variants={itemVariants}>
            <h3>Education</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {resumeData.education.map((edu) => (
                <div key={edu.id} className="education-card">
                  <div className="education-info">
                    <h4>{edu.degree}</h4>
                    <p className="college-name">{edu.school}</p>
                    <p className="duration">{edu.graduationDate}</p>
                    <p className="cgpa">{edu.gpa}</p>
                  </div>
                  {edu.relevantCourses && edu.relevantCourses.length > 0 && (
                    <div className="coursework">
                      <h5>Relevant Courses & Certifications:</h5>
                      <div className="coursework-tags">
                        {edu.relevantCourses.map((course) => (
                          <span key={course} className="coursework-tag">{course}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="achievements-section" variants={itemVariants}>
            <h3>Achievements</h3>
            <div className="achievements-list">
              {resumeData.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-item"
                  initial={{ x: -50, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: index * 0.07 }}
                >
                  <span className="achievement-bullet">🏆</span>
                  <span>{achievement}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="interests-section" variants={itemVariants}>
            <h3>Interests</h3>
            <div className="interests-list">
              {resumeData.interests.map((interest, index) => (
                <motion.div
                  key={index}
                  className="interest-item"
                  initial={{ y: 20, opacity: 0 }}
                  animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <span className="interest-bullet">✨</span>
                  <span>{interest}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
