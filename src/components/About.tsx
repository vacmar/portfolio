import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
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

  const skills = {
    frontend: [
      { name: 'React.js', level: 90 },
      { name: 'Next.js', level: 85 },
      { name: 'JavaScript', level: 88 },
      { name: 'HTML5/CSS3', level: 92 },
      { name: 'Tailwind CSS', level: 85 }
    ],
    backend: [
      { name: 'Python', level: 90 },
      { name: 'Django', level: 85 },
      { name: 'FastAPI', level: 78 },
      { name: 'Node.js', level: 75 }
    ],
    databases: [
      { name: 'PostgreSQL', level: 82 },
      { name: 'MongoDB', level: 78 },
      { name: 'MySQL', level: 80 }
    ],
    tools: [
      { name: 'Git/GitHub', level: 88 },
      { name: 'Docker', level: 75 },
      { name: 'VS Code', level: 95 },
      { name: 'AWS Basics', level: 65 }
    ],
    fundamentals: [
      { name: 'Data Structures', level: 85 },
      { name: 'Algorithms', level: 82 },
      { name: 'OOP', level: 88 },
      { name: 'System Design', level: 70 }
    ]
  };

  const education = {
    degree: 'B.E. Computer Science and Engineering',
    college: 'Velammal Engineering College, Chennai',
    cgpa: '8.41',
    duration: '2023 – 2027',
    coursework: ['DSA', 'OOP', 'DBMS', 'OS', 'SE', 'Computer Networks', 'Web Development']
  };

  const achievements = [
    '2nd Place – App Development, Velammal Engg College (Apr 2025)',
    '4th Place – Python Symposium, Sai Ram Engineering College',
    'Finalist – Figma UI/UX Design Challenge, Amrita College',
    'NPTEL Certifications (Java, IoT, C++, DBMS)',
    'Forage Certifications (JPMorgan, Deloitte)',
    'Udemy Python Bootcamps'
  ];

  const interests = [
    'Language Learning – Japanese & German (Duolingo – 6K+ XP)',
    'Tech Curiosity – Problem Solving, Coding Mini-Games',
    'Creativity – Drawing, UI Sketching, Personal Website Design',
    'Sports & Mindfulness – Badminton, Cricket, F1, Music'
  ];

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
            Aspiring software developer with strong full-stack development experience
          </p>
        </motion.div>

        <div className="about-content">
          <motion.div className="about-summary" variants={itemVariants}>
            <h3>Summary</h3>
            <p>
              Aspiring software developer with strong full-stack development experience using Next.js, 
              Django REST, and MERN stack. Passionate about solving real-world problems, building 
              scalable web systems, and developing socially impactful products like MindSync+.
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
                    // Fallback: open in new tab
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
                {Object.entries(skills).map(([category, skillList]) => {
                  const isVisible = visibleSkills.has(category);
                  
                  return (
                    <motion.div 
                      key={category} 
                      className="skill-group"
                      data-skill-group={category}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <h4 className="skill-group-title">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                        {category === 'tools' && ' & Platforms'}
                        {category === 'fundamentals' && ' & CS'}
                      </h4>
                      <div className="skill-badges">
                        {skillList.map((skill, index) => (
                          <motion.div 
                            key={skill.name} 
                            className="skill-badge"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{ 
                              delay: index * 0.1,
                              duration: 0.4,
                              ease: "easeOut"
                            }}
                          >
                            {skill.name}
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
            <div className="education-card">
              <div className="education-info">
                <h4>{education.degree}</h4>
                <p className="college-name">{education.college}</p>
                <p className="duration">{education.duration}</p>
                <p className="cgpa">CGPA: {education.cgpa} ( Till 4th Sem )</p>
              </div>
              <div className="coursework">
                <h5>Relevant Coursework:</h5>
                <div className="coursework-tags">
                  {education.coursework.map((course) => (
                    <span key={course} className="coursework-tag">{course}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="achievements-section" variants={itemVariants}>
            <h3>Achievements & Certifications</h3>
            <div className="achievements-list">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="achievement-item"
                  initial={{ x: -50, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
                  transition={{ delay: index * 0.1 }}
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
              {interests.map((interest, index) => (
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
