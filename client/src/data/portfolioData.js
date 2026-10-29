export const portfolioData = {
  profile: {
    name: "Vivek Kasaudhan",
    role: "Software Engineer & Full Stack Developer",
    tagline:
      "MCA student at NIT Jamshedpur passionate about building scalable web applications and reliable backend systems. Experienced with Next.js, Node.js, PostgreSQL, Kafka, and Docker, with a strong interest in microservices, system design, and problem-solving through DSA.",
    location: "NIT Jamshedpur, India",
    email: "viveknitjamshedpur@gmail.com",
    phone: "+91-9696158950",
    availability: "MCA at NIT Jamshedpur ('27) • Open for Software Engineering Roles & Internships",
    resumeUrl: "/assets/Vivek-Resume.pdf",
    socials: [
      { label: "LeetCode", url: "https://leetcode.com/u/kasaudhan_vivek/" },
      { label: "GitHub", url: "https://github.com/vivekkasaudhan" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/vivek-kasaudhan-707235207/?isSelfProfile=true" },
      { label: "YouTube", url: "https://www.youtube.com/@vivek_nitjsr_01/shorts" },
      { label: "Email", url: "mailto:viveknitjamshedpur@gmail.com" }
    ]
  },
  metrics: [
    { label: "MCA CGPA", value: "8.35/10" },
    { label: "NIMCET 2024", value: "AIR 458" },
    { label: "Problems Solved", value: "500+" },
    { label: "LeetCode Rating", value: "1692" }
  ],
  about: {
    title: "Software Engineer with a passion for Distributed Microservices, Full-Stack Architecture, and Algorithmic Problem Solving.",
    body:
      "I am a Master of Computer Applications (MCA) student at the National Institute of Technology, Jamshedpur, having secured All India Rank 458 in NIMCET 2024. My engineering focus lies in architecting resilient microservices and distributed applications using Next.js, TypeScript, Node.js, PostgreSQL, Apache Kafka, Docker, and Redis. I also specialize in building multimodal AI interfaces incorporating GROQ LLMs and Web Speech recognition. Driven by rigorous problem-solving with over 500+ algorithmic challenges solved, I prioritize building maintainable, high-throughput, and production-grade software.",
    strengths: [
      "Microservices architecture with dedicated Auth, User, Job, Utils, and Payment services.",
      "Asynchronous event-driven messaging and notifications using Apache Kafka.",
      "Multimodal AI integrations leveraging GROQ LLM API and Web Speech Recognition & Synthesis.",
      "Relational & NoSQL database architecture (PostgreSQL, MySQL, MongoDB, Redis caching).",
      "Robust Computer Science foundations with 500+ solved problems, NIMCET AIR 458, and LeetCode rating 1692."
    ]
  },
  skills: [
    {
      group: "Programming Languages",
      tag: "7 Languages",
      accent: "#38bdf8",
      glow: "rgba(56, 189, 248, 0.15)",
      items: ["C", "C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"]
    },
    {
      group: "Frontend Development",
      tag: "Modern Web",
      accent: "#2dd4bf",
      glow: "rgba(45, 212, 191, 0.15)",
      items: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Responsive Web Design"]
    },
    {
      group: "Backend & Microservices",
      tag: "Distributed Systems",
      accent: "#818cf8",
      glow: "rgba(129, 140, 248, 0.15)",
      items: ["Node.js", "Express.js", "RESTful APIs", "JWT Authentication", "Microservices Architecture"]
    },
    {
      group: "Databases & Caching",
      tag: "SQL & NoSQL",
      accent: "#f59e0b",
      glow: "rgba(245, 158, 11, 0.15)",
      items: ["PostgreSQL", "MySQL", "MongoDB", "Redis"]
    },
    {
      group: "Cloud & DevOps",
      tag: "Event Streaming",
      accent: "#06b6d4",
      glow: "rgba(6, 182, 212, 0.15)",
      items: ["Docker", "Apache Kafka", "Cloudinary", "Render"]
    },
    {
      group: "Core CS Subjects",
      tag: "CS Foundations",
      accent: "#ec4899",
      glow: "rgba(236, 72, 153, 0.15)",
      items: ["Data Structures & Algorithms", "OOP", "DBMS", "Computer Networks", "Operating Systems"]
    },
    {
      group: "Developer Tools",
      tag: "Workflow & Environment",
      accent: "#10b981",
      glow: "rgba(16, 185, 129, 0.15)",
      items: ["Git", "GitHub", "VS Code", "Postman", "Linux", "Docker CLI"]
    }
  ],
  projects: [
    {
      title: "Job Portal Website",
      category: "Distributed Microservices & AI Platform",
      description:
        "Decoupled microservices platform with Kafka event streaming, Docker containerization, and AI resume screening.",
      stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Kafka", "Docker", "Redis"],
      impact: "High-throughput microservices architecture with Kafka pub/sub and containerized deployment.",
      highlights: [
        "Architected independent Auth, User, Job, Payment, and Utils microservices with Docker.",
        "Asynchronous event streaming and email notification queues powered by Apache Kafka.",
        "AI-assisted resume screening with PostgreSQL dynamic multi-criteria query optimization."
      ],
      links: { live: "https://github.com/vivekkasaudhan/Job-Portal", code: "https://github.com/vivekkasaudhan/Job-Portal" }
    },
    {
      title: "Hotel Booking Web Application",
      category: "AI & Voice-Powered MERN Platform",
      description:
        "Full-stack booking engine with GROQ LLM natural language search ('best hotel under 2000 in Delhi') and voice synthesis.",
      stack: ["MERN Stack", "GROQ LLM", "Web Speech API", "JWT Auth", "REST APIs", "Render"],
      impact: "Hands-free voice booking with instant GROQ LLM query translation deployed live on Render.",
      highlights: [
        "Integrated GROQ API to parse natural voice queries into structured database filters.",
        "Hands-free voice search with Web Speech Recognition and real-time Speech Synthesis audio.",
        "Secure MERN architecture with JWT authentication, inventory management, and Render deployment."
      ],
      links: { live: "https://airbnb-frontend-per2.onrender.com/", code: "https://github.com/vivekkasaudhan/AIRBNB-project" }
    }
  ],
  experience: [
    {
      company: "SCSE (Society of Computer Science & Engineering)",
      role: "CA Team Member",
      period: "NIT Jamshedpur • 2024 - Present",
      details: [
        "Supported the organization and execution of technical events, coding contests, and workshops.",
        "Collaborated with peers to mentor junior students in competitive programming and development.",
        "Assisted in technical coordination and departmental community outreach."
      ]
    },
    {
      company: "NSS Society (National Service Scheme)",
      role: "Event Management Member",
      period: "NIT Jamshedpur • 2024 - Present",
      details: [
        "Assisted in planning and executing social outreach initiatives, awareness camps, and community events.",
        "Coordinated student logistics and public engagement to ensure impactful program delivery."
      ]
    },
    {
      company: "Sankalp",
      role: "Volunteer Tutor",
      period: "Community Education",
      details: [
        "Taught Mathematics to underprivileged students up to Class 12, focusing on core conceptual clarity.",
        "Fostered analytical thinking and problem-solving aptitude among young learners."
      ]
    }
  ],
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      school: "National Institute of Technology, Jamshedpur",
      period: "2024 – 2027",
      grade: "CGPA: 8.35 / 10",
      badges: ["CGPA: 8.35 / 10", "NIMCET AIR 458"],
      summary: "Pursuing MCA at NIT Jamshedpur. Coursework includes Advanced Data Structures, Algorithms, Distributed Systems, Cloud Architecture, and Database Systems."
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      school: "MLK PG College, Balrampur",
      period: "2020 – 2023",
      grade: "80.64%",
      badges: ["Score: 80.64%", "First Class Distinction"],
      summary: "Graduated with 80.64% distinction. Comprehensive foundations in Object-Oriented Programming, Database Management Systems, Computer Networks, and Web Technologies."
    }
  ],
  achievements: [
    "NIMCET 2024: Secured All India Rank 458.",
    "Competitive Coding: Solved 500+ problems across platforms.",
    "LeetCode: Achieved a maximum contest rating of 1692.",
    "HackerRank: 5-star rating in SQL, C++, and Problem Solving."
  ]
};
