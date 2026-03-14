'use client';

import { useEffect, useState, useRef } from 'react';

interface ParticlePosition {
  left: number;
  top: number;
  delay: number;
  duration: number;
}

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([]);
  const particlesInitialized = useRef(false);
  
  useEffect(() => {
    setMounted(true);
    // Generate particle positions only once on client-side
    if (!particlesInitialized.current) {
      particlesInitialized.current = true;
      setParticlePositions(
        [...Array(20)].map(() => ({
          left: Math.random() * 100,
          top: Math.random() * 100,
          delay: Math.random() * 5,
          duration: 4 + Math.random() * 4
        }))
      );
    }
  }, []);

  const roles = ['Full Stack Developer', 'AI Enthusiast', 'Problem Solver'];
  const [currentRole, setCurrentRole] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="min-h-screen py-24 md:py-20 flex items-center justify-center relative overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-cyan-50/50 to-teal-50/50 dark:from-slate-950 dark:via-cyan-950/50 dark:to-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.1),transparent)]"></div>
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-teal-400 to-orange-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-15 dark:opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {mounted && particlePositions.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/30 dark:bg-cyan-400/20 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Status badge */}
        <div className={`mb-6 md:mb-8 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <span className="inline-flex max-w-[90vw] sm:max-w-none flex-wrap items-center justify-center gap-2 px-4 sm:px-5 py-2.5 bg-white/80 dark:bg-white/5 backdrop-blur-xl border border-cyan-200/50 dark:border-cyan-500/20 rounded-2xl sm:rounded-full text-sm font-medium shadow-lg shadow-cyan-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-700 dark:text-slate-300 leading-tight">Available for Opportunities</span>
          </span>
        </div>
        
        {/* Name */}
        <h1 className={`heading-xl mb-6 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <span className="block text-slate-900 dark:text-white text-4xl md:text-5xl font-medium mb-2">Hi, I&apos;m</span>
          <span className="gradient-text block text-5xl md:text-7xl lg:text-8xl font-bold">Kanishga Sathiyamoorthy</span>
        </h1>
        
        {/* Animated role */}
        <div className={`h-12 mb-6 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <p className="text-2xl md:text-3xl font-medium text-slate-600 dark:text-slate-300 transition-all duration-500">
            {roles[currentRole]}
          </p>
        </div>
        
        {/* Description */}
        <p className={`text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed ${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}>
          Building practical applications that solve real problems using 
          <span className="text-cyan-600 dark:text-cyan-400 font-medium"> AI</span>, 
          <span className="text-teal-600 dark:text-teal-400 font-medium"> data science</span>, and 
          <span className="text-orange-600 dark:text-orange-400 font-medium"> modern web technologies</span>.
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-wrap gap-4 justify-center ${mounted ? 'animate-fade-in-up delay-500' : 'opacity-0'}`}>
          <a 
            href="#projects" 
            className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-600 text-white rounded-2xl font-semibold transition-all duration-500 shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:-translate-y-1 btn-premium"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          
          <a 
            href="#contact" 
            className="group px-8 py-4 bg-white/80 dark:bg-white/5 backdrop-blur-xl text-slate-900 dark:text-white rounded-2xl font-semibold border border-slate-200 dark:border-white/10 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <span className="flex items-center gap-2">
              Get In Touch
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
              </svg>
            </span>
          </a>
        </div>

        {/* Social links */}
        <div className={`flex justify-center gap-4 mt-12 ${mounted ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <a 
            href="https://github.com/Kanishga04102006" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            aria-label="GitHub"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/kani06/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          <a 
            href="mailto:kanisathiya06@gmail.com"
            className="p-3 bg-white/60 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-slate-200/50 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1"
            aria-label="Email"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${mounted ? 'animate-fade-in delay-700' : 'opacity-0'}`}>
          <a href="#about" className="flex flex-col items-center gap-2 text-slate-400 hover:text-cyan-500 transition-colors">
            <span className="text-xs font-medium tracking-wider uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-current rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-current rounded-full animate-float"></div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
