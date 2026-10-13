import React, { useRef, useEffect } from 'react';
import { Code2, Database, Wrench, Cloud } from 'lucide-react';
import { animate, stagger } from 'animejs';
import { useAnimeCardTilt } from '../hooks/useAnimeCardTilt';
import ScrollReveal from './ScrollReveal';

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code2 size={20} className="text-[#7DA0CA]" />,
    description: "Building responsive, accessible, and performant user interfaces with modern component architectures.",
    skills: [
      { name: "React", detail: "Hooks, Context, Component Patterns, Lifecycle Optimization" },
      { name: "JavaScript (ESNext)", detail: "Modern asynchronous workflows, DOM APIs, Closures" },
      { name: "TypeScript", detail: "Type safety, Interface contracts, Generics" },
      { name: "Next.js", detail: "App Router, SSR, Server Components, API routes" },
      { name: "Tailwind CSS", detail: "Design systems, Custom theme tokens, Utility-first CSS" },
      { name: "HTML5 & CSS3", detail: "Semantic markup, WCAG accessibility, Grid & Flexbox" }
    ]
  },
  {
    title: "Backend / Data",
    icon: <Database size={20} className="text-[#7DA0CA]" />,
    description: "Architecting backend integrations, data models, real-time synchronization, and authentication gates.",
    skills: [
      { name: "Supabase", detail: "PostgreSQL, Realtime subscriptions, Row Level Security" },
      { name: "Firebase", detail: "Firestore, Authentication, Hosting, Security Rules" },
      { name: "REST APIs", detail: "Endpoint consumption, Error boundaries, Webhooks" },
      { name: "Authentication", detail: "Session tokens, OAuth providers, Protected routes" },
      { name: "Databases", detail: "Relational schema design, Querying, Document stores" }
    ]
  },
  {
    title: "Cloud & DevOps",
    icon: <Cloud size={20} className="text-[#7DA0CA]" />,
    description: "Cloud infrastructure provisioning, container isolation, orchestration, and continuous integration.",
    skills: [
      { name: "AWS", detail: "EC2, S3, CloudFront CDN, Lambda serverless, IAM role policies" },
      { name: "Microsoft Azure", detail: "App Services, Azure DevOps pipelines, Blob Storage" },
      { name: "Docker", detail: "Multi-stage Dockerfiles, compose environments, image optimization" },
      { name: "Kubernetes", detail: "Pod lifecycle, deployments, ingress, service discovery" }
    ]
  },
  {
    title: "Tools & Engineering",
    icon: <Wrench size={20} className="text-[#7DA0CA]" />,
    description: "Modern developer workflow tools, version control discipline, and interface inspection.",
    skills: [
      { name: "Git & GitHub", detail: "Branching strategies, Pull requests, Semantic releases" },
      { name: "Vite", detail: "Build tooling, Hot module replacement, Bundling" },
      { name: "Chrome DevTools", detail: "Network profiling, Performance audits, DOM debugging" },
      { name: "VS Code", detail: "Custom extensions, Linting, Debugging environments" },
      { name: "Figma", detail: "Design-to-code translation, Spec measurement, Assets" }
    ]
  }
];

/** Single skill card with 3D tilt */
const SkillCard = ({ category }) => {
  const cardRef = useAnimeCardTilt({ maxTilt: 6, scale: 1.02, perspective: 1100 });
  const skillListRef = useRef(null);

  // Stagger individual skill rows when card enters view
  useEffect(() => {
    const list = skillListRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rows = list.querySelectorAll('.skill-row');
    rows.forEach((r) => {
      r.style.opacity = '0';
      r.style.transform = 'translateX(-12px)';
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          animate(rows, {
            opacity: [0, 1],
            translateX: [-12, 0],
            delay: stagger(55, { start: 200 }),
            duration: 550,
            ease: 'outCubic',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(list);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="rounded-sm bg-[#052659]/30 border border-[#5483B3]/25 p-5 sm:p-6 md:p-8 flex flex-col justify-between hover:border-[#7DA0CA]/45 transition-colors"
      style={{ willChange: 'transform' }}
    >
      <div>
        <div className="flex items-center gap-3 mb-3 sm:mb-4">
          <div className="p-2 rounded bg-[#021024] border border-[#5483B3]/30">
            {category.icon}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-[#C1E8FF] tracking-tight">
            {category.title}
          </h3>
        </div>

        <p className="text-sm text-[#7DA0CA] mb-5 sm:mb-6 leading-relaxed">
          {category.description}
        </p>

        <div ref={skillListRef} className="space-y-3.5 pt-4 border-t border-[#052659]">
          {category.skills.map((skill) => (
            <div key={skill.name} className="group skill-row">
              <div className="text-sm font-medium text-[#C1E8FF]">
                {skill.name}
              </div>
              <p className="text-sm text-[#7DA0CA]/80 mt-0.5 leading-snug">
                {skill.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 sm:py-24 md:py-32 bg-[#021024] border-b border-[#052659]">
      <div className="max-w-6xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <ScrollReveal direction="up" distance={24} delayStep={80} duration={700} ease="outExpo" threshold={0.3}>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 pb-6 border-b border-[#052659]">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#C1E8FF] tracking-tight reveal-item">
                Skills & Proficiencies
              </h2>
            </div>
            <p className="text-sm text-[#7DA0CA] mt-3 md:mt-0 max-w-md reveal-item">
              Grounded in core web technologies, modern frameworks, and production-tested toolchains.
            </p>
          </div>
        </ScrollReveal>

        {/* 4-Column Categorized Directory */}
        <ScrollReveal direction="up" distance={40} delayStep={130} duration={850} ease="outExpo" threshold={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {skillCategories.map((category) => (
              <div key={category.title} className="reveal-item">
                <SkillCard category={category} />
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Skills;
