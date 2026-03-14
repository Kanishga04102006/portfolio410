'use client';

import { useEffect, useRef, useState } from 'react';

const About = () => {
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

  // Icons are white on gradient backgrounds, so they don't need theme changes
  const highlights = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Full Stack Developer',
      description: 'End-to-end application development with modern technologies',
      gradient: 'from-cyan-500 to-teal-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      title: 'AI Enthusiast',
      description: 'Leveraging AI to create intelligent, practical solutions',
      gradient: 'from-teal-500 to-emerald-600'
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="#ffffff" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Problem Solver',
      description: 'Focused on creating real impact through clean code',
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <span className="inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200/50 dark:border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6">
                About Me
              </span>
            </div>
            
            <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight ${
              isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
            }`}>
              Passionate about building
              <span className="gradient-text-static block">impactful software</span>
            </h2>
            
            <div className={`space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed ${
              isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
            }`}>
              <p>
                I&apos;m an undergraduate student focused on <span className="text-cyan-600 dark:text-cyan-400 font-medium">building real-world software</span>, not academic demos.
              </p>
              <p>
                My interests span <span className="text-teal-600 dark:text-teal-400 font-medium">AI-powered systems</span>, data-driven applications, and modern full-stack development.
              </p>
              <p>
                I believe in <span className="text-orange-600 dark:text-orange-400 font-medium">shipping working products</span> that solve genuine problems and create meaningful impact.
              </p>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-6 mt-10 ${
              isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'
            }`}>
              {[
                { value: '2+', label: 'Projects' },
                { value: '5+', label: 'Technologies' },
                { value: '∞', label: 'Curiosity' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-sm text-slate-500 dark:text-slate-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right content - Cards */}
          <div className={`space-y-4 ${isVisible ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
            {highlights.map((item, index) => (
              <div 
                key={index}
                className="group relative p-6 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-cyan-500/10"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
                
                {/* Hover gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-teal-500 to-orange-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
