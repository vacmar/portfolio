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
    title: "(Python • React.js • Node.js)",
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
    languages: ["Python", "JavaScript", "TypeScript", "Java", "SQL"],
    frontend: ["React.js", "Next.js", "Tailwind CSS", "Vite", "HTML5", "CSS3"],
    backend: ["Node.js", "Express.js", "FastAPI"],
    databases: ["MongoDB", "PostgreSQL", "MySQL"],
    aiml: ["LLMs", "LangSmith", "LangChain", "GenAI Applications"],
    devops: ["AWS", "Docker", "Git", "GitHub", "CI/CD"],
    tools: ["VS Code", "Postman", "Redis", "Alembic", "Ruff"]
  },
  
  experience: [
    {
      id: 1,
      position: "Backend Lead Intern",
      company: "Hexaware Technologies",
      location: "Chennai, India",
      startDate: "Feb 2026",
      endDate: "Present",
      description: "Led a 3-member backend sub-team within a 9-member backend organization, handling task distribution and integration workflows; additionally on-boarded and mentored 3 newly joined engineers as senior on the project.",
      achievements: [
        "Designed and implemented REST APIs, schema-driven architectures, and database workflows using Python and FastAPI to serve approximately 3,000 concurrent users under production load.",
        "Built asynchronous AI evaluation pipelines using Redis queues and asyncio for LLM-driven answer processing, with Alembic managing version-controlled schema migrations and Ruff enforcing code quality standards.",
        "Contributed to CI/CD pipelines, production monitoring, and deployment validation, achieving a 3% reduction in backend performance overhead."
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
      description: "Developed and deployed 8+ full-stack web applications including an e-commerce platform and an IoT-integrated software system, working across frontend, backend, and database layers.",
      achievements: [
        "Optimized database performance under high-traffic conditions through strategic indexing and query restructuring, reducing load on critical application endpoints.",
        "Improved frontend performance and accessibility by implementing lazy loading, WCAG compliance, and responsive UI patterns, resulting in measurable load time reductions across multiple projects."
      ],
      technologies: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Node.js", "Express.js", "MongoDB", "MySQL", "WCAG", "Lazy Loading"]
    },
    {
      id: 3,
      position: "Software Development Intern",
      company: "J7 Technology Solutions Pvt. Ltd",
      location: "Chennai, India",
      startDate: "Aug 2025",
      endDate: "Sept 2025",
      description: "Contributed to a school CRM project as part of a 5-member team, working on student, teacher, and parent-facing modules using Next.js, Node.js/Express, MongoDB, and AWS.",
      achievements: [
        "Owned and built the student, parent, and teacher-facing modules including attendance, communication, and academic tracking features.",
        "Collaborated with frontend and backend developers to integrate different CRM modules seamlessly."
      ],
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS", "JavaScript"]
    }
  ],
  
  education: [
    {
      id: 1,
      degree: "B.E Computer Science Engineering",
      school: "Velammal Engineering College",
      location: "Chennai, India",
      graduationDate: "2027",
      gpa: "8.42 CGPA",
      relevantCourses: [
        "Natural Language Processing (NPTEL)",
        "Deep Learning (NPTEL)",
        "Modern C++ (NPTEL)",
        "Programming in Java (NPTEL)",
        "Complete Python Course (Udemy)"
      ]
    }
  ],
  
  projects: [
    {
      id: 1,
      name: "School CRM Platform",
      description: "Full-Scale Digital School System that digitalized end-to-end school operations across 7 roles — students, parents, teachers, HR, principal, support staff, and payment workflows.",
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS"],
      features: [
        "Digitalized operations across student, parent, teacher, HR, principal, support staff, and payment roles.",
        "Owned student, parent, and teacher-facing modules with attendance, communication, and academic tracking.",
        "Deployed on AWS with MongoDB managing relational school data across operational modules."
      ],
      github: "",
      demo: "",
      status: "Completed (Private Codebase)",
      type: "Team Project"
    },
    {
      id: 2,
      name: "Spendly",
      description: "Personal Expense Tracker with CRUD operations, budget management, and interactive dashboard comparisons.",
      technologies: ["React 18", "Vite", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "Framer Motion"],
      features: [
        "Full-stack expense tracker with CRUD for expenses and per-category budget management.",
        "Dual authentication (JWT with bcrypt and Google OAuth) and Nodemailer password reset.",
        "API secured with Helmet, rate limiting, and JWT; supports paginated/filterable searches."
      ],
      github: "https://github.com/vacmar/Spendly",
      demo: "",
      status: "Completed",
      type: "Solo Project"
    },
    {
      id: 3,
      name: "Elevatr",
      description: "Job and Internship Portal with role-based dashboards connecting students and recruiters.",
      technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "Tailwind CSS"],
      features: [
        "Two-sided platform: students browse/bookmark roles, recruiters post/monitor pipelines.",
        "Role-based dashboards with real-time API data and summary metric cards.",
        "FastAPI backend with PBKDF2-SHA256 password hashing and optimized API paths."
      ],
      github: "https://github.com/vacmar/Elevatr",
      demo: "",
      status: "Completed",
      type: "Solo Project"
    },
    {
      id: 4,
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
    "Selected – MSME 5.0 Government Funding Scheme | MindSync+ (2026)",
    "1st Place – QR Debugging Event (Namma VEC 2026)",
    "2nd Place – App Development (Namma VEC 2025)",
    "Participant – Cognizant Technoverse Hackathon 2026",
    "Participant – VISA 24 Hours AI Hackathon (IITM, 2025)",
    "Participant – Web Designing Contest (Amrita, 2025)",
    "Participant – Python Event (SaiRam Engineering, 2024)"
  ],

  interests: [
    "Language Learning – Japanese & German (Duolingo – 6K+ XP)",
    "Tech Curiosity – Problem Solving, Coding Mini-Games",
    "Creativity – Drawing, UI Sketching, Personal Website Design",
    "Sports & Mindfulness – Badminton, Cricket, F1, Music"
  ]
};

export default resumeData;
