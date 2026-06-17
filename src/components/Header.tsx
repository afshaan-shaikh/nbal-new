import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, Sun, Moon, Sparkles, Building, ChevronDown, Award, Search, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
  isDark: boolean;
  setIsDark: (dark: boolean) => void;
  onOpenConsult: () => void;
}

export default function Header({ currentPage, setCurrentPage, isDark, setIsDark, onOpenConsult }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Credentials", id: "projects" },
    { label: "Gallery", id: "gallery" },
    { label: "Insights", id: "blog" },
    { label: "FAQs", id: "faq" },
    { label: "Contact Us", id: "contact" }
  ];

  const handleNav = (id: string) => {
    setCurrentPage(id);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-app-header"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled
          ? isDark
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-900 shadow-lg'
            : 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-md'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="relative h-11 w-11 rounded-xl bg-gradient-to-tr from-sky-600 to-teal-500 p-0.5 shadow-md flex items-center justify-center text-white font-black font-sans shrink-0">
              <span className="text-lg">NB</span>
              <div className="absolute inset-0 rounded-xl bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className={`font-sans font-extrabold text-lg tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  NB CONSULTANCY
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-teal-500 animate-pulse" />
              </div>
              <p className={`text-[10px] font-mono leading-none tracking-widest ${isDark ? 'text-teal-400/90' : 'text-sky-600'}`}>
                EXPERTISE. SERVICE. INTEGRITY.
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {navItems.map((item) => {
              if (item.id === 'projects') {
                return (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setMegaMenuOpen(true)}
                    onMouseLeave={() => setMegaMenuOpen(false)}
                  >
                    <button
                      id="nav-credentials-megamenu-btn"
                      className={`flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-sans font-medium tracking-wide transition-all ${
                        currentPage === 'projects'
                          ? isDark
                            ? 'text-teal-400 bg-slate-900'
                            : 'text-sky-600 bg-sky-50'
                          : isDark
                          ? 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-gray-50'
                      }`}
                    >
                      Credentials
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    <AnimatePresence>
                      {megaMenuOpen && (
                        <motion.div
                          id="nav-credentials-megamenu"
                          className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[600px] rounded-2xl border p-6 grid grid-cols-2 gap-6 shadow-2xl ${
                            isDark 
                              ? 'bg-slate-950 border-slate-905 text-white' 
                              : 'bg-white border-gray-100 text-slate-900'
                          }`}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.15 }}
                        >
                          <div className="space-y-4">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-teal-400 flex items-center gap-1.5 font-bold">
                              <Building className="h-4 w-4" /> Flagship Deployments
                            </h4>
                            <div className="space-y-2">
                              <button onClick={() => handleNav('projects')} className="group flex flex-col text-left block w-full focus:outline-none">
                                <span className={`text-sm font-semibold transition-colors group-hover:text-teal-400`}>
                                  QHT (Dr. Ankur Singhal)
                                </span>
                                <span className="text-xs text-slate-400">21 Advanced Operation Rooms, Dehradun</span>
                              </button>
                              <button onClick={() => handleNav('projects')} className="group flex flex-col text-left block w-full focus:outline-none">
                                <span className="text-sm font-semibold transition-colors group-hover:text-teal-400">
                                  SRK Lifecare Hospital
                                </span>
                                <span className="text-xs text-slate-400">75-Bed Advanced Cardiac Setup, Mumbai</span>
                              </button>
                              <button onClick={() => handleNav('projects')} className="group flex flex-col text-left block w-full focus:outline-none">
                                <span className="text-sm font-semibold transition-colors group-hover:text-teal-400">
                                  Anand Medical & Education
                                </span>
                                <span className="text-xs text-slate-400">40-Bed Complete Feasibility Commissioning</span>
                              </button>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <h4 className="text-xs font-mono uppercase tracking-widest text-teal-400 flex items-center gap-1.5 font-bold">
                              <Award className="h-4 w-4" /> Certification Ranges
                            </h4>
                            <div className="space-y-2.5">
                              <p className="text-xs text-slate-400 leading-relaxed">
                                Our planning frameworks translate standard NABH clinical guidelines, sterile zonings, and MEP utility checklists into reliable architecture formats.
                              </p>
                              <button
                                onClick={() => handleNav('projects')}
                                className="text-xs text-teal-400 hover:text-teal-300 font-semibold font-mono tracking-wider flex items-center gap-1 mt-2 hover:underline bg-transparent border-none p-0 cursor-pointer"
                              >
                                View All 25 Completed Clients &rarr;
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-sans font-medium tracking-wide transition-all ${
                    currentPage === item.id
                      ? isDark
                        ? 'text-teal-400 bg-slate-900 border-b border-teal-500/20'
                        : 'text-sky-600 bg-sky-50'
                      : isDark
                      ? 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Dark mode switch */}
            <button
              id="header-theme-toggle"
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                isDark 
                  ? 'border-slate-800 hover:bg-slate-900 text-yellow-400' 
                  : 'border-gray-200 hover:bg-gray-55/60 text-indigo-950'
              }`}
              title="Toggle palette mode"
            >
              {isDark ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>

            {/* Backoffice Admin lock */}
            <button
              id="header-admin-shortcut"
              onClick={() => handleNav('admin')}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                currentPage === 'admin'
                  ? 'border-teal-500 bg-teal-950/20 text-teal-400'
                  : isDark 
                    ? 'border-slate-800 hover:bg-slate-900 text-slate-400 hover:text-white' 
                    : 'border-gray-200 hover:bg-gray-55/60 text-slate-600 hover:text-slate-955'
              }`}
              title="Access Admin Console"
            >
              <Lock className="h-4.5 w-4.5" />
            </button>

            {/* Telephone Call Dialer Clickable */}
            <a
              id="header-cta-phone"
              href="tel:+919920046121"
              className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border text-xs font-mono font-medium transition-all ${
                isDark
                  ? 'border-slate-800 bg-slate-950/40 text-slate-350 hover:bg-slate-900 hover:text-white'
                  : 'border-gray-200 bg-white text-slate-700 hover:bg-gray-50 hover:text-slate-900'
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-teal-400 shrink-0" />
              +91 9920046121
            </a>

            {/* Whatsapp Direct Launch click */}
            <a
              id="header-cta-whatsapp"
              href="https://wa.me/919920046121?text=Hi%20NB%20Healthcare%20Consultancy,%20I'd%20like%20to%20consult%20on%20a%20hospital%20project."
              target="_blank"
              referrerPolicy="no-referrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-md"
              title="Speak on WhatsApp"
            >
              <MessageSquare className="h-4.5 w-4.5" />
            </a>

            {/* Consultation Form CTA */}
            <button
              id="header-cta-consult"
              onClick={onOpenConsult}
              className="bg-sky-600 hover:bg-sky-550 text-white px-5 py-2.5 rounded-xl text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5 text-sky-200 animate-pulse" />
              Consult
            </button>
          </div>

          {/* Tablet/Mobile Actions & Burger Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark ? 'border-slate-800 text-yellow-400' : 'border-gray-200 text-indigo-950'
              }`}
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2.5 rounded-xl border transition-all ${
                isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-slate-800'
              }`}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-nav-panel"
            className={`lg:hidden border-t ${
              isDark ? 'bg-slate-950 border-slate-900 text-white' : 'bg-white border-gray-100 text-slate-900'
            }`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="px-4 py-6 space-y-4">
              <nav className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-sans font-medium transition-all ${
                      currentPage === item.id
                        ? isDark ? 'bg-slate-900 text-teal-400' : 'bg-sky-50 text-sky-600'
                        : isDark ? 'hover:bg-slate-900/60 text-slate-300' : 'hover:bg-gray-50 text-slate-650'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              <div className="pt-4 border-t border-slate-900 space-y-3">
                <a
                  href="tel:+919920046121"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-dashed border-slate-800 text-sm font-mono text-center"
                >
                  <Phone className="h-4 w-4 text-teal-400" />
                  +91 9920046121
                </a>
                <a
                  href="https://wa.me/919920046121"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 text-white text-sm font-bold text-center"
                >
                  <MessageSquare className="h-4 w-4" />
                  WhatsApp Direct
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenConsult();
                  }}
                  className="w-full bg-sky-600 hover:bg-sky-550 text-white py-3 rounded-xl text-xs font-sans font-bold uppercase tracking-wider text-center"
                >
                  Quick Consult Slating
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
