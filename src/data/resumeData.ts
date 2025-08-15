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
    title: "Aspiring Software Engineer — Full-Stack Developer (Next.js, Django, MERN)",
    email: "vaahee21@gmail.com",
    phone: "+91-9499941994",
    location: "Chennai, India",
    linkedin: "https://linkedin.com/in/vaaheesan-s",
    github: "https://github.com/vacmar",
    leetcode: "https://leetcode.com/u/VAAHEESAN"
  },
  
  summary: `Aspiring software developer with strong full-stack development experience using Next.js, Django REST, and MERN stack. Passionate about solving real-world problems, building scalable web systems, and developing socially impactful products like MindSync+.`,
  
  skills: {
    frontend: ["HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Next.js"],
    backend: ["Python", "Django", "FastAPI", "Node.js"],
    database: ["MySQL", "PostgreSQL", "MongoDB"],
    tools: ["Git", "GitHub", "Docker", "VS Code"],
    fundamentals: ["DSA", "OOP", "DBMS", "OS", "CN"]
  },
  
  experience: [
    {
      id: 1,
      position: "Frontend Developer Intern",
      company: "Izeon Innovative Pvt. Ltd",
      location: "Remote",
      startDate: "Dec 2024",
      endDate: "Jan 2025",
      description: "Frontend development internship focusing on responsive web design and UI implementation.",
      achievements: [
        "Built a fully responsive Blvck Clothing Store clone using HTML, CSS, and vanilla JavaScript",
        "Focused on layout replication, UI precision, and professional code structuring",
        "Delivered pixel-perfect implementation with attention to detail"
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    }
  ],
  
  education: [
    {
      id: 1,
      degree: "B.E. Computer Science and Engineering",
      school: "Velammal Engineering College, Chennai",
      location: "Chennai, India",
      graduationDate: "2027",
      gpa: "8.41/10.0",
      relevantCourses: [
        "DSA", "OOP", "DBMS", "OS", "SE", "Computer Networks", "Web Development"
      ]
    }
  ],
  
  projects: [
    {
      id: 1,
      name: "Elevatr – Job and Internship Portal",
      description: "A comprehensive platform for students and recruiters with role-based dashboards, resume uploads, and admin management features.",
      technologies: ["Next.js", "Tailwind CSS", "Django REST", "Supabase", "Vercel", "Render"],
      features: [
        "Authentication for students/recruiters with role-based dashboards",
        "Resume uploads directly sent to recruiters for streamlined application",
        "Admin panel to manage listings, users, and access"
      ],
      github: "https://github.com/vacmar/Elevatr",
      demo: "",
      status: "In Development",
      type: "Solo Project"
    },
    {
      id: 2,
      name: "Spendly – Personal Expense Tracker",
      description: "Feature-rich expense tracking application with category-wise analytics, notifications, and customizable themes.",
      technologies: ["React.js", "Recharts", "Node.js", "MongoDB Atlas"],
      features: [
        "Tracks income/expenses with category-wise charts and filtering",
        "Notifies users when inputs are missed to ensure habit consistency",
        "Dark/light theme toggle and dashboard UX design"
      ],
      github: "https://github.com/vacmar/Spendly",
      demo: "",
      status: "In Development",
      type: "Solo Project"
    },
    {
      id: 3,
      name: "MindSync+ (Proposed Founder Project)",
      description: "Mobile-first mental health platform with anonymous, multilingual support and AI-powered assistance.",
      technologies: ["Flutter", "Supabase", "GPT-4", "WebRTC", "Firebase", "Twilio"],
      features: [
        "Anonymous, multilingual support with empathy-matching",
        "Text/video/voice support with AI-powered fallback",
        "Gamification, NGO dashboards, and moderation system"
      ],
      github: "",
      demo: "",
      status: "Under Review - MSME Hackathon 5.0",
      type: "Founder Project Proposal"
    },
    {
      id: 4,
      name: "Arya Productions Static Website",
      description: "Professional company website for a leading storage and material handling manufacturer.",
      technologies: ["HTML5", "CSS3", "JavaScript", "FontAwesome"],
      features: [
        "Responsive sections: About, Products, Services, and Contact",
        "Corporate branding with consistent layout and semantic HTML5",
        "Clean UI/UX practices with icon usage via FontAwesome"
      ],
      github: "https://github.com/vacmar/aryaproductions.github.io",
      demo: "https://vacmar.github.io/aryaproductions.github.io/",
      status: "Completed",
      type: "Client Project"
    },
    {
      id: 5,
      name: "Car Lane Detection System",
      description: "Real-time and image-based lane detection system using computer vision techniques.",
      technologies: ["Python", "OpenCV", "Matplotlib"],
      features: [
        "Canny edge detection and Hough Transform implementation",
        "ROI masking, slope averaging, and smoothing for accuracy",
        "Video and image support pipeline with interactive visual overlay"
      ],
      github: "https://github.com/vacmar/Car_Lane_Detection",
      demo: "",
      status: "Completed",
      type: "Computer Vision Project"
    },
    {
      id: 6,
      name: "Mini Projects Collection",
      description: "Collection of early-stage learning projects demonstrating UI logic and programming fundamentals.",
      technologies: ["HTML", "CSS", "JavaScript", "Python"],
      features: [
        "2048 Puzzle Game with interactive gameplay",
        "Tic Tac Toe with AI opponent",
        "FAQ Accordion UI with smooth animations",
        "HTML Form with validation"
      ],
      github: "https://github.com/vacmar/MINI-PROJECTS",
      demo: "",
      status: "Completed",
      type: "Learning Projects"
    }
  ],
  
  certifications: [
    {
      id: 1,
      name: "NPTEL Java Programming",
      issuer: "NPTEL",
      date: "2024",
      credentialId: "NPTEL-JAVA-2024"
    },
    {
      id: 2,
      name: "NPTEL Internet of Things",
      issuer: "NPTEL",
      date: "2024",
      credentialId: "NPTEL-IOT-2024"
    },
    {
      id: 3,
      name: "JPMorgan Software Engineering",
      issuer: "Forage",
      date: "2024",
      credentialId: "FORAGE-JPM-2024"
    },
    {
      id: 4,
      name: "Deloitte Technology Virtual Experience",
      issuer: "Forage",
      date: "2024", 
      credentialId: "FORAGE-DEL-2024"
    }
  ],

  achievements: [
    "2nd Place – App Development, Velammal Engg College (Apr 2025)",
    "4th Place – Python Symposium, Sai Ram Engineering College",
    "Finalist – Figma UI/UX Design Challenge, Amrita College",
    "NPTEL Certifications (Java, IoT, C++, DBMS)",
    "Forage Certifications (JPMorgan, Deloitte)",
    "Udemy Python Bootcamps"
  ],

  interests: [
    "Language Learning – Japanese & German (Duolingo – 6K+ XP in Japanese)",
    "Tech Curiosity – Problem Solving, Coding Mini-Games, Exploring CS Concepts",
    "Creativity – Drawing, UI Sketching, Personal Website Design",
    "Sports & Mindfulness – Badminton, Cricket, F1, Music For Focus & Relaxation"
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
