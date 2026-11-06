export interface Project {
  id: number;
  name: string;
  cat: string[];
  kind: string;
  description: string;
  shortDescription?: string;
  technologies: string[];
  github: string;
  demo: string;
  features: string[];
  status: string;
  type: string;
  isGovFunded?: boolean;
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
  note?: string;
  color?: string;
}

export interface TrailStop {
  tag: string;
  title: string;
  text: string;
  icon?: string;
  doodle?: string;
}

export interface CodePuzzle {
  q: string;
  lines: string[];
  bug: number;
  hint: string;
  why: string;
}

export const resumeData = {
  personalInfo: {
    name: "Vaaheesan S",
    title: "Software Engineer • Python • FastAPI • Payments & APIs • React",
    email: "vaahee21@gmail.com",
    phone: "+91-9499941994",
    location: "Chennai, Tamil Nadu, India",
    linkedin: "https://linkedin.com/in/vaaheesan-s",
    github: "https://github.com/vacmar",
    leetcode: "https://leetcode.com/u/VAAHEESAN",
    hackerrank: "https://www.hackerrank.com/profile/vaahee21",
    skillrack: "https://www.skillrack.com/profile/VAAHEESAN",
    portfolio: "https://vaaheesan.vercel.app"
  },

  summary: `Software Engineer with hands-on experience designing high-concurrency RESTful APIs, schema-driven microservices, multi-agent AI pipelines, and payment gateway architectures. Experienced in building multi-tenant SaaS platforms on AWS ECS Fargate, deterministic safety guards with LangGraph, and optimizing queries.`,

  skills: {
    languages: ["Python", "Java", "SQL", "JavaScript", "TypeScript"],
    backend: ["FastAPI", "Node.js", "Express.js", "REST APIs", "SQLAlchemy", "Alembic"],
    frontend: ["Next.js", "React.js", "Tailwind CSS"],
    databases: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    aiml: ["LangGraph", "LLMs", "pgvector", "TF-IDF", "Logistic Regression"],
    devops: ["AWS", "Docker", "Terraform", "CI/CD", "Git", "GitHub"]
  },

  competitiveProgramming: [
    {
      platform: "HackerRank",
      details: "Earned 5-Star Gold Badge in Python (5-Star Gold), solving algorithmic and data structure challenges.",
      badge: "5-Star Python",
      link: "https://www.hackerrank.com/profile/vaahee21"
    },
    {
      platform: "LeetCode",
      details: "Solved 131+ coding problems with Contest Rating of 1655 (Top 17.5% globally).",
      badge: "Top 17.5%",
      link: "https://leetcode.com/u/VAAHEESAN"
    },
    {
      platform: "SkillRack",
      details: "Solved 308+ programming challenges across algorithms, data structures, and SQL.",
      badge: "308+ Solved",
      link: "https://www.skillrack.com/profile/VAAHEESAN"
    }
  ],

  stackGroups: [
    {
      title: "Languages & Core",
      items: ["Python", "Java", "SQL", "TypeScript", "JavaScript"]
    },
    {
      title: "Backend & Systems",
      items: ["FastAPI", "SQLAlchemy", "Alembic", "Node.js", "Express.js", "REST APIs", "asyncio"]
    },
    {
      title: "Frontend & UI",
      items: ["Next.js", "React.js", "Tailwind CSS", "HTML5/CSS3"]
    },
    {
      title: "Databases & Storage",
      items: ["PostgreSQL", "pgvector", "Redis", "MySQL", "MongoDB"]
    },
    {
      title: "AI, ML & NLP",
      items: ["LangGraph", "LLMs", "OpenAI / Gemini", "TF-IDF", "Logistic Regression"]
    },
    {
      title: "Cloud & DevOps",
      items: ["AWS (ECS Fargate)", "Terraform", "Docker", "CI/CD", "Git & GitHub"]
    }
  ],

  experience: [
    {
      id: 1,
      position: "Backend Lead Intern",
      company: "Hexaware Technologies",
      location: "Chennai, India",
      startDate: "Feb 2026",
      endDate: "Aug 2026",
      description: "Designed and implemented RESTful APIs and schema-driven backend services using Python and FastAPI for applications supporting 3,000 concurrent users; led a 3-member backend sub-team within a 12-member engineering team.",
      achievements: [
        "Architected RESTful APIs and schema-driven services with Python & FastAPI for 3,000 concurrent users.",
        "Developed asynchronous evaluation pipelines using Redis queues and asyncio, integrated Alembic for version-controlled database migrations, and enforced code quality with Ruff.",
        "Contributed to deployment validation, CI/CD workflows, production monitoring, and backend optimization, reducing application performance overhead by ~3%."
      ],
      technologies: ["Python", "FastAPI", "Redis", "Alembic", "Ruff", "asyncio", "CI/CD", "PostgreSQL"],
      note: "Sub-team lead: APIs for 3,000 concurrent users",
      color: "pastel-blue"
    },
    {
      id: 2,
      position: "Full-Stack Developer Intern",
      company: "GameChanger4u",
      location: "Chennai, India",
      startDate: "May 2026",
      endDate: "Aug 2026",
      description: "Integrated Razorpay payment gateway for turf slot bookings end-to-end, implementing order creation, custom React checkout, and server-side HMAC-SHA256 signature verification.",
      achievements: [
        "End-to-end Razorpay integration with HMAC-SHA256 signature verification preventing payment tampering.",
        "Developed FastAPI microservices with SQLAlchemy & Alembic, implementing JWT authentication and tenant header validation across multi-tenant SaaS on AWS ECS Fargate.",
        "Built frontend features for Academy modules using Next.js 14 (App Router), TypeScript, and Tailwind CSS."
      ],
      technologies: ["FastAPI", "SQLAlchemy", "Razorpay", "Next.js 14", "AWS ECS Fargate", "Tailwind CSS", "Redis"],
      note: "Razorpay payment security & AWS ECS Fargate multi-tenant SaaS",
      color: "pastel-pink"
    },
    {
      id: 3,
      position: "Web Developer Intern",
      company: "Infotak Solutions",
      location: "Chennai, India",
      startDate: "Aug 2025",
      endDate: "Jan 2026",
      description: "Developed and deployed 8+ full-stack applications, identifying database performance bottlenecks, restructuring SQL indexing, and cutting query response latency.",
      achievements: [
        "Analyzed SQL execution plans and indexed tables on an e-commerce platform, boosting query speed.",
        "Implemented lazy loading and responsive WCAG-compliant interfaces."
      ],
      technologies: ["React", "Node.js", "Express.js", "MongoDB", "MySQL", "TypeScript"],
      note: "Proactive database query optimization & latency reduction",
      color: "pastel-yellow"
    },
    {
      id: 4,
      position: "Software Development Intern",
      company: "J7 Technology Solutions",
      location: "Chennai, India",
      startDate: "Aug 2025",
      endDate: "Sept 2025",
      description: "Developed student, teacher, and parent-facing modules for a cloud-based School CRM platform using Next.js, Node.js, Express.js, MongoDB, and AWS.",
      achievements: [
        "Collaborated in a 5-member team to build scalable role-based API modules across 7 distinct user personas."
      ],
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS"],
      note: "Multi-persona role access for 7 distinct school roles",
      color: "pastel-mint"
    }
  ],

  education: [
    {
      id: 1,
      degree: "B.E. Computer Science and Engineering",
      school: "Velammal Engineering College",
      location: "Chennai, India",
      graduationDate: "2023 – 2027",
      gpa: "CGPA: 8.37",
      scores: "Class XII & Class X: Velammal Vidhyashram, Surapet",
      relevantCourses: [
        "NPTEL – Programming in Modern C++",
        "NPTEL – Programming in Java",
        "NPTEL – Deep Learning",
        "NPTEL – Natural Language Processing",
        "NPTEL – Introduction to Internet of Things",
        "Data Structures & SQL Certifications (SkillRack)"
      ]
    }
  ],

  journeyStops: [
    {
      tag: "velammal",
      title: "B.E. CSE at Velammal Engineering College",
      text: "Maintaining an 8.37 CGPA while diving deep into systems programming, competitive code, and algorithms.",
      icon: "graduation-cap"
    },
    {
      tag: "competitive",
      title: "5-Star Python on HackerRank & LeetCode 1655",
      text: "Earned 5-Star Gold Badge in Python on HackerRank, solved 131+ problems on LeetCode (Rating 1655, Top 17.5%), and 308+ challenges on SkillRack.",
      icon: "star"
    },
    {
      tag: "hexaware",
      title: "Backend Lead at Hexaware",
      text: "Led a 3-member backend sub-team building FastAPI microservices supporting 3,000 concurrent users with Redis and asyncio.",
      icon: "zap"
    },
    {
      tag: "gamechanger",
      title: "Payment Architecture at GameChanger4u",
      text: "Engineered Razorpay payment flow with HMAC-SHA256 signature checks and multi-tenant AWS ECS Fargate microservices.",
      icon: "credit-card"
    },
    {
      tag: "agents",
      title: "Deterministic AI Safety (RecoverAI & Telu)",
      text: "Created multi-agent LangGraph workflows with deterministic ActionGuard rules and hybrid TF-IDF + Llama-3.1-8B triage.",
      icon: "shield"
    },
    {
      tag: "msme",
      title: "MSME 5.0 Government Funding",
      text: "Selected under the MSME 5.0 Government Funding Scheme for MindSync+, validating AI mental wellness engineering.",
      icon: "award"
    }
  ] as TrailStop[],

  projects: [
    {
      id: 1,
      name: "Telu Telecom Triage",
      cat: ["ai", "fullstack"],
      kind: "ai-powered telecom complaint intelligence",
      description: "Developed a hybrid ML/LLM complaint triage pipeline using TF-IDF + Logistic Regression with confidence-based routing to HuggingFace Llama-3.1-8B for complex complaints. Implemented technical feature extraction, normalization, and complexity scoring across six telecom dimensions with pgvector and Redis.",
      shortDescription: "Hybrid ML & Llama-3.1 telecom complaint classification & routing.",
      technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Llama-3.1"],
      github: "https://github.com/telecom-complaint-intelligence/",
      demo: "",
      features: [
        "Confidence-based routing: TF-IDF + Logistic Regression triage escalating to Llama-3.1-8B.",
        "6-dimension feature extraction with vector similarity search over historical cases via pgvector.",
        "JWT/OTP authentication, Redis caching, and full Docker orchestration."
      ],
      status: "Production Ready",
      type: "AI & Machine Learning"
    },
    {
      id: 2,
      name: "Manthaino",
      cat: ["ai", "backend", "fullstack"],
      kind: "adaptive ai learning & devjam platform",
      description: "Built an adaptive AI learning platform on Exasol Personal for the Exasol Devjam. Generates dependency-aware career learning paths via LangGraph orchestrators and Hugging Face Inference, with a live interactive tutor delivering node-by-node focus lessons. Engineered FastAPI backend state machines strictly governing node unlocks and mastery verification, with Redis session caching and Python practice code execution.",
      shortDescription: "Adaptive AI learning platform with dependency-aware career paths and Exasol Personal state management.",
      technologies: ["Next.js 14", "FastAPI", "LangGraph", "Exasol", "Redis", "Docker", "Python"],
      github: "https://github.com/vacmar/mathaino",
      demo: "https://drive.google.com/drive/folders/1gJi4xPHb1ambAe_zFNwnwIV2xQTDvYt1?usp=sharing",
      features: [
        "Dependency-aware career path generation & dynamic replanning via LangGraph & Hugging Face.",
        "FastAPI backend strictly owns progression, node unlocks, and mastery gates (LLM cannot hallucinate unlocks).",
        "Interactive workspace with Python code execution, Redis caching, and Exasol Personal analytics."
      ],
      status: "Devjam Finalist",
      type: "Adaptive AI & Education"
    },
    {
      id: 3,
      name: "RecoverAI",
      cat: ["ai", "fullstack"],
      kind: "agentic payment recovery & safety",
      description: "Built a multi-agent payment recovery system using LangGraph, coordinating Transaction Analyst, Customer Risk, and Strategy Selector agents. Engineered a deterministic ActionGuard validating AI actions against merchant limits, retry thresholds, and risk constraints, with Redis workers, PostgreSQL persistence, exponential backoff, authorization tokens, human escalation, and idempotency.",
      shortDescription: "Payment recovery by AI agents, checked by a deterministic ActionGuard layer.",
      technologies: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "LangGraph", "OpenAI/Gemini"],
      github: "",
      demo: "",
      features: [
        "Multi-agent LangGraph coordination: Analyst, Risk, and Strategy Selector.",
        "Deterministic ActionGuard prevents runaway retries and enforces merchant financial limits.",
        "Redis workers with exponential backoff, PostgreSQL audit logs, and human-in-the-loop escalation."
      ],
      status: "Production Ready",
      type: "AI & Payment Systems"
    },
    {
      id: 4,
      name: "Spendly",
      cat: ["fullstack"],
      kind: "smart expense tracker",
      description: "Personal expense management platform supporting category-based budgeting, analytics dashboards, and spending insights. Integrated JWT authentication, Google OAuth, and secure password reset.",
      shortDescription: "Expense tracker with Google OAuth, JWT security, and interactive budgeting.",
      technologies: ["React 18", "Node.js", "Express.js", "MongoDB", "Vite", "Tailwind CSS"],
      github: "https://github.com/vacmar/Spendly",
      demo: "",
      features: [
        "Google OAuth + JWT authentication with secure password resets.",
        "Helmet security middleware, rate limiting, and defensive REST design.",
        "Context API state management for rapid optimistic calculations."
      ],
      status: "Completed",
      type: "Solo Project"
    },
    {
      id: 5,
      name: "School CRM Platform",
      cat: ["backend", "fullstack"],
      kind: "7-role educational management",
      description: "Cloud-based school management platform supporting seven user roles (students, teachers, parents, HR, principal, staff, finance). Engineered scalable backend APIs with Node.js, Express.js, MongoDB, and AWS.",
      shortDescription: "School CRM with 7 distinct role permission matrices and AWS deployment.",
      technologies: ["Next.js", "Node.js", "Express.js", "MongoDB", "AWS"],
      github: "",
      demo: "",
      features: [
        "Granular access control across 7 user types.",
        "Attendance tracking, academic gradebook, and automated administrative workflows.",
        "High-availability MongoDB database architecture on AWS."
      ],
      status: "Production Ready",
      type: "Backend Systems"
    },
    {
      id: 6,
      name: "MindSync+",
      cat: ["ai"],
      kind: "msme 5.0 funded ai platform",
      description: "Selected in 2026 for the prestigious MSME 5.0 Government Funding Scheme. AI-assisted mental wellness platform designed with dual-layer assistance: peer supporter matching with intelligent conversational fallbacks and strict safety guardrails. Currently under active development under government grant milestone delivery.",
      shortDescription: "MSME 5.0 Government-funded AI mental wellness platform under active development.",
      technologies: ["Next.js", "FastAPI", "PostgreSQL", "LangChain", "LLMs"],
      github: "",
      demo: "",
      features: [
        "Selected & won under MSME 5.0 Government Funding Scheme for AI mental wellness.",
        "Dual-layer support: peer-matching plus intelligent conversational fallback.",
        "Strict moderation and safety escalation protocols for crisis intervention.",
        "Under active development adhering to official milestone deliverables."
      ],
      status: "Govt Won & Funded (Under Development)",
      type: "Govt Funded & Won",
      isGovFunded: true
    }
  ] as Project[],

  puzzles: [
    {
      q: "This Python function should add up every price in the list. It returns the wrong number.",
      lines: [
        "def total_price(items):",
        "    total = 0",
        "    for item in items:",
        "        total = item[\"price\"]",
        "    return total"
      ],
      bug: 3,
      hint: "Look closely at what happens to 'total' on each iteration through the loop.",
      why: "total = ... replaces the sum on every loop pass, so it only returns the last item's price. It should be total += item[\"price\"]."
    },
    {
      q: "This JavaScript loop should print each id once. It prints an extra undefined value.",
      lines: [
        "const ids = [10, 20, 30];",
        "for (let i = 0; i <= ids.length; i++) {",
        "  console.log(ids[i]);",
        "}"
      ],
      bug: 1,
      hint: "In a 3-item zero-indexed array, the valid indexes are 0, 1, and 2.",
      why: "<= evaluates to i = 3 on the final step, printing undefined because ids[3] doesn't exist. It should be i < ids.length."
    },
    {
      q: "This SQL query should list customers who made more than five orders. The database throws a syntax error.",
      lines: [
        "SELECT name, COUNT(*)",
        "FROM orders",
        "WHERE COUNT(*) > 5",
        "GROUP BY name;"
      ],
      bug: 2,
      hint: "WHERE filters rows before aggregation. Group aggregates need another clause.",
      why: "Aggregate functions like COUNT(*) cannot be in the WHERE clause. Filter grouped aggregations using HAVING COUNT(*) > 5 after GROUP BY."
    },
    {
      q: "This Python function checks if an API key is allowed. It throws an unhandled error when key is missing.",
      lines: [
        "def authenticate(headers):",
        "    api_key = headers.get(\"X-Api-Key\")",
        "    if api_key.startswith(\"sec_\"):",
        "        return True",
        "    return False"
      ],
      bug: 2,
      hint: "What does headers.get() return when the key header is omitted completely?",
      why: "headers.get() returns None when the key doesn't exist, causing an AttributeError: 'NoneType' object has no attribute 'startswith'. It should be 'if api_key and api_key.startswith(\"sec_\")'."
    },
    {
      q: "This async FastAPI route should fetch user data concurrently, but runs in sequential lockstep.",
      lines: [
        "@app.get(\"/user/{uid}\")",
        "async def get_user_dashboard(uid: str):",
        "    profile = await fetch_profile(uid)",
        "    metrics = await fetch_metrics(uid)",
        "    return {\"profile\": profile, \"metrics\": metrics}"
      ],
      bug: 3,
      hint: "Awaiting two independent I/O futures sequentially wastes concurrency latency.",
      why: "Awaiting line 3 then line 4 runs them one after another. Use asyncio.gather(fetch_profile(uid), fetch_metrics(uid)) to execute both network queries concurrently."
    },
    {
      q: "This Redis caching helper sets a 60-second TTL, but the cached value vanishes immediately.",
      lines: [
        "async def cache_result(redis, key, data):",
        "    serialized = json.dumps(data)",
        "    await redis.set(key, serialized)",
        "    await redis.expire(key, 0)",
        "    return True"
      ],
      bug: 3,
      hint: "What does setting an expiry TTL of 0 seconds actually do to a Redis key?",
      why: "redis.expire(key, 0) immediately evicts and deletes the key upon execution! It should set a valid positive duration like redis.expire(key, 60)."
    }
  ] as CodePuzzle[],

  achievements: [
    "Selected for the MSME 5.0 Government Funding Scheme for MindSync+ (2026)",
    "HackerRank 5-Star Gold Badge in Python (5-Star Gold)",
    "LeetCode Contest Rating: 1655 (Top 17.5% globally, 131+ solved)",
    "Solved 308+ programming challenges on SkillRack",
    "1st Place – QR Debugging Event (Namma VEC 2026)",
    "2nd Place – App Development (Namma VEC 2025)"
  ]
};

export default resumeData;
