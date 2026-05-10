import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useSpring, useMotionValue, animate, useTransform } from 'framer-motion';
import { ChevronRight, Activity, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

const rounds = [
  {
    company: "AMAZON",
    title: "SDE ROUND",
    detected: "System Scalability",
    status: "Analyzing Depth...",
    pressure: "High Intensity",
    confidence: 64,
    probability: 88,
    messages: [
      { type: 'ai', text: "Tell me about your React project." },
      { type: 'user', text: "We built a task management app using React and Firebase." },
      { type: 'ai', text: "Interesting. Why did you choose Firebase over PostgreSQL?" }
    ]
  },
  {
    company: "TCS",
    title: "DIGITAL ADVANCED",
    detected: "Logic Efficiency",
    status: "Evaluating Logic...",
    pressure: "Technical Depth",
    confidence: 72,
    probability: 94,
    messages: [
      { type: 'ai', text: "How would you find the longest common subsequence?" },
      { type: 'user', text: "I'd use a 2D table to store the results of subproblems." },
      { type: 'ai', text: "Good. What is the time complexity of that approach?" }
    ]
  }
];

const SYSTEM_SPRING = {
  type: "spring",
  damping: 60,
  stiffness: 75,
  mass: 1.4
};

const GhostTypography = ({ text, delay, top, left, size, isActive }) => (
  <motion.div
    initial={{ opacity: 0, x: -100 }}
    animate={isActive ? { 
      opacity: [0.01, 0.03, 0.01],
      x: [-100, 200, -100]
    } : {}}
    transition={{ 
      duration: 35, 
      repeat: Infinity, 
      delay: delay + 2,
      ease: "linear"
    }}
    className="absolute font-display font-black text-dark pointer-events-none select-none z-0 whitespace-nowrap uppercase 
               opacity-0 lg:opacity-100 blur-[4px] md:blur-[6px] lg:blur-[10px] scale-50 md:scale-75 lg:scale-100"
    style={{ 
      top: `${top}%`, 
      left: `${left}%`, 
      fontSize: size || '10vw'
    }}
  >
    {text}
  </motion.div>
);

const OperationalSignal = ({ isActive }) => (
  <div className="flex items-center gap-2 lg:gap-2.5 text-orange font-black text-[7px] lg:text-[8px] tracking-[0.3em] lg:tracking-[0.4em] uppercase">
    <motion.div
      animate={{ 
        scale: [1, 1.08, 1],
        opacity: [0.7, 1, 0.7],
        filter: ["brightness(1)", "brightness(1.5)", "brightness(1)"]
      }}
      transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <Activity size={10} />
    </motion.div>
    <motion.span
      animate={{ opacity: [1, 0.5, 1, 1, 0.8, 1] }}
      transition={{ duration: 10, repeat: Infinity, times: [0, 0.1, 0.2, 0.8, 0.9, 1] }}
    >
      SYSTEM ACTIVE
    </motion.span>
  </div>
);

const ThreatMetric = ({ label, value, delay, isBooted, isMobile }) => {
  const displayValue = useMotionValue(0);
  const roundedValue = useTransform(displayValue, v => Math.round(v));
  const [currentVal, setCurrentVal] = useState(0);
  const [fluctuation, setFluctuation] = useState(0);

  useEffect(() => {
    const unsubscribe = roundedValue.on("change", (latest) => setCurrentVal(latest));
    return () => unsubscribe();
  }, [roundedValue]);

  useEffect(() => {
    if (isBooted) {
      animate(displayValue, value + fluctuation, { 
        duration: 2, 
        delay: delay, 
        ease: [0.16, 1, 0.3, 1] 
      });
    }
  }, [isBooted, value, fluctuation]);

  useEffect(() => {
    const timer = setInterval(() => {
      setFluctuation(Math.floor(Math.random() * 3) - 1);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  if (isMobile) {
    return (
      <div className="flex items-center gap-3 px-4 h-full border-r border-black/5 last:border-0">
        <span className="text-[6px] font-black text-dark/30 uppercase tracking-widest whitespace-nowrap">{label}</span>
        <span className="text-[9px] font-black text-orange tabular-nums">{currentVal}%</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:gap-4 w-full">
      <div className="flex justify-between items-center text-dark/30 font-black text-[7px] lg:text-[8px] tracking-widest uppercase">
        <motion.span initial={{ opacity: 0, y: 5 }} animate={isBooted ? { opacity: 1, y: 0 } : {}} transition={{ delay: delay - 0.2 }}>
          {label}
        </motion.span>
        <span className="text-orange tabular-nums">{currentVal}%</span>
      </div>
      <div className="h-[1.5px] lg:h-[2px] w-full bg-black/5 overflow-hidden relative">
        <motion.div initial={{ scaleX: 0 }} animate={isBooted ? { scaleX: (value + fluctuation) / 100 } : {}} transition={{ duration: 2, delay: delay, ease: [0.16, 1, 0.3, 1] }} className="h-full bg-orange/40 w-full origin-left" />
        <motion.div animate={{ x: ['-100%', '200%'] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-20" />
      </div>
    </div>
  );
};

export default function Hero() {
  const [bootStage, setBootStage] = useState('initial');
  const [currentRound, setCurrentRound] = useState(0);
  const [isHoveringRail, setIsHoveringRail] = useState(false);
  const containerRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, SYSTEM_SPRING);
  const springY = useSpring(mouseY, SYSTEM_SPRING);

  useEffect(() => {
    const sequence = [
      { stage: 'scanning', delay: 800 },
      { stage: 'materializing', delay: 1800 },
      { stage: 'typography', delay: 3000 },
      { stage: 'analytics', delay: 4200 },
      { stage: 'command', delay: 4800 },
      { stage: 'ready', delay: 6000 }
    ];
    const timeouts = sequence.map(({ stage, delay }) => setTimeout(() => setBootStage(stage), delay));
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      timeouts.forEach(clearTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const roundTimer = setInterval(() => {
      if (bootStage === 'ready') setCurrentRound((prev) => (prev + 1) % rounds.length);
    }, 10000);
    return () => clearInterval(roundTimer);
  }, [bootStage]);

  const isBooted = ['analytics', 'command', 'ready'].includes(bootStage);

  return (
    <section ref={containerRef} className="min-h-[100dvh] lg:h-screen flex flex-col relative overflow-hidden bg-[#F8F6F2] px-5 lg:px-0 pt-28 lg:pt-0 pb-10 lg:pb-0">
      {/* Boot Overlays */}
      <AnimatePresence>
        {bootStage === 'initial' && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0A0A0A] flex items-center justify-center pointer-events-none">
            <motion.div animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 0.1, repeat: Infinity }} className="font-mono text-[10px] text-orange tracking-[0.4em] font-black uppercase">
              VIVAX_CORE_INITIALIZING_
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reveal Scanners */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={bootStage !== 'initial' ? { scaleY: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 bg-[#F8F6F2] z-50 origin-top pointer-events-none"
        style={{ opacity: bootStage === 'scanning' ? 0.8 : 0 }}
      />
      <motion.div
        initial={{ top: '-10%' }}
        animate={bootStage === 'scanning' ? { top: '110%' } : { top: '-10%' }}
        transition={{ duration: 1.5, ease: "linear" }}
        className="absolute left-0 right-0 h-40 bg-gradient-to-b from-transparent via-orange/20 to-transparent z-[60] pointer-events-none"
      />

      {/* Background Intel Field */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={['materializing', 'typography', 'analytics', 'command', 'ready'].includes(bootStage) ? { opacity: 1 } : {}}
          className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_60%,transparent_100%)] opacity-50 lg:opacity-100" 
        />
        <GhostTypography text="ANALYZING" delay={0} top={5} left={-10} isActive={bootStage === 'ready'} />
        <GhostTypography text="PROCESSING" delay={7} top={45} left={25} size="7vw" isActive={bootStage === 'ready'} />
        <GhostTypography text="EVALUATING" delay={14} top={75} left={-5} size="12vw" isActive={bootStage === 'ready'} />
      </div>

      {/* Atmospheric Lighting */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={['materializing', 'typography', 'analytics', 'command', 'ready'].includes(bootStage) ? { opacity: 0.45, scale: 1 } : {}}
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        className="absolute w-[320px] md:w-[600px] lg:w-[1200px] h-[320px] md:h-[600px] lg:h-[1200px] bg-gradient-to-br from-orange/[0.04] via-gold/[0.02] to-transparent rounded-full blur-[60px] md:blur-[120px] lg:blur-[160px] pointer-events-none z-0"
      />

      <div className="h-0 lg:h-12 shrink-0" />
      
      <div className="flex-1 relative z-10 w-full max-w-[1800px] mx-auto px-0 lg:px-12 flex flex-col justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-[1fr_2.2fr_1fr] gap-10 lg:gap-0 items-center">
          
          {/* 1. CENTER: MASSIVE ANCHOR (PRIORITY ON MOBILE) */}
          <div className="flex flex-col items-center justify-center text-center relative z-10 order-1 lg:order-2 lg:col-start-2">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: 'blur(12px)' }}
              animate={['typography', 'analytics', 'command', 'ready'].includes(bootStage) ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
              transition={SYSTEM_SPRING}
              className="relative"
            >
              <h1 className="font-display font-black text-[clamp(2.8rem,14vw,4.4rem)] md:text-[clamp(4rem,9vw,6.5rem)] lg:text-[clamp(5.5rem,10vw,10.5rem)] text-dark leading-[0.78] tracking-[-0.05em] uppercase pointer-events-none">
                <motion.div initial={{ x: -20, skew: 10 }} animate={{ x: 0, skew: 0 }} transition={{ delay: 0.1 }}>CRACK</motion.div>
                <motion.div initial={{ x: 20, skew: -10 }} animate={{ x: 0, skew: 0 }} transition={{ delay: 0.2 }}>THE</motion.div>
                <span className="text-gradient-primary inline-block relative">
                  ROUND
                  <motion.div animate={{ left: ['-100%', '200%'] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                </span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={['typography', 'analytics', 'command', 'ready'].includes(bootStage) ? { opacity: 0.3 } : {}} transition={{ delay: 1 }} className="text-[7px] md:text-[8px] lg:text-[0.35em] tracking-[0.25em] font-black text-dark mt-4 lg:mt-6">
              BEFORE THEY ASK.
            </motion.div>

            {/* CTA Group */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={bootStage === 'ready' ? { opacity: 1, y: 0 } : {}} transition={SYSTEM_SPRING} className="mt-8 lg:mt-14 w-full flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-10">
              <Link to="/register" className="w-full max-w-[320px] lg:w-auto group relative px-8 lg:px-12 py-5 bg-dark text-white rounded-xl lg:rounded-2xl font-black text-[9px] lg:text-[10px] tracking-[0.3em] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF8A00] to-[#FFC76B] opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10 flex items-center justify-center gap-3 uppercase">Initialize Pressure Test <ChevronRight size={14} /></span>
              </Link>
            </motion.div>

            {/* 2. MOBILE ANALYTICS STRIP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isBooted ? { opacity: 1 } : {}}
              className="lg:hidden mt-8 w-full max-w-[340px] h-14 glass-card bg-white/40 backdrop-blur-xl border border-black/5 rounded-full flex items-center justify-center overflow-hidden"
            >
              <ThreatMetric label="CONFIDENCE" value={rounds[currentRound].confidence} delay={1.2} isBooted={isBooted} isMobile />
              <ThreatMetric label="FOLLOW-UP" value={rounds[currentRound].probability} delay={1.5} isBooted={isBooted} isMobile />
            </motion.div>
          </div>

          {/* 3. LEFT ANALYTICS PILLAR (HIDDEN ON MOBILE, BECOMES ROW ON TABLET) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isBooted ? { opacity: 1, x: 0, y: [0, -2, 0] } : {}}
            transition={{ ...SYSTEM_SPRING, y: { duration: 12, repeat: Infinity, ease: "easeInOut" } }}
            className="hidden lg:flex flex-col space-y-12 pr-10 relative group order-3 lg:order-1"
          >
            <div className="space-y-4">
              <OperationalSignal isActive={bootStage === 'ready'} />
              <div className="flex flex-col gap-1.5 relative overflow-hidden">
                <div className="relative z-10 space-y-1">
                  <motion.div initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={isBooted ? { clipPath: 'inset(0 0% 0 0)' } : {}} transition={{ duration: 1, delay: 0.5 }} className="relative">
                    <p className="text-[11px] text-dark/40 font-black uppercase tracking-[0.25em]">PRESSURE MODE ENABLED.</p>
                  </motion.div>
                  <motion.div initial={{ opacity: 0 }} animate={isBooted ? { opacity: 0.4, letterSpacing: '0.25em' } : {}} transition={{ duration: 0.5 }}>
                    <p className="text-[11px] text-dark/40 font-black uppercase tracking-[0.25em]">BIOMETRIC SYNC READY.</p>
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col gap-4">
                <span className="text-[7px] font-black text-dark/20 uppercase tracking-[0.4em]">EVALUATION METRICS</span>
                <div className="space-y-8">
                  <ThreatMetric label="Response Confidence" value={rounds[currentRound].confidence} delay={1.2} isBooted={isBooted} />
                  <ThreatMetric label="Follow-up Probability" value={rounds[currentRound].probability} delay={1.5} isBooted={isBooted} />
                </div>
              </div>
            </div>
          </motion.div>

          {/* 4. RIGHT COMMAND OS (STACKED BELOW CTA ON MOBILE) */}
          <motion.div
            initial={{ opacity: 0, x: 60, filter: 'blur(20px)' }}
            animate={['command', 'ready'].includes(bootStage) ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
            transition={{ ...SYSTEM_SPRING, delay: 0.2 }}
            className="w-full lg:w-auto lg:relative lg:translate-x-12 order-3"
          >
            <div className="w-full max-w-[360px] lg:max-w-none mx-auto glass-card bg-white/85 backdrop-blur-[40px] p-6 lg:p-8 rounded-[2.5rem] lg:rounded-[3.5rem] border border-white/60 shadow-2xl flex flex-col min-h-[400px] lg:min-h-[520px] group overflow-hidden">
              <div className="flex-1 flex flex-col justify-center items-center text-center space-y-4">
                {bootStage === 'command' && (
                  <div className="space-y-2 font-black text-[8px] text-dark/40 uppercase tracking-[0.4em]">
                    <div>INITIALIZING THREAT MODEL...</div>
                    <div>SCANNING RESPONSE PATTERNS...</div>
                    <div>FOLLOW-UP ENGINE READY...</div>
                  </div>
                )}
                {bootStage === 'ready' && (
                  <div className="w-full flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-dark flex items-center justify-center text-white"><Target size={18} className="text-orange animate-pulse" /></div>
                        <div className="text-left">
                          <h3 className="font-black text-dark text-[10px] tracking-widest uppercase">SYSTEM.COMMAND</h3>
                          <p className="text-[8px] text-orange font-black uppercase tracking-[0.2em]">{rounds[currentRound].company}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 space-y-4 lg:space-y-6 mb-8 text-left">
                      {rounds[currentRound].messages.slice(0, window.innerWidth < 768 ? 2 : 3).map((msg, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.5 }} className={`flex ${msg.type === 'ai' ? 'justify-start' : 'justify-end'}`}>
                          <div className={`max-w-[90%] px-4 py-3 rounded-2xl text-[9px] lg:text-[10px] font-bold ${msg.type === 'ai' ? 'bg-black/[0.04] text-dark rounded-tl-none' : 'bg-dark text-white rounded-tr-none'}`}>
                            {msg.text}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="h-6 flex items-center justify-center gap-1 opacity-40">
                      {[...Array(window.innerWidth < 768 ? 16 : (window.innerWidth < 1024 ? 20 : 28))].map((_, i) => (
                        <motion.div key={i} animate={{ height: [4, Math.random() * 20 + 4, 4] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.02 }} className="w-1 bg-dark rounded-full" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      <div className="hidden lg:block absolute bottom-10 right-12 opacity-10 font-black text-[7px] tracking-[0.6em] uppercase pointer-events-none">
        VIVAX.CORE-v2.4_BOOT_SUCCESS
      </div>
    </section>
  );
}
