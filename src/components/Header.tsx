import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrolled, useMenuToggle, useSmoothScroll } from '../hooks';
import { NAV_ITEMS, ANIMATION_VARIANTS, TRANSITIONS } from '../constants';
import './Header.css';

const Header: React.FC = () => {
  const isScrolled = useScrolled(50);
  const { isOpen: isMenuOpen, toggleMenu, closeMenu } = useMenuToggle();
  const { scrollToElement } = useSmoothScroll();
  const [activeSection, setActiveSection] = useState('hero'); // Fixed: Changed from 'home' to 'hero'

  useEffect(() => {
    // Detect active section based on scroll position
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = NAV_ITEMS.map(item => item.id);
          
          // Special handling for hero section when at top
          if (window.scrollY < 100) {
            setActiveSection('hero');
            ticking = false;
            return;
          }
          
          const currentSection = sections.find(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const headerOffset = 80; // Account for fixed header height
              return rect.top <= headerOffset && rect.bottom >= headerOffset;
            }
            return false;
          });
          
          if (currentSection) {
            setActiveSection(currentSection);
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    // Close menu immediately (synchronously)
    closeMenu();
    setActiveSection(id);
    
    // Small delay to allow menu to start closing before scroll
    setTimeout(() => {
      scrollToElement(id, 80);
    }, 50); // 50ms delay to let the close animation start
  };

  const downloadResume = () => {
    // Close mobile menu immediately if it's open
    closeMenu();
    
    try {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'vaaheesan-resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <>
      <motion.header 
        className={`header ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.div 
            className="logo" 
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.05 }}
          >
            <img src="/VACMAR_LOGO.png" alt="VACMAR Portfolio" />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.button>
            ))}
            <motion.button 
              className="resume-btn" 
              onClick={downloadResume}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Resume
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="menu-toggle"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
          >
            <span className={isMenuOpen ? 'open' : ''}></span>
            <span className={isMenuOpen ? 'open' : ''}></span>
            <span className={isMenuOpen ? 'open' : ''}></span>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile Navigation */}
      <motion.div 
        className={`nav-mobile ${isMenuOpen ? 'open' : ''}`}
        initial={{ opacity: 0, y: -20 }}
        animate={isMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ 
          duration: isMenuOpen ? 0.4 : 0.15,
          ease: isMenuOpen ? [0.68, -0.55, 0.265, 1.55] : "easeOut"
        }}
      >
        {NAV_ITEMS.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className={`nav-link-mobile ${activeSection === item.id ? 'active' : ''}`}
            whileHover={{ x: 10 }}
          >
            {item.label}
          </motion.button>
        ))}
        <motion.button 
          className="resume-btn-mobile" 
          onClick={downloadResume}
          whileHover={{ y: -2 }}
        >
          Download Resume
        </motion.button>
      </motion.div>

      {/* Overlay */}
      {isMenuOpen && (
        <motion.div 
          className="overlay" 
          onClick={closeMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </>
  );
};

export default Header;