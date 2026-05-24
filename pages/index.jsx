import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#0a0a0f",
  surface: "#111118",
  card: "#16161f",
  border: "#1e1e2e",
  accent: "#6ee7b7",
  accentDim: "#34d399",
  accentGlow: "rgba(110,231,183,0.15)",
  blue: "#60a5fa",
  purple: "#a78bfa",
  text: "#e2e8f0",
  muted: "#64748b",
  white: "#f8fafc",
};

const skills = {
  Backend: ["Java", "Spring Boot", "Hibernate/JPA", "REST APIs", "Microservices", "Apache Kafka", "Spring Security", "JWT"],
  Frontend: ["React", "TypeScript", "JavaScript", "Material UI", "HTML/CSS"],
  "Cloud & DevOps": ["AWS", "Docker", "Jenkins", "CI/CD Pipelines", "Git"],
  Databases: ["PostgreSQL", "MySQL", "MongoDB"],
  "Tools & Auth": ["OAuth2", "DocuSign API", "Swagger/OpenAPI", "JUnit", "Playwright"],
  Miscellaneous: ["DSA", "OOPs", "BPMN Workflows", "AI-Assisted Dev"],
};

const experience = [
  {
    company: "Accolite × Morgan Stanley",
    role: "Senior Software Engineer",
    period: "June 2025 – Present",
    project: "PWM ATOM — Asset Transfer Operations Management Platform",
    bullets: [
      "Designed RESTful APIs with Java Spring Boot for asset transfer and document workflows with multi-level approval processes.",
      "Led end-to-end feature delivery from requirement gathering to BPMN workflow development enabling multi-level authorization.",
      "Architected Kafka-based event streaming for Pre-Advice Requests, enabling real-time async processing of asset transfer events.",
      "Authored comprehensive Playwright automation test suites, significantly reducing manual QA effort.",
    ],
    color: COLORS.accent,
  },
  {
    company: "Accolite × Morgan Stanley",
    role: "Software Engineer",
    period: "May 2024 – June 2025",
    project: "PWM DigiSign — Digital Document Signing Platform",
    bullets: [
      "Built scalable backend services for template creation, updates, and document processing ensuring clean architecture.",
      "Integrated CMS, Unified Eligibility, and DocuSign APIs for secure, seamless digital signing workflows.",
      "Led the complete development lifecycle: requirements, feature development, demos, and production releases.",
      "Implemented JWT-based authentication and secure API communication across services.",
    ],
    color: COLORS.blue,
  },
  {
    company: "Accolite",
    role: "Software Engineering Intern",
    period: "March 2024 – May 2024",
    project: "New Employee Onboarding Portal",
    bullets: [
      "Built a digital onboarding platform reducing manual HR effort by 60% and approval delays by 50%.",
      "Developed admin dashboard tracking engagement, training progress, and recruitment metrics — driving 100+ data-driven HR decisions/month.",
      "Achieved training completion in the first week and feedback collection within 30 days, reducing onboarding friction.",
    ],
    color: COLORS.purple,
  },
];

const projects = [
  {
    title: "PWM ATOM",
    subtitle: "Asset Transfer Operations Management",
    description: "Enterprise-grade platform for managing asset transfers and document workflows at Morgan Stanley's Private Wealth Management division. Features multi-level approval chains, BPMN orchestration, and real-time event streaming.",
    tech: ["Java", "Spring Boot", "Apache Kafka", "React", "PostgreSQL", "BPMN"],
    impact: "Handled high-volume asset transfer operations in real-time",
    color: COLORS.accent,
  },
  {
    title: "PWM DigiSign",
    subtitle: "Digital Document Signing Platform",
    description: "Full-stack digital signing solution integrated with DocuSign, CMS, and Unified Eligibility services. Built for Morgan Stanley's wealth management clients with secure JWT authentication and seamless API orchestration.",
    tech: ["Spring Boot", "React", "DocuSign API", "JWT", "OAuth2", "MongoDB"],
    impact: "Eliminated paper-based signing workflows across the organization",
    color: COLORS.blue,
  },
  {
    title: "Onboarding Portal",
    subtitle: "HR Automation Platform",
    description: "Full-stack employee onboarding platform built with Spring Boot, React, and MongoDB. Features an admin analytics dashboard, automated approval workflows, and training progress tracking.",
    tech: ["Spring Boot", "React", "MongoDB", "Material UI", "REST APIs"],
    impact: "60% reduction in manual HR effort, 50% faster approvals",
    color: COLORS.purple,
  },
];

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return progress;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function FadeIn({ children, delay = 0, direction = "up" }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(32px)", left: "translateX(-32px)", right: "translateX(32px)", none: "none" };
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : transforms[direction],
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function Navbar({ active, darkMode, setDarkMode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = useScrollProgress();
  const sections = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <>
      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 1000, background: COLORS.border }}>
        <div style={{ height: "100%", width: `${progress}%`, background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.blue})`, transition: "width 0.1s" }} />
      </div>

      <nav style={{
        position: "fixed", top: 2, left: 0, right: 0, zIndex: 999,
        padding: "0 2rem",
        background: scrolled ? "rgba(10,10,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? `1px solid ${COLORS.border}` : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 64,
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: COLORS.white, letterSpacing: "0.05em", cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          KG<span style={{ color: COLORS.accent }}>.</span>
        </div>

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
          {sections.map((s) => (
            <button key={s} onClick={() => scrollTo(s)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: "0.78rem", letterSpacing: "0.12em", textTransform: "uppercase",
                color: active === s.toLowerCase() ? COLORS.accent : COLORS.muted,
                transition: "color 0.2s",
                fontFamily: "'DM Mono', monospace",
              }}
              onMouseEnter={e => e.target.style.color = COLORS.text}
              onMouseLeave={e => e.target.style.color = active === s.toLowerCase() ? COLORS.accent : COLORS.muted}
            >{s}</button>
          ))}
          <button onClick={() => setDarkMode(!darkMode)} style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 8,
            padding: "6px 10px", cursor: "pointer", color: COLORS.accent, fontSize: "0.85rem",
          }}>
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
      </nav>
    </>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const titles = ["Full Stack Developer", "Java & Spring Boot Expert", "Microservices Architect", "Banking Tech Specialist"];
  const [titleIdx, setTitleIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIdx];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) {
        setTyped(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      } else if (!deleting && charIdx === current.length) {
        setTimeout(() => setDeleting(true), 1800);
      } else if (deleting && charIdx > 0) {
        setTyped(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      } else {
        setDeleting(false);
        setTitleIdx(i => (i + 1) % titles.length);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, titleIdx]);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden", padding: "6rem 2rem 4rem",
    }}>
      {/* Animated background */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Gradient orbs */}
        <div style={{
          position: "absolute", top: "15%", left: "10%", width: 500, height: 500, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(110,231,183,0.07) 0%, transparent 70%)`,
          animation: "float1 8s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute", bottom: "20%", right: "5%", width: 400, height: 400, borderRadius: "50%",
          background: `radial-gradient(circle, rgba(96,165,250,0.06) 0%, transparent 70%)`,
          animation: "float2 10s ease-in-out infinite",
        }} />
        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${COLORS.border} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.border} 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: 0.3,
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }} />
      </div>

      <div style={{ maxWidth: 900, width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        {/* Badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: COLORS.card, border: `1px solid ${COLORS.border}`,
          borderRadius: 100, padding: "6px 16px", marginBottom: "2rem",
          fontSize: "0.75rem", color: COLORS.accent, letterSpacing: "0.1em", textTransform: "uppercase",
          fontFamily: "'DM Mono', monospace",
          animation: "fadeInDown 0.8s ease both",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.accent, display: "inline-block", animation: "pulse 2s infinite" }} />
          Available for opportunities
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 700,
          lineHeight: 1.05,
          color: COLORS.white,
          margin: "0 0 1rem",
          animation: "fadeInUp 0.9s ease 0.1s both",
          letterSpacing: "-0.02em",
        }}>
          Kartik<br />
          <span style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Geete
          </span>
        </h1>

        {/* Typed title */}
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(1rem, 2.5vw, 1.4rem)",
          color: COLORS.muted,
          marginBottom: "1.5rem",
          minHeight: "2em",
          animation: "fadeInUp 0.9s ease 0.2s both",
        }}>
          <span style={{ color: COLORS.accent }}>&gt; </span>
          {typed}
          <span style={{ borderRight: `2px solid ${COLORS.accent}`, animation: "blink 1s step-end infinite", marginLeft: 2 }} />
        </div>

        {/* Tagline */}
        <p style={{
          fontSize: "clamp(1rem, 2vw, 1.15rem)",
          color: COLORS.muted,
          maxWidth: 600,
          margin: "0 auto 2.5rem",
          lineHeight: 1.7,
          animation: "fadeInUp 0.9s ease 0.3s both",
        }}>
          Building enterprise-grade software for the banking & finance industry.
          2+ years crafting scalable microservices, real-time event systems, and seamless full-stack experiences.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", animation: "fadeInUp 0.9s ease 0.4s both" }}>
          <button onClick={() => scrollTo("projects")} style={{
            background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})`,
            border: "none", borderRadius: 12, padding: "14px 28px",
            color: "#0a0a0f", fontWeight: 700, fontSize: "0.9rem",
            cursor: "pointer", letterSpacing: "0.05em",
            boxShadow: `0 0 24px rgba(110,231,183,0.3)`,
            transition: "all 0.2s ease",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 0 40px rgba(110,231,183,0.5)`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = `0 0 24px rgba(110,231,183,0.3)`; }}
          >
            View Projects →
          </button>
          <button onClick={() => scrollTo("contact")} style={{
            background: "transparent", border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "14px 28px",
            color: COLORS.text, fontWeight: 600, fontSize: "0.9rem",
            cursor: "pointer", letterSpacing: "0.05em",
            transition: "all 0.2s ease", backdropFilter: "blur(10px)",
            fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.color = COLORS.accent; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.text; }}
          >
            Contact Me
          </button>
          <a href="mailto:kartikgeete24@gmail.com" style={{
            background: "transparent", border: `1px solid ${COLORS.border}`,
            borderRadius: 12, padding: "14px 28px",
            color: COLORS.muted, fontWeight: 600, fontSize: "0.9rem",
            cursor: "pointer", letterSpacing: "0.05em",
            transition: "all 0.2s ease", textDecoration: "none",
            display: "inline-block", fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.blue; e.currentTarget.style.color = COLORS.blue; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.color = COLORS.muted; }}
          >
            ↓ Resume
          </a>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex", gap: "2rem", justifyContent: "center", marginTop: "4rem",
          flexWrap: "wrap", animation: "fadeInUp 0.9s ease 0.5s both",
        }}>
          {[["2+", "Years Experience"], ["3+", "Enterprise Products"], ["500+", "LeetCode Problems"], ["60%", "HR Effort Reduced"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", fontWeight: 700, color: COLORS.accent }}>{n}</div>
              <div style={{ fontSize: "0.75rem", color: COLORS.muted, letterSpacing: "0.08em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(20px,-30px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-20px,20px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeInDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:none} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:none} }
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
        ::-webkit-scrollbar-thumb { background: ${COLORS.border}; border-radius: 2px; }
      `}</style>
    </section>
  );
}

function SectionLabel({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "3rem" }}>
      <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: COLORS.accent, letterSpacing: "0.15em" }}>
        {label.toUpperCase()}
      </span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${COLORS.border}, transparent)` }} />
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel label="About Me" />
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }}>
        <FadeIn direction="left">
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, color: COLORS.white, marginBottom: "1.5rem", lineHeight: 1.2 }}>
              Crafting software that<br />
              <span style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                moves markets.
              </span>
            </h2>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "1.05rem" }}>
              I'm a Full Stack Developer specializing in enterprise-grade software for the banking and finance sector.
              Over 2+ years, I've worked embedded within Morgan Stanley's Private Wealth Management division,
              building platforms that handle real asset transfers and digital document signing at scale.
            </p>
            <p style={{ color: COLORS.muted, lineHeight: 1.8, marginBottom: "2rem", fontSize: "1.05rem" }}>
              My expertise centers on Java/Spring Boot microservices, event-driven architectures with Kafka,
              and full-stack features with React. I care deeply about clean architecture, performance, and
              delivering products that genuinely improve how people work.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              {[["📍", "Bangalore, India"], ["🎓", "MCA — NIT Bhopal"], ["🏆", "Spotlight Award 2025"]].map(([icon, text]) => (
                <div key={text} style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: COLORS.card, border: `1px solid ${COLORS.border}`,
                  borderRadius: 8, padding: "8px 14px", fontSize: "0.85rem", color: COLORS.text,
                }}>
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="right" delay={0.1}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {[
              { icon: "⚡", title: "Microservices", desc: "Distributed systems built to scale with Kafka event streaming" },
              { icon: "🔐", title: "Auth & Security", desc: "OAuth2, JWT, Spring Security across enterprise APIs" },
              { icon: "🖥️", title: "Full Stack", desc: "End-to-end from Spring Boot APIs to React UIs" },
              { icon: "📊", title: "Finance Domain", desc: "Deep experience in banking workflows and compliance-grade software" },
            ].map((card) => (
              <div key={card.title} style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 16, padding: "1.5rem",
                transition: "border-color 0.2s, transform 0.2s",
                cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = COLORS.accent; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>{card.icon}</div>
                <div style={{ fontWeight: 700, color: COLORS.white, marginBottom: "0.4rem", fontSize: "0.9rem" }}>{card.title}</div>
                <div style={{ fontSize: "0.8rem", color: COLORS.muted, lineHeight: 1.6 }}>{card.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Skills() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <section id="skills" style={{ padding: "6rem 2rem", background: COLORS.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="Skills" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: COLORS.white, marginBottom: "3rem" }}>
            Technology Stack
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          {Object.entries(skills).map(([category, items], i) => (
            <FadeIn key={category} delay={i * 0.07}>
              <div
                style={{
                  background: COLORS.card, border: `1px solid ${activeCategory === category ? COLORS.accent : COLORS.border}`,
                  borderRadius: 16, padding: "1.75rem", cursor: "pointer",
                  transition: "all 0.2s ease",
                  transform: activeCategory === category ? "translateY(-4px)" : "none",
                  boxShadow: activeCategory === category ? `0 8px 32px rgba(110,231,183,0.1)` : "none",
                }}
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <h3 style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: COLORS.accent, fontFamily: "'DM Mono', monospace", marginBottom: "1.25rem" }}>
                  {category}
                </h3>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {items.map((skill) => (
                    <span key={skill} style={{
                      background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                      borderRadius: 6, padding: "4px 10px", fontSize: "0.8rem", color: COLORS.text,
                      transition: "all 0.15s ease",
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  const [open, setOpen] = useState(0);
  return (
    <section id="experience" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel label="Experience" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: COLORS.white, marginBottom: "3rem" }}>
          Career Timeline
        </h2>
      </FadeIn>
      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div style={{
          position: "absolute", left: 20, top: 0, bottom: 0, width: 2,
          background: `linear-gradient(to bottom, ${COLORS.accent}, ${COLORS.blue}, ${COLORS.purple})`,
          borderRadius: 2,
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem", paddingLeft: 60 }}>
          {experience.map((exp, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              {/* Timeline dot */}
              <div style={{
                position: "absolute", left: 11, width: 20, height: 20, borderRadius: "50%",
                background: exp.color, border: `3px solid ${COLORS.bg}`,
                boxShadow: `0 0 12px ${exp.color}`,
                marginTop: "1.5rem",
              }} />

              <div style={{
                background: COLORS.card, border: `1px solid ${open === i ? exp.color : COLORS.border}`,
                borderRadius: 16, overflow: "hidden",
                transition: "border-color 0.2s",
                boxShadow: open === i ? `0 8px 32px ${exp.color}22` : "none",
              }}>
                <button onClick={() => setOpen(open === i ? -1 : i)} style={{
                  width: "100%", background: "none", border: "none", cursor: "pointer",
                  padding: "1.5rem 1.75rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start",
                  textAlign: "left",
                }}>
                  <div>
                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: exp.color, letterSpacing: "0.1em", marginBottom: "0.4rem" }}>
                      {exp.period}
                    </div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: COLORS.white, fontWeight: 700 }}>{exp.role}</div>
                    <div style={{ color: COLORS.muted, fontSize: "0.9rem", marginTop: "0.25rem" }}>{exp.company}</div>
                    <div style={{ color: exp.color, fontSize: "0.8rem", marginTop: "0.4rem", fontStyle: "italic" }}>{exp.project}</div>
                  </div>
                  <div style={{ color: COLORS.muted, fontSize: "1.2rem", transition: "transform 0.2s", transform: open === i ? "rotate(180deg)" : "none", flexShrink: 0, marginLeft: 16 }}>
                    ↓
                  </div>
                </button>
                {open === i && (
                  <div style={{ padding: "0 1.75rem 1.75rem", borderTop: `1px solid ${COLORS.border}` }}>
                    <ul style={{ listStyle: "none", marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                      {exp.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: 12, fontSize: "0.9rem", color: COLORS.muted, lineHeight: 1.65 }}>
                          <span style={{ color: exp.color, flexShrink: 0, marginTop: "0.15rem" }}>→</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [hovered, setHovered] = useState(null);
  return (
    <section id="projects" style={{ padding: "6rem 2rem", background: COLORS.surface }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="Projects" />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: COLORS.white, marginBottom: "3rem" }}>
            Featured Work
          </h2>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {projects.map((proj, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div
                style={{
                  background: COLORS.card, border: `1px solid ${hovered === i ? proj.color : COLORS.border}`,
                  borderRadius: 20, overflow: "hidden", cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: hovered === i ? "translateY(-6px)" : "none",
                  boxShadow: hovered === i ? `0 16px 48px ${proj.color}22` : "none",
                  display: "flex", flexDirection: "column",
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Header bar */}
                <div style={{
                  height: 4,
                  background: `linear-gradient(90deg, ${proj.color}, transparent)`,
                }} />

                <div style={{ padding: "1.75rem", flex: 1 }}>
                  <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: proj.color, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
                    Enterprise Platform
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", color: COLORS.white, marginBottom: "0.25rem" }}>{proj.title}</h3>
                  <div style={{ fontSize: "0.85rem", color: COLORS.muted, marginBottom: "1rem" }}>{proj.subtitle}</div>
                  <p style={{ fontSize: "0.88rem", color: COLORS.muted, lineHeight: 1.7, marginBottom: "1.5rem" }}>{proj.description}</p>

                  {/* Impact badge */}
                  <div style={{
                    background: `${proj.color}15`, border: `1px solid ${proj.color}44`,
                    borderRadius: 8, padding: "8px 12px", fontSize: "0.8rem", color: proj.color,
                    marginBottom: "1.25rem",
                  }}>
                    ✦ {proj.impact}
                  </div>

                  {/* Tech stack */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {proj.tech.map((t) => (
                      <span key={t} style={{
                        background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                        borderRadius: 6, padding: "3px 10px", fontSize: "0.75rem", color: COLORS.muted,
                        fontFamily: "'DM Mono', monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>

                <div style={{ padding: "1rem 1.75rem", borderTop: `1px solid ${COLORS.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "0.75rem", color: COLORS.muted }}>Morgan Stanley — Private Wealth Management</span>
                  <a href="https://github.com/kartikgeete" target="_blank" rel="noreferrer" style={{ color: proj.color, fontSize: "0.8rem", textDecoration: "none" }}>
                    GitHub →
                  </a>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{ padding: "6rem 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <FadeIn>
        <SectionLabel label="Education" />
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 3vw, 2.5rem)", color: COLORS.white, marginBottom: "3rem" }}>
          Academic Background
        </h2>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>
        <FadeIn direction="left">
          <div style={{
            background: COLORS.card, border: `1px solid ${COLORS.border}`,
            borderRadius: 20, padding: "2rem", position: "relative", overflow: "hidden",
          }}>
            <div style={{
              position: "absolute", top: 0, right: 0, width: 120, height: 120, borderRadius: "50%",
              background: `radial-gradient(circle, ${COLORS.accentGlow} 0%, transparent 70%)`,
              transform: "translate(30%, -30%)",
            }} />
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: COLORS.accent, letterSpacing: "0.12em", marginBottom: "1rem" }}>
              2021 — 2024
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: COLORS.white, marginBottom: "0.5rem" }}>
              Master of Computer Applications
            </h3>
            <div style={{ color: COLORS.muted, marginBottom: "1rem", fontSize: "0.9rem" }}>Maulana Azad National Institute of Technology</div>
            <div style={{ color: COLORS.muted, fontSize: "0.85rem", marginBottom: "1.25rem" }}>NIT Bhopal, Madhya Pradesh</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: `${COLORS.accent}15`, border: `1px solid ${COLORS.accent}44`,
              borderRadius: 8, padding: "6px 14px", fontSize: "0.85rem", color: COLORS.accent,
            }}>
              🎓 CGPA: 8.41 / 10
            </div>
          </div>
        </FadeIn>
        <FadeIn direction="right" delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { title: "🏆 Spotlight Award 2025", desc: "Winner at Bounteous × Accolite — recognized for outstanding engineering contributions", color: COLORS.accent },
              { title: "🎓 Secretary, MCA Association", desc: "Student leadership role at MANIT — organized technical events and represented the student body", color: COLORS.blue },
              { title: "💻 500+ DSA Problems", desc: "Active competitive programmer on LeetCode, CodeChef, and GeeksForGeeks", color: COLORS.purple },
            ].map((item, i) => (
              <div key={i} style={{
                background: COLORS.card, border: `1px solid ${COLORS.border}`,
                borderRadius: 14, padding: "1.25rem 1.5rem",
                transition: "all 0.2s", cursor: "default",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = item.color; e.currentTarget.style.transform = "translateX(4px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.transform = "none"; }}
              >
                <div style={{ fontWeight: 700, color: COLORS.white, marginBottom: "0.35rem", fontSize: "0.95rem" }}>{item.title}</div>
                <div style={{ fontSize: "0.82rem", color: COLORS.muted, lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = () => {
    if (form.name && form.email && form.message) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setForm({ name: "", email: "", message: "" });
    }
  };

  return (
    <section id="contact" style={{ padding: "6rem 2rem", background: COLORS.surface }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <SectionLabel label="Contact" />
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
          <FadeIn direction="left">
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 2.8rem)", color: COLORS.white, marginBottom: "1rem", lineHeight: 1.2 }}>
                Let's build something<br />
                <span style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.blue})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  great together.
                </span>
              </h2>
              <p style={{ color: COLORS.muted, lineHeight: 1.8, marginBottom: "2.5rem" }}>
                Open to senior engineer roles, fintech opportunities, and interesting engineering challenges.
                Drop me a message and I'll get back to you promptly.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {[
                  { icon: "✉️", label: "Email", value: "kartikgeete24@gmail.com", href: "mailto:kartikgeete24@gmail.com" },
                  { icon: "💼", label: "LinkedIn", value: "linkedin.com/in/kartikgeete", href: "https://linkedin.com" },
                  { icon: "🐙", label: "GitHub", value: "github.com/kartikgeete", href: "https://github.com/kartikgeete" },
                  { icon: "📍", label: "Location", value: "Bangalore, India", href: null },
                ].map((link) => (
                  <div key={link.label} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: COLORS.card, border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>
                      {link.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: "0.7rem", color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2, fontFamily: "'DM Mono', monospace" }}>{link.label}</div>
                      {link.href ? (
                        <a href={link.href} style={{ color: COLORS.text, textDecoration: "none", fontSize: "0.9rem" }}
                          onMouseEnter={e => e.target.style.color = COLORS.accent}
                          onMouseLeave={e => e.target.style.color = COLORS.text}
                        >{link.value}</a>
                      ) : (
                        <span style={{ color: COLORS.text, fontSize: "0.9rem" }}>{link.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
          <FadeIn direction="right" delay={0.1}>
            <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "2rem" }}>
              {sent ? (
                <div style={{ textAlign: "center", padding: "2rem 0" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>✓</div>
                  <div style={{ color: COLORS.accent, fontWeight: 700, fontSize: "1.1rem" }}>Message sent!</div>
                  <div style={{ color: COLORS.muted, marginTop: "0.5rem", fontSize: "0.9rem" }}>I'll get back to you soon.</div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {[{ key: "name", label: "Name", type: "text", placeholder: "Your name" },
                    { key: "email", label: "Email", type: "email", placeholder: "your@email.com" }].map((field) => (
                    <div key={field.key}>
                      <label style={{ fontSize: "0.75rem", color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => setForm(f => ({ ...f, [field.key]: e.target.value }))}
                        style={{
                          width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                          borderRadius: 10, padding: "12px 14px", color: COLORS.text,
                          fontSize: "0.9rem", outline: "none", transition: "border-color 0.2s",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                        onFocus={e => e.target.style.borderColor = COLORS.accent}
                        onBlur={e => e.target.style.borderColor = COLORS.border}
                      />
                    </div>
                  ))}
                  <div>
                    <label style={{ fontSize: "0.75rem", color: COLORS.muted, letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "'DM Mono', monospace" }}>Message</label>
                    <textarea
                      placeholder="What's on your mind?"
                      rows={4}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        width: "100%", background: COLORS.bg, border: `1px solid ${COLORS.border}`,
                        borderRadius: 10, padding: "12px 14px", color: COLORS.text,
                        fontSize: "0.9rem", outline: "none", resize: "vertical",
                        fontFamily: "'DM Sans', sans-serif", transition: "border-color 0.2s",
                      }}
                      onFocus={e => e.target.style.borderColor = COLORS.accent}
                      onBlur={e => e.target.style.borderColor = COLORS.border}
                    />
                  </div>
                  <button onClick={handleSubmit} style={{
                    background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDim})`,
                    border: "none", borderRadius: 10, padding: "13px",
                    color: "#0a0a0f", fontWeight: 700, fontSize: "0.9rem",
                    cursor: "pointer", width: "100%",
                    transition: "opacity 0.2s, transform 0.2s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.9"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}
                  >
                    Send Message →
                  </button>
                </div>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{
      padding: "2rem", borderTop: `1px solid ${COLORS.border}`,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: "1rem", maxWidth: 1100, margin: "0 auto",
    }}>
      <div style={{ fontFamily: "'Playfair Display', serif", color: COLORS.muted, fontSize: "0.9rem" }}>
        Kartik Geete<span style={{ color: COLORS.accent }}>.</span>
      </div>
      <div style={{ fontSize: "0.8rem", color: COLORS.muted }}>
        Built with React & ❤️ — © 2025
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {[
          { label: "Email", href: "mailto:kartikgeete24@gmail.com" },
          { label: "LinkedIn", href: "https://linkedin.com" },
          { label: "GitHub", href: "https://github.com/kartikgeete" },
        ].map((l) => (
          <a key={l.label} href={l.href} style={{ color: COLORS.muted, textDecoration: "none", fontSize: "0.8rem" }}
            onMouseEnter={e => e.target.style.color = COLORS.accent}
            onMouseLeave={e => e.target.style.color = COLORS.muted}
          >{l.label}</a>
        ))}
      </div>
    </footer>
  );
}

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const sections = ["hero", "about", "skills", "experience", "projects", "education", "contact"];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh", color: COLORS.text }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
      <Navbar active={activeSection} darkMode={darkMode} setDarkMode={setDarkMode} />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}
