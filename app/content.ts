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
  badge?: string;
  links?: Array<{
    label: string;
    href: string;
  }>;
  art: string;
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
    art: "/project-farm.webp",
    color: "#30d5c8",
  },
  {
    id: "ecommerce-platform",
    index: "02",
    name: "E-commerce Platform",
    kicker: "React storefront · Live frontend",
    summary: "A multi-role shopping interface spanning discovery, checkout, account flows, and catalog administration.",
    description:
      "A substantial React e-commerce client connected to a separate REST API. It combines customer shopping flows with protected user and admin workspaces, while keeping authentication, cart, search, and catalog state coordinated across the application.",
    stack: ["React", "JavaScript", "React Router", "Axios", "Ant Design", "Braintree"],
    contributions: [
      "Built customer journeys for browsing, category and price filtering, search, product details, cart persistence, and checkout.",
      "Structured role-aware routing for user profiles and orders alongside admin catalog, category, inventory, and order management.",
      "Connected REST endpoints through Axios and integrated React Context, Ant Design controls, toast feedback, and Braintree's checkout UI.",
    ],
    challenge:
      "Keeping navigation, API-driven data, authentication state, and locally persisted cart behavior consistent across many screens and two user roles.",
    learning:
      "The repository demonstrates the frontend integration layer. The separate API is a dependency, so this project is presented as a React client rather than proof of the backend implementation itself.",
    badge: "Frontend repository reviewed",
    links: [
      { label: "Live demo", href: "https://noorulain7557.github.io/Ecommerce/" },
      { label: "GitHub repository", href: "https://github.com/noorulain7557/Ecommerce" },
    ],
    art: "/project-ecommerce.webp",
    color: "#8b7cff",
  },
  {
    id: "smart-helmet",
    index: "03",
    name: "Smart Helmet Simulator",
    kicker: "Python safety system · Working simulation",
    summary: "A modular rider-safety simulation that turns connection, time, and shock signals into coordinated responses.",
    description:
      "A runnable Python simulation for a smart helmet controller. It coordinates frequency-gated phone connectivity, scheduled night-vision lighting, shock-threshold monitoring, and an emergency dialer that records simulated location data.",
    stack: ["Python", "OOP", "Modular design", "Sensor simulation", "Bluetooth simulation"],
    contributions: [
      "Separated Bluetooth, night-vision, sensor, and dialer behavior into focused Python modules orchestrated by one controller.",
      "Modeled connection acceptance, timed lighting, randomized sensor readings, threshold-based crash detection, and an emergency response loop.",
      "Added configurable frequencies, activation time, shock sensitivity, emergency number handling, and a simple call log.",
    ],
    challenge:
      "Coordinating several stateful safety behaviors while keeping each simulated hardware responsibility isolated and testable.",
    learning:
      "This is software simulation, not deployed helmet hardware. A real safety product would still require physical sensors, calibration, false-positive testing, telephony permissions, and field validation.",
    badge: "Runnable Python simulation",
    links: [
      { label: "GitHub repository", href: "https://github.com/noorulain7557/Smart_Helmet" },
    ],
    art: "/project-helmet.webp",
    color: "#ffb45f",
  },
  {
    id: "diagonal-cipher",
    index: "04",
    name: "Diagonal Cipher",
    kicker: "Python algorithm · Security learning",
    summary: "A reversible substitution cipher built around alternating alphabet rows, key-based traversal, and wraparound logic.",
    description:
      "A compact Python command-line program that encrypts and decrypts text through a custom zigzag alphabet. The same numeric key drives forward and reverse traversal while spaces remain intact.",
    stack: ["Python", "Algorithms", "String processing", "CLI", "Input validation"],
    contributions: [
      "Implemented matching encrypt and decrypt functions using alternating row traversal and index wraparound.",
      "Handled case normalization, spaces, filler characters, repeated operations, and invalid numeric input.",
      "Documented the cipher layout, execution flow, requirements, and command-line usage.",
    ],
    challenge:
      "Maintaining exact symmetry between forward and reverse traversal while handling row changes and boundary wrapping.",
    learning:
      "This is an educational classical cipher, not secure modern cryptography. Its value is in algorithmic reasoning, reversible transformations, and careful edge-case handling.",
    badge: "Educational cipher — not production security",
    links: [
      { label: "GitHub repository", href: "https://github.com/noorulain7557/Diagonal-Cipher" },
    ],
    art: "/project-cipher.webp",
    color: "#ff7fd1",
  },
];
