'use client';

import { useEffect, useRef, useState } from 'react';

interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  gradient: string;
  description: string;
}

interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  website: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [formValues, setFormValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    website: ''
  });
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

  // Icon color for icons on gradient backgrounds (white)
  const iconColor = '#ffffff';

  const validateField = (name: keyof ContactFormValues, value: string): string => {
    const trimmed = value.trim();

    if (name === 'website') {
      return '';
    }

    if (name === 'name') {
      if (!trimmed) return 'Name is required';
      if (trimmed.length < 2) return 'Name must be at least 2 characters';
      if (trimmed.length > 60) return 'Name must be under 60 characters';
    }

    if (name === 'email') {
      if (!trimmed) return 'Email is required';
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmed)) return 'Enter a valid email address';
    }

    if (name === 'phone') {
      if (!trimmed) return '';
      const phoneRegex = /^[+]?[(]?[0-9\s\-()]{8,20}$/;
      if (!phoneRegex.test(trimmed)) return 'Enter a valid phone number';
    }

    if (name === 'subject') {
      if (!trimmed) return 'Subject is required';
      if (trimmed.length < 4) return 'Subject must be at least 4 characters';
      if (trimmed.length > 120) return 'Subject must be under 120 characters';
    }

    if (name === 'message') {
      if (!trimmed) return 'Message is required';
      if (trimmed.length < 15) return 'Message must be at least 15 characters';
      if (trimmed.length > 2000) return 'Message must be under 2000 characters';
    }

    return '';
  };

  const validateForm = (): ContactFormErrors => {
    const nextErrors: ContactFormErrors = {};

    (Object.keys(formValues) as (keyof ContactFormValues)[]).forEach((key) => {
      const error = validateField(key, formValues[key]);
      if (error && key !== 'website') {
        nextErrors[key as keyof ContactFormErrors] = error;
      }
    });

    return nextErrors;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormValues;

    setFormValues((prev) => ({ ...prev, [fieldName]: value }));

    if (submitStatus) {
      setSubmitStatus(null);
    }

    setErrors((prev) => ({
      ...prev,
      [fieldName]: validateField(fieldName, value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors = validateForm();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setSubmitStatus({ type: 'error', message: 'Please fix the highlighted fields and try again.' });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || 'Unable to send your message right now. Please try again later.');
      }

      setFormValues({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        website: ''
      });
      setErrors({});
      setSubmitStatus({ type: 'success', message: 'Thanks! Your message was sent successfully.' });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Something went wrong. Please try again.';
      setSubmitStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactLinks: ContactLink[] = [
    { 
      label: 'Phone', 
      value: '+91 8438787568', 
      href: 'tel:+918438787568',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Give me a call'
    },
    { 
      label: 'Email', 
      value: 'kanisathiya06@gmail.com', 
      href: 'mailto:kanisathiya06@gmail.com',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke={iconColor} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-cyan-500',
      description: 'Send me an email'
    },
    { 
      label: 'GitHub', 
      value: 'github.com/Kanishga04102006', 
      href: 'https://github.com/Kanishga04102006',
      icon: (
        <svg className="w-6 h-6" fill={iconColor} viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      gradient: 'from-slate-700 to-slate-900',
      description: 'Check my repositories'
    },
    { 
      label: 'LinkedIn', 
      value: 'linkedin.com/in/kani06', 
      href: 'https://www.linkedin.com/in/kani06/',
      icon: (
        <svg className="w-6 h-6" fill={iconColor} viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700',
      description: 'Connect professionally'
    }
  ];

  return (
    <section id="contact" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-cyan-50/50 to-slate-50 dark:from-slate-900 dark:via-cyan-950/30 dark:to-slate-900"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-3xl"></div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className={`inline-block px-4 py-1.5 bg-cyan-50 dark:bg-cyan-900/30 border border-cyan-200/50 dark:border-cyan-500/20 rounded-full text-cyan-600 dark:text-cyan-400 text-sm font-medium mb-6 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}>
            Get In Touch
          </span>
          
          <h2 className={`text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 ${
            isVisible ? 'animate-fade-in-up delay-100' : 'opacity-0'
          }`}>
            Let&apos;s <span className="gradient-text-static">Connect</span>
          </h2>
          
          <p className={`text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto ${
            isVisible ? 'animate-fade-in-up delay-200' : 'opacity-0'
          }`}>
            I&apos;m always open to discussing new opportunities, collaborations, or just having a chat about technology!
          </p>
        </div>
        
        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {contactLinks.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              target={contact.label !== 'Email' && contact.label !== 'Phone' ? '_blank' : undefined}
              rel={contact.label !== 'Email' && contact.label !== 'Phone' ? 'noopener noreferrer' : undefined}
              className={`group relative p-6 bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-300 dark:hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10 ${
                isVisible ? 'animate-scale-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${(index + 2) * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${contact.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {contact.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white text-lg">
                      {contact.label}
                    </h3>
                    <svg className="w-4 h-4 text-slate-400 group-hover:text-cyan-500 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-2">
                    {contact.description}
                  </p>
                  <p className="text-cyan-600 dark:text-cyan-400 font-medium text-sm truncate">
                    {contact.value}
                  </p>
                </div>
              </div>
              
              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            </a>
          ))}
        </div>

        {/* CTA + Contact Form */}
        <div className={`relative p-8 md:p-12 bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 dark:from-slate-800 dark:via-cyan-900 dark:to-slate-800 rounded-3xl overflow-hidden ${
          isVisible ? 'animate-fade-in-up delay-600' : 'opacity-0'
        }`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className="text-xl md:text-2xl text-white font-semibold mb-4">
                Send a direct message
              </p>
              <p className="text-cyan-200 mb-6 max-w-lg">
                Fill in all important details and I&apos;ll get back to you quickly. This form sends your message directly to my inbox.
              </p>
              <a 
                href="mailto:kanisathiya06@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-xl font-semibold hover:bg-white/15 transition-all duration-300"
              >
                Prefer email app?
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-4 bg-white/10 border border-white/15 rounded-2xl p-5 md:p-6 backdrop-blur-md">
              <input
                type="text"
                name="website"
                value={formValues.website}
                onChange={handleInputChange}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-cyan-100 mb-1.5">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formValues.name}
                    onChange={handleInputChange}
                    maxLength={60}
                    className="w-full rounded-xl border border-white/25 bg-white/90 px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="Your full name"
                    required
                  />
                  {errors.name && <p className="text-rose-200 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-cyan-100 mb-1.5">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formValues.email}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-white/25 bg-white/90 px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    placeholder="you@example.com"
                    required
                  />
                  {errors.email && <p className="text-rose-200 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-cyan-100 mb-1.5">Phone (optional)</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formValues.phone}
                  onChange={handleInputChange}
                  className="w-full rounded-xl border border-white/25 bg-white/90 px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="+91 84387 87568"
                />
                {errors.phone && <p className="text-rose-200 text-xs mt-1">{errors.phone}</p>}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-cyan-100 mb-1.5">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formValues.subject}
                  onChange={handleInputChange}
                  maxLength={120}
                  className="w-full rounded-xl border border-white/25 bg-white/90 px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  placeholder="Project collaboration / Job opportunity"
                  required
                />
                {errors.subject && <p className="text-rose-200 text-xs mt-1">{errors.subject}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-cyan-100 mb-1.5">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onChange={handleInputChange}
                  rows={5}
                  maxLength={2000}
                  className="w-full rounded-xl border border-white/25 bg-white/90 px-4 py-2.5 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 resize-y"
                  placeholder="Tell me a bit about your project or role..."
                  required
                />
                {errors.message && <p className="text-rose-200 text-xs mt-1">{errors.message}</p>}
              </div>

              {submitStatus && (
                <p className={`text-sm ${submitStatus.type === 'success' ? 'text-emerald-200' : 'text-rose-200'}`}>
                  {submitStatus.message}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isSubmitting ? 'Sending...' : 'Send message'}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
