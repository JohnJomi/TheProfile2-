/**
 * Profile content for the home page. Facts come from the previous site's data
 * files and résumé v3. Anything unknown is a visible [TODO], never a guess.
 */

export const site = {
  name: "John Jomi",
  url: "https://johnjomi.dev",
  title: "John Jomi, AI engineer and full-stack developer",
  description:
    "John Jomi is an AI engineer and full-stack developer in Bengaluru. Open to full-time, contract, and advisory work.",
  email: "johnjomi1234@gmail.com",
  github: "https://github.com/JohnJomi",
  linkedin: "https://www.linkedin.com/in/john-jomi-68218b316/",
  resume: "/resume/John_Jomi_Resume.pdf",
  location: "Bengaluru, India (IST), remote-friendly",
  availability: "Open to full-time, contract, and advisory work",
};

export const experience = [
  {
    dates: "Aug 2026 to present",
    role: "Independent security researcher",
    org: "Tycoon 2FA phishing detection",
    href: "/work/tycoon-2fa-detection",
    place: "Remote",
    text: "Designing a four-layer detector for Tycoon 2FA and adversary-in-the-middle phishing email. A copyright application for the detection methodology is filed and under review. A paper is in progress.",
  },
  {
    dates: "Apr to May 2026",
    role: "AI academic intern",
    org: "Prophaze Technologies",
    href: "https://www.prophaze.com/",
    place: "Trivandrum, on-site",
    text: "Researched small language models and hybrid reasoning models for on-device use. Benchmarked them on latency, memory, inference speed and deployment feasibility for edge devices, and wrote up the comparisons for the research team.",
  },
  {
    dates: "Dec 2025 to Mar 2026",
    role: "Full-stack developer intern",
    org: "Proddy AI",
    href: "https://proddyai.app/",
    place: "Bengaluru, remote",
    text: "Built features for a modular AI work-management platform in Next.js, connected the frontend to REST APIs, and fixed UI and backend performance issues. Worked through code review across multiple sprints.",
  },
  {
    dates: "Jan 2026 to Jan 2027",
    role: "Treasurer",
    org: "IEEE Student Branch, CHRIST University",
    href: "",
    place: "Bengaluru",
    text: "Managing the finances of a student branch of about 400 IEEE members: annual budgets, reimbursements, and funding for workshops and hackathons.",
  },
];

export const workingWith = [
  { label: "Languages", text: "Python, TypeScript, JavaScript, Java, C and SQL." },
  {
    label: "Web",
    text: "React and Next.js on the front. Node.js, Express, FastAPI, Prisma and REST APIs behind it.",
  },
  {
    label: "AI and ML",
    text: "PyTorch, TensorFlow, Hugging Face, LangChain, Amazon Bedrock, and prompt work with Gemini and Claude.",
  },
  {
    label: "Cloud and data",
    text: "AWS, Docker, GitHub Actions and Linux. PostgreSQL, MongoDB and vector search.",
  },
  { label: "Spoken", text: "English (fluent), Malayalam (native), Hindi (conversational)." },
];

export const record = {
  education: {
    degree: "B.Tech, Computer Science and Engineering, with honors in AI and ML",
    school: "CHRIST (Deemed to be University), Bengaluru",
    dates: "2024 to 2028",
    detail: "GPA 3.83 / 4.00",
  },
  scholarship: {
    title: "Merit Scholarship, top 5% of batch",
    by: "CHRIST University",
    dates: "2025 to 2027",
  },
  publication: {
    title: "Detection of Phishing Emails Generated using Tycoon 2FA Phishing Kits",
    status: "In progress, 2026",
  },
};

/** Longer detail for the experience page, keyed by `org` above. From the previous site. */
export const experienceDetail: Record<string, { kind: string; bullets: string[]; stack: string[] }> = {
  "Tycoon 2FA phishing detection": {
    kind: "Research",
    bullets: [
      "Specified a four-layer architecture: header and domain intelligence, URL and redirect-chain analysis, NLP and ML body analysis, and threat-intelligence correlation, fused into one risk verdict.",
      "Designed a signal contract where every detection carries readable evidence, not a bare number, so each layer can be ablated on its own.",
      "Scoped the prototype to read-only Gmail ingest, taking no action on mail, to keep the research within ethical and legal limits.",
      "Every documented claim must trace back to a measurement from the evaluation harness.",
    ],
    stack: ["Python", "asyncio", "FastAPI", "NLP", "Machine learning", "Gmail API"],
  },
  "Prophaze Technologies": {
    kind: "Internship",
    bullets: [
      "Researched small language models and hybrid reasoning models for real-world AI applications.",
      "Benchmarked on-device models on latency, memory, inference speed and deployment feasibility for edge devices.",
      "Compared generative AI architectures through literature review and technical evaluation, and documented the findings.",
      "Explored optimisation strategies for efficient inference on resource-constrained devices.",
    ],
    stack: ["Small language models", "Hybrid reasoning models", "Edge AI", "Python", "PyTorch"],
  },
  "Proddy AI": {
    kind: "Internship",
    bullets: [
      "Built and improved full-stack features in Next.js for a modular AI work-management platform.",
      "Built and integrated REST APIs between frontend and backend modules.",
      "Worked in Git-based review, bug-fix and feature cycles across multiple sprints.",
      "Found and fixed UI and backend performance issues.",
    ],
    stack: ["Next.js", "React", "TypeScript", "REST APIs", "Node.js", "Git"],
  },
  "IEEE Student Branch, CHRIST University": {
    kind: "Leadership",
    bullets: [],
    stack: [],
  },
};

/** The about page. Copy carried over from the previous site, tightened. */
export const about = {
  intro: [
    "I'm a Computer Science undergraduate at CHRIST University with an honors track in AI and ML. I like software where clean architecture, a model that actually works, and a good interface all meet.",
    "So far that has meant enterprise software, AI-powered apps, cloud infrastructure, phishing-detection research, and running the budget of a 400-member IEEE branch. I think technology should solve a real problem, not show off how complicated it is.",
  ],
  pillars: [
    { title: "AI engineering", text: "Building software around machine learning models and LLMs." },
    { title: "Full-stack development", text: "Web apps with modern frontends and backends that scale." },
    { title: "Cloud computing", text: "Shipping secure, production-ready systems on cloud infrastructure." },
  ],
  journey: [
    "Started computer science",
    "Found artificial intelligence",
    "Built full-stack applications",
    "Worked on enterprise projects",
    "Building AI-first products",
  ],
  focus: [
    { title: "AI-powered products", text: "Turning what a model can do into something people can rely on." },
    { title: "Backend systems that scale", text: "Structures that stay clean and maintainable in production." },
    { title: "Cloud-native architecture", text: "Infrastructure patterns that make delivery resilient." },
    { title: "Practical machine learning", text: "Techniques that solve real-world problems." },
  ],
  values: [
    { title: "Problem first", text: "Technology should solve problems." },
    { title: "Clean architecture", text: "Maintainable code over clever code." },
    { title: "Keep learning", text: "Always improving through research and experiments." },
    { title: "User experience", text: "Simple products last longer." },
  ],
  beyond: ["Artificial intelligence", "Cybersecurity", "Product design", "Cloud computing", "Research", "Photography"],
};

/** The skills page, in the order software gets built. From the previous site. */
export const skillStages = [
  { stage: "Foundation", title: "It starts with code", text: "The languages I solve problems and build algorithms in.", items: ["Python", "Java", "TypeScript", "JavaScript", "SQL", "C"] },
  { stage: "Interfaces", title: "Fast, clear interfaces", text: "Responsive frontends that are quick to use.", items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "HTML", "CSS"] },
  { stage: "Backends", title: "APIs that hold up", text: "Secure server code, REST APIs and authentication.", items: ["Node.js", "Express", "FastAPI", "REST APIs", "Prisma", "Auth"] },
  { stage: "Data", title: "Data that stays reliable", text: "Database design and data handling for real applications.", items: ["PostgreSQL", "MongoDB", "SQL", "Vector databases", "pgvector"] },
  { stage: "Intelligence", title: "Adding the AI", text: "Models, LLMs and agent workflows inside real products.", items: ["Claude", "Gemini", "LangChain", "Hugging Face", "PyTorch", "TensorFlow", "Amazon Bedrock"] },
  { stage: "Deployment", title: "Into production", text: "Cloud infrastructure, containers and CI.", items: ["AWS", "Azure", "Docker", "GitHub Actions", "Linux", "Nginx"] },
  { stage: "Workflow", title: "Every day", text: "The tools I design, build, debug and ship with.", items: ["Git", "GitHub", "VS Code", "Jupyter", "Claude Code", "Figma"] },
];
