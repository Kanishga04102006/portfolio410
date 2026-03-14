'use client';

import { useEffect, useRef, useState } from 'react';

const LookingFor = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Icon colors for gradient backgrounds
  const iconColor = '#ffffff';
  const iconStrokeWidth = 1.5;

  const opportunities = [
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke={iconColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStrokeWidth} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ), 
      title: 'Internships', 
      desc: 'Hands-on experience with real-world projects',
      gradient: 'from-blue-500 to-cyan-600'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke={iconColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStrokeWidth} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ), 
      title: 'Entry-Level Roles', 
      desc: 'Building and scaling production systems',
      gradient: 'from-teal-500 to-orange-600'
    },
    { 
      icon: (
        <svg className="w-8 h-8" fill="none" stroke={iconColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={iconStrokeWidth} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ), 
      title: 'Collaborations', 
      desc: 'Open-source and innovative projects',
      gradient: 'from-amber-500 to-orange-600'
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/30 to-white dark:from-slate-900 dark:via-teal-950/20 dark:to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200/50 dark:border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Open to Opportunities
          </span>
          
          <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${
            isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
          }`}>
            What I&apos;m <span className="gradient-text-static">Looking For</span>
          </h2>
          
          <p className={`text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
          }`}>
            I&apos;m seeking opportunities to work on real products involving full-stack development, AI systems, or data-driven applications.
          </p>
        </div>

        {/* Opportunity Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {opportunities.map((item, index) => (
            <div 
              key={index}
              className={`group relative p-8 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 text-center hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">{item.desc}</p>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className={`relative p-10 md:p-14 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 dark:from-slate-800 dark:via-cyan-900 dark:to-slate-800 rounded-3xl overflow-hidden ${
          isVisible ? 'animate-fade-in-up delay-500' : 'opacity-0'
        }`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative text-center">
            <p className="text-xl md:text-2xl text-white font-semibold mb-4">
              Ready to contribute, learn, and grow.
            </p>
            <p className="text-cyan-200 mb-8 max-w-lg mx-auto">
              Let&apos;s build something impactful together!
            </p>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              Get in Touch
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LookingFor;
