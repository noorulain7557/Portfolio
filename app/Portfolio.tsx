"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowDown, ArrowUpRight, Braces, Code2, Mail, Menu, Orbit,
  Radar, ScanLine, ShieldCheck, Sparkles, TerminalSquare, X,
} from "lucide-react";
import {
  SiAndroid, SiCss, SiGit, SiGithub, SiHtml5, SiJavascript, SiKalilinux,
  SiNestjs, SiPostgresql, SiPostman, SiPython, SiReact, SiTypeorm,
  SiTypescript, SiVite,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { experience, profile, projects, skillGroups, type Project } from "./content";

const GalaxyScene = dynamic(() => import("./GalaxyScene"), { ssr: false });

const iconMap: Record<string, IconType | typeof Code2> = {
  JavaScript: SiJavascript, TypeScript: SiTypescript, HTML: SiHtml5, CSS: SiCss,
  React: SiReact, NestJS: SiNestjs, TypeORM: SiTypeorm, PostgreSQL: SiPostgresql,
  "REST APIs": Braces, Postman: SiPostman, "Kali Linux": SiKalilinux,
  Nmap: Radar, Nikto: ShieldCheck, Nuclei: ScanLine, Photon: Sparkles,
  Android: SiAndroid, Java: Code2, Python: SiPython, Git: SiGit,
  GitHub: SiGithub, "VS Code": TerminalSquare,
};

const navItems = [
  ["home", "Launch"], ["skills", "Orbit"], ["experience", "Trajectory"],
  ["projects", "Worlds"], ["contact", "Signal"],
] as const;

function supportsWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch { return false; }
}

function ProjectDialog({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const previous = document.activeElement as HTMLElement | null;
    const node = dialogRef.current;
    node?.focus();
    document.body.classList.add("dialog-open");
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !node) return;
      const focusable = Array.from(node.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.classList.remove("dialog-open");
      window.removeEventListener("keydown", handleKey);
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
          <motion.div ref={dialogRef} className="project-dialog" role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" tabIndex={-1} initial={{ opacity: 0, y: 34, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ type: "spring", stiffness: 260, damping: 27 }}>
            <button className="dialog-close" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
            <div className="dialog-index">PROJECT / {project.index}</div>
            {project.concept && <div className="concept-badge">Concept reconstruction</div>}
            <p className="eyebrow" style={{ color: project.color }}>{project.kicker}</p>
            <h2 id="project-dialog-title">{project.name}</h2>
            <p className="dialog-lead">{project.description}</p>
            <div className="dialog-grid">
              <div><h3>Contribution map</h3><ul>{project.contributions.map((item) => <li key={item}>{item}</li>)}</ul></div>
              <div className="dialog-insights">
                <div><span>Core challenge</span><p>{project.challenge}</p></div>
                <div><span>Key learning</span><p>{project.learning}</p></div>
              </div>
            </div>
            <div className="stack-row" aria-label="Technology stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Portfolio() {
  const reducedMotion = Boolean(useReducedMotion());
  const [webgl, setWebgl] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setWebgl(supportsWebGL()));
    return () => window.cancelAnimationFrame(frame);
  }, []);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, window.scrollY / total) : 0);
    };
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id)),
      { rootMargin: "-40% 0px -48%" },
    );
    navItems.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const closeProject = useCallback(() => {
    if (window.history.state?.project) window.history.back();
    else setProject(null);
  }, []);
  useEffect(() => { const onPop = () => setProject(null); window.addEventListener("popstate", onPop); return () => window.removeEventListener("popstate", onPop); }, []);
  const openProject = (selected: Project) => { window.history.pushState({ project: selected.id }, ""); setProject(selected); };
  const navigate = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" }); setMenuOpen(false); };

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      {webgl && <GalaxyScene progress={progress} reducedMotion={reducedMotion} />}
      <div className="ambient-fallback" aria-hidden="true" />

      <header className="site-header">
        <button className="wordmark" onClick={() => navigate("home")} aria-label="Return to launch">
          <span className="wordmark-orbit"><Orbit size={17} /></span><span>NOOR<span className="wordmark-dot">.</span>DEV</span>
        </button>
        <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          {navItems.map(([id, label]) => <button key={id} className={active === id ? "is-active" : ""} onClick={() => navigate(id)}><span>{label}</span></button>)}
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen((value) => !value)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <div className="journey-rail" aria-hidden="true"><span>01</span><div><i style={{ transform: `scaleY(${progress})` }} /></div><span>05</span></div>

      <main id="main">
        <section id="home" className="hero section-shell">
          <motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="eyebrow"><span className="signal-dot" /> AVAILABLE FOR THE RIGHT ORBIT</p>
            <h1>Designing the web<br /><span>beyond the flat screen.</span></h1>
            <p className="hero-intro">I’m <strong>{profile.name}</strong>, a creative web developer shaping expressive interfaces and reliable backend systems—with curiosity extending into Android and cybersecurity.</p>
            <div className="hero-actions">
              <button className="primary-action" onClick={() => navigate("projects")}>Explore my work <ArrowDown size={17} /></button>
              <button className="text-action" onClick={() => navigate("skills")}>See my orbit <ArrowUpRight size={16} /></button>
            </div>
          </motion.div>
          <div className="hero-coordinates" aria-label="Location"><span>33.5651° N</span><span>73.0169° E</span><b>{profile.location}</b></div>
          <div className="scroll-cue" aria-hidden="true"><span>SCROLL TO NAVIGATE</span><i /></div>
        </section>

        <section id="skills" className="section-shell content-section">
          <div className="section-heading"><span className="section-number">02 / ORBIT</span><div><p className="eyebrow">CAPABILITY CONSTELLATION</p><h2>Built across layers.<br /><em>Curious beyond them.</em></h2></div></div>
          <div className="skills-grid">
            {skillGroups.map((group, groupIndex) => (
              <motion.article key={group.label} className="skill-cluster glass-panel" initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: groupIndex * 0.08 }}>
                <div className="cluster-header"><i style={{ background: group.color, boxShadow: `0 0 22px ${group.color}` }} /><span>0{groupIndex + 1}</span></div>
                <h3>{group.label}</h3><p>{group.note}</p>
                <div className="skill-list">{group.skills.map((skill) => { const Icon = iconMap[skill] ?? Code2; return <span key={skill}><Icon aria-hidden="true" />{skill}</span>; })}</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="section-shell content-section">
          <div className="section-heading"><span className="section-number">03 / TRAJECTORY</span><div><p className="eyebrow">EXPERIENCE LOG</p><h2>Learning by building.<br /><em>Growing by doing.</em></h2></div></div>
          <div className="trajectory">
            <div className="trajectory-line" aria-hidden="true" />
            {experience.map((item, index) => (
              <motion.article className="experience-card" key={item.company} initial={{ opacity: 0, x: index % 2 ? 40 : -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.35 }}>
                <div className="trajectory-node" style={{ borderColor: item.color, boxShadow: `0 0 28px ${item.color}55` }} />
                <div className="experience-meta"><span>{item.code}</span><span>{item.period}</span></div>
                <h3>{item.company}</h3><p className="experience-role">{item.role}</p><p className="experience-summary">{item.summary}</p>
                <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul><div className="experience-location">{item.location}</div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="projects" className="section-shell content-section projects-section">
          <div className="section-heading"><span className="section-number">04 / WORLDS</span><div><p className="eyebrow">SELECTED PROJECTS</p><h2>Three worlds.<br /><em>Three kinds of thinking.</em></h2></div></div>
          <div className="projects-grid">
            {projects.map((item, index) => (
              <motion.article className="project-card" key={item.id} style={{ "--project-color": item.color } as React.CSSProperties} initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.25 }} transition={{ delay: index * 0.1 }}>
                <button onClick={() => openProject(item)} aria-label={`Open ${item.name} case study`}>
                  <div className="planet-visual" aria-hidden="true"><i /><span>{item.index}</span></div>
                  <div className="project-topline"><span>{item.kicker}</span><ArrowUpRight size={18} /></div>
                  <h3>{item.name}</h3><p>{item.summary}</p>
                  <div className="mini-stack">{item.stack.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div>
                  {item.concept && <small>Clearly labeled concept reconstruction</small>}
                </button>
              </motion.article>
            ))}
          </div>
          <div className="built-panel"><div><SiReact /><SiTypescript /><SiVite /></div><p><span>THIS PORTFOLIO IS A PROJECT TOO</span>Designed and built with React, TypeScript, WebGL, and a deliberately accessible HTML layer.</p></div>
        </section>

        <section id="contact" className="section-shell contact-section">
          <div className="contact-orbit" aria-hidden="true"><i /><i /></div><p className="eyebrow">05 / OPEN CHANNEL</p>
          <h2>Have a role, project,<br />or ambitious idea?</h2><p>Let’s turn it into something clear, useful, and memorable.</p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`}><Mail size={20} /><span><small>EMAIL</small>{profile.email}</span><ArrowUpRight /></a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={20} /><span><small>LINKEDIN</small>Connect professionally</span><ArrowUpRight /></a>
          </div>
          <footer><span>© {new Date().getFullYear()} {profile.name}</span><span>Designed in Rawalpindi · Built for the web</span></footer>
        </section>
      </main>
      <ProjectDialog project={project} onClose={closeProject} />
    </>
  );
}
