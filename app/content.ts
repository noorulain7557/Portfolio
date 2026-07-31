export type Project = {
  id: string;
  index: string;
  name: string;
  kicker: string;
  summary: string;
  description: string;
  stack: string[];
  contributions: string[];
  challenge: string;
  learning: string;
  concept?: boolean;
  color: string;
};

export const profile = {
  name: "Noor-ul-Ain Khalid",
  role: "Creative Web Developer",
  email: "noorulain5075@gmail.com",
  linkedin: "https://www.linkedin.com/in/noor-khalid-a606aa354",
  location: "Rawalpindi, Pakistan",
};

export const skillGroups = [
  {
    label: "Web craft",
    note: "Interfaces that feel intentional, responsive, and clear.",
    color: "#8b7cff",
    skills: ["JavaScript", "TypeScript", "HTML", "CSS", "React"],
  },
  {
    label: "Backend systems",
    note: "Structured APIs, relational data, and reliable application logic.",
    color: "#30d5c8",
    skills: ["NestJS", "TypeORM", "PostgreSQL", "REST APIs", "Postman"],
  },
  {
    label: "Security lab",
    note: "Hands-on reconnaissance in controlled Linux environments.",
    color: "#ff7fd1",
    skills: ["Kali Linux", "Nmap", "Nikto", "Nuclei", "Photon"],
  },
  {
    label: "Wider orbit",
    note: "Mobile, tooling, and programming foundations.",
    color: "#ffb45f",
    skills: ["Android", "Java", "Python", "Git", "GitHub", "VS Code"],
  },
] as const;

export const experience = [
  {
    company: "Resecurity",
    role: "Cybersecurity Intern",
    period: "Oct 2025 — Mar 2026",
    location: "Islamabad, Pakistan",
    code: "SEC / 02",
    summary:
      "Explored the attack surface of authorized targets through reconnaissance and vulnerability scanning.",
    points: [
      "Used Nmap, Nikto, Nuclei, and Photon to enumerate services and surface potential weaknesses.",
      "Worked in Kali Linux, virtualized labs, and local server environments.",
      "Documented observations for follow-up analysis and remediation conversations.",
    ],
    color: "#ff7fd1",
  },
  {
    company: "Sybrid",
    role: "Backend Development Intern · Farm Management System",
    period: "Sep 2024 — Oct 2025",
    location: "Islamabad, Pakistan",
    code: "DEV / 01",
    summary:
      "Built interconnected backend modules for real farm operations—from planting records to storage, sales, and reporting.",
    points: [
      "Modeled relational workflows with TypeORM entities and PostgreSQL.",
      "Connected planting, farm location, storage, sales, and traceable report modules.",
      "Implemented auditing and soft deletion to preserve record history and data integrity.",
      "Tested endpoints and integration behavior with Postman.",
    ],
    color: "#30d5c8",
  },
] as const;

export const projects: Project[] = [
  {
    id: "farm-os",
    index: "01",
    name: "Farm Management System",
    kicker: "Backend ecosystem",
    summary: "A connected operational system where every crop record has a traceable journey.",
    description:
      "A modular backend for managing planting, orchards, locations, storage, sales, and reports as one consistent data system.",
    stack: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "Postman"],
    contributions: [
      "Designed and maintained relational entities across farm workflows.",
      "Connected planting records to storage and downstream sales activity.",
      "Added auditing, soft deletion, and traceable reporting behavior.",
    ],
    challenge:
      "Keeping data relationships reliable while records moved through several operational stages.",
    learning:
      "Strong backend design is less about isolated endpoints and more about protecting the meaning of data across a full workflow.",
    color: "#30d5c8",
  },
  {
    id: "paraplay",
    index: "02",
    name: "Paraplay",
    kicker: "Therapeutic game · Concept reconstruction",
    summary: "A calmer mobile play space designed around accessible, low-pressure interaction.",
    description:
      "A reconstructed case-study direction for Noor’s final-year therapeutic game: short guided activities, gentle feedback, and progress that never feels punitive.",
    stack: ["Unity", "C#", "Android", "Figma"],
    contributions: [
      "Mapped a low-friction activity loop for mobile play.",
      "Proposed accessible controls, calm feedback states, and session progression.",
      "Designed a component-led interface direction for future validation.",
    ],
    challenge:
      "Balancing engagement with a visual and interaction system that does not overwhelm the intended user.",
    learning:
      "Therapeutic experiences must be validated with domain experts and real users; visual polish alone is not evidence of efficacy.",
    concept: true,
    color: "#8b7cff",
  },
  {
    id: "smart-helmet",
    index: "03",
    name: "Smart Helmet",
    kicker: "Connected safety · Concept reconstruction",
    summary: "A Python-led safety concept that turns sensor signals into timely, readable alerts.",
    description:
      "A reconstructed product direction for the Smart Helmet project, focused on environmental awareness and a clear mobile companion experience.",
    stack: ["Python", "IoT sensors", "Signal processing", "Android concept"],
    contributions: [
      "Proposed a sensor-to-alert flow with explicit severity states.",
      "Designed a simple monitoring interface for rapid status checks.",
      "Defined failure and offline states for a more credible prototype path.",
    ],
    challenge:
      "Reducing noisy sensor readings into alerts that are useful without becoming distracting.",
    learning:
      "Connected products need graceful failure states and clear confidence indicators before they can earn user trust.",
    concept: true,
    color: "#ffb45f",
  },
];
