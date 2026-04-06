import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import CaseStudy from './components/CaseStudy';
import { 
  MapPin, 
  Clock, 
  Mail, 
  Github, 
  Linkedin, 
  ExternalLink, 
  ChevronRight, 
  Briefcase,
  Image as ImageIcon, 
  MessageSquare,
  ArrowUpRight,
  Terminal,
  Cpu,
  Cloud,
  FileText,
  Download,
  X,
  User,
  Lightbulb,
  BookOpen,
  Quote,
  CheckCircle2,
  Sun,
  Moon
} from 'lucide-react';

// --- Theme Context ---
const ThemeContext = createContext<{ theme: 'light' | 'dark', toggleTheme: () => void }>({
  theme: 'dark',
  toggleTheme: () => {},
});

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// --- Components ---

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[150] p-1 rounded-2xl glass group transition-all duration-500 hover:scale-110 active:scale-95 pointer-events-auto"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-12 h-20 bg-foreground/5 rounded-xl overflow-hidden border border-foreground/10 flex flex-col items-center justify-between py-2">
        {/* Switch Track */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-foreground/10" />
        
        {/* Switch Handle */}
        <motion.div 
          animate={{ y: theme === 'dark' ? 0 : 36 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-8 h-8 rounded-lg bg-foreground shadow-lg flex items-center justify-center z-10"
        >
          {theme === 'dark' ? (
            <Moon size={16} className="text-background" />
          ) : (
            <Sun size={16} className="text-background" />
          )}
        </motion.div>

        <div className="flex flex-col items-center gap-4 text-[8px] font-bold uppercase tracking-tighter text-muted/50 select-none">
          <span>ON</span>
          <span>OFF</span>
        </div>
      </div>
    </button>
  );
};

const Loader = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center"
    >
      <div className="relative">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-4xl font-bold tracking-tighter text-foreground"
        >
          Asmit Dash<span className="text-blue-500">.</span>
        </motion.div>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute -bottom-4 left-0 h-[2px] bg-blue-500"
        />
      </div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-xs font-mono text-muted uppercase tracking-[0.4em]"
      >
        Initializing Studio
      </motion.p>
    </motion.div>
  );
};

const Modal = ({ isOpen, onClose, title, children }: { isOpen: boolean, onClose: () => void, title: string, children: React.ReactNode }) => (
  <AnimatePresence>
    {isOpen && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden glass rounded-[2.5rem] shadow-2xl flex flex-col"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-bold">{title}</h2>
            <div className="flex items-center gap-2">
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted hover:text-white"
                title="Open in New Tab"
              >
                <ExternalLink size={20} />
              </a>
              <a 
                href="/resume.pdf" 
                download="Asmit_Dash_Resume.pdf"
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted hover:text-white"
                title="Download PDF"
              >
                <Download size={20} />
              </a>
              <button 
                onClick={onClose} 
                className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted hover:text-white"
                title="Close"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <div className="overflow-y-auto p-8 sm:p-12 custom-scrollbar">
            {children}
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
);

const StatusPill = ({ icon: Icon, text, color = "bg-green-500/10 text-green-400" }: { icon: any, text: string, color?: string }) => (
  <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border border-white/5 ${color}`}>
    <Icon size={14} />
    {text}
  </div>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle: string }) => (
  <div className="mb-12">
    <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">{subtitle}</span>
    <h2 className="text-4xl sm:text-5xl font-bold mt-2">{title}</h2>
  </div>
);

const NavItem = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active?: boolean, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 relative group ${
      active ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
    }`}
  >
    {!active && (
      <motion.div 
        layoutId="nav-hover"
        className="absolute inset-0 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      />
    )}
    <Icon size={18} className="relative z-10" />
    <span className="hidden sm:inline text-sm font-medium relative z-10">{label}</span>
  </button>
);

const ProjectCard = ({ title, description, tags, image, link, onClick }: { title: string, description: string, tags: string[], image: string, link?: string, onClick?: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    onClick={onClick}
    className={`group relative overflow-hidden rounded-3xl border border-border bg-white/[0.02] transition-all duration-500 hover:border-white/20 ${onClick ? 'cursor-pointer' : ''}`}
  >
    <div className="aspect-video overflow-hidden">
      <img 
        src={image} 
        alt={title} 
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-6 sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h3>
          <p className="mt-2 text-muted leading-relaxed">{description}</p>
        </div>
        {link && (
          <a href={link} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowUpRight size={20} />
          </a>
        )}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {tags.map(tag => (
          <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-xs text-muted">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </motion.div>
);

const JournalItem = ({ date, title, category }: { date: string, title: string, category: string }) => (
  <div className="group flex items-center justify-between py-4 border-b border-border hover:px-2 transition-all duration-300 cursor-pointer">
    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
      <span className="text-xs font-mono text-muted uppercase tracking-widest">{date}</span>
      <h4 className="text-base font-medium text-foreground group-hover:text-white transition-colors">{title}</h4>
    </div>
    <div className="flex items-center gap-4">
      <span className="hidden sm:inline text-xs text-muted/60 italic">{category}</span>
      <ChevronRight size={16} className="text-muted group-hover:translate-x-1 transition-transform" />
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('Work');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  const [view, setView] = useState<'home' | 'case-study' | 'about' | 'thoughts'>('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: false,
    timeZone: 'Asia/Kolkata'
  });

  if (isLoading) {
    return <AnimatePresence><Loader onComplete={() => setIsLoading(false)} /></AnimatePresence>;
  }

  if (view === 'case-study') {
    return <CaseStudy onBack={() => setView('home')} />;
  }

  return (
    <div className="min-h-screen bg-background selection:bg-foreground/10 selection:text-foreground">
      <ThemeToggle />
      
      {/* Top Branding */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 flex justify-between items-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter pointer-events-auto cursor-pointer group"
          onClick={() => setView('home')}
        >
          <span className="text-muted group-hover:text-foreground transition-colors">Asmit</span> Dash<span className="text-blue-500">.</span>
        </motion.div>
      </nav>

      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-2 py-2 rounded-full flex items-center gap-1 shadow-2xl shadow-black/50">
          <NavItem 
            icon={Briefcase} 
            label="Work" 
            active={view === 'home'} 
            onClick={() => setView('home')} 
          />
          <NavItem 
            icon={User} 
            label="About" 
            active={view === 'about'} 
            onClick={() => setView('about')} 
          />
          <NavItem 
            icon={Lightbulb} 
            label="Thoughts" 
            active={view === 'thoughts'} 
            onClick={() => setView('thoughts')} 
          />
          <NavItem 
            icon={MessageSquare} 
            label="Message" 
            active={isMessageOpen} 
            onClick={() => setIsMessageOpen(true)} 
          />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-12 pb-32 sm:px-12 sm:pt-24">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section - Bento Grid */}
              <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Main Intro */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="md:col-span-3 glass rounded-[2.5rem] p-8 sm:p-12 flex flex-col justify-between min-h-[400px] group"
                >
                  <div className="flex flex-wrap gap-3">
                    <StatusPill icon={MapPin} text="Mumbai, India" />
                    <StatusPill icon={Clock} text={`${timeString} IST`} color="bg-blue-500/10 text-blue-400" />
                    <StatusPill icon={Terminal} text="Available for Hire" />
                  </div>
                  
                  <div className="mt-12">
                    <h1 className="text-5xl sm:text-7xl font-bold tracking-tight leading-[1.1]">
                      Asmit Dash <span className="text-muted italic font-light">—</span> AI Automation Engineer
                    </h1>
                    <p className="mt-8 text-xl text-muted max-w-2xl leading-relaxed group-hover:text-foreground transition-colors duration-500">
                      Building production-ready ML pipelines and GenAI solutions. 
                      Currently automating complex workflows at Deloitte.
                    </p>
                  </div>

                  <div className="mt-12 flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => setIsResumeOpen(true)}
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-white/90 transition-all active:scale-95 shadow-lg shadow-white/10"
                    >
                      <FileText size={18} />
                      View Resume
                    </button>
                    
                    <a 
                      href="/resume.pdf" 
                      download="Asmit_Dash_Resume.pdf"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all active:scale-95"
                    >
                      <Download size={18} />
                      Download
                    </a>
                    
                    <div className="flex items-center gap-6 ml-2">
                      <a href="https://github.com/asmitdash" target="_blank" rel="noopener" className="text-muted hover:text-white transition-all hover:scale-110">
                        <Github size={24} />
                      </a>
                      <a href="https://linkedin.com/in/asmitdash" target="_blank" rel="noopener" className="text-muted hover:text-white transition-all hover:scale-110">
                        <Linkedin size={24} />
                      </a>
                      <a href="mailto:asmitdash44@gmail.com" className="text-muted hover:text-white transition-all hover:scale-110">
                        <Mail size={24} />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Side Bento Cells */}
                <div className="grid grid-cols-1 gap-4">
                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="glass rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-blue-500/30 transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-500">
                      <Cpu className="text-foreground group-hover:text-blue-400 transition-colors" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold">GenAI Expert</h3>
                    <p className="text-sm text-muted mt-2">Llama 3.2, GPT-4, RAG</p>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-purple-500/30 transition-all duration-500"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-500">
                      <Cloud className="text-foreground group-hover:text-purple-400 transition-colors" size={32} />
                    </div>
                    <h3 className="text-lg font-semibold">Cloud Native</h3>
                    <p className="text-sm text-muted mt-2">AWS, Docker, CI/CD</p>
                  </motion.div>
                </div>
              </section>

              {/* Selected Works */}
              <section className="mt-24 sm:mt-32">
                <div className="flex items-end justify-between mb-12">
                  <div>
                    <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">Portfolio</span>
                    <h2 className="text-3xl sm:text-4xl font-bold mt-2">Selected Works</h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  <ProjectCard 
                    title="Document Compliance & Financial Orchestration"
                    description="A scalable AI-powered platform that automates document verification → payout decisioning → financial reconciliation."
                    tags={["FastAPI", "OCR", "Rule Engine", "PostgreSQL"]}
                    image="https://picsum.photos/seed/dcp/1200/800"
                    onClick={() => setView('case-study')}
                  />
                </div>
              </section>

              {/* Journal / Experience */}
              <section className="mt-24 sm:mt-32 max-w-4xl">
                <div className="mb-12">
                  <span className="text-xs font-mono text-muted uppercase tracking-[0.2em]">Timeline</span>
                  <h2 className="text-3xl sm:text-4xl font-bold mt-2">Experience & Diary</h2>
                </div>

                <div className="flex flex-col">
                  <JournalItem 
                    date="Jun 2025 — Present" 
                    title="AI Automation Engineer @ Deloitte" 
                    category="Professional" 
                  />
                  <JournalItem 
                    date="Sep 2024 — Jan 2025" 
                    title="ML Engineer @ Ocufox Technologies" 
                    category="Professional" 
                  />
                  <JournalItem 
                    date="Mar 2023 — Oct 2025" 
                    title="Chairperson @ Code AI Club" 
                    category="Leadership" 
                  />
                  <JournalItem 
                    date="Jul 2026" 
                    title="B.Tech in Computer Engineering" 
                    category="Education" 
                  />
                </div>
              </section>
            </motion.div>
          )}

          {view === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <SectionHeader title="About Me" subtitle="Myself" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
                <div className="md:col-span-2 space-y-8 text-lg text-muted leading-relaxed">
                  <p>
                    I'm <span className="text-white font-semibold">Asmit Dash</span>, an AI Automation Engineer passionate about bridging the gap between complex machine learning models and production-ready enterprise solutions.
                  </p>
                  <p>
                    My journey started with a fascination for how data can drive decision-making. Today, I specialize in building <span className="text-blue-400">GenAI pipelines</span>, <span className="text-purple-400">RAG systems</span>, and <span className="text-green-400">automated compliance engines</span> that solve real-world financial and operational challenges.
                  </p>
                  <div className="glass p-8 rounded-[2rem] border-white/5 italic relative">
                    <Quote className="absolute -top-4 -left-4 text-blue-500/20" size={48} />
                    "I don't just build models; I build systems that make models useful."
                  </div>
                  <p>
                    When I'm not coding, you'll find me leading workshops at <span className="text-white">Code AI Club</span> or exploring the latest research in multimodal learning. I believe in the power of open-source and the importance of ethical AI.
                  </p>
                </div>
                <div className="space-y-8">
                  <div className="glass p-8 rounded-[2rem] border-white/5">
                    <h4 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">Core Values</h4>
                    <ul className="space-y-4 text-sm">
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-blue-500" />
                        Scalability by Design
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-blue-500" />
                        Explainable AI
                      </li>
                      <li className="flex items-center gap-3">
                        <CheckCircle2 size={16} className="text-blue-500" />
                        Continuous Learning
                      </li>
                    </ul>
                  </div>
                  <div className="glass p-8 rounded-[2rem] border-white/5">
                    <h4 className="text-sm font-mono uppercase tracking-widest text-muted mb-4">Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Photography', 'Chess', 'Open Source', 'FinTech', 'Research'].map(tag => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 text-xs text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'thoughts' && (
            <motion.div
              key="thoughts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <SectionHeader title="Thoughts" subtitle="Blogs & Writing" />
              <div className="mt-12 space-y-8">
                {[
                  {
                    title: "The Future of RAG: Beyond Simple Vector Search",
                    summary: "Exploring how hybrid retrieval and semantic chunking are changing the landscape of enterprise GenAI applications.",
                    date: "Mar 15, 2026",
                    link: "https://medium.com/@asmitdash"
                  },
                  {
                    title: "Building Resilient ML Pipelines with FastAPI",
                    summary: "A deep dive into using async patterns and circuit breakers to handle unreliable external APIs in production.",
                    date: "Feb 28, 2026",
                    link: "https://medium.com/@asmitdash"
                  },
                  {
                    title: "Why Your AI Needs a Rule Engine",
                    summary: "Discussing the importance of deterministic logic in financial compliance systems and why ML isn't always the answer.",
                    date: "Jan 10, 2026",
                    link: "https://medium.com/@asmitdash"
                  }
                ].map((post, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="glass p-8 rounded-[2rem] border-white/5 group cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-mono text-muted uppercase tracking-widest">{post.date}</span>
                      <BookOpen size={18} className="text-muted group-hover:text-blue-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">{post.title}</h3>
                    <p className="text-muted leading-relaxed mb-6">{post.summary}</p>
                    <a 
                      href={post.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Read on Medium <ArrowUpRight size={16} />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer className="mt-32 pt-12 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm text-muted">Open to new opportunities in 2026</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-lg font-bold tracking-tighter">
              Asmit Dash<span className="text-blue-500">.</span>
            </div>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <p className="text-sm text-muted/60">
              © 2026. Designed with precision.
            </p>
          </div>
        </footer>
      </main>

      {/* Resume Modal */}
      <Modal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
        title="Resume — Asmit Dash"
      >
        <div className="space-y-12 text-foreground/90">
          {/* Header */}
          <header className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <h1 className="text-4xl font-bold">Asmit Dash</h1>
              <p className="text-muted mt-2">AI Automation & Machine Learning Engineer</p>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted">
              <a href="mailto:asmitdash44@gmail.com" className="hover:text-white transition-colors flex items-center gap-2">
                <Mail size={14} /> asmitdash44@gmail.com
              </a>
              <span className="flex items-center gap-2"><MapPin size={14} /> Mumbai, India</span>
              <a href="https://github.com/asmitdash" className="hover:text-white transition-colors flex items-center gap-2">
                <Github size={14} /> github.com/asmitdash
              </a>
            </div>
          </header>

          {/* Education */}
          <section>
            <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Education</h3>
            <div>
              <div className="flex justify-between items-start">
                <h4 className="font-bold">Bachelor of Technology in Computer Engineering</h4>
                <span className="text-sm text-muted">Jul 2026</span>
              </div>
              <p className="text-muted italic">University of Mumbai</p>
              <div className="mt-2 flex gap-4 text-sm">
                <span>CGPA: 9.1/10</span>
                <span className="text-muted/60">Honours in AI & Machine Learning</span>
              </div>
            </div>
          </section>

          {/* Experience */}
          <section>
            <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Work Experience</h3>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">Intern – AI Automation Engineer at Deloitte</h4>
                  <span className="text-sm text-muted">Jun 2025 – Present</span>
                </div>
                <p className="text-muted italic mb-4">Mumbai, India</p>
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted">
                  <li>Automated data extraction from 50,000+ documents monthly using Python, PaddleOCR, and LLMs (Llama 3.2, GPT OSS).</li>
                  <li>Reduced manual verification backlog by 4 months and improved turnaround time by 60%.</li>
                  <li>Integrated government APIs for real-time verification and deployed on AWS for high availability.</li>
                  <li>Led a 5-member team driving cross-functional collaboration and prompt engineering.</li>
                </ul>
              </div>
              <div>
                <div className="flex justify-between items-start">
                  <h4 className="font-bold">Intern – Machine Learning Engineer at Ocufox Technologies</h4>
                  <span className="text-sm text-muted">Sep 2024 – Jan 2025</span>
                </div>
                <p className="text-muted italic mb-4">Mumbai, India</p>
                <ul className="list-disc list-outside ml-4 space-y-2 text-sm text-muted">
                  <li>Built a production-ready captcha recognition pipeline with robust image preprocessing.</li>
                  <li>Developed a CRNN recognizer with CNN backbone and Bi-LSTM encoder, enhanced by vision-transformers.</li>
                  <li>Deployed on AWS with Dockerized ONNX models, achieving sub-100ms latency.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h3 className="text-xs font-mono text-muted uppercase tracking-widest mb-6 border-b border-white/10 pb-2">Technical Skills</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
              <div>
                <h5 className="font-bold mb-2">Programming & ML</h5>
                <p className="text-muted">Python, C, PyTorch, Transformers, CNNs, Scikit-learn, MLOps</p>
              </div>
              <div>
                <h5 className="font-bold mb-2">LLMs & GenAI</h5>
                <p className="text-muted">Prompt Engineering, Fine-tuning, Vector DBs (FAISS, Pinecone), LangChain, RAG</p>
              </div>
              <div>
                <h5 className="font-bold mb-2">Cloud & DevOps</h5>
                <p className="text-muted">AWS, Docker, Kubernetes, CI/CD (GitHub Actions, Jenkins), Git</p>
              </div>
            </div>
          </section>
        </div>
      </Modal>

      {/* Message Modal */}
      <Modal 
        isOpen={isMessageOpen} 
        onClose={() => setIsMessageOpen(false)} 
        title="Get in Touch"
      >
        <div className="space-y-8 py-4">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Let's build something together.</h3>
            <p className="text-muted leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. 
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="glass p-6 rounded-3xl border-white/5 space-y-2">
              <div className="text-xs font-mono text-muted uppercase tracking-widest">Email</div>
              <div className="text-lg font-semibold">asmitdash44@gmail.com</div>
            </div>
            <div className="glass p-6 rounded-3xl border-white/5 space-y-2">
              <div className="text-xs font-mono text-muted uppercase tracking-widest">Phone</div>
              <div className="text-lg font-semibold">+91 99300 44XXX</div>
            </div>
          </div>

          <div className="pt-4">
            <a 
              href="mailto:asmitdash44@gmail.com"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-full bg-blue-500 text-white font-bold hover:bg-blue-600 transition-all active:scale-[0.98] shadow-lg shadow-blue-500/20"
            >
              <Mail size={20} />
              Draft an Email
            </a>
          </div>
        </div>
      </Modal>
    </div>
  );
}
