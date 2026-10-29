import {
  ArrowUpRight,
  Award,
  Bot,
  Briefcase,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Copy,
  Cpu,
  Database,
  ExternalLink,
  FileText,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Mic,
  Moon,
  Phone,
  Rocket,
  Send,
  Server,
  Sparkles,
  Sun,
  Terminal,
  Volume2,
  Workflow,
  X,
  Youtube,
  Zap
} from "lucide-react";
import Lenis from "@studio-freight/lenis";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { portfolioData } from "./data/portfolioData.js";
import { useContactForm } from "./hooks/useContactForm.js";

const navItems = ["Home", "About", "Skills", "Projects", "Responsibility", "Contact"];
const heroRoles = [
  "Software Engineer",
  "Full Stack Developer",
  "Competitive Coder ",
  "Software Developer"
];

const skillIconMap = {
  "Programming Languages": Code2,
  "Frontend Development": Rocket,
  "Backend & Microservices": Server,
  "Databases & Caching": Database,
  "Cloud & DevOps": Layers,
  "Core CS Subjects": Cpu,
  "Developer Tools": Terminal
};

function StarBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    let rafId;
    const rafLoop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafLoop);
    };
    rafId = requestAnimationFrame(rafLoop);

    container.innerHTML = "";
    const COUNT = 120;
    const stars = [];
    const accentColors = ["#3b82f6", "#60a5fa", "#818cf8", "#f59e0b", "#c084fc"];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("span");
      el.className = "star";

      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const isStatic = Math.random() < 0.25;
      const speed = isStatic ? 0 : 0.2 + Math.random() * 0.65;
      const size = isStatic ? 1 + Math.random() * 0.8 : 1.2 + Math.random() * 2.2;

      const useAccent = !isStatic && Math.random() < 0.18;
      const color = useAccent ? accentColors[Math.floor(Math.random() * accentColors.length)] : "";

      el.style.cssText = [
        `left:${x}%`,
        `top:${y}%`,
        `width:${size}px`,
        `height:${size}px`,
        color ? `background:${color}` : "",
        `--dur:${2 + Math.random() * 4}s`,
        `animation-delay:${Math.random() * 5}s`
      ]
        .filter(Boolean)
        .join(";");

      container.appendChild(el);
      stars.push({ el, initialY: y, speed });
    }

    const onScroll = ({ scroll, velocity }) => {
      if (prefersReduced) return;
      const stretch = Math.max(1, Math.min(1 + Math.abs(velocity) * 0.18, 5));

      stars.forEach((star) => {
        if (star.speed === 0) {
          star.el.style.transform = "";
          return;
        }
        let pos = (star.initialY - scroll * star.speed * 0.05) % 100;
        if (pos < 0) pos += 100;
        star.el.style.top = pos + "%";
        star.el.style.transform = `scaleY(${stretch})`;
      });
    };

    lenis.on("scroll", onScroll);

    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = href === "#home" ? document.body : document.querySelector(href);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target);
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <div className="animated-bg" aria-hidden="true" />
      <div ref={containerRef} id="star-container" aria-hidden="true" />
    </>
  );
}

function MouseCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!hasFinePointer) return undefined;

    let animationFrame;

    const moveCursor = (event) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
    };

    const toggleHover = (event) => {
      const isInteractive = Boolean(
        event.target.closest("a, button, input, textarea, .project-card, .service-card, .skill-card, .hero-pill-link")
      );
      document.body.classList.toggle("cursor-hover", isInteractive);
    };

    const animateRing = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      }

      animationFrame = window.requestAnimationFrame(animateRing);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", toggleHover);
    window.addEventListener("mouseout", toggleHover);
    animationFrame = window.requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", toggleHover);
      window.removeEventListener("mouseout", toggleHover);
      window.cancelAnimationFrame(animationFrame);
      document.body.classList.remove("cursor-hover");
    };
  }, []);

  return (
    <div className="mouse-cursor" aria-hidden="true">
      <span className="cursor-ring" ref={ringRef} />
      <span className="cursor-dot" ref={dotRef} />
    </div>
  );
}

function ScrollReveal() {
  useEffect(() => {
    const revealTargets = [
      ".site-header",
      ".hero-copy > *",
      ".dev-visual-wrap",
      ".section",
      ".section-kicker",
      "h2",
      ".body-panel",
      ".skill-card",
      ".service-card",
      ".project-card",
      ".timeline-item",
      ".education-panel article",
      ".achievement-box",
      ".testimonial-card",
      ".contact-copy > *",
      ".contact-form"
    ].join(",");

    const elements = Array.from(document.querySelectorAll(revealTargets));

    elements.forEach((element, index) => {
      element.classList.add("reveal-ready");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}

function HeroVisual() {
  const [ripple, setRipple] = useState(false);

  const playRipple = () => {
    setRipple(false);
    window.requestAnimationFrame(() => {
      setRipple(true);
      window.setTimeout(() => setRipple(false), 700);
    });
  };

  return (
    <div className="dev-visual-wrap" onClick={playRipple} aria-label="Vivek Kasaudhan - Software Engineer">
      <div className="orbit-ring or1" />
      <div className="orbit-ring or2" />
      <div className="dev-glow-blob" />

      <div className="dev-photo-card hero-portrait-showcase">
        <div className="dev-photo-frame hero-portrait-frame">
          <img
            src="/assets/vivek-profile.jpg"
            alt="Vivek Kasaudhan - Software Engineer & Systems Architect"
            className="hero-portrait-img"
            draggable="false"
          />
          <div className="hero-portrait-glass-overlay" />
          <div className="hero-portrait-badge">
            {/* <span className="live-pulse-dot" /> */}
            {/* <span>Open for SDE Roles</span> */}
          </div>
          <div className="hero-portrait-caption">
            <span className="caption-name">Vivek Kasaudhan</span>
            <span className="caption-role">MCA Student, NIT Jamshedpur</span>
          </div>
        </div>

        <div className="dev-typing-indicator hero-status-strip">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="dev-typing-text">Looking for SDE Roles & Internship....</span>
        </div>
      </div>

      <div className="float-tag ft1">
        {/* <span className="tag-bracket">&lt;</span>Microservices<span className="tag-bracket">/&gt;</span> */}
      </div>
      {/* <div className="float-tag ft2">{"{ Apache Kafka }"}</div>
      <div className="float-tag ft3">Next.js & TypeScript</div>
      <div className="float-tag ft4">Docker & Redis</div>
      <div className="float-tag ft5">PostgreSQL & MongoDB</div>
      <div className="float-tag ft6">NIMCET AIR 458</div>

      <div className="skill-bubble sb1">Next.js</div>
      <div className="skill-bubble sb2">Kafka</div>
      <div className="skill-bubble sb3">Docker</div>
      <div className="skill-bubble sb4">LeetCode 1692</div>
      <div className={ripple ? "click-ripple-zone is-active" : "click-ripple-zone"} /> */}
    </div>
  );
}

function Header({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Go to home">
        <span className="brand-initials">VK</span>
        <span className="brand-text">
          Vivek <em>Kasaudhan</em>
        </span>
      </a>
      <nav className={open ? "nav nav-open" : "nav"} aria-label="Primary navigation">
        {navItems.map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>
            {item}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <button
          className="theme-toggle"
          type="button"
          onClick={onToggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          title={isDark ? "Light mode" : "Dark mode"}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}

function RotatingTypewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letterCount, setLetterCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const isComplete = letterCount === currentWord.length;
    const isEmpty = letterCount === 0;
    const delay = isComplete && !isDeleting ? 140 : isDeleting ? 38 : 70;

    const timer = window.setTimeout(() => {
      if (!isDeleting && isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && isEmpty) {
        setIsDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setLetterCount((current) => current + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isDeleting, letterCount, wordIndex, words]);

  return (
    <span className="typewriter" aria-live="polite">
      <span className="typewriter-text">{words[wordIndex].slice(0, letterCount)}</span>
      <span className="typewriter-cursor" aria-hidden="true">
        |
      </span>
    </span>
  );
}

function Hero() {
  const { profile } = portfolioData;
  const [firstName, ...restName] = profile.name.split(" ");
  const lastName = restName.join(" ");

  return (
    <section className="hero section" id="home">
      <div className="hero-copy">
        <div className="hero-badges-row">
          <span className="hero-status-pill">
            <span className="status-ping" />
            Open for SDE Roles & Internships
          </span>
        </div>

        <h1 className="home-title">
          <span className="title-line">Hello,</span>
          <span className="title-line">
            I'm <em>{firstName}</em>
          </span>
          {lastName && <span className="title-line title-last">{lastName}</span>}
        </h1>

        <div className="hero-typewriter-wrap">
          <RotatingTypewriter words={heroRoles} />
        </div>

        <p className="hero-text">{profile.tagline}</p>

        <div className="hero-actions">
          <a className="button primary" href="#projects">
            <span>Explore Projects</span>
            <ArrowUpRight size={18} />
          </a>
          <a className="button secondary" href="#contact">
            <span>Get in Touch</span>
            <Mail size={18} />
          </a>
          <a className="button tertiary" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <span>Resume</span>
            <FileText size={18} />
          </a>
        </div>

        <div className="hero-social-row">
          <a
            href="https://leetcode.com/u/kasaudhan_vivek/"
            target="_blank"
            rel="noreferrer"
            className="hero-pill-link"
            title="LeetCode (Contest Rating 1692, 500+ Solved)"
          >
            <Code2 size={16} />
            <span>
              LeetCode
            </span>
          </a>
          <a href="https://github.com/vivekkasaudhan" target="_blank" rel="noreferrer" className="hero-pill-link" title="GitHub">
            <Github size={16} />
            <span>GitHub</span>
          </a>
          <a href="https://www.linkedin.com/in/vivek-kasaudhan-707235207/?isSelfProfile=true" target="_blank" rel="noreferrer" className="hero-pill-link" title="LinkedIn">
            <Linkedin size={16} />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.youtube.com/@vivek_nitjsr_01/shorts"
            target="_blank"
            rel="noreferrer"
            className="hero-pill-link youtube-link"
            title="YouTube Shorts (@vivek_nitjsr_01)"
          >
            <Youtube size={16} />
            <span>YouTube</span>
          </a>
          <a href={`mailto:${profile.email}`} className="hero-pill-link" title="Send Email">
            <Mail size={16} />
            <span>Email</span>
          </a>
        </div>
      </div>
      <HeroVisual />
    </section>
  );
}

function About() {
  const { profile } = portfolioData;
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const bentoMetrics = [
    {
      value: "AIR 458",
      unit: "",
      label: "NIMCET 2024",
      sublabel: "National Rank",
      tag: "Top 2%",
      icon: Award,
      glow: "rgba(245, 158, 11, 0.2)",
      border: "rgba(245, 158, 11, 0.38)",
      accent: "#f59e0b"
    },
    {
      value: "1692",
      unit: "",
      label: "LeetCode Rating",
      sublabel: "Contest Peak",
      tag: "Competitive",
      icon: Zap,
      glow: "rgba(236, 72, 153, 0.2)",
      border: "rgba(236, 72, 153, 0.38)",
      accent: "#ec4899",
      link: "https://leetcode.com/u/kasaudhan_vivek/"
    },
    {
      value: "500+",
      unit: "",
      label: "DSA Solved",
      sublabel: "LeetCode & GfG",
      tag: "Algorithms",
      icon: Code2,
      glow: "rgba(129, 140, 248, 0.2)",
      border: "rgba(129, 140, 248, 0.38)",
      accent: "#818cf8",
      link: "https://leetcode.com/u/kasaudhan_vivek/"
    },
    {
      value: "5 ★",
      unit: "",
      label: "HackerRank Gold",
      sublabel: "SQL & Problem Solving",
      tag: "Verified",
      icon: Sparkles,
      glow: "rgba(16, 185, 129, 0.2)",
      border: "rgba(16, 185, 129, 0.38)",
      accent: "#10b981"
    }
  ];

  return (
    <section className="section about-section" id="about">
      <div className="about-heading">
        <p className="section-kicker">✦ About the Developer</p>
        <h2>
          Engineering Scalable Systems with <span className="gradient-highlight">Algorithmic Rigor</span>
        </h2>
        <p className="about-subheadline">
          Master of Computer Applications student at NIT Jamshedpur • Full-Stack Engineer • Competitive Coder
        </p>
      </div>

      <div className="about-bento-grid">
        {/* Left Column: Profile Card + 4 Stat Tiles */}
        <div className="bento-col-left">
          {/* Profile Bento Card */}
          <div className="bento-profile-card">
            <div className="profile-badge-row">
              <span className="live-status-chip">
                <span className="status-dot-pulse" />
                Open for SDE Roles & Internships
              </span>
              <span className="location-chip">
                <MapPin size={13} />
                NIT Jamshedpur
              </span>
            </div>

            <div className="profile-main-info">
              <div className="profile-hologram-avatar">
                <div className="avatar-mesh-glow" />
                <img
                  src="/assets/vivek-profile.jpg"
                  alt="Vivek Kasaudhan"
                  className="avatar-photo-img"
                />
                <span className="avatar-sub-tag">MCA '27</span>
              </div>
              <div className="profile-titles">
                <h3 className="profile-name">Vivek Kasaudhan</h3>
                <p className="profile-role">Software Engineer & Systems Enthusiast</p>
                <div className="profile-tags">
                  <span>Microservices</span>
                  <span>Kafka</span>
                  <span>Docker</span>
                  <span>Next.js</span>
                </div>
              </div>
            </div>

            <div className="profile-card-footer">
              <a
                className="button primary bento-resume-btn"
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
              >
                <FileText size={16} />
                <span>Download Resume</span>
                <ExternalLink size={14} className="external-arrow" />
              </a>
            </div>
          </div>

          {/* 4 Metrics Tiles */}
          <div className="bento-metrics-grid">
            {bentoMetrics.map((metric) => {
              const Icon = metric.icon;
              const content = (
                <>
                  <div className="metric-tile-header">
                    <div className="metric-icon-circle">
                      <Icon size={17} />
                    </div>
                    <span className="metric-tag-chip">{metric.tag}</span>
                  </div>
                  <div className="metric-tile-body">
                    <div className="metric-num-wrap">
                      <span className="metric-num-val">{metric.value}</span>
                      {metric.unit && <span className="metric-num-unit">{metric.unit}</span>}
                    </div>
                    <span className="metric-tile-label">{metric.label}</span>
                    <span className="metric-tile-sublabel">{metric.sublabel}</span>
                  </div>
                </>
              );

              const tileStyle = {
                "--metric-accent": metric.accent,
                "--metric-glow": metric.glow,
                "--metric-border": metric.border
              };

              if (metric.link) {
                return (
                  <a
                    href={metric.link}
                    target="_blank"
                    rel="noreferrer"
                    className="bento-metric-tile is-clickable"
                    key={metric.label}
                    style={tileStyle}
                    title={`View ${metric.label} on LeetCode`}
                  >
                    {content}
                  </a>
                );
              }

              return (
                <div
                  className="bento-metric-tile"
                  key={metric.label}
                  style={tileStyle}
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Professional Focus & Academic Credentials */}
        <div className="bento-col-right">
          <div className="bento-narrative-card bento-education-card">
            {/* Suitable Topic: Professional Summary & Focus */}
            <div className="about-summary-panel">
              <div className="about-summary-header">
                <Sparkles size={18} className="summary-icon" />
                <h4>Engineering Focus & Systems Mindset</h4>
              </div>
              <p className="about-summary-text">
                MCA student at <strong>National Institute of Technology, Jamshedpur</strong>. 
                I bridge rigorous algorithmic problem-solving with hands-on systems architecture — 
                building decoupled <strong>microservices</strong>, event-driven streaming with 
                <strong>Apache Kafka</strong>, and high-performance <strong>Next.js & Node.js</strong> applications.
              </p>
              <div className="about-focus-pills">
                <span className="focus-pill"><Server size={14} /> Microservices & APIs</span>
                <span className="focus-pill"><Layers size={14} /> Kafka Event Streaming</span>
                <span className="focus-pill"><Database size={14} /> PostgreSQL & Redis</span>
                <span className="focus-pill"><Code2 size={14} /> 500+ Algorithmic Solves</span>
              </div>
            </div>

            {/* Academic Education */}
            <div className="about-edu-section">
              <div className="about-education-header-main">
                <div className="about-education-title-row">
                  <div className="edu-badge-icon main-icon">
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h3 className="about-edu-main-title">Academic Education</h3>
                    <p className="about-edu-main-subtitle">Formal computer science degrees & verified coursework</p>
                  </div>
                </div>
              </div>

              <div className="about-education-grid">
                {portfolioData.education.map((edu, idx) => (
                  <article
                    className={`about-edu-card ${idx === 0 ? "mca-card" : "bca-card"}`}
                    key={edu.degree}
                  >
                    <div className="about-edu-card-top">
                      <div className="edu-badge-icon">
                        <GraduationCap size={16} />
                      </div>
                      <span className="about-edu-period">{edu.period}</span>
                    </div>
                    <h4 className="about-edu-degree">{edu.degree}</h4>
                    <p className="about-edu-school">{edu.school}</p>
                    <div className="about-edu-highlights">
                      {idx === 0 ? (
                        <>
                          <span className="edu-grade-pill accent-teal">CGPA: 8.35 / 10</span>
                          <span className="edu-grade-pill accent-amber">Current Student</span>
                        </>
                      ) : (
                        <>
                          <span className="edu-grade-pill accent-indigo">Score: 80.64%</span>
                          <span className="edu-grade-pill accent-teal">First Class Distinction</span>
                        </>
                      )}
                    </div>
                    <p className="about-edu-summary">{edu.summary}</p>
                  </article>
                ))}
              </div>
            </div>

            {/* Interactive Quick-Connect Strip */}
            <div className="quick-connect-dock">
              <button
                type="button"
                className="dock-pill email-copy-pill"
                onClick={handleCopyEmail}
                title="Click to copy email address"
              >
                <Mail size={15} />
                <span>{profile.email}</span>
                <span className="copy-indicator">
                  {copied ? <Check size={14} className="copied-check" /> : <Copy size={13} />}
                </span>
              </button>

              <a
                href={`tel:${profile.phone}`}
                className="dock-pill phone-pill"
                title="Call Vivek"
              >
                <Phone size={15} />
                <span>{profile.phone}</span>
              </a>

              <a
                href="https://github.com/vivekkasaudhan"
                target="_blank"
                rel="noreferrer"
                className="dock-pill github-pill"
                title="View GitHub Repositories"
              >
                <Github size={15} />
                <span>GitHub</span>
              </a>

              <a
                href="https://www.linkedin.com/in/vivek-kasaudhan-707235207/?isSelfProfile=true"
                target="_blank"
                rel="noreferrer"
                className="dock-pill linkedin-pill"
                title="Connect on LinkedIn"
              >
                <Linkedin size={15} />
                <span>LinkedIn</span>
              </a>

              <a
                href="https://leetcode.com/u/kasaudhan_vivek/"
                target="_blank"
                rel="noreferrer"
                className="dock-pill leetcode-pill"
                title="LeetCode Profile (1692 Rating)"
              >
                <Code2 size={15} />
                <span>LeetCode</span>
              </a>

              <a
                href="https://www.youtube.com/@vivek_nitjsr_01/shorts"
                target="_blank"
                rel="noreferrer"
                className="dock-pill youtube-pill"
                title="YouTube Shorts (@vivek_nitjsr_01)"
              >
                <Youtube size={15} />
                <span>YouTube</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const mainSkills = portfolioData.skills.filter((g) => g.group !== "Developer Tools");
  const toolsGroup = portfolioData.skills.find((g) => g.group === "Developer Tools");

  return (
    <section className="section skills-section" id="skills">
      <div className="section-heading">
        <p className="section-kicker">✦ Technical Expertise</p>
        <h2>
          Modern languages, <span className="gradient-highlight">microservices</span>, and databases I engineer with.
        </h2>
      </div>

      <div className="skills-grid-v2">
        {mainSkills.map((skillGroup) => {
          const Icon = skillIconMap[skillGroup.group] || Code2;
          return (
            <article
              className="skill-card-v2"
              key={skillGroup.group}
              style={{
                "--skill-accent": skillGroup.accent || "#2dd4bf",
                "--skill-glow": skillGroup.glow || "rgba(45, 212, 191, 0.15)"
              }}
            >
              <div className="skill-card-top">
                <div className="skill-icon-badge">
                  <Icon size={20} />
                </div>
                <div className="skill-title-block">
                  <h3>{skillGroup.group}</h3>
                  <span className="skill-count-badge">{skillGroup.tag}</span>
                </div>
              </div>

              <div className="skill-chips-wrap">
                {skillGroup.items.map((item) => (
                  <span className="skill-chip" key={item}>
                    <span className="chip-indicator" />
                    <span className="chip-text">{item}</span>
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      {toolsGroup && (
        <article className="skill-tools-banner">
          <div className="tools-banner-header">
            <div className="tools-icon-box">
              <Terminal size={22} />
            </div>
            <div className="tools-info">
              <h3>{toolsGroup.group} & Workflow</h3>
              <p>Essential platforms, command-line utilities, and developer environments used across production workflows.</p>
            </div>
          </div>
          <div className="tools-chips-row">
            {toolsGroup.items.map((item) => (
              <span className="tool-chip" key={item}>
                <span className="tool-chip-dot" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

function Projects() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 15);

    const card = carouselRef.current.querySelector(".project-card-v2");
    if (card) {
      const cardWidth = card.offsetWidth + 28;
      const current = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(current, 0), portfolioData.projects.length - 1));
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll);
      checkScroll();
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector(".project-card-v2");
    const scrollAmount = card ? card.offsetWidth + 28 : 450;
    carouselRef.current.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth"
    });
  };

  const scrollToProject = (index) => {
    if (!carouselRef.current) return;
    const card = carouselRef.current.querySelector(".project-card-v2");
    if (card) {
      const cardWidth = card.offsetWidth + 28;
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: "smooth"
      });
    }
  };

  const projectVisuals = [
    {
      // Project 1: Job Portal Website (Microservices Topology)
      accent: "cyan",
      liveTag: "Distributed Architecture",
      topology: (
        <div className="project-topology-widget">
          <div className="topology-titlebar">
            <div className="topology-titlebar-left">
              <span className="topology-dot" />
              <span>Distributed Architecture Topology</span>
            </div>
            <span className="topology-tag">Kafka Pub/Sub ⚡ Active</span>
          </div>
          <div className="topology-nodes-row">
            <div className="topo-node auth-node">
              <div className="topo-node-header">
                <span className="topo-dot-mini green" />
                <span className="topo-node-name">Auth Service</span>
              </div>
              <div className="topo-node-meta">
                <code>:5001</code>
                <span>JWT</span>
              </div>
            </div>
            <div className="topo-connector">
              <span className="topo-connector-arrow">➔</span>
            </div>
            <div className="topo-node job-node">
              <div className="topo-node-header">
                <span className="topo-dot-mini cyan" />
                <span className="topo-node-name">Job Service</span>
              </div>
              <div className="topo-node-meta">
                <code>:5002</code>
                <span>REST</span>
              </div>
            </div>
            <div className="topo-connector">
              <span className="topo-connector-arrow">➔</span>
            </div>
            <div className="topo-node payment-node">
              <div className="topo-node-header">
                <span className="topo-dot-mini indigo" />
                <span className="topo-node-name">Payment</span>
              </div>
              <div className="topo-node-meta">
                <code>:5003</code>
                <span>Stripe</span>
              </div>
            </div>
          </div>
          <div className="topology-stream-row">
            <div className="kafka-stream-pill glow">
              <Workflow size={14} className="kafka-icon" />
              <span className="stream-name">Apache Kafka Event Bus</span>
              <span className="stream-badge">Async Queue & Workers</span>
            </div>
          </div>
          <div className="topology-bottom-row">
            <span className="topo-storage"><Database size={13} /> PostgreSQL</span>
            <span className="topo-storage"><Zap size={13} /> Redis Cache</span>
            <span className="topo-storage"><Layers size={13} /> Dockerized</span>
          </div>
        </div>
      )
    },
    {
      // Project 2: Hotel Booking Web Application (Multimodal Voice & AI Simulator)
      accent: "amber",
      liveTag: "Multimodal Voice & LLM",
      topology: (
        <div className="project-topology-widget ai-widget">
          <div className="topology-titlebar">
            <div className="topology-titlebar-left">
              <span className="topology-dot amber" />
              <span>Multimodal Voice & GROQ AI Simulator</span>
            </div>
            <span className="topology-tag amber-tag">Live Engine ⚡ 210 t/s</span>
          </div>
          <div className="ai-chat-simulation">
            <div className="chat-msg user-msg">
              <div className="chat-msg-header">
                <span className="chat-header-left">
                  <Mic size={13} className="chat-msg-icon" />
                  <strong>User Voice Input</strong>
                </span>
                <span className="msg-chip">16kHz Audio</span>
              </div>
              <p className="chat-quote">"Show me best hotel under 2000 in Delhi"</p>
            </div>
            <div className="chat-msg groq-msg">
              <div className="chat-msg-header">
                <span className="chat-header-left">
                  <Bot size={13} className="chat-msg-icon" />
                  <strong>GROQ Llama 3</strong>
                </span>
                <span className="msg-chip speed">Parsed in 48ms</span>
              </div>
              <code className="chat-json">&#123; city: 'Delhi', maxPrice: 2000, sortBy: 'rating' &#125;</code>
            </div>
            <div className="chat-msg audio-msg">
              <div className="chat-msg-header">
                <span className="chat-header-left">
                  <Volume2 size={13} className="chat-msg-icon" />
                  <strong>Speech Audio Synthesis</strong>
                </span>
                <span className="msg-chip synth">Web Speech API</span>
              </div>
              <p className="chat-quote">"Found top-rated hotels in Delhi under ₹2000."</p>
            </div>
          </div>
          <div className="topology-bottom-row">
            <span className="topo-storage"><Rocket size={13} /> MERN Stack</span>
            <span className="topo-storage"><Sparkles size={13} /> GROQ LLM</span>
            <span className="topo-storage"><CheckCircle2 size={13} /> Render Live</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="section projects-section" id="projects">
      <div className="section-heading projects-header-row">
        <div>
          <p className="section-kicker">✦ Featured Projects</p>
          <h2>
            Architecture-first applications built for <span className="gradient-highlight">production scale</span>.
          </h2>
        </div>
        <div className="project-slider-controls">
          <div className="slider-counter">
            <span className="counter-current">0{activeIndex + 1}</span>
            <span className="counter-sep">/</span>
            <span className="counter-total">0{portfolioData.projects.length}</span>
          </div>
          <div className="slider-btn-group">
            <button
              type="button"
              className="proj-slider-btn prev"
              onClick={() => handleScroll(-1)}
              disabled={!canScrollLeft}
              aria-label="Previous project"
              title="Previous project"
            >
              <ChevronLeft size={19} />
            </button>
            <button
              type="button"
              className="proj-slider-btn next"
              onClick={() => handleScroll(1)}
              disabled={!canScrollRight}
              aria-label="Next project"
              title="Next project"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
      </div>

      <div className="project-grid-v2 project-carousel-track" ref={carouselRef}>
        {portfolioData.projects.map((project, index) => {
          const visual = projectVisuals[index];
          const accentClass = visual?.accent || "cyan";
          return (
            <article className={`project-card-v2 card-accent-${accentClass}`} key={project.title}>
              {/* Top ambient glow line */}
              <div className={`proj-card-glow-bar bar-${accentClass}`} />

              {/* Header Badges & Title */}
              <div className="proj-v2-header">
                <div className="proj-v2-badges">
                  <div className="proj-badge-left">
                    <span className="proj-badge-num">PROJECT 0{index + 1}</span>
                    <span className="proj-badge-cat">{project.category}</span>
                  </div>
                  {visual?.liveTag && (
                    <span className={`proj-live-pill pill-${accentClass}`}>
                      <span className={`pulse-beacon beacon-${accentClass}`} />
                      <span>{visual.liveTag}</span>
                    </span>
                  )}
                </div>
                <h3 className="proj-v2-title">{project.title}</h3>
                <p className="proj-v2-desc">{project.description}</p>
              </div>

              {/* Architecture / Interactive Preview Widget */}
              {visual && visual.topology}

              {/* Key Technical Highlights */}
              <div className="proj-v2-highlights">
                <span className="highlights-header-tag">Core Technical Achievements</span>
                <ul className="highlights-list-v2">
                  {project.highlights &&
                    project.highlights.slice(0, 3).map((highlight) => (
                      <li key={highlight}>
                        <CheckCircle2 size={16} className={`hl-check-icon icon-${accentClass}`} />
                        <span>{highlight}</span>
                      </li>
                    ))}
                </ul>
              </div>

              {/* Tech Stack Pills */}
              <div className="proj-v2-stack">
                {project.stack.map((item) => (
                  <span className="stack-pill-v2" key={item}>
                    {item}
                  </span>
                ))}
              </div>

              {/* Action Buttons with guaranteed clearance */}
              <div className="proj-v2-actions">
                <a
                  href={project.links.live}
                  className="proj-action-btn primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>Live Demo</span>
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href={project.links.code}
                  className="proj-action-btn secondary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Github size={16} />
                  <span>Source Code</span>
                </a>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pagination Indicator Dots */}
      <div className="carousel-pagination-dots">
        {portfolioData.projects.map((p, idx) => (
          <button
            key={p.title}
            className={`carousel-dot ${idx === activeIndex ? "active" : ""}`}
            onClick={() => scrollToProject(idx)}
            aria-label={`Jump to project 0${idx + 1}`}
            title={`Project 0${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

function Responsibility() {
  return (
    <section className="section timeline-section" id="responsibility">
      <div id="experience" style={{ position: "relative", top: "-80px" }} />
      <div className="section-heading">
        <p className="section-kicker">Leadership & Community Impact</p>
        <h2>Positions of Responsibility</h2>
      </div>
      <div className="timeline-layout">
        <div className="timeline-col">
          <h3 className="col-title">
            <Briefcase size={20} />
            Positions of Responsibility
          </h3>
          <div className="timeline">
            {portfolioData.experience.map((item, idx) => (
              <article className="timeline-item resp-item-card" key={`${item.company}-${item.role}`}>
                <div className="resp-card-header">
                  <div className="resp-icon-title">
                    <div className="resp-icon-box">
                      {idx === 0 ? <Terminal size={18} /> : idx === 1 ? <Award size={18} /> : <GraduationCap size={18} />}
                    </div>
                    <div>
                      <h3>{item.role}</h3>
                      <p className="timeline-org">{item.company}</p>
                    </div>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>
                <ul>
                  {item.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>

        <div className="education-col">
          <h3 className="col-title">
            <Award size={20} />
            Notable Achievements
          </h3>
          <div className="education-panel">
            <div className="achievement-box">
              <div className="achievement-header">
                <Award size={24} className="award-icon" />
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.08rem" }}>Honours & Milestones</h3>
                  <small style={{ color: "var(--muted)", fontWeight: 650 }}>National rankings and algorithmic achievements</small>
                </div>
              </div>
              <div className="achievement-list">
                {portfolioData.achievements.map((achievement) => (
                  <div className="achievement-item" key={achievement}>
                    <span className="achievement-bullet" />
                    <p>{achievement}</p>
                  </div>
                ))}
              </div>

              <div className="achievement-stats-banner">
                <div className="ach-stat-item">
                  <span className="ach-val">AIR 458</span>
                  <span className="ach-lbl">NIMCET 2024</span>
                </div>
                <div className="ach-divider" />
                <div className="ach-stat-item">
                  <span className="ach-val">1692</span>
                  <span className="ach-lbl">LeetCode Peak</span>
                </div>
                <div className="ach-divider" />
                <div className="ach-stat-item">
                  <span className="ach-val">500+</span>
                  <span className="ach-lbl">DSA Solved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { form, status, isSubmitting, updateField, submitForm } = useContactForm();
  const { profile } = portfolioData;

  return (
    <section className="section contact-section" id="contact">
      <div className="contact-copy">
        <p className="section-kicker">Get in Touch</p>
        <h2>Let's discuss opportunities, distributed systems, and projects.</h2>
        <p className="contact-intro">
          I am actively seeking software engineering internships and full-time roles. Whether you have a question or an
          opportunity, feel free to reach out directly.
        </p>

        <div className="contact-info-cards">
          <a href={`mailto:${profile.email}`} className="contact-info-pill">
            <div className="pill-icon">
              <Mail size={18} />
            </div>
            <div>
              <span className="pill-label">Email</span>
              <strong className="pill-value">{profile.email}</strong>
            </div>
          </a>
          <a href={`tel:${profile.phone}`} className="contact-info-pill">
            <div className="pill-icon">
              <Phone size={18} />
            </div>
            <div>
              <span className="pill-label">Phone</span>
              <strong className="pill-value">{profile.phone}</strong>
            </div>
          </a>
          <div className="contact-info-pill static">
            <div className="pill-icon">
              <MapPin size={18} />
            </div>
            <div>
              <span className="pill-label">Location</span>
              <strong className="pill-value">{profile.location}</strong>
            </div>
          </div>
        </div>

        <div className="social-links-wrap">
          <span className="social-label">Connect Online:</span>
          <div className="social-links">
            <a
              href="https://leetcode.com/u/kasaudhan_vivek/"
              target="_blank"
              rel="noreferrer"
              aria-label="LeetCode Profile"
              title="LeetCode (Max Rating 1692)"
            >
              <Code2 size={20} />
            </a>
            <a
              href="https://github.com/vivekkasaudhan"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Profile"
              title="GitHub (@vivekkasaudhan)"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/vivek-kasaudhan-707235207/?isSelfProfile=true"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn Profile"
              title="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://www.youtube.com/@vivek_nitjsr_01/shorts"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube Channel"
              title="YouTube (@vivek_nitjsr_01)"
              className="youtube-icon-link"
            >
              <Youtube size={20} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email Vivek" title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>

      <form className="contact-form" onSubmit={submitForm}>
        <h3 className="form-title">Send a Message</h3>
        <label>
          <span>Name</span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            placeholder="Your name or company"
            required
            autoComplete="name"
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            placeholder="you@company.com"
            required
            autoComplete="email"
          />
        </label>
        <label>
          <span>Subject</span>
          <input
            name="subject"
            value={form.subject}
            onChange={updateField}
            placeholder="Opportunity / Project discussion"
            required
          />
        </label>
        <label>
          <span>Message</span>
          <textarea
            name="message"
            value={form.message}
            onChange={updateField}
            placeholder="Share your requirements or thoughts..."
            rows="5"
            required
          />
        </label>
        <button className="button primary submit-btn" type="submit" disabled={isSubmitting}>
          <span>{isSubmitting ? "Sending Message..." : "Send Message"}</span>
          <Send size={18} />
        </button>
        {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
      </form>
    </section>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    return savedTheme || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <StarBackground />
      <MouseCursor />
      <ScrollReveal />
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Responsibility />
        <Contact />
      </main>
      <footer className="footer" id="site-footer">
        <div className="footer-content">
          <p className="footer-copyright">
            © 2026 Vivek Kasaudhan. All rights reserved.
          </p>
          <p className="footer-crafted">
            Designed &amp; Built with <span className="heart-icon" role="img" aria-label="love">❤️</span> by{" "}
            <strong>Vivek Kasaudhan</strong> · MCA, NIT Jamshedpur
          </p>
          <a href="#home" className="back-to-top" aria-label="Back to top">
            Back to top ↑
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
