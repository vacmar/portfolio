import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrolled, useMenuToggle, useSmoothScroll, useIsMobile, useScrollLock } from '../hooks';
import { NAV_ITEMS, ANIMATION_VARIANTS, TRANSITIONS } from '../constants';
import './Header.css';

const Header: React.FC = () => {
  const isScrolled = useScrolled(50);
  const { isOpen: isMenuOpen, toggleMenu, closeMenu } = useMenuToggle();
  const { scrollToElement } = useSmoothScroll();
  const { lockScroll, unlockScroll } = useScrollLock();
  const [activeSection, setActiveSection] = useState('home'); // Fixed: Changed from 'hero' to 'home'

  useEffect(() => {
    // Detect active section based on scroll position
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = NAV_ITEMS.map(item => item.id);
          
          // Special handling for home section when at top
          if (window.scrollY < 200) {
            setActiveSection('home');
            ticking = false;
            return;
          }
          
          // Find the section that's currently in the "active zone"
          let currentSection = null;
          
          sections.forEach(sectionId => {
            const element = document.getElementById(sectionId);
            if (element) {
              const rect = element.getBoundingClientRect();
              const headerHeight = 60; // Reduced from 100 to 60
              
              // A section is active if its content area is in the viewport
              // We want the section to be active when its content starts showing below the header
              const sectionTop = rect.top;
              const sectionBottom = rect.bottom;
              
              // Section is active if:
              // 1. Section top is above the header and bottom is below the header (section spans the trigger point)
              // 2. Or section top is within a reasonable distance below the header (about to become visible)
              if ((sectionTop <= headerHeight && sectionBottom >= headerHeight) ||
                  (sectionTop > headerHeight && sectionTop <= headerHeight + 50)) {
                currentSection = sectionId;
              }
            }
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

  // Lock/unlock scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }

    // Cleanup on unmount
    return () => {
      unlockScroll();
    };
  }, [isMenuOpen, lockScroll, unlockScroll]);

  const handleNavClick = (id: string) => {
    // Set active section immediately to show correct state
    setActiveSection(id);
    
    // Close menu immediately (synchronously)
    closeMenu();
    
    // Use requestAnimationFrame to ensure DOM updates before scrolling
    requestAnimationFrame(() => {
      setTimeout(() => {
        scrollToElement(id, 60); // Reduced offset from 100 to 60
      }, isMenuOpen ? 100 : 0); // Longer delay if menu is open
    });
  };

  const downloadResume = () => {
    // Close mobile menu immediately if it's open
    closeMenu();
    
    try {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Vaaheesan-Resume.pdf';
      link.style.display = 'none'; // Hide the link
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Resume download initiated with filename: Vaaheesan-Resume.pdf');
    } catch (error) {
      console.error('Download failed, using fallback:', error);
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