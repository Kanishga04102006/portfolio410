'use client';

import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const { theme, toggleTheme } = useTheme();

  const NAVBAR_HEIGHT = 70; // Offset for fixed navbar

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = ['about', 'projects', 'skills', 'contact'];
      let currentSection = '';
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in viewport (with navbar offset consideration)
          if (rect.top <= NAVBAR_HEIGHT + 50 && rect.bottom > NAVBAR_HEIGHT + 50) {
            currentSection = section;
          }
        }
      }
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Run on mount to set initial active section
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll handler with offset
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - NAVBAR_HEIGHT;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl shadow-lg shadow-slate-900/5 dark:shadow-slate-900/20 border-b border-slate-200/50 dark:border-slate-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="relative group">
            <span className="text-2xl font-bold gradient-text">KS</span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-xl ${
                  activeSection === link.href.slice(1)
                    ? 'text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.href.slice(1) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-cyan-500 rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 group overflow-hidden"
              aria-label="Toggle dark mode"
            >
              <div className="relative w-5 h-5">
                {theme === 'dark' ? (
                  <svg className="w-5 h-5 text-amber-500 transition-transform group-hover:rotate-45" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-slate-700 transition-transform group-hover:-rotate-12" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </div>
            </button>

            {/* Resume button */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-sm font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:-translate-y-0.5 btn-premium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-5 relative">
              <span className={`absolute left-0 w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 ${isMobileMenuOpen ? 'top-2 rotate-45' : 'top-1'}`}></span>
              <span className={`absolute left-0 top-2 w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`absolute left-0 w-5 h-0.5 bg-slate-700 dark:bg-slate-300 transition-all duration-300 ${isMobileMenuOpen ? 'top-2 -rotate-45' : 'top-3'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
          <div className="pt-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-4 py-3 rounded-xl text-base font-medium transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-slate-700" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 text-center px-5 py-2.5 bg-gradient-to-r from-cyan-600 to-teal-600 text-white text-sm font-semibold rounded-xl"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
