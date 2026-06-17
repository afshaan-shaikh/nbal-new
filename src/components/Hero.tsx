import React from 'react';
import { ShieldCheck, Hospital, Settings, ChevronRight, Activity, ArrowDown } from 'lucide-react';
import { motion } from 'motion/react';
import { HeroContent, ContactInfo } from '../types';

interface HeroProps {
  hero: HeroContent;
  contactInfo: ContactInfo;
  onOpenConsult: () => void;
  onNavigate: (page: string) => void;
  isDark: boolean;
}

export default function Hero({ hero, contactInfo, onOpenConsult, onNavigate, isDark }: HeroProps) {
  // Stagger animate parameters
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', damping: 22 } 
    }
  };

  // Luxury slideshow state
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const slides = React.useMemo(() => [
    {
      id: 'slide_1',
      url: hero.bgImage || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=1600",
      title: 'Lounge Lobby',
      tag: 'Executive Reception'
    },
    {
      id: 'slide_2',
      url: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1600",
      title: 'Surgery Center',
      tag: 'Laminar Modular OT'
    },
    {
      id: 'slide_3',
      url: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=1600",
      title: 'Sleek Facade',
      tag: 'Sustainble Exterior'
    },
    {
      id: 'slide_4',
      url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1600",
      title: 'Precision Lab',
      tag: 'Sterilization CSSD'
    }
  ], [hero.bgImage]);

  // Auto scroll images every 6 seconds
  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section 
      id="homepage-hero-section" 
      className={`relative min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden transition-colors duration-500 ${
        isDark ? 'bg-[#05080e]' : 'bg-slate-50'
      }`}
    >
      {/* Background Cinematic Slide Layer */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <motion.div 
            key={slide.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${slide.url})`,
              zIndex: currentSlide === index ? 2 : 1
            }}
            initial={{ opacity: 0, scale: 1.0, x: '0%', y: '0%' }}
            animate={{ 
              opacity: currentSlide === index 
                ? (isDark ? 0.48 : 0.45) 
                : 0,
              scale: currentSlide === index ? 1.08 : 1.0,
              x: currentSlide === index ? '1%' : '0%',
              y: currentSlide === index ? '-0.5%' : '0%'
            }}
            transition={{ 
              opacity: { duration: 1.8, ease: "easeInOut" },
              scale: { duration: 6.2, ease: "easeOut" },
              x: { duration: 6.2, ease: "easeOut" },
              y: { duration: 6.2, ease: "easeOut" }
            }}
          />
        ))}

        {/* Elegant Glass contrast/Vignette Overlay */}
        <div className={`absolute inset-0 transition-colors duration-500 z-3 ${
          isDark 
            ? 'bg-gradient-to-b from-[#05080e]/85 via-[#05080e]/75 to-[#05080e]' 
            : 'bg-gradient-to-tr from-sky-50/35 via-white/30 to-teal-50/35'
        }`} />
        
        {/* Modern Vector Grid Overlay */}
        <div className={`absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] transition-opacity duration-500 z-4 ${
          isDark ? 'opacity-15' : 'opacity-[0.06]'
        }`} />
        
        {/* Blurred luxury floating gradient colors */}
        <div className={`absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px] transition-colors duration-500 z-4 ${
          isDark ? 'bg-sky-500/10' : 'bg-sky-400/15'
        }`} />
        <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] transition-colors duration-500 z-4 ${
          isDark ? 'bg-teal-500/10' : 'bg-[#14b8a6]/15'
        }`} />

        {/* Elegant abstract premium circular paths */}
        {!isDark && (
          <div className="absolute right-[5%] top-1/4 w-[550px] h-[550px] opacity-[0.1] pointer-events-none select-none animate-pulse duration-[6000ms] hidden lg:block z-4">
            <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-slate-700">
              <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="0.08" strokeDasharray="1 3" />
              <circle cx="50" cy="50" r="35" stroke="currentColor" strokeWidth="0.12" />
              <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="0.06" strokeDasharray="2 2" />
              <path d="M5 50 H95 M50 5 V95" stroke="currentColor" strokeWidth="0.05" />
              <polygon points="50,15 85,50 50,85 15,50" stroke="currentColor" strokeWidth="0.04" strokeDasharray="1 1" />
            </svg>
          </div>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Accreditation Badge */}
            <motion.div 
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-widest font-bold border transition-colors duration-500 ${
                isDark 
                  ? 'bg-teal-950/40 border-teal-500/35 text-teal-400' 
                  : 'bg-teal-500/10 border-teal-500/20 text-teal-800 shadow-sm shadow-teal-100'
              }`}
              variants={itemVariants}
            >
              <ShieldCheck className={`h-4 w-4 animate-pulse shrink-0 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
              NABH COMPLIANT HOSPITAL ARCHITECTURES
            </motion.div>

            {/* Typography Heading */}
            <motion.h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-sans font-black tracking-tight leading-[1.05] transition-all duration-500 ${
                isDark 
                  ? 'text-white' 
                  : 'bg-gradient-to-r from-slate-900 via-sky-950 to-teal-900 bg-clip-text text-transparent'
              }`}
              variants={itemVariants}
            >
              {hero.headline}
            </motion.h1>

            {/* Subheadline support text */}
            <motion.p 
              className={`text-base sm:text-lg leading-relaxed font-sans max-w-xl transition-colors duration-500 ${
                isDark ? 'text-slate-300' : 'text-slate-700 font-medium'
              }`}
              variants={itemVariants}
            >
              {hero.subheadline}
            </motion.p>

            {/* Action buttons CTA */}
            <motion.div 
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
              variants={itemVariants}
            >
              <button
                id="hero-cta-button-consult"
                onClick={onOpenConsult}
                className={`font-sans font-extrabold uppercase tracking-widest text-xs px-8 py-4.5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] ${
                  isDark 
                    ? 'bg-sky-600 hover:bg-sky-550 text-white shadow-xl shadow-sky-950/50' 
                    : 'bg-gradient-to-r from-sky-600 to-teal-600 hover:from-sky-550 hover:to-teal-550 text-white shadow-lg shadow-sky-600/20 hover:shadow-sky-600/30'
                }`}
              >
                {hero.ctaText}
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                id="hero-cta-button-credentials"
                onClick={() => onNavigate('projects')}
                className={`font-sans font-extrabold uppercase tracking-widest text-xs px-8 py-4.5 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 ${
                  isDark 
                    ? 'bg-transparent hover:bg-slate-900 border border-slate-800 text-slate-300 hover:text-white' 
                    : 'bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-slate-900 shadow-sm shadow-slate-100'
                }`}
              >
                Completed Deployments
              </button>
            </motion.div>

            {/* Quick credentials counts overlay */}
            <motion.div 
              className={`grid grid-cols-3 gap-6 pt-10 border-t max-w-lg transition-colors duration-500 ${
                isDark ? 'border-slate-900' : 'border-slate-200/80'
              }`}
              variants={itemVariants}
            >
              <div>
                <span className={`block text-2xl sm:text-3xl font-black font-sans transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>25+</span>
                <span className={`block text-[10px] font-mono uppercase tracking-widest mt-1 transition-colors duration-505 ${isDark ? 'text-slate-400' : 'text-slate-500 font-bold'}`}>Hospitals Setup</span>
              </div>
              <div>
                <span className={`block text-2xl sm:text-3xl font-black font-sans transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>100%</span>
                <span className={`block text-[10px] font-mono uppercase tracking-widest mt-1 transition-colors duration-505 ${isDark ? 'text-slate-400' : 'text-slate-500 font-bold'}`}>NABH Compliant</span>
              </div>
              <div>
                <span className={`block text-2xl sm:text-3xl font-black font-sans transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>40+</span>
                <span className={`block text-[10px] font-mono uppercase tracking-widest mt-1 transition-colors duration-505 ${isDark ? 'text-slate-400' : 'text-slate-500 font-bold'}`}>Cities Served</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column Custom Bento Graphic Cards */}
          <div className="lg:col-span-5 relative hidden lg:block">
            <motion.div 
              className="relative w-full aspect-square"
              variants={itemVariants}
            >
              {/* Outer decorative glowing ring */}
              <div className={`absolute inset-0 rounded-full border animate-spin [animation-duration:40s] transition-colors duration-500 ${
                isDark ? 'border-teal-500/10' : 'border-teal-500/20'
              }`} />
              <div className={`absolute inset-12 rounded-full border animate-spin [animation-duration:20s] [animation-direction:reverse] transition-colors duration-500 ${
                isDark ? 'border-sky-500/10' : 'border-sky-500/20'
              }`} />

              {/* Central Floating bento card 1 */}
              <motion.div 
                className={`absolute inset-x-8 top-16 border rounded-3xl p-6 shadow-2xl relative overflow-hidden flex gap-4 transition-all duration-500 ${
                  isDark 
                    ? 'bg-slate-900/90 border-slate-800 text-white' 
                    : 'bg-white/85 backdrop-blur-md border-teal-100 shadow-xl shadow-teal-900/5 text-slate-800'
                }`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                  isDark 
                    ? 'bg-teal-950 border-teal-500/30 text-teal-400' 
                    : 'bg-teal-50 border-teal-200 text-teal-600 shadow-sm shadow-teal-100'
                }`}>
                  <Hospital className="h-6 w-6" />
                </div>
                <div>
                  <h4 className={`font-sans font-bold text-sm transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Modular OT Complexes</h4>
                  <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Designed and audited 21 laminar positive pressure theaters for QHT Clinic Dehradun.
                  </p>
                </div>
              </motion.div>

              {/* Floating bento card 2 */}
              <motion.div 
                className={`absolute top-52 right-4 border rounded-3xl p-6 shadow-2xl relative overflow-hidden flex gap-4 max-w-[340px] transition-all duration-500 ${
                  isDark 
                    ? 'bg-slate-900/90 border-slate-800 text-white' 
                    : 'bg-white/90 backdrop-blur-md border-sky-100 shadow-xl shadow-sky-900/5 text-slate-800'
                }`}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', damping: 20 }}
              >
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 border transition-all duration-500 ${
                  isDark 
                    ? 'bg-sky-950 border-sky-500/30 text-sky-400' 
                    : 'bg-sky-50 border-sky-200 text-sky-600 shadow-sm shadow-sky-100'
                }`}>
                  <Activity className="h-6 w-6" />
                </div>
                <div>
                  <h4 className={`font-sans font-bold text-sm transition-colors duration-500 ${isDark ? 'text-white' : 'text-slate-900'}`}>Rigorous Layout Auditing</h4>
                  <p className={`text-xs mt-1 leading-relaxed transition-colors duration-500 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                    Zero-bias calibration of imaging systems, cathode maps, & gas networks.
                  </p>
                </div>
              </motion.div>

              {/* Floating tech badge card 3 */}
              <motion.div 
                className={`absolute left-4 bottom-20 border rounded-2xl pl-[18px] pt-[10px] pb-[18px] pr-[19px] ml-[-3px] mb-[57px] shadow-2xl flex items-center gap-3 transition-all duration-500 ${
                  isDark 
                    ? 'bg-slate-900/95 border-slate-800/80' 
                    : 'bg-white/90 border-slate-200/80 text-slate-800 shadow-lg'
                }`}
                whileHover={{ y: -4 }}
              >
                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                <span className={`text-xs font-mono font-medium tracking-wide transition-colors duration-500 ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Biomedical Calibration: Certified
                </span>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>

        {/* Scroll Indicator */}
        <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-500 cursor-pointer ${
          isDark ? 'text-slate-500 hover:text-white' : 'text-slate-400 hover:text-slate-800'
        }`} onClick={() => onNavigate('services')}>
          <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Discover Services</span>
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown className={`h-4 w-4 ${isDark ? 'text-teal-400' : 'text-teal-600'}`} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
