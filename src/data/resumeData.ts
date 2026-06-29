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
    title: "(C++ • Python • Software Engineering • Backend Systems)",
    email: "vaahee21@gmail.com",
    phone: "+91-9499941994",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/vaaheesan-s",
    github: "https://github.com/vacmar",
    leetcode: "https://leetcode.com/u/VAAHEESAN",
    portfolio: "https://vaaheesan.vercel.app"
  },

  summary: `Computer Science Engineering student with hands-on experience in software engineering, backend development, and Generative AI applications. Experienced in building scalable APIs, integrating LLM workflows, and developing production-ready applications serving thousands of concurrent users. Strong foundation in full-stack engineering, team leadership, and collaborative development.`,

  skills: {
    languages: ["C++", "Python", "Java", "SQL", "JavaScript", "TypeScript"],
    frontend: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
    backend: ["FastAPI", "Flask", "Express.js", "Node.js", "REST APIs"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "SQLite"],
    aiml: ["LLM", "LangChain", "Azure OpenAI", "LangSmith", "Prompt Engineering"],
    devops: ["Docker", "AWS", "Git", "CI/CD"],
    tools: ["Postman", "VS Code", "GitHub", "Redis", "Alembic", "Ruff"]
  },

  experience: [
    {
      id: 1,
      position: "Backend Lead Intern",
      company: "Hexaware Technologies",
      location: "Chennai, India",
      startDate: "Feb 2026",
      endDate: "Present",
      description: "Led a 3-member backend sub-team within a 12-member engineering team, coordinating feature implementation, backend integration, and onboarding new developers.",
      achievements: [
        "Designed and implemented RESTful APIs, schema-driven backend services, and database workflows using Python and FastAPI, supporting applications serving 3,000 concurrent users.",
        "Developed asynchronous AI evaluation pipelines using Redis queues and asyncio, integrated Alembic for version-controlled database migrations, and maintained code quality using Ruff.",
        "Contributed to deployment validation, CI/CD workflows, production monitoring, and backend optimization, reducing application performance overhead by approximately 3%."
      ],
      technologies: ["Python", "FastAPI", "Redis", "Alembic", "Ruff", "asyncio", "CI/CD", "PostgreSQL"]
    },
    {
      id: 2,
      position: "Web Developer Intern",
      company: "Infotak Solutions",
      location: "Chennai, India",
      startDate: "Aug 2025",
      endDate: "Jan 2026",
      description: "Developed and deployed 8+ full-stack applications, including an e-commerce platform and an IoT-integrated management system, working across frontend, backend, and database components.",
      achievements: [
        "Identified database performance bottlenecks during testing of the e-commerce platform, analyzed SQL query execution, and improved application response time through indexing and query restructuring.",
        "Improved frontend performance and accessibility by implementing lazy loading, responsive UI design, and WCAG-compliant interfaces, reducing load time across multiple projects."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "WCAG", "Lazy Loading"]
    },
    {
      id: 3,
      position: "Software Development Intern",
      company: "J7 Technology Solutions Pvt. Ltd.",
      location: "Chennai, India",
      startDate: "Aug 2025",
      endDate: "Sept 2025",
      description: "Developed student, teacher, and parent-facing modules for a cloud-based School CRM platform using Next.js, Node.js, Express.js, MongoDB, and AWS.",
      achievements: [
        "Collaborated within a 5-member engineering team to build scalable backend APIs, integrate role-based functionality, and deliver production-ready modules across multiple user roles."
      ],
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS", "JavaScript"]
    }
  ],

  education: [
    {
      id: 1,
      degree: "B.E. Computer Science and Engineering",
      school: "Velammal Engineering College",
      location: "Chennai, India",
      graduationDate: "2023 – 2027",
      gpa: "CGPA: 8.33",
      relevantCourses: [
        "NPTEL – Programming in Modern C++",
        "NPTEL – Programming in Java",
        "NPTEL – Deep Learning",
        "NPTEL – Natural Language Processing",
        "NPTEL – Introduction to Internet of Things",
        "Udemy – Complete Python Course"
      ]
    }
  ],

  projects: [
    {
      id: 1,
      name: "School CRM Platform",
      description: "Full-Scale Digital School Management System supporting seven user roles including students, teachers, parents, HR, principal, support staff, and finance.",
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS"],
      features: [
        "Contributed to the development of a full-scale school management platform supporting seven user roles including students, teachers, parents, HR, principal, support staff, and finance.",
        "Designed and implemented student, parent, and teacher modules featuring attendance management, academic records, communication workflows, and administrative operations.",
        "Built scalable backend APIs with Node.js and Express.js, integrated MongoDB for data management, and deployed the application on AWS."
      ],
      github: "",
      demo: "",
      status: "Completed (Private Codebase)",
      type: "Team Project"
    },
    {
      id: 2,
      name: "Spendly",
      description: "Personal Expense Tracker supporting expense tracking, category-based budgeting, analytics dashboards, and spending insights.",
      technologies: ["React 18", "Node.js", "Express.js", "MongoDB", "Vite", "Tailwind CSS", "Framer Motion"],
      features: [
        "Built a full-stack expense management platform supporting expense tracking, category-based budgeting, analytics dashboards, and spending insights.",
        "Implemented JWT authentication, Google OAuth integration, secure password reset using Nodemailer, and role-based authentication workflows.",
        "Designed secure backend APIs with validation, Helmet security middleware, rate limiting, pagination, filtering, sorting, and search capabilities.",
        "Built a responsive React frontend using Context API for centralized state management, enabling seamless CRUD operations and interactive dashboards."
      ],
      github: "https://github.com/vacmar/Spendly",
      demo: "",
      status: "Completed",
      type: "Solo Project"
    },
    {
      id: 3,
      name: "Elevatr",
      description: "Two-sided recruitment platform enabling students to discover opportunities, bookmark jobs, apply online, and monitor application status while recruiters manage hiring pipelines.",
      technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS"],
      features: [
        "Built a two-sided recruitment platform enabling students to discover opportunities, bookmark jobs, apply online, and monitor application status while recruiters manage hiring pipelines.",
        "Implemented recruiter dashboards with real-time statistics, application tracking, optimistic UI updates, and role-based authorization.",
        "Designed and developed a FastAPI backend with PostgreSQL, implementing secure PBKDF2-SHA256 password hashing, JWT authentication, and role-based access control.",
        "Developed the frontend using Next.js and TypeScript, resolved API routing inconsistencies, and maintained a modular and production-ready codebase following ESLint best practices."
      ],
      github: "https://github.com/vacmar/Elevatr",
      demo: "",
      status: "Completed",
      type: "Solo Project"
    },
    {
      id: 4,
      name: "MindSync+",
      description: "AI-Assisted Mental Wellness Platform (MSME 5.0 Funded) designed to connect users with peer supporters and provide an intelligent conversational fallback.",
      technologies: ["Next.js", "FastAPI", "PostgreSQL", "LLMs", "LangChain"],
      features: [
        "Conceptualizing an AI-assisted mental wellness platform that aims to connect users with peer supporters while providing an intelligent conversational fallback when volunteers are unavailable.",
        "Designing the backend architecture using FastAPI and PostgreSQL to support secure authentication, conversation workflows, and scalable request handling.",
        "Exploring LLM-assisted conversational support with moderation and escalation mechanisms to deliver context-aware and empathetic interactions.",
        "Selected under the MSME 5.0 Government Funding Scheme for its innovative approach to AI-assisted mental health support."
      ],
      github: "",
      demo: "",
      status: "In Progress (MSME 5.0 Funded)",
      type: "Solo Project"
    },
    {
      id: 5,
      name: "Arya Productions",
      description: "Multi-section responsive company website for an industrial storage solutions firm.",
      technologies: ["HTML", "CSS", "JavaScript"],
      features: [
        "Multi-section site covering About, Services, Products, and Contact pages.",
        "Google Maps integration and persistent corporate maroon/white brand theme.",
        "Optimized layout for both desktop and mobile viewports with accessibility updates."
      ],
      github: "https://github.com/vacmar/aryaproductions.github.io",
      demo: "https://vacmar.github.io/aryaproductions.github.io/",
      status: "Completed",
      type: "Client Project"
    }
  ],

  achievements: [
    "Selected for the MSME 5.0 Government Funding Scheme for the project MindSync+ (2026)",
    "1st Place – QR Debugging Event (Namma VEC 2026)",
    "2nd Place – App Development (Namma VEC 2025)",
    "Participant – Cognizant Technoverse Hackathon 2026",
    "Participant – VISA 24 Hours AI Hackathon (IITM, 2025)"
  ],

  interests: [
    "Traveling",
    "Badminton",
    "Technology Exploration"
  ]
};

export default resumeData;
