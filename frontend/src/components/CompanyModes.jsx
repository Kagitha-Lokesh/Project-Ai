import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const modes = [
  { id: 'tcs', name: 'TCS NQT', focus: 'Aptitude, Core CS, Basic Coding', difficulty: 'Adaptive', color: '#3b82f6', bg: 'bg-blue-500/10' },
  { id: 'infosys', name: 'Infosys InfyTQ', focus: 'DBMS, Python/Java, OOPs', difficulty: 'Medium', color: '#8b5cf6', bg: 'bg-purple-500/10' },
  { id: 'accenture', name: 'Accenture', focus: 'Pseudocode, Networking, Verbal', difficulty: 'Medium', color: '#a855f7', bg: 'bg-fuchsia-500/10' },
  { id: 'cognizant', name: 'Cognizant GenC', focus: 'Automata Fix, SQL, Logical', difficulty: 'Medium', color: '#10b981', bg: 'bg-emerald-500/10' },
  { id: 'wipro', name: 'Wipro Elite', focus: 'Coding, Essay Writing, HR', difficulty: 'Medium-Hard', color: '#f59e0b', bg: 'bg-amber-500/10' },
  { id: 'deloitte', name: 'Deloitte', focus: 'Business Comm, Case Studies', difficulty: 'Hard', color: '#06b6d4', bg: 'bg-cyan-500/10' },
  { id: 'capgemini', name: 'Capgemini', focus: 'Game-based Aptitude, Tech', difficulty: 'Medium', color: '#ec4899', bg: 'bg-pink-500/10' },
];

export default function CompanyModes() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  return (
    <section id="companies" ref={containerRef} className="py-20 md:py-32 overflow-hidden bg-primary relative">
      <div className="max-w-7xl mx-auto px-6 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-dark">Practice the Company<br/><span className="text-gradient-primary">You're Targeting</span></h2>
        
        <div className="flex gap-4">
          <button 
            onClick={() => {
              const el = document.getElementById('company-track');
              el.scrollBy({ left: -350, behavior: 'smooth' });
            }}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-dark hover:bg-white hover:border-gold/30 hover:text-orange transition-all shadow-sm"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => {
              const el = document.getElementById('company-track');
              el.scrollBy({ left: 350, behavior: 'smooth' });
            }}
            className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-dark hover:bg-white hover:border-gold/30 hover:text-orange transition-all shadow-sm"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="w-full relative py-10">
        <div 
          id="company-track"
          className="overflow-x-auto overflow-y-hidden scrollbar-hide scroll-smooth flex"
        >
          <motion.div 
            style={{ x }}
            className="flex gap-6 px-6 md:px-[10vw] py-8"
          >
          {modes.map((mode, i) => (
            <motion.div 
              key={mode.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ rotateY: 5, rotateX: 5, y: -5, transition: { duration: 0.2 } }}
              className="glass-card w-[280px] sm:w-[320px] p-6 sm:p-8 flex-shrink-0 relative overflow-hidden group perspective-1000"
            >
              <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-[50px] opacity-50 ${mode.bg}`} style={{ background: mode.color }} />
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h3 className="font-display font-bold text-2xl text-dark w-2/3">{mode.name}</h3>
                <span className="px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/5 border border-black/10 text-dark/70">
                  {mode.difficulty}
                </span>
              </div>
              
              <div className="space-y-4 mb-8 relative z-10">
                <div>
                  <div className="text-[10px] uppercase tracking-wider text-muted font-bold mb-1">Focus Areas</div>
                  <div className="text-sm text-dark/80">{mode.focus}</div>
                </div>
              </div>

              <a href="#" className="inline-flex items-center gap-2 text-sm font-bold transition-colors relative z-10 group-hover:underline underline-offset-4" style={{ color: mode.color }}>
                Practice Now &rarr;
              </a>
            </motion.div>
          ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
