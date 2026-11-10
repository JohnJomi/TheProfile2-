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
