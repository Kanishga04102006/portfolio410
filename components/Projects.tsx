'use client';

import { useEffect, useRef, useState } from 'react';

interface Project {
  title: string;
  subtitle: string;
  impact: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: { label: string; value: string }[];
  learned: string[];
  github: string;
  live?: string;
  gradient: string;
  icon: React.ReactNode;
}

const Projects = () => {
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const currentRefs = projectRefs.current;
    const observers = currentRefs.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleProjects(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.1 }
      );

      if (ref) {
        observer.observe(ref);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (currentRefs[index]) {
          observer.unobserve(currentRefs[index]!);
        }
      });
    };
  }, []);

  const projects: Project[] = [
    {
      title: "CareerPath AI",
      subtitle: "AI-Powered Career Guidance Platform",
      impact: "An intelligent system that generates personalized career roadmaps using LLMs and structured recommendation logic.",
      problem: "Students struggle with generic career advice. There's no structured, personalized guidance available.",
      solution: "AI-driven platform that analyzes user inputs to provide tailored career paths and learning roadmaps.",
      features: [
        "AI-based career recommendations",
        "Personalized learning roadmaps",
        "Structured guidance system",
        "Scalable RAG-ready architecture"
      ],
      techStack: [
        { label: "Frontend", value: "React" },
        { label: "AI/Logic", value: "LLM + Prompting" },
        { label: "Data", value: "Structured Datasets" }
      ],
      learned: [
        "Designing AI outputs that are structured, not hallucinated",
        "Why RAG beats blind fine-tuning",
        "Converting vague goals into deterministic outputs"
      ],
      github: "https://github.com/Jayaprakash3704/careerpath-ai",
      live: "",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    {
      title: "SmartStock",
      subtitle: "Intelligent Inventory Management System",
      impact: "A robust stock management system designed to reduce errors and support smarter business decisions.",
      problem: "Small businesses rely on manual, error-prone inventory tracking leading to stock mismatches.",
      solution: "Structured system to manage stock levels with real-time tracking and data validation.",
      features: [
        "Real-time inventory tracking",
        "Structured stock updates",
        "Data validation & consistency",
        "Business analytics dashboard"
      ],
      techStack: [
        { label: "Frontend", value: "React" },
        { label: "Backend", value: "Node.js" },
        { label: "Database", value: "SQL" }
      ],
      learned: [
        "Data consistency matters more than UI",
        "Designing reliable data flows",
        "How systems break with weak validation"
      ],
      github: "https://github.com/Jayaprakash3704/smartstock",
      live: "",
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    }
  ];

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200/50 dark:border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 animate-fade-in-up">
            Featured Work
          </span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 animate-fade-in-up delay-100">
            Projects That <span className="gradient-text-static">Make an Impact</span>
          </h2>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto animate-fade-in-up delay-200">
            Real-world applications built to solve genuine problems
          </p>
        </div>
        
        {/* Projects */}
        <div className="space-y-16">
          {projects.map((project, index) => (
            <div 
              key={index} 
              ref={el => { projectRefs.current[index] = el; }}
              className={`group relative ${
                visibleProjects.includes(index) 
                  ? 'animate-fade-in-up' 
                  : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Project Card */}
              <div className="relative bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-200/50 dark:border-slate-700/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-300 dark:hover:border-cyan-500/30">
                {/* Top gradient bar */}
                <div className={`h-1.5 bg-gradient-to-r ${project.gradient}`}></div>
                
                <div className="p-8 md:p-10">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-white shadow-lg`}>
                        {project.icon}
                      </div>
                      <div>
                        <span className="inline-block px-3 py-1 bg-cyan-50 dark:bg-cyan-900/30 text-cyan-600 dark:text-cyan-400 text-xs font-medium rounded-full mb-2">
                          Featured Project
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 dark:text-slate-400 font-medium">
                          {project.subtitle}
                        </p>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex gap-3">
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        Code
                      </a>
                      {project.live && (
                        <a 
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          Demo
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="mb-8 p-4 bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-xl border-l-4 border-cyan-500">
                    <p className="text-slate-700 dark:text-slate-300 font-medium">
                      {project.impact}
                    </p>
                  </div>

                  {/* Problem & Solution */}
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    <div className="p-5 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200/50 dark:border-red-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Problem</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="p-5 bg-emerald-50 dark:bg-emerald-900/10 rounded-xl border border-emerald-200/50 dark:border-emerald-500/20">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        </div>
                        <h4 className="font-semibold text-slate-900 dark:text-white">Solution</h4>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {project.solution}
                      </p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Key Features
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {project.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
                          <span className="text-slate-700 dark:text-slate-300 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-8">
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {project.techStack.map((tech, i) => (
                        <span key={i} className="px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-50 dark:from-slate-700/50 dark:to-slate-700/30 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-medium">
                          <span className="text-slate-500 dark:text-slate-400">{tech.label}:</span>{' '}
                          <span className="text-slate-900 dark:text-white">{tech.value}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Learnings */}
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Key Learnings
                    </h4>
                    <div className="space-y-2">
                      {project.learned.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-teal-50 dark:bg-teal-900/10 rounded-lg border border-teal-200/50 dark:border-teal-500/20">
                          <svg className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-slate-700 dark:text-slate-300 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* More projects CTA */}
        <div className="text-center mt-16">
          <a 
            href="https://github.com/Jayaprakash3704"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            View More on GitHub
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
