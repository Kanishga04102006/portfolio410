'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface SkillCategory {
  category: string;
  icon: React.ReactNode;
  skills: string[];
  gradient: string;
}

interface TechLogo {
  name: string;
  icon: React.ReactNode;
}

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
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

  // Theme-aware colors
  const iconStroke = theme === 'dark' ? '#ffffff' : '#ffffff';

  // Tech logos for marquee with theme-aware colors
  const techLogos: TechLogo[] = [
    {
      name: 'React',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#61DAFB' : '#087EA4'}>
          <path d="M12 13.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z"/>
          <path fill="none" stroke={theme === 'dark' ? '#61DAFB' : '#087EA4'} strokeWidth="1" d="M12 21c4.97-4.97 4.97-13.03 0-18m0 18c-4.97-4.97-4.97-13.03 0-18m0 18c6.627 0 12-4.03 12-9s-5.373-9-12-9S0 7.03 0 12s5.373 9 12 9Z"/>
        </svg>
      )
    },
    {
      name: 'Next.js',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#ffffff' : '#000000'}>
          <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.251 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.572 0Zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054Z"/>
        </svg>
      )
    },
    {
      name: 'Python',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#FFD43B' : '#3776AB'}>
          <path d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.9S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.03v-2.868s-.109-3.403 3.35-3.403h5.766s3.24.053 3.24-3.13V3.32S18.283 0 11.914 0ZM8.708 1.92c.578 0 1.044.469 1.044 1.047a1.044 1.044 0 1 1-1.044-1.046Z"/>
          <path d="M12.086 24c6.093 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.122s3.899.445 3.899-5.735c0-6.18-3.403-5.96-3.403-5.96h-2.03v2.868s.109 3.402-3.35 3.402H9.451s-3.24-.052-3.24 3.131v5.208S5.717 24 12.086 24Zm3.206-1.92a1.044 1.044 0 1 1 0-2.089c.578 0 1.044.469 1.044 1.046a1.046 1.046 0 0 1-1.044 1.043Z"/>
        </svg>
      )
    },
    {
      name: 'JavaScript',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#F7DF1E' : '#F7DF1E'}>
          <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.405-.6-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"/>
        </svg>
      )
    },
    {
      name: 'Node.js',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#339933' : '#339933'}>
          <path d="M11.998 24c-.321 0-.641-.084-.922-.247L8.14 22.016c-.438-.245-.224-.332-.08-.383.585-.203.703-.25 1.328-.604.065-.037.151-.023.218.017l2.256 1.339c.082.045.198.045.275 0l8.795-5.076c.082-.047.134-.141.134-.238V6.921c0-.099-.053-.193-.137-.242l-8.791-5.072c-.081-.047-.189-.047-.271 0L3.075 6.68c-.085.049-.139.143-.139.242v10.15c0 .097.054.189.139.235l2.409 1.392c1.307.654 2.108-.116 2.108-.891V7.787c0-.142.114-.253.256-.253h1.115c.139 0 .255.111.255.253v10.021c0 1.745-.95 2.745-2.604 2.745-.509 0-.909 0-2.026-.551l-2.307-1.326A1.851 1.851 0 0 1 1.357 17.071V6.921c0-.671.355-1.295.928-1.631L11.08.214a1.93 1.93 0 0 1 1.845 0l8.794 5.076c.573.336.928.96.928 1.631v10.15c0 .671-.355 1.295-.928 1.631l-8.794 5.076a1.91 1.91 0 0 1-.927.222Z"/>
        </svg>
      )
    },
    {
      name: 'Tailwind',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#06B6D4' : '#0891B2'}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
        </svg>
      )
    },
    {
      name: 'TypeScript',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#3178C6' : '#3178C6'}>
          <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
        </svg>
      )
    },
    {
      name: 'SQL',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#00758F' : '#00618A'}>
          <path d="M12.001 0c-5.188 0-9.393 1.567-9.393 3.5v17c0 1.933 4.205 3.5 9.393 3.5s9.393-1.567 9.393-3.5v-17c0-1.933-4.205-3.5-9.393-3.5zm0 2c4.56 0 7.393 1.343 7.393 2.5s-2.833 2.5-7.393 2.5-7.393-1.343-7.393-2.5 2.833-2.5 7.393-2.5zm-7.393 5.5c1.747 1.097 4.347 1.75 7.393 1.75s5.646-.653 7.393-1.75v3c0 1.157-2.833 2.5-7.393 2.5s-7.393-1.343-7.393-2.5v-3zm0 6c1.747 1.097 4.347 1.75 7.393 1.75s5.646-.653 7.393-1.75v3c0 1.157-2.833 2.5-7.393 2.5s-7.393-1.343-7.393-2.5v-3zm0 6c1.747 1.097 4.347 1.75 7.393 1.75s5.646-.653 7.393-1.75v2c0 1.157-2.833 2.5-7.393 2.5s-7.393-1.343-7.393-2.5v-2z"/>
        </svg>
      )
    },
    {
      name: 'C++',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#00599C' : '#004482'}>
          <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z"/>
        </svg>
      )
    },
    {
      name: 'Git',
      icon: (
        <svg className="w-10 h-10" viewBox="0 0 24 24" fill={theme === 'dark' ? '#F05032' : '#DE4C36'}>
          <path d="M23.546 10.93 13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
        </svg>
      )
    }
  ];

  const skillCategories: SkillCategory[] = [
    {
      category: "Languages",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconStroke} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      skills: ["C", "C++", "Python", "JavaScript"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      category: "Frontend",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconStroke} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      ),
      skills: ["React", "Next.js", "HTML/CSS", "Tailwind CSS"],
      gradient: "from-teal-500 to-orange-500"
    },
    {
      category: "Backend & Database",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconStroke} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      ),
      skills: ["Node.js", "SQL", "REST APIs"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      category: "AI & ML",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconStroke} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
      skills: ["LLM Integration", "Prompt Engineering", "AI Roadmap Logic"],
      gradient: "from-amber-500 to-orange-500"
    },
    {
      category: "CS Fundamentals",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconStroke} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      skills: ["DSA", "DBMS", "OS", "System Design"],
      gradient: "from-cyan-500 to-teal-500"
    }
  ];

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...techLogos, ...techLogos];

  return (
    <section id="skills" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-cyan-50/30 to-slate-50 dark:from-slate-900 dark:via-cyan-950/20 dark:to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute top-40 left-0 w-96 h-96 bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-40 right-0 w-96 h-96 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200/50 dark:border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Technical Skills
          </span>
          
          <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${
            isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
          }`}>
            Technologies I <span className="gradient-text-static">Work With</span>
          </h2>
          
          <p className={`text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
          }`}>
            A collection of tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Infinite Scrolling Tech Logos Marquee */}
        <div className={`mb-16 ${isVisible ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}>
          <div className="marquee-container py-8 relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 dark:from-slate-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 dark:from-slate-900 to-transparent z-10"></div>
            
            <div className="marquee-content animate-scroll-right">
              {duplicatedLogos.map((tech, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center justify-center gap-2 p-4 min-w-[100px] group"
                >
                  <div className="p-3 bg-white/80 dark:bg-slate-800/50 rounded-xl border border-slate-200/50 dark:border-slate-700/50 group-hover:border-cyan-300 dark:group-hover:border-cyan-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-cyan-500/10">
                    {tech.icon}
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {tech.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className={`group relative p-6 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 4) * 0.1}s` }}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center text-white shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
                {category.category}
              </h3>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-cyan-100 dark:hover:bg-cyan-900/30 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Additional info */}
        <div className={`mt-16 text-center ${isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'}`}>
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            Always learning and exploring new technologies to stay ahead
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;