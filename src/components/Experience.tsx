import React from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { resumeData } from '../data/resumeData';
import './Experience.css';

const Experience: React.FC = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const cardVariants: Variants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  return (
    <section id="experience" className="experience" ref={ref}>
      <motion.div
        className="experience-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div className="experience-header" variants={itemVariants}>
          <h2 className="section-title">Professional Experience</h2>
          <p className="section-subtitle">
            Building expertise through hands-on development experience
          </p>
        </motion.div>

        <div className="experience-timeline">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              variants={cardVariants}
              whileHover={{ scale: 1.02, transition: { duration: 0.3 } }}
            >
              <div className="experience-timeline-marker">
                <div className="timeline-dot"></div>
                <div className="timeline-line"></div>
              </div>

              <div className="experience-content">
                <div className="experience-header-info">
                  <div className="experience-title-section">
                    <h3 className="experience-position">{exp.position}</h3>
                    <h4 className="experience-company">{exp.company}</h4>
                    <p className="experience-location">{exp.location}</p>
                  </div>
                  <div className="experience-duration">
                    <span className="duration-badge">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="experience-achievements">
                  <h5>Key Achievements:</h5>
                  <ul>
                    {exp.achievements.map((achievement, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                      >
                        {achievement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="experience-technologies">
                  <h5>Technologies Used:</h5>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, idx) => (
                      <motion.span
                        key={idx}
                        className="tech-tag"
                        initial={{ scale: 0 }}
                        animate={inView ? { scale: 1 } : { scale: 0 }}
                        transition={{ delay: index * 0.2 + idx * 0.05 }}
                        whileHover={{ scale: 1.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="experience-cta" variants={itemVariants}>
          <p>Looking for opportunities to grow and contribute to innovative projects</p>
          <motion.button
            className="cta-button"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px var(--lavender-glow)"
            }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
