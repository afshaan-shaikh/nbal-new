import React, { useState, useEffect } from 'react';
import { 
  Building2, Stethoscope, GitMerge, ShieldAlert, CheckCircle2, Phone, Mail, MapPin, 
  MessageSquare, Star, ArrowUpRight, Search, SlidersHorizontal, Sliders, Play, 
  ChevronRight, CalendarClock, ArrowRight, ShieldCheck, Sparkles, Filter, 
  ChevronDown, ExternalLink, RefreshCw, X, FileText, Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AppContent, Service, Project, Blog, FAQ } from './types';
import { defaultContent } from './data';

// Component imports
import Header from './components/Header';
import Hero from './components/Hero';
import AIConsultant from './components/AIConsultant';
import ConsultPopup from './components/ConsultPopup';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [appContent, setAppContent] = useState<AppContent>(defaultContent);
  const [isDark, setIsDark] = useState<boolean>(false);
  const [showConsultModal, setShowConsultModal] = useState<boolean>(false);
  const [submittingContact, setSubmittingContact] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    hospitalName: '',
    location: '',
    requirement: ''
  });

  // Services & Projects state
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [projectSearch, setProjectSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Gallery slider comparison state
  const [sliderPosition, setSliderPosition] = useState<number>(50);
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string; description: string } | null>(null);

  // FAQ search state
  const [faqSearch, setFaqSearch] = useState<string>('');
  const [activeFaq, setActiveFaq] = useState<string | null>(null);

  // Selected blog state
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const handleNav = (id: string) => {
    setCurrentPage(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Load Content from Server API
  useEffect(() => {
    fetch('/api/content')
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Server loading error");
      })
      .then(data => {
        if (data && data.services) {
          setAppContent(data);
        }
      })
      .catch(err => {
        console.log("Using cached corporate default static parameters:", err);
      });
  }, []);

  // Sync isDark class to document
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.backgroundColor = '#0c1222';
    } else {
      root.classList.remove('dark');
      root.style.backgroundColor = '#f5f8fa';
    }
  }, [isDark]);

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.requirement) {
      alert("Please provide at least a Contact Name, Phone, and your specific requirements description.");
      return;
    }

    setSubmittingContact(true);
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm)
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({
          name: '',
          phone: '',
          email: '',
          hospitalName: '',
          location: '',
          requirement: ''
        });
        setTimeout(() => setContactSuccess(false), 5000);
      } else {
        throw new Error("Failed to submit, trying alternative.");
      }
    } catch (err) {
      alert("There was an issue submitting your inquiry. Please reach us directly on +91 9920046121.");
    } finally {
      setSubmittingContact(false);
    }
  };

  // Helper icons mapper
  const getServiceIcon = (name: string) => {
    switch (name) {
      case 'Building2': return <Building2 className="h-6 w-6 text-teal-400" />;
      case 'Stethoscope': return <Stethoscope className="h-6 w-6 text-teal-400" />;
      case 'GitMerge': return <GitMerge className="h-6 w-6 text-teal-400" />;
      case 'ShieldAlert': return <ShieldAlert className="h-6 w-6 text-teal-400" />;
      default: return <Stethoscope className="h-6 w-6 text-teal-400" />;
    }
  };

  // Projects filtration
  const filteredProjects = appContent.projects.filter(p => {
    const matchesCategory = projectFilter === 'all' || p.category === projectFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.location.toLowerCase().includes(projectSearch.toLowerCase()) ||
      (p.description || '').toLowerCase().includes(projectSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0c1222] text-gray-105' : 'bg-[#f5f8fa] text-[#0f172a] font-sans'}`}>
      
      {/* Sticky Top Transparent Navigation */}
      <Header 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        isDark={isDark} 
        setIsDark={setIsDark}
        onOpenConsult={() => setShowConsultModal(true)}
      />

      {/* Corporate State-driven Views Router */}
      <AnimatePresence mode="wait">
        
        {/* HOMEPAGE VIEW */}
        {currentPage === 'home' && (
          <motion.div
            key="home-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Immersive Landing Hero Section */}
            <Hero 
              hero={appContent.hero} 
              contactInfo={appContent.contactInfo} 
              onOpenConsult={() => setShowConsultModal(true)}
              onNavigate={setCurrentPage}
              isDark={isDark}
            />

            {/* About / Deep Corporate Alignment values section */}
            <section id="about-corporate-values" className="py-24 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  
                  {/* Left content describing Concept, Team, Vision */}
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-bold block">
                      OUR CORPORATE CREDENTIALS
                    </span>
                    <h2 className={`text-3xl sm:text-4xl font-sans font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                      Turning Your Healthcare Concept Into Seamless Operational Uptime
                    </h2>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-650'}`}>
                      NB Healthcare & Hospital Consultancy is a specialized consultancy firm dedicated to delivering comprehensive solutions for healthcare facility development. Our expertise spans all facets of hospital planning, from conceptualization to completion.
                    </p>
                    <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-350' : 'text-slate-600'}`}>
                      Whether it's a brand-new specialty hospital or an existing one in need of operational optimization, we partner with architects, medical directors, and equipment brands to implement solutions that guarantee superior operational efficiency.
                    </p>

                    {/* Team skill list bullets describing architects, clinicians */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-900/60">
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold text-teal-400">Multidisciplinary Team</h4>
                        <ul className="text-xs space-y-1 text-slate-400">
                          <li>&bull; Hospital Architects</li>
                          <li>&bull; Interior Designers</li>
                          <li>&bull; Biomedical Engineers</li>
                        </ul>
                      </div>
                      <div className="space-y-2">
                        <h4 className="text-xs font-mono uppercase tracking-wider font-extrabold text-teal-400">Project Support</h4>
                        <ul className="text-xs space-y-1 text-slate-400">
                          <li>&bull; Execution Managers</li>
                          <li>&bull; Financial Analysts</li>
                          <li>&bull; Clinical IT Professionals</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Right side bento-ish cards showcasing Our Process */}
                  <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`p-6 border rounded-3xl ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'}`}>
                      <span className="text-xs font-mono tracking-wider font-bold text-teal-500">01. Impartial selection</span>
                      <h4 className={`font-sans font-bold text-sm mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Unbiased Sourcing</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        We execute unbiased selections of MEP civil contractors and premium medical equipment vendors to protect hospital margins.
                      </p>
                    </div>

                    <div className={`p-6 border rounded-3xl ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'}`}>
                      <span className="text-xs font-mono tracking-wider font-bold text-teal-500">02. Singlepoint coordination</span>
                      <h4 className={`font-sans font-bold text-sm mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Streamlined Liaison</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        We act as the single-point-of-contact, seamlessly linking your core architects with clinical builders.
                      </p>
                    </div>

                    <div className={`p-6 border rounded-3xl ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'}`}>
                      <span className="text-xs font-mono tracking-wider font-bold text-teal-500">03. Exact requirements</span>
                      <h4 className={`font-sans font-bold text-sm mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Precision Utility Mappings</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Meticulously gather tech specs from manufacturers to layout physical rooms correctly before equipment arrives.
                      </p>
                    </div>

                    <div className={`p-6 border rounded-3xl ${isDark ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200/80 shadow-md'}`}>
                      <span className="text-xs font-mono tracking-wider font-bold text-teal-500">04. Accreditation</span>
                      <h4 className={`font-sans font-bold text-sm mt-1.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>NABH Standards Alignment</h4>
                      <p className={`text-xs mt-1.5 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        Avoid costly reconstruction delays. We design sterile corridors and critical systems that comply with guidelines on day one.
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </motion.div>
        )}

        {/* SERVICES VIEW */}
        {currentPage === 'services' && (
          <motion.div
            key="services-page"
            className="py-32"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-mono tracking-widest text-teal-500 font-bold uppercase">PROVEN CAPABILITIES</span>
                <h2 className={`text-3xl sm:text-4xl font-sans font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Turnkey Healthcare Architecture & Advisory</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Whether establishing a new corporate ICU wing or auditing biological machinery uptime, we deliver rigorous specialist solutions.
                </p>
              </div>

              {/* Grid block displaying interactive cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {appContent.services.map((srv) => (
                  <motion.div
                    key={srv.id}
                    id={`service-card-${srv.id}`}
                    onClick={() => setSelectedService(srv)}
                    className={`p-6 border rounded-3xl hover:border-teal-500/30 transition-all cursor-pointer relative overflow-hidden group space-y-4 flex flex-col justify-between ${
                      isDark ? 'bg-[#111a30] border-slate-800' : 'bg-white border-slate-205 shadow-lg shadow-slate-100/50'
                    }`}
                    whileHover={{ y: -6 }}
                  >
                    <div className="space-y-4">
                      <div className={`h-12 w-12 rounded-2xl border flex items-center justify-center ${
                        isDark ? 'bg-teal-950/60 border-teal-500/20' : 'bg-teal-50/80 border-teal-200'
                      }`}>
                        {getServiceIcon(srv.icon)}
                      </div>
                      <div>
                        <h4 className={`font-sans font-extrabold text-base transition-colors ${
                          isDark ? 'text-white' : 'text-slate-950'
                        } group-hover:text-teal-500`}>
                          {srv.title}
                        </h4>
                        <p className={`text-xs mt-2 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
                          {srv.description}
                        </p>
                      </div>
                    </div>

                    <div className={`pt-4 border-t flex items-center justify-between text-xs font-mono font-bold transition-colors ${
                      isDark ? 'border-slate-800/60 text-teal-450 group-hover:text-teal-400' : 'border-slate-100 text-sky-600 group-hover:text-sky-550'
                    }`}>
                      <span>LEARN SPECS</span>
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CREDENTIALS/PROJECTS VIEW */}
        {currentPage === 'projects' && (
          <motion.div
            key="projects-page"
            className="py-32"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-mono tracking-widest text-teal-500 font-bold uppercase">CORPORATE REGISTRY</span>
                <h2 className={`text-3xl sm:text-4xl font-sans font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Major Completed Healthcare Deployments</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  We have planned, audited, and commissioned hospital projects spanning sizes from 20 up to 150 beds across multiple regions of India.
                </p>
              </div>

              {/* Search & Filtration Toolbar */}
              <div className={`border rounded-3xl p-6 flex flex-col md:flex-row gap-4 items-center justify-between ${
                isDark ? 'bg-[#111a30] border-slate-800' : 'bg-white border-slate-205 shadow-md'
              }`}>
                
                {/* Search Bar query */}
                <div className="relative w-full md:max-w-xs">
                  <span className="absolute left-3.5 top-3.5 text-slate-500"><Search className="h-4 w-4" /></span>
                  <input
                    type="text"
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    placeholder="Search by city, bed count, or name..."
                    className={`w-full border rounded-xl py-2.5 pl-10 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                      isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                    }`}
                  />
                </div>

                {/* Filters toolbar */}
                <div className="flex flex-wrap gap-2 justify-end w-full md:w-auto">
                  {[
                    { id: 'all', label: 'All Projects' },
                    { id: 'cardiac', label: 'Cardiac Care' },
                    { id: 'maternity', label: 'Maternity Child' },
                    { id: 'ot_icu', label: 'Modular OT & ICU' },
                    { id: 'general', label: 'General Corporate' },
                    { id: 'biomedical', label: 'Clinical Auditing' }
                  ].map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setProjectFilter(filter.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer ${
                        projectFilter === filter.id 
                          ? 'bg-teal-600 text-white' 
                          : isDark 
                            ? 'bg-slate-950 text-slate-400 hover:text-white hover:bg-slate-850' 
                            : 'bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200'
                      }`}
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>

              </div>

              {/* Before/After sliding representation */}
              <div className={`border rounded-3xl p-6 space-y-4 ${
                isDark ? 'bg-[#111a30] border-slate-800' : 'bg-white border-slate-200 shadow-md'
              }`}>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-teal-500 animate-pulse" />
                  <h3 className={`font-sans font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Before/After Architectural Remodeling</h3>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Drag slide handle to see our QHT Dehradun standard renovation layout compared to raw structure.</p>
                <div className="relative w-full h-[320px] rounded-2xl overflow-hidden select-none">
                  {/* Left: After */}
                  <img src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200" referrerPolicy="no-referrer" className="absolute inset-0 w-full h-full object-cover" alt="After" />
                  
                  {/* Left badge - AFTER */}
                  <div className="absolute left-4 top-4 bg-teal-500/90 text-white font-mono text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg shadow-md z-10 select-none pointer-events-none uppercase tracking-widest">
                    Completed OT Layout (After)
                  </div>

                  {/* Right: Before */}
                  <div className="absolute inset-y-0 right-0 overflow-hidden" style={{ left: `${sliderPosition}%` }}>
                    <img 
                      src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&q=80&w=1200" 
                      referrerPolicy="no-referrer"
                      className="absolute top-0 right-0 h-full object-cover" 
                      style={{ width: '100%', maxWidth: 'none' }}
                      alt="Before" 
                    />
                  </div>

                  {/* Right badge - BEFORE */}
                  <div className="absolute right-4 top-4 bg-slate-900/90 text-white font-mono text-[9px] sm:text-[10px] font-bold px-2 py-1 rounded-lg shadow-md z-10 select-none pointer-events-none uppercase tracking-widest">
                    Raw Concrete Shell (Before)
                  </div>

                  {/* Range slider input overlaid */}
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    value={sliderPosition} 
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-20" 
                  />

                  {/* Visual slide divider */}
                  <div className="absolute inset-y-0 w-1 bg-teal-400 shadow-lg pointer-events-none z-10" style={{ left: `${sliderPosition}%` }}>
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-8 w-8 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center text-white font-extrabold text-xs shadow-md">
                      ↔
                    </div>
                  </div>
                </div>
              </div>

              {/* Results grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className={`p-6 border rounded-3xl hover:border-teal-500/20 transition-all cursor-pointer relative space-y-4 flex flex-col justify-between ${
                      isDark ? 'bg-[#111a30] border-slate-800' : 'bg-white border-slate-205 shadow-lg shadow-slate-100/50'
                    }`}
                  >
                    <div>
                      <div className={`flex items-center justify-between gap-2 border-b pb-3 ${isDark ? 'border-slate-850' : 'border-slate-100'}`}>
                        <div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-500 font-bold">{proj.category.toUpperCase()}</span>
                          <h4 className={`font-sans font-bold text-base mt-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>{proj.name}</h4>
                        </div>
                        <span className={`text-[10px] border px-2 py-0.5 rounded font-semibold font-mono tracking-wider shrink-0 uppercase ${
                          isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                        }`}>
                          {proj.status}
                        </span>
                      </div>

                      <div className={`space-y-2 mt-4 text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <p><span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Location:</span> {proj.location}</p>
                        <p><span className={`font-semibold ${isDark ? 'text-slate-300' : 'text-slate-800'}`}>Bed Count:</span> {proj.beds}</p>
                        <p className={`line-clamp-2 mt-2 font-sans ${isDark ? 'text-slate-450' : 'text-slate-505 italic'}`}>"{proj.description}"</p>
                      </div>
                    </div>

                    <div className={`text-xs font-mono font-bold flex items-center gap-1 ${
                      isDark ? 'text-teal-450 hover:text-teal-400' : 'text-sky-650 hover:text-sky-500'
                    }`}>
                      READ PLANNING BRIEF &rarr;
                    </div>
                  </div>
                ))}

                {filteredProjects.length === 0 && (
                  <p className={`p-12 text-center col-span-full ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>No completed project nodes match your filter queries.</p>
                )}
              </div>

            </div>
          </motion.div>
        )}

        {/* GALLERY VIEW */}
        {currentPage === 'gallery' && (
          <motion.div
            key="gallery-page"
            className="py-32"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-mono tracking-widest text-teal-500 font-bold uppercase">PORTFOLIO OVERVIEW</span>
                <h2 className={`text-3xl sm:text-4xl font-sans font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Clinical Architecture Environments</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Click on any environment node below to enlarge and examine the specific modular designs.
                </p>
              </div>

              {/* Pinterest columns style card list */}
              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {appContent.gallery.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxImage({ url: item.image, title: item.title, description: item.description })}
                    className={`break-inside-avoid border rounded-3xl overflow-hidden relative group cursor-pointer shadow-md transition-all ${
                      isDark ? 'bg-[#111a30] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-205 hover:border-slate-300'
                    }`}
                  >
                    <img src={item.image} referrerPolicy="no-referrer" className="w-full h-auto object-cover max-h-[350px] group-hover:scale-102 transition-transform duration-300" alt={item.title} />
                    <div className="p-5 space-y-2 select-none">
                      <span className={`text-[10px] font-mono uppercase border px-2 py-0.5 rounded ${
                        isDark ? 'bg-slate-950 border-slate-800 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-700'
                      }`}>
                        {item.category}
                      </span>
                      <h4 className={`font-sans font-extrabold text-sm mt-1 ${isDark ? 'text-white' : 'text-slate-950'}`}>{item.title}</h4>
                      <p className={`text-xs font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-655'}`}>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* INSIGHTS VIEW (BLOGS) */}
        {currentPage === 'blog' && (
          <motion.div
            key="blog-page"
            className="py-32"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 col-span-3">
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <span className="text-xs font-mono tracking-widest text-teal-500 font-bold uppercase">EDITORIAL INSIGHTS</span>
                <h2 className={`text-3xl sm:text-4xl font-sans font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Hospital Setup & Procurement Audits</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Practical guidelines authored directly by our certification consultants, space architects, and calibration engineers.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {appContent.blogs.map((b) => (
                  <div key={b.id} className={`border rounded-3xl overflow-hidden relative flex flex-col justify-between transition-all ${
                    isDark ? 'bg-[#111a30] border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 shadow-lg shadow-slate-100/50 hover:border-slate-300'
                  }`}>
                    <div>
                      <img src={b.image} referrerPolicy="no-referrer" className="w-full h-48 object-cover object-center transition-all duration-350 hover:scale-[1.015]" alt={b.title} />
                      <div className="p-6 space-y-3">
                        <div className={`flex items-center gap-3 text-xs font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                          <span>{b.date}</span>
                          <span>&bull;</span>
                          <span>{b.readTime}</span>
                        </div>
                        <h4 className={`font-sans font-extrabold text-base leading-snug transition-colors ${
                          isDark ? 'text-white' : 'text-slate-950'
                        } hover:text-teal-500`}>
                          {b.title}
                        </h4>
                        <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          {b.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className={`px-6 pb-6 pt-3 border-t flex items-center justify-between text-xs font-mono font-bold transition-all ${
                      isDark ? 'border-slate-800/60 text-teal-400 hover:text-teal-400' : 'border-slate-100 text-sky-600 hover:text-sky-550'
                    }`}>
                      <button 
                        onClick={() => setSelectedBlog(b)} 
                        className="bg-transparent border-none p-0 cursor-pointer font-bold select-none uppercase tracking-wider flex items-center justify-between w-full"
                      >
                        <span>READ INSIGHTS &rarr;</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* FAQS VIEW */}
        {currentPage === 'faq' && (
          <motion.div
            key="faq-page"
            className="py-32"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-4">
                <span className="text-xs font-mono tracking-widest text-teal-500 font-bold uppercase">KNOWLEDGE INDEX</span>
                <h2 className={`text-3xl sm:text-4xl font-sans font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Answering Hospital Setup Questions</h2>
                <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  We clarify details regarding accreditation limits, supplier bias, layout retrofitting, and setup costs transparently.
                </p>
              </div>

              {/* Search board */}
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-500"><Search className="h-4.5 w-4.5" /></span>
                <input
                  type="text"
                  value={faqSearch}
                  onChange={(e) => setFaqSearch(e.target.value)}
                  placeholder="Query regarding NABH, space corridors, costs, or contracts..."
                  className={`w-full border rounded-2xl py-3.5 pl-12 pr-4 text-xs font-sans focus:outline-none focus:ring-1 focus:ring-teal-500 ${
                    isDark ? 'bg-slate-900 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-white border-slate-205 text-slate-900 placeholder-slate-400 shadow-sm'
                  }`}
                />
              </div>

              {/* Accordion rows */}
              <div className="space-y-4">
                {appContent.faqs
                  .filter(f => f.question.toLowerCase().includes(faqSearch.toLowerCase()) || f.answer.toLowerCase().includes(faqSearch.toLowerCase()))
                  .map((f) => (
                    <div 
                      key={f.id} 
                      className={`border rounded-2xl overflow-hidden transition-all ${
                        isDark ? 'border-slate-800 bg-slate-900/60' : 'border-slate-200/80 bg-white shadow-sm'
                      }`}
                    >
                      <button
                        onClick={() => setActiveFaq(activeFaq === f.id ? null : f.id)}
                        className={`w-full p-5 text-left flex items-center justify-between gap-4 font-sans font-bold text-sm transition-colors focus:outline-none ${
                          isDark ? 'text-white hover:text-teal-400' : 'text-slate-900 hover:text-teal-600'
                        }`}
                      >
                        <span>{f.question}</span>
                        <ChevronDown className={`h-4 w-4 text-slate-400 shrink-0 transition-transform ${activeFaq === f.id ? 'rotate-180' : ''}`} />
                      </button>

                      <AnimatePresence initial={false}>
                        {activeFaq === f.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className={`px-5 pb-5 pt-1 text-xs leading-relaxed font-sans border-t ${
                              isDark ? 'text-slate-400 border-slate-800' : 'text-slate-600 border-slate-100'
                            }`}>
                              {f.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* CONTACT US VIEW */}
        {currentPage === 'contact' && (
          <motion.div
            key="contact-page"
            className="py-32"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                
                {/* Left block detailing corporate information */}
                <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
                  <div className="space-y-6">
                    <span className="text-xs font-mono text-teal-500 uppercase tracking-widest font-bold">LIAISON CENTRAL</span>
                    <h2 className={`text-3xl font-sans font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>Partner With Certified Clinicians</h2>
                    <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                      NB Healthcare and Hospital Consultancy provides elite, reliable facility designs to corporate medical providers, independent doctors, and hospital developers nationwide.
                    </p>

                    <div className={`space-y-4 shrink-0 text-xs font-sans ${isDark ? 'text-slate-350' : 'text-slate-650'}`}>
                      <div className="flex gap-3">
                        <MapPin className="h-4 w-4 text-teal-500 shrink-0 mt-0.5" />
                        <div>
                          <strong className={`block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Corporate Register Address</strong>
                          {appContent.contactInfo.address}
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Phone className="h-4 w-4 text-teal-500 shrink-0" />
                        <div>
                          <strong className={`block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Hotline Helpline</strong>
                          <a href="tel:+919920046121" className="hover:text-teal-500 transition-colors">{appContent.contactInfo.phone}</a>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <Mail className="h-4 w-4 text-teal-500 shrink-0" />
                        <div>
                          <strong className={`block mb-0.5 ${isDark ? 'text-white' : 'text-slate-900'}`}>Email Directory</strong>
                          <a href={`mailto:${appContent.contactInfo.email}`} className="hover:text-teal-500 transition-colors">{appContent.contactInfo.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dynamic Google Maps layout */}
                  <div className={`h-56 border rounded-2xl overflow-hidden relative ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-205 shadow-md'
                  }`}>
                    <img src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=600" className="absolute inset-0 w-full h-full object-cover opacity-15 grayscale" alt="Map Area" />
                    <div className="absolute inset-0 p-5 flex flex-col justify-between z-10">
                      <div>
                        <h5 className={`font-sans font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>Hospital Sourcing Headquarters</h5>
                        <p className={`text-[10px] font-mono mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Kalyan (W) - Greater Mumbai region</p>
                      </div>

                      <a 
                        href={appContent.contactInfo.googleMapsUrl} 
                        target="_blank" 
                        referrerPolicy="no-referrer"
                        className={`border text-[10px] font-mono font-bold px-4 py-2.5 rounded-lg flex items-center justify-between transition-colors ${
                          isDark 
                            ? 'bg-slate-950/90 border-slate-800 hover:bg-slate-900 text-slate-300 hover:text-white' 
                            : 'bg-white/95 border-slate-200 hover:bg-slate-50 text-slate-700 hover:text-slate-900 shadow-sm'
                        }`}
                      >
                        <span>GET GOOGLE MAP DIRECTIONS</span>
                        <ExternalLink className="h-3 w-3 text-teal-500" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right block: validated Inquiry input */}
                <div className="lg:col-span-7">
                  <div className={`border rounded-3xl p-8 relative overflow-hidden ${
                    isDark ? 'bg-[#111a30] border-slate-800' : 'bg-white border-slate-205 shadow-lg shadow-slate-100/50'
                  }`}>
                    
                    {contactSuccess ? (
                      <motion.div 
                        className="p-8 text-center space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="mx-auto h-16 w-16 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                          <CheckCircle2 className="h-8 w-8 animate-bounce" />
                        </div>
                        <h3 className={`text-xl font-sans font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Proposal Successfully Slated</h3>
                        <p className={`text-sm leading-relaxed max-w-sm mx-auto ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                          Thank you for connecting with NB Consultancy. Our design office is auditing your clinical specifications. A senior planning advisor will call you within 12 hours.
                        </p>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-5">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
                            isDark ? 'bg-teal-950 border border-teal-500/30 text-teal-450' : 'bg-teal-50 border border-teal-200 text-teal-600'
                          }`}>
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className={`font-sans font-bold text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>Slated Project Advisory Session</h3>
                            <p className={`text-xs mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Please specify your requirements below.</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Your Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Dr. Shaik Afshaan"
                              value={contactForm.name}
                              onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none ${
                                isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Contact Telephone</label>
                            <input
                              type="tel"
                              required
                              placeholder="+91 9920046121"
                              value={contactForm.phone}
                              onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none ${
                                isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Email Directory (Optional)</label>
                            <input
                              type="email"
                              placeholder="nbconsultancy1979@gmail.com"
                              value={contactForm.email}
                              onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none ${
                                isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                              }`}
                            />
                          </div>

                          <div>
                            <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Hospital Name / Board</label>
                            <input
                              type="text"
                              placeholder="SRK Lifecare Andheri"
                              value={contactForm.hospitalName}
                              onChange={(e) => setContactForm({ ...contactForm, hospitalName: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none ${
                                isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>City Location</label>
                            <input
                              type="text"
                              placeholder="Mumbai, Kalyan"
                              value={contactForm.location}
                              onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                              className={`w-full border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none ${
                                isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                              }`}
                            />
                          </div>
                        </div>

                        <div>
                          <label className={`block text-[10px] font-mono uppercase tracking-widest mb-1.5 font-bold ${isDark ? 'text-slate-500' : 'text-slate-600'}`}>Requirement Details</label>
                          <textarea
                            required
                            rows={3}
                            placeholder="Need NABH-compliant space layouts, modular OT utility checks, and contract biomedical staffing setups..."
                            value={contactForm.requirement}
                            onChange={(e) => setContactForm({ ...contactForm, requirement: e.target.value })}
                            className={`w-full border rounded-xl px-4 py-3 text-xs focus:ring-1 focus:ring-teal-500 focus:outline-none font-sans ${
                              isDark ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-600' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                            }`}
                          />
                        </div>

                        <button
                          id="contact-form-submit-btn"
                          type="submit"
                          disabled={submittingContact}
                          className="w-full py-4.5 rounded-2xl bg-sky-600 hover:bg-sky-550 text-white text-xs font-sans font-bold uppercase tracking-widest transition-all cursor-pointer shadow-xl disabled:opacity-45"
                        >
                          {submittingContact ? "Analyzing Specifications..." : "Securely Slated Inquire"}
                        </button>
                      </form>
                    )}

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        )}

        {/* SECURITY LOCKED ADMIN PLATFORM VIEW */}
        {currentPage === 'admin' && (
          <motion.div
            key="admin-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <AdminPanel 
              appContent={appContent} 
              onUpdateAppContent={setAppContent} 
              isDark={isDark} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Services Detail specs modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              id="modal-service-detail-spec"
              className={`border rounded-3xl w-full max-w-2xl overflow-hidden relative p-8 shadow-2xl transition-all ${
                isDark ? 'bg-[#111a30] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                onClick={() => setSelectedService(null)}
                className={`absolute right-4 top-4 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className={`text-[10px] font-mono uppercase border px-2.5 py-0.5 rounded ${
                    isDark ? 'bg-slate-950 border-teal-500/30 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-700'
                  }`}>
                    Service Blueprint specifications
                  </span>
                  <h3 className={`text-2xl font-sans font-extrabold mt-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedService.title}</h3>
                </div>

                <div className="space-y-4">
                  <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-350' : 'text-slate-600'}`}>{selectedService.longDescription}</p>
                  
                  <div className={`space-y-2 pt-2 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                    <span className="block text-[10px] font-mono text-teal-500 uppercase tracking-wider font-extrabold">Functional Parameters:</span>
                    <ul className="space-y-2">
                      {selectedService.specs.map((sp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs font-sans">
                          <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className={isDark ? 'text-slate-300' : 'text-slate-705'}>{sp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className={`flex gap-3 justify-end pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                  <button 
                    onClick={() => setSelectedService(null)} 
                    className={`px-5 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                      isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    Close Specs
                  </button>
                  <button 
                    onClick={() => {
                      setSelectedService(null);
                      setCurrentPage('contact');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer font-bold"
                  >
                    Discuss With Engineer
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Project details card modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              id="modal-project-credentials-detail"
              className={`border rounded-3xl w-full max-w-xl overflow-hidden relative p-8 shadow-2xl space-y-6 transition-all ${
                isDark ? 'bg-[#111a30] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute right-4 top-4 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-755 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                <X className="h-4 w-4" />
              </button>

              <div className={`space-y-2 border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <span className={`text-[10px] font-mono uppercase border px-3 py-1 rounded-full ${
                  isDark ? 'bg-slate-950 border-slate-800 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-700 font-bold'
                }`}>
                  Deployment Credentials
                </span>
                <h3 className={`text-xl font-sans font-black pt-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>{selectedProject.name}</h3>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{selectedProject.beds} &bull; {selectedProject.location}</p>
              </div>

              <div className={`space-y-4 text-xs ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                <p className="leading-relaxed font-sans mt-2">"{selectedProject.description}"</p>
                
                {selectedProject.spaceOptimization && (
                  <div className={`p-3.5 rounded-xl ${isDark ? 'bg-slate-950/80' : 'bg-slate-50 border border-slate-100'}`}>
                    <span className="block text-[9px] font-mono text-teal-500 uppercase tracking-wider font-bold mb-1">Space Layout Planning</span>
                    <p className={`font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{selectedProject.spaceOptimization}</p>
                  </div>
                )}

                {selectedProject.equipmentConfig && (
                  <div className={`p-3.5 rounded-xl ${isDark ? 'bg-slate-950/80' : 'bg-slate-50 border border-slate-100'}`}>
                    <span className="block text-[9px] font-mono text-teal-500 uppercase tracking-wider font-bold mb-1">Equipment Configuration Sourcing</span>
                    <p className={`font-sans leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{selectedProject.equipmentConfig}</p>
                  </div>
                )}
              </div>

              <div className={`flex gap-2 justify-end pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                    isDark ? 'bg-slate-950 text-slate-400 border-slate-800' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Close details
                </button>
                <button 
                  onClick={() => {
                    setSelectedProject(null);
                    setCurrentPage('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-550 text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer font-bold"
                >
                  Consult Similar Floor Plan
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Blog Details Modal */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              id="modal-blog-reader"
              className={`border rounded-3xl w-full max-w-2xl overflow-hidden relative shadow-2xl transition-all ${
                isDark ? 'bg-[#111a30] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800 shadow-2xl'
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className={`absolute right-4 top-4 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors z-10 ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="relative h-48 sm:h-56">
                <img src={selectedBlog.image} referrerPolicy="no-referrer" className="w-full h-full object-cover" alt={selectedBlog.title} />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-[10px] font-mono uppercase bg-teal-500 text-white px-2 py-0.5 rounded font-bold">
                    Medical Consultancy Advisory Brief
                  </span>
                  <h4 className="text-lg sm:text-xl font-sans font-black text-white mt-1.5 leading-snug">{selectedBlog.title}</h4>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[50vh] overflow-y-auto">
                <div className={`flex items-center gap-4 text-[11px] font-mono pb-3 border-b ${isDark ? 'text-slate-400 border-slate-800' : 'text-slate-500 border-slate-100'}`}>
                  <span>Author: NB Advisory Staff</span>
                  <span>&bull;</span>
                  <span>{selectedBlog.date}</span>
                  <span>&bull;</span>
                  <span>{selectedBlog.readTime}</span>
                </div>
                
                <p className={`text-xs leading-relaxed whitespace-pre-line font-sans ${isDark ? 'text-slate-350' : 'text-slate-600'}`}>
                  {selectedBlog.content}
                </p>
              </div>

              <div className={`p-6 border-t flex justify-end gap-3 ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
                <button 
                  onClick={() => setSelectedBlog(null)} 
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono border transition-all ${
                    isDark ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Close Insights
                </button>
                <button 
                  onClick={() => {
                    setSelectedBlog(null);
                    setCurrentPage('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-550 text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer font-sans"
                >
                  Enquire About Setup
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <div className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute right-6 top-6 h-10 w-10 bg-slate-900 border border-slate-800 hover:bg-slate-800 text-white rounded-full flex items-center justify-center h-10 w-10 cursor-pointer shadow"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="max-w-4xl text-center space-y-4">
              <img src={lightboxImage.url} className="max-h-[70vh] rounded-2xl object-contain border border-slate-800 mx-auto" alt={lightboxImage.title} />
              <div>
                <h4 className="text-lg font-sans font-extrabold text-white">{lightboxImage.title}</h4>
                <p className="text-xs text-slate-400">{lightboxImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 5-seconds callback consultation popup */}
      <ConsultPopup onInquirySubmitSuccess={() => setContactSuccess(true)} />

      {/* AI healthcare consulting advisory widget sidebar */}
      <AIConsultant />

      {/* Quick Phone callback overlay widget */}
      <a
        id="floating-phone-callback-widget"
        href="tel:+919920046121"
        className="fixed bottom-6 right-6 z-50 h-14 w-14 bg-sky-600 text-white rounded-full flex items-center justify-center shadow-3xl hover:bg-sky-500 transition-all border border-sky-400/20 group cursor-pointer"
        title="Immediate Telephone Callback"
      >
        <Phone className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
      </a>

      {/* Bottom Footer block */}
      <footer className={`border-t py-16 transition-colors duration-300 ${isDark ? 'bg-[#0a0f1d] border-slate-900/60' : 'bg-slate-100/60 border-slate-205 shadow-inner'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          <div className="col-span-1 md:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center font-bold text-sky-500 text-base shrink-0">
                NB
              </div>
              <div>
                <h4 className={`font-sans font-bold text-sm tracking-tight mb-0.5 ${isDark ? 'text-white' : 'text-slate-950'}`}>NB Healthcare & Hospital Consultancy</h4>
                <p className="text-[10px] font-mono text-teal-500 uppercase tracking-widest leading-none font-bold">EXPERTISE. SERVICE. INTEGRITY.</p>
              </div>
            </div>
            
            <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
              Expert, impartial technical audits, planning layouts, and biomedical calibration solutions delivering fully accredited operational hospital facility developments.
            </p>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4">
            <h5 className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${isDark ? 'text-slate-500' : 'text-slate-800'}`}>Capabilities</h5>
            <ul className={`text-xs space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-650'}`}>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('services')}>New Hospital Planning</li>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('services')}>Equipment Procurement</li>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('services')}>Facility Expansion</li>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('services')}>Biomedical Calibration</li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 space-y-4">
            <h5 className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${isDark ? 'text-slate-500' : 'text-slate-800'}`}>Liaisons</h5>
            <ul className={`text-xs space-y-2 ${isDark ? 'text-slate-400' : 'text-slate-655'}`}>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('projects')}>Completed Deployments</li>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('gallery')}>Clinical Galleries</li>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('blog')}>Insights Portal</li>
              <li className="hover:text-teal-500 cursor-pointer transition-colors" onClick={() => handleNav('faq')}>Query Indexes</li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4 space-y-4">
            <h5 className={`text-[10px] font-mono uppercase tracking-wider font-extrabold ${isDark ? 'text-slate-500' : 'text-slate-800'}`}>Corporate Registers</h5>
            <p className={`text-xs leading-relaxed font-sans ${isDark ? 'text-slate-400' : 'text-slate-655'}`}>
              Padmalaya Tower, 301, Opp. Holy Cross School, Kalyan (W) - 421 301, Greater Mumbai, Maharashtra, India.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono">
              <button 
                id="footer-admin-link"
                onClick={() => setCurrentPage('admin')} 
                className={`hover:underline flex items-center gap-1 bg-transparent border-none p-0 cursor-pointer font-bold ${
                  isDark ? 'text-sky-400' : 'text-sky-700'
                }`}
              >
                Back-office Administration &rarr;
              </button>
            </div>
          </div>

        </div>

        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono ${
          isDark ? 'border-slate-800/80 text-slate-500' : 'border-slate-200 text-slate-600'
        }`}>
          <span>&copy; {new Date().getFullYear()} NB Healthcare & Hospital Consultancy. Reg No: 421301.</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-teal-500 cursor-pointer">Privacy Statement</span>
            <span>&bull;</span>
            <span className="hover:text-teal-500 cursor-pointer font-bold">Licensing Norms</span>
            <span>&bull;</span>
            <span className="hover:text-teal-500 cursor-pointer font-bold">Sitemap</span>
          </div>
        </div>
      </footer>

      {/* Pop-up dialog helper for slating */}
      <AnimatePresence>
        {showConsultModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              id="modal-quick-slating-popup"
              className={`border rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative p-8 space-y-6 transition-all ${
                isDark ? 'bg-[#111a30] border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
              }`}
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
            >
              <button
                onClick={() => setShowConsultModal(false)}
                className={`absolute right-4 top-4 h-8 w-8 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                  isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800'
                }`}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex gap-4">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDark ? 'bg-teal-950 border-teal-500/20 text-teal-400' : 'bg-teal-50 border-teal-200 text-teal-700'
                }`}>
                  <CalendarClock className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`text-xl font-sans font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>Slated Project Feasibility</h3>
                  <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Direct callback connection with our senior medical advisors.</p>
                </div>
              </div>

              <div className="space-y-4 pt-2 font-sans text-xs">
                <p className={isDark ? 'text-slate-300' : 'text-slate-650'}>
                  By booking a consultation, our specialized hospital planners, decorators, and biomedical calibrators will review your land/MEP drafts or equipment requirements.
                </p>

                <div className={`p-3.5 rounded-xl flex gap-2 ${
                  isDark ? 'bg-slate-950/80 border border-slate-900' : 'bg-slate-50 border border-slate-100'
                }`}>
                  <Info className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <p className={`text-[11px] font-mono leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    You can also submit your detailed needs through the bottom-right AI Assistant which provides auto-categorizations.
                  </p>
                </div>
              </div>

              <div className="flex gap-2 justify-end pt-2">
                <button 
                  onClick={() => setShowConsultModal(false)} 
                  className={`px-5 py-2.5 rounded-xl font-mono text-xs transition-colors ${
                    isDark ? 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white' : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button 
                  onClick={() => {
                    setShowConsultModal(false);
                    setCurrentPage('contact');
                  }}
                  className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-550 text-white text-xs font-sans font-bold uppercase tracking-wider cursor-pointer"
                >
                  Proceed to Form &rarr;
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
