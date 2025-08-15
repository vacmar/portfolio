import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import profileImage from '../assets/profile.jpg';
import './Hero.css';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { ref } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
        delayChildren: 0.3
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

  const nameVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 0.5
      }
    }
  };

  const buttonVariants: Variants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99],
        delay: 1.2
      }
    }
  };

  const floatingVariants: Variants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section id="home" className="hero" ref={ref}>
      <motion.div
        className="hero-background"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </motion.div>

      <motion.div
        className="hero-container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        <motion.div className="hero-content">
          <motion.div
            className="greeting"
            variants={itemVariants}
          >
            <span className="greeting-text">Hello, I'm</span>
          </motion.div>

          <motion.h1
            className="hero-name"
            variants={nameVariants}
          >
            <span className="name-text">Vaaheesan S</span>
          </motion.h1>

          <motion.div
            className="hero-titles"
            variants={itemVariants}
          >
            <h2 className="title-primary">Aspiring Software Engineer</h2>
            <h3 className="title-secondary">Full-Stack Developer (Next.js, Django, MERN)</h3>
          </motion.div>

          <motion.p
            className="hero-description"
            variants={itemVariants}
          >
            Passionate about solving real-world problems and building scalable web systems. 
            Experienced in Next.js, Django REST, and MERN stack with a focus on developing 
            socially impactful products and innovative solutions.
          </motion.p>

          <motion.div
            className="hero-buttons"
            variants={buttonVariants}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px var(--lavender-glow)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View My Work
            </motion.button>
            
            <motion.button
              className="btn-resume"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 25px var(--lavender-glow)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                try {
                  // Check if resume file exists
                  const response = await fetch('/resume.pdf');
                  if (!response.ok) {
                    // If file doesn't exist, show a message
                    alert('Resume is currently being updated. Please contact me directly for the latest version!');
                    return;
                  }
                  
                  // Convert to blob for proper download
                  const blob = await response.blob();
                  
                  // Check if the blob is actually a PDF
                  if (blob.type !== 'application/pdf' && blob.size < 1000) {
                    alert('Resume file is currently unavailable. Please contact me directly!');
                    return;
                  }
                  
                  const url = window.URL.createObjectURL(blob);
                  
                  // Create download link
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = 'Vaaheesan-Resume.pdf';
                  document.body.appendChild(link);
                  link.click();
                  
                  // Cleanup
                  document.body.removeChild(link);
                  window.URL.revokeObjectURL(url);
                } catch (error) {
                  console.error('Error downloading resume:', error);
                  alert('Resume download temporarily unavailable. Please contact me directly for my resume!');
                }
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7,10 12,15 17,10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download Resume
            </motion.button>
            
            <motion.button
              className="btn-secondary"
              whileHover={{ 
                scale: 1.05,
                borderColor: "var(--secondary-lavender)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Get In Touch
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          variants={itemVariants}
        >
          <motion.div
            className="profile-container"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <div className="profile-image">
              <img 
                src={profileImage} 
                alt="Vaaheesan S - Profile" 
                className="profile-img"
              />
            </div>
          </motion.div>

          <motion.div
            className="floating-elements"
            variants={floatingVariants}
            animate="floating"
          >
            <div className="tech-badge">Next.js</div>
            <div className="tech-badge">Django</div>
            <div className="tech-badge">MERN</div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
