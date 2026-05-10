import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FileText, RefreshCw, Languages, Zap, Users, BrainCircuit, Briefcase, Mic } from 'lucide-react';

const features = [
  { 
    id: 'follow-up',
    title: "AI Follow-Up Engine", 
    desc: "VivaX dynamically adapts based on your exact answers. If you mention 'Firebase', it instantly pivots to scaling and concurrency questions.", 
    icon: <RefreshCw size={22} />,
    featured: true,
    color: '#FF7A00',
    preview: { user: "I mention Firebase for my backend...", ai: "Interesting. But how would it scale to 100k users?" }
  },
  { 
    id: 'resume',
    title: "Resume-Aware Interviews", 
    desc: "Your resume IS the question bank. AI cross-questions you specifically on your projects and claimed skills.", 
    icon: <FileText size={22} />,
    color: '#D4A017',
    preview: { badge: "Scanning projects...", tags: ["React", "Node.js", "System Design"] }
  },
  { 
    id: 'tenglish',
    title: "Tenglish Mode", 
    desc: "Practice in Telugu + English mixed communication — exactly how real campus interviews happen.", 
    icon: <Languages size={22} />,
    color: '#FFB547',
    preview: { user: "Naku React lo confidence undi...", ai: "Great. Explain virtual DOM functionality." }
  },
  { 
    id: 'pressure',
    title: "Pressure Simulation", 
    desc: "Interruptions, rapid-fire questions, and awkward silence. Get comfortable being uncomfortable under fire.", 
    icon: <Zap size={22} />,
    color: '#FF7A00',
    preview: { alert: "INTERRUPTION: 'Be more concise.'" }
  },
  { 
    id: 'personality',
    title: "Interviewer Personalities", 
    desc: "From a friendly HR manager to an aggressive system architect. Learn to handle different interview styles.", 
    icon: <Users size={22} />,
    color: '#D4A017',
    preview: { modes: ["Aggressive", "Friendly", "Socratic"] }
  },
  { 
    id: 'memory',
    title: "Interview Memory", 
    desc: "The AI tracks your weak spots across multiple sessions and specifically revisits them until you master the concept.", 
    icon: <BrainCircuit size={22} />,
    color: '#FFB547',
    preview: { badge: "Weak spot identified", topic: "Garbage Collection" }
  },
  { 
    id: 'companies',
    title: "Company-Specific Modes", 
    desc: "Simulate the exact interview style and difficulty level of major product and service-based companies.", 
    icon: <Briefcase size={22} />,
    color: '#D4A017',
    preview: { pills: ["TCS Ninja", "Infosys", "Amazon SDE", "Accenture"] }
  },
  { 
    id: 'voice',
    title: "Voice Confidence Analysis", 
    desc: "Real-time analysis of your speaking pace, confidence score, and filler word frequency during the interview.", 
    icon: <Mic size={22} />,
    color: '#FF7A00',
    preview: { confidence: 82, filler: "Low", clarity: "Strong" }
  }
];

function FeatureCard({ feature, index }) {
  const iconVariants = {
    'resume': { scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] },
    'follow-up': { rotate: 360 },
    'tenglish': { x: [-2, 2, -2] },
    'pressure': { scale: [1, 0.9, 1.1, 1], rotate: [-2, 2, -2] },
    'personality': { y: [-2, 2, -2] },
    'memory': { opacity: [0.4, 1, 0.4] }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ y: -8, scale: 1.01 }}
      className={`glass-card p-6 sm:p-7 group transition-all duration-500 border-black/5 hover:border-orange/30 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(255,122,0,0.1)] relative overflow-hidden flex flex-col justify-between ${
        feature.featured ? 'md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white/95 to-orange-50/40' : 'bg-white/90'
      }`}
    >
      <div className="relative z-10 h-full flex flex-col">
        <motion.div 
          whileHover={{ rotate: 5, scale: 1.1 }}
          className="w-11 h-11 rounded-[12px] bg-white border border-black/5 flex items-center justify-center mb-5 group-hover:border-orange/30 group-hover:shadow-md transition-all duration-300 shadow-sm"
        >
          <motion.div
            animate={iconVariants[feature.id]}
            transition={{ duration: feature.id === 'follow-up' ? 10 : 3, repeat: Infinity, ease: "linear" }}
            style={{ color: feature.color }}
          >
            {feature.icon}
          </motion.div>
        </motion.div>
        
        <div>
          <h3 className="font-display font-bold text-xl text-dark mb-3 group-hover:text-orange transition-colors tracking-tight">{feature.title}</h3>
          <p className="text-dark/70 leading-relaxed text-sm mb-6 font-medium">{feature.desc}</p>
        </div>

        {/* Experiential Preview Layer */}
        <div className="mt-auto pt-4">
          <div className="p-4 rounded-xl bg-black/[0.02] border border-black/5 shadow-inner relative overflow-hidden group-hover:bg-white/40 transition-colors duration-500">
            {feature.id === 'follow-up' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-orange/80">Follow-up active</span>
                </div>
                <div className="text-[11px] leading-tight text-dark/60 font-bold italic">"{feature.preview.user}"</div>
                <div className="text-[11px] leading-tight text-orange font-bold">"{feature.preview.ai}"</div>
              </div>
            )}

            {feature.id === 'resume' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-dark/40">{feature.preview.badge}</span>
                  <motion.div animate={{ x: [0, 100, 0] }} transition={{ duration: 2, repeat: Infinity }} className="h-px w-12 bg-orange/40" />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {feature.preview.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded-md bg-gold/10 text-gold text-[9px] font-bold">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {feature.id === 'tenglish' && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Languages size={10} className="text-muted" />
                  <span className="text-[9px] font-bold uppercase tracking-widest text-dark/40">Mixed Mode</span>
                </div>
                <div className="text-[11px] leading-tight text-dark/60 font-bold italic">"{feature.preview.user}"</div>
                <div className="text-[11px] leading-tight text-gold font-bold">"{feature.preview.ai}"</div>
              </div>
            )}

            {feature.id === 'pressure' && (
              <div className="flex flex-col items-center justify-center py-2 gap-2">
                <motion.div 
                  animate={{ opacity: [0.4, 1, 0.4] }} 
                  transition={{ duration: 1, repeat: Infinity }}
                  className="px-3 py-1.5 rounded-lg bg-orange/10 border border-orange/20 text-orange text-[10px] font-bold uppercase tracking-tighter"
                >
                  {feature.preview.alert}
                </motion.div>
                <div className="flex gap-1">
                  {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-black/5 rounded-full" />)}
                </div>
              </div>
            )}

            {feature.id === 'personality' && (
              <div className="space-y-3">
                <span className="text-[9px] font-bold uppercase tracking-widest text-dark/40">Select Personality</span>
                <div className="flex gap-2">
                  {feature.preview.modes.map(mode => (
                    <div key={mode} className={`h-1.5 flex-1 rounded-full ${mode === 'Aggressive' ? 'bg-orange/40' : 'bg-black/10'}`} />
                  ))}
                </div>
                <div className="text-[10px] font-bold text-dark/80">Current: <span className="text-orange">Aggressive Architect</span></div>
              </div>
            )}

            {feature.id === 'memory' && (
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-orange/80">{feature.preview.badge}</span>
                  <div className="text-[11px] font-bold text-dark">{feature.preview.topic}</div>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 rounded-lg bg-orange/10 flex items-center justify-center"
                >
                  <BrainCircuit size={16} className="text-orange" />
                </motion.div>
              </div>
            )}

            {feature.id === 'companies' && (
              <div className="flex flex-wrap gap-1.5">
                {feature.preview.pills.map((pill, i) => (
                  <motion.span 
                    key={pill} 
                    animate={i === 0 ? { y: [-1, 1, -1] } : {}}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${i === 0 ? 'bg-orange/10 text-orange' : 'bg-black/5 text-dark/40'}`}
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            )}

            {feature.id === 'voice' && (
              <div className="flex items-center gap-4">
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-[9px] font-bold text-dark/40 uppercase">
                    <span>Confidence</span>
                    <span>{feature.preview.confidence}%</span>
                  </div>
                  <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '82%' }} className="h-full bg-orange" />
                  </div>
                  <div className="flex justify-between text-[9px] font-bold pt-1">
                    <span className="text-muted">Filler: <span className="text-dark">{feature.preview.filler}</span></span>
                    <span className="text-muted">Clarity: <span className="text-dark">{feature.preview.clarity}</span></span>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }} className="w-0.5 bg-orange" />)}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AICore() {
  return (
    <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none overflow-hidden">
      <motion.div
        animate={{ 
          rotate: 360,
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="relative w-[800px] h-[800px]"
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FF7A00" d="M44.7,-76.4C58.1,-69.2,69.2,-58.1,76.4,-44.7C83.6,-31.3,86.9,-15.7,85.2,-0.9C83.6,13.8,77,27.7,68.2,40.1C59.4,52.5,48.4,63.4,35.4,70.5C22.4,77.6,7.5,80.9,-7.6,79.5C-22.7,78.2,-37.9,72.1,-50.3,62.8C-62.7,53.5,-72.3,41.1,-78.3,27.2C-84.3,13.3,-86.7,-2.1,-83.8,-16.8C-80.9,-31.5,-72.7,-45.5,-61,-53.4C-49.3,-61.3,-34.1,-63.1,-20.7,-70.3C-7.3,-77.5,4.3,-90.1,17.4,-90.1C30.5,-90.1,31.3,-83.6,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </motion.div>
    </div>
  );
}

export default function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section id="features" ref={containerRef} className="py-20 md:py-32 relative overflow-hidden bg-primary">
      <AICore />
      
      {/* Cinematic Ambient Glows */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[90px] opacity-[0.05]" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[90px] opacity-[0.05]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div style={{ y }} className="text-center mb-20">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-6">
            Everything Built for <br className="block sm:hidden" />
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-gradient-primary bg-[length:200%_auto]"
            >
              Placement Day
            </motion.span>
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto font-medium">Built specifically for Indian campus placements — not generic AI conversations.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
