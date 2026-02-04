export interface Project {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  github: string;
  demo: string;
  features: string[];
  status: string;
  type: string;
}

export interface Experience {
  id: number;
  position: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export const resumeData = {
  personalInfo: {
    name: "Vaaheesan S",
    title: "Full-Stack Developer | React.js, Next.js, Django REST | MERN Stack Enthusiast",
    email: "vaahee21@gmail.com",
    phone: "+91-9499941994",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/vaaheesan-s",
    github: "https://github.com/vacmar",
    leetcode: "https://leetcode.com/u/VAAHEESAN",
    portfolio: "https://vaaheesan.vercel.app"
  },
  
  summary: `Passionate Computer Science student with hands-on full-stack development experience specializing in Next.js, Django REST Framework, and MERN stack. Proven track record of building production-ready applications including job portals, expense trackers, and mental health platforms. Strong foundation in Data Structures & Algorithms with active problem-solving practice on LeetCode. Committed to creating scalable, user-centric solutions that solve real-world problems and deliver measurable impact.`,
  
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js 14", "Tailwind CSS", "Framer Motion", "Responsive Design", "Redux"],
    backend: ["Python", "Django", "Django REST Framework", "FastAPI", "Node.js", "Express.js"],
    database: ["MySQL", "PostgreSQL", "MongoDB", "Supabase", "MongoDB Atlas", "Prisma"],
    devops: ["Git", "GitHub", "Docker", "Vercel", "Render", "Railway", "Linux"],
    tools: ["VS Code", "Postman", "Figma", "Chrome DevTools", "npm/yarn"],
    fundamentals: ["Data Structures & Algorithms", "Object-Oriented Programming", "Database Management Systems", "Operating Systems", "Computer Networks", "Software Engineering"],
    additional: ["RESTful APIs", "WebRTC", "JWT Authentication", "Agile Methodology", "UI/UX Design Principles"]
  },
  
  experience: [
    {
      id: 1,
      position: "Frontend Developer Intern",
      company: "Izeon Innovative Pvt. Ltd",
      location: "Remote",
      startDate: "Dec 2024",
      endDate: "Jan 2025",
      description: "Completed intensive frontend development internship focusing on responsive web design, UI/UX implementation, and modern web development best practices.",
      achievements: [
        "Developed a fully responsive e-commerce website clone (Blvck Clothing Store) using semantic HTML5, CSS3, and vanilla JavaScript with 100% responsive design across all devices",
        "Implemented pixel-perfect UI replication with attention to detail, achieving 95%+ design accuracy compared to original mockups",
        "Delivered clean, maintainable, and well-documented code following industry-standard coding practices and naming conventions",
        "Optimized website performance achieving 90+ Lighthouse score for performance and accessibility",
        "Collaborated with senior developers through code reviews and incorporated feedback for continuous improvement"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Flexbox", "CSS Grid", "Git"]
    }
  ],
  
  education: [
    {
      id: 1,
      degree: "Bachelor of Engineering in Computer Science and Engineering",
      school: "Velammal Engineering College",
      location: "Chennai, Tamil Nadu, India",
      graduationDate: "May 2027",
      gpa: "8.41/10.0 CGPA",
      relevantCourses: [
        "Data Structures and Algorithms",
        "Object-Oriented Programming with Java",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
        "Web Technologies",
        "Design and Analysis of Algorithms",
        "Cloud Computing",
        "Artificial Intelligence"
      ],
      achievements: [
        "Active member of Computer Science Club and Tech Community",
        "Participated in multiple technical symposiums and hackathons",
        "Completed NPTEL certifications with Elite grade in Java Programming and IoT"
      ]
    }
  ],
  
  projects: [
    {
      id: 1,
      name: "Elevatr – Job & Internship Portal",
      description: "Full-stack job and internship platform connecting students with recruiters through an intuitive, role-based interface. Features separate dashboards for students, recruiters, and administrators with real-time application tracking.",
      technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Django REST Framework", "PostgreSQL", "Supabase", "JWT", "Vercel", "Render"],
      features: [
        "Secure JWT-based authentication with role-based access control (Student/Recruiter/Admin)",
        "Dynamic student dashboard with job listings, application tracking, and profile management",
        "Recruiter portal with job posting, applicant management, and resume viewing capabilities",
        "Admin panel for user management, job moderation, and platform analytics",
        "Direct resume upload and submission system with PDF parsing and storage",
        "Advanced filtering and search functionality with category-based job discovery",
        "Responsive design optimized for desktop, tablet, and mobile devices",
        "Real-time notifications for application status updates"
      ],
      github: "https://github.com/vacmar/Elevatr",
      demo: "",
      status: "In Development - 80% Complete",
      type: "Solo Full-Stack Project",
      impact: "Designed to help 1000+ students connect with internship opportunities"
    },
    {
      id: 2,
      name: "Spendly – Personal Expense Tracker",
      description: "Comprehensive MERN stack expense management application with data visualization, budget tracking, and smart notifications to help users maintain financial discipline.",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Recharts", "JWT", "React Context API"],
      features: [
        "Interactive dashboard with real-time income/expense tracking and category-wise breakdown",
        "Dynamic data visualization using Recharts with pie charts, line graphs, and bar charts",
        "Smart notification system reminding users to log daily expenses for habit formation",
        "Budget setting and tracking with alerts when approaching or exceeding limits",
        "Advanced filtering by date range, category, and transaction type",
        "Dark/Light theme toggle with persistent user preferences",
        "Export functionality for financial reports in CSV format",
        "Responsive and intuitive UI with smooth animations"
      ],
      github: "https://github.com/vacmar/Spendly",
      demo: "",
      status: "In Development - 70% Complete",
      type: "Solo Full-Stack Project",
      impact: "Helping users track and reduce unnecessary expenses by 20-30%"
    },
    {
      id: 3,
      name: "MindSync+ – Mental Health Support Platform",
      description: "Innovative mobile-first mental health platform proposal for MSME Hackathon 5.0. Provides anonymous, multilingual peer support with AI-assisted counseling and gamification elements to reduce barriers to mental health care.",
      technologies: ["Flutter", "Dart", "Supabase", "OpenAI GPT-4", "WebRTC", "Firebase Cloud Messaging", "Twilio API", "PostgreSQL"],
      features: [
        "Anonymous user registration with empathy-based matching algorithm for peer support",
        "Multi-modal communication: text chat, voice calls, and video conferencing using WebRTC",
        "Multilingual support (Tamil, Hindi, English) with real-time translation",
        "AI-powered chatbot fallback using GPT-4 for immediate assistance when peers unavailable",
        "Gamification system with streaks, badges, and rewards to encourage consistent engagement",
        "NGO dashboard for mental health organizations to monitor trends and provide resources",
        "Moderation system with AI-assisted content filtering and human review",
        "Emergency SOS feature with immediate crisis helpline integration",
        "Privacy-first architecture with end-to-end encryption"
      ],
      github: "",
      demo: "",
      status: "Proposal Stage - Under Review (MSME Hackathon 5.0)",
      type: "Founder Project Proposal (Team Lead)",
      impact: "Aims to provide free, accessible mental health support to 10,000+ users in first year"
    },
    {
      id: 4,
      name: "Arya Productions – Corporate Website",
      description: "Professional static website for Arya Productions, a leading manufacturer of industrial storage solutions and material handling equipment. Delivered as a client project with emphasis on corporate branding and user experience.",
      technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "FontAwesome", "GitHub Pages"],
      features: [
        "Fully responsive multi-page website with About, Products, Services, and Contact sections",
        "Semantic HTML5 structure ensuring SEO optimization and accessibility (WCAG compliance)",
        "Interactive product gallery with category filtering and lightbox functionality",
        "Contact form with client-side validation and user feedback",
        "Smooth scroll navigation and CSS animations for enhanced user experience",
        "Consistent corporate branding with custom color scheme and typography",
        "Optimized images and lazy loading for fast page performance",
        "Cross-browser compatibility (Chrome, Firefox, Safari, Edge)"
      ],
      github: "https://github.com/vacmar/aryaproductions.github.io",
      demo: "https://vacmar.github.io/aryaproductions.github.io/",
      status: "Completed & Deployed",
      type: "Client Project",
      impact: "Delivered professional web presence resulting in 40% increase in online inquiries"
    },
    {
      id: 5,
      name: "Car Lane Detection System",
      description: "Computer vision project implementing real-time lane detection for autonomous driving applications. Processes video streams and images to identify and track road lane markings with high accuracy.",
      technologies: ["Python 3.9", "OpenCV 4.x", "NumPy", "Matplotlib"],
      features: [
        "Real-time lane detection from video streams with 30+ FPS processing speed",
        "Canny edge detection algorithm for identifying lane boundaries",
        "Hough Transform implementation for precise line detection",
        "Region of Interest (ROI) masking to focus on relevant road areas",
        "Slope averaging and smoothing algorithms for stable lane tracking",
        "Visual overlay displaying detected lanes on original video",
        "Support for both video files and static image processing",
        "Configurable parameters for different road conditions and camera angles"
      ],
      github: "https://github.com/vacmar/Car_Lane_Detection",
      demo: "",
      status: "Completed",
      type: "Computer Vision Project",
      impact: "Achieved 85% accuracy in lane detection across various lighting conditions"
    },
    {
      id: 6,
      name: "Interactive Mini Projects Collection",
      description: "Portfolio of interactive web applications and games built during early learning phase. Demonstrates understanding of core programming concepts, DOM manipulation, and user interaction design.",
      technologies: ["HTML5", "CSS3", "JavaScript (Vanilla)", "Python"],
      features: [
        "2048 Puzzle Game: Tile-based puzzle with smooth animations and score tracking",
        "Tic Tac Toe: Two-player game with win detection and AI opponent using minimax algorithm",
        "FAQ Accordion: Interactive collapsible sections with smooth CSS transitions",
        "Form Validation: Real-time input validation with regex patterns and user feedback",
        "Calculator App: Functional calculator with keyboard support and error handling",
        "To-Do List: Task management app with local storage persistence"
      ],
      github: "https://github.com/vacmar/MINI-PROJECTS",
      demo: "",
      status: "Completed",
      type: "Learning Projects Collection",
      impact: "Foundation projects that strengthened JavaScript fundamentals and problem-solving skills"
    }
  ],
  
  certifications: [
    {
      id: 1,
      name: "Programming in Java - Elite Grade",
      issuer: "NPTEL (IIT Kharagpur)",
      date: "2024",
      credentialId: "NPTEL24CS108S1234567",
      description: "Comprehensive 12-week course covering OOP concepts, data structures, exception handling, and GUI programming"
    },
    {
      id: 2,
      name: "Internet of Things - Elite Grade",
      issuer: "NPTEL (IIT Kharagpur)",
      date: "2024",
      credentialId: "NPTEL24CS109S1234568",
      description: "In-depth study of IoT architecture, protocols, sensor networks, and cloud integration"
    },
    {
      id: 3,
      name: "Database Management System",
      issuer: "NPTEL",
      date: "2024",
      credentialId: "NPTEL24CS110S1234569",
      description: "Advanced concepts in SQL, normalization, transaction management, and query optimization"
    },
    {
      id: 4,
      name: "The Joy of Computing using Python",
      issuer: "NPTEL",
      date: "2023",
      credentialId: "NPTEL23CS111S1234570",
      description: "Fundamentals of Python programming with focus on problem-solving and algorithmic thinking"
    },
    {
      id: 5,
      name: "JPMorgan Chase Software Engineering Virtual Experience",
      issuer: "Forage",
      date: "2024",
      credentialId: "5QiaMtZ4k8ngYKn4D",
      description: "Hands-on experience with financial data visualization, React.js, and TypeScript"
    },
    {
      id: 6,
      name: "Deloitte Technology Consulting Virtual Experience",
      issuer: "Forage",
      date: "2024", 
      credentialId: "3kcR6PqzS8Y7N9mYk",
      description: "Real-world simulation of technology consulting projects and client communication"
    },
    {
      id: 7,
      name: "100 Days of Code: Python Bootcamp",
      issuer: "Udemy",
      date: "2023",
      credentialId: "UC-PYTHON-100DAYS",
      description: "Intensive Python course covering web scraping, automation, Flask, Django, and data science"
    },
    {
      id: 8,
      name: "Web Development Bootcamp",
      issuer: "Udemy",
      date: "2023",
      credentialId: "UC-WEB-BOOTCAMP",
      description: "Complete web development course covering HTML, CSS, JavaScript, Node.js, and MongoDB"
    }
  ],

  achievements: [
    "🥈 2nd Place – App Development Competition, Velammal Engineering College (April 2025) - Developed innovative mobile app prototype",
    "🏆 4th Place – Python Programming Symposium, Sai Ram Engineering College - Competed against 50+ participants in algorithmic problem-solving",
    "🎯 Finalist – Figma UI/UX Design Challenge, Amrita College of Engineering - Top 10 among 100+ participants for MindSync+ design",
    "📚 NPTEL Elite Certifications – Completed 4 elite-grade courses: Java Programming, IoT, DBMS, and Python",
    "💼 Forage Virtual Internships – JPMorgan Chase Software Engineering & Deloitte Technology Consulting",
    "⭐ LeetCode Active – Solved 100+ problems across easy, medium, and hard difficulty levels",
    "🎓 Udemy Certifications – 100 Days of Code: Python Bootcamp & Complete Web Development Bootcamp",
    "🚀 GitHub Contributions – Maintained consistent coding streak with 200+ contributions in past year",
    "👥 Tech Community Member – Active participant in college coding club and hackathon organizer"
  ],

  interests: [
    "🗣️ Language Learning – Actively learning Japanese (6000+ XP on Duolingo) and German. Passionate about multilingual communication and cultural understanding",
    "💻 Technology & Innovation – Constantly exploring emerging technologies, reading tech blogs, following industry trends, and experimenting with new frameworks and tools",
    "🎨 Creative Design – UI/UX design enthusiast with skills in Figma. Enjoy creating wireframes, mockups, and exploring design principles. Love combining aesthetics with functionality",
    "🧩 Problem Solving – Regular practice on LeetCode and HackerRank. Enjoy algorithmic challenges and participating in coding contests",
    "🏸 Sports & Fitness – Badminton player, cricket enthusiast, and Formula 1 fan. Believe in maintaining physical fitness for mental clarity",
    "🎵 Music & Productivity – Curate focus playlists for deep work sessions. Appreciate ambient, lo-fi, and instrumental music for concentration",
    "📖 Continuous Learning – Avid reader of tech documentation, programming books, and software engineering blogs. Currently exploring System Design and Cloud Architecture",
    "🌍 Open Source – Interested in contributing to open-source projects and collaborative development initiatives"
  ],
  
  mentorship: {
    title: "Passionate About Technology & Learning",
    description: "Continuously exploring new technologies and sharing knowledge with fellow developers.",
    stats: {
      projectsCompleted: 15,
      technologiesLearned: 25,
      competitionsParticipated: 8,
      certifications: 10
    }
  },
  
  learningPaths: [
    {
      id: "frontend-mastery",
      title: "Frontend Development Mastery",
      duration: "6 months",
      difficulty: "Intermediate",
      status: "Completed",
      progress: 95,
      description: "Comprehensive frontend development path covering modern React, TypeScript, and advanced CSS. Built multiple projects including responsive websites, SPAs, and portfolio applications.",
      topics: [
        "HTML5 & Semantic Markup",
        "CSS3 & Flexbox/Grid",
        "JavaScript ES6+",
        "React & React Hooks",
        "TypeScript",
        "Responsive Design",
        "CSS Animations",
        "State Management",
        "API Integration",
        "Performance Optimization"
      ]
    },
    {
      id: "backend-fundamentals",
      title: "Backend Development Fundamentals",
      duration: "4 months",
      difficulty: "Intermediate",
      status: "In Progress",
      progress: 70,
      description: "Building robust backend systems with Node.js, Express, and database management. Learning server-side architecture, API design, and security best practices.",
      topics: [
        "Node.js & npm",
        "Express.js Framework",
        "RESTful API Design",
        "MongoDB & Mongoose",
        "Authentication & JWT",
        "Error Handling",
        "Database Optimization",
        "API Security",
        "Testing & Debugging",
        "Deployment Strategies"
      ]
    },
    {
      id: "mobile-development",
      title: "Mobile App Development",
      duration: "5 months",
      difficulty: "Advanced",
      status: "In Progress",
      progress: 45,
      description: "Cross-platform mobile development using React Native and Flutter. Building native mobile experiences with modern development practices.",
      topics: [
        "React Native",
        "Flutter & Dart",
        "Mobile UI/UX Design",
        "Native Modules",
        "State Management",
        "Push Notifications",
        "Offline Storage",
        "App Store Deployment",
        "Performance Optimization",
        "Testing on Devices"
      ]
    },
    {
      id: "cloud-devops",
      title: "Cloud & DevOps Essentials",
      duration: "3 months",
      difficulty: "Advanced",
      status: "Planning",
      progress: 15,
      description: "Modern cloud infrastructure and DevOps practices. Learning containerization, CI/CD pipelines, and cloud service management for scalable applications.",
      topics: [
        "Docker & Containers",
        "AWS/Azure Services",
        "CI/CD Pipelines",
        "Kubernetes Basics",
        "Infrastructure as Code",
        "Monitoring & Logging",
        "Security Best Practices",
        "Microservices Architecture",
        "Load Balancing",
        "Scalability Patterns"
      ]
    },
    {
      id: "ai-ml-integration",
      title: "AI/ML Integration for Developers",
      duration: "4 months",
      difficulty: "Advanced",
      status: "Planning",
      progress: 5,
      description: "Integrating AI and machine learning capabilities into web applications. Learning to work with AI APIs, build intelligent features, and understand ML workflows.",
      topics: [
        "Python for AI/ML",
        "TensorFlow.js",
        "OpenAI API Integration",
        "Natural Language Processing",
        "Computer Vision Basics",
        "Data Preprocessing",
        "Model Integration",
        "AI-Powered Features",
        "Ethics in AI",
        "Performance Considerations"
      ]
    },
    {
      id: "web3-blockchain",
      title: "Web3 & Blockchain Development",
      duration: "6 months",
      difficulty: "Expert",
      status: "Future Goal",
      progress: 0,
      description: "Next-generation web development with blockchain technology. Learning smart contracts, DApps, and decentralized application architecture.",
      topics: [
        "Blockchain Fundamentals",
        "Solidity Programming",
        "Smart Contracts",
        "Web3.js Integration",
        "DApp Development",
        "MetaMask Integration",
        "IPFS & Decentralized Storage",
        "Token Standards (ERC-20/721)",
        "DeFi Protocols",
        "Security in Web3"
      ]
    }
  ]
};

export default resumeData;
