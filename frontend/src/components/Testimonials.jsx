import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Star, TrendingUp, Quote, Sparkles } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Karthik S.",
    university: "VIT Vellore",
    company: "Amazon",
    package: "18 LPA",
    role: "SDE-1",
    featured: true,
    rating: 5,
    readiness: 98,
    preparation: "6 weeks training",
    metrics: { score: "62 → 89", mockInterviews: 18, improvement: "+42% Confidence" },
    text: "The pressure simulation mode is terrifyingly accurate. I choked on a system design question on VivaX, learned from the feedback, and nailed the exact same concept in my actual Amazon round.",
    replay: {
      ai: "You seem nervous. Slow down and structure your answer.",
      user: "Understood. Let me re-explain the architecture."
    },
    stressAnalysis: { stability: 88, speed: "Optimal", recovery: "Fast" },
    color: "#FF7A00"
  },
  {
    id: 2,
    name: "Priya R.",
    university: "JNTUH",
    company: "TCS Digital",
    package: "7.2 LPA",
    role: "Digital Engineer",
    rating: 5,
    readiness: 89,
    preparation: "4 weeks training",
    metrics: { score: "45 → 82", mockInterviews: 12, improvement: "Fluency Boost" },
    text: "Tenglish mode is a lifesaver. Being able to mix Telugu and English while practicing helped me build confidence before transitioning to pure English in the real HR round.",
    replay: {
      ai: "Try explaining the 'Closure' concept in Tenglish first.",
      user: "Closure ante... function with its lexical environment."
    },
    color: "#FFB547"
  },
  {
    id: 3,
    name: "Rahul M.",
    university: "SRM Chennai",
    company: "Cisco",
    package: "14 LPA",
    role: "Network Engineer",
    rating: 5,
    readiness: 92,
    preparation: "5 weeks training",
    metrics: { score: "58 → 85", mockInterviews: 15, improvement: "Technical Sharpness" },
    text: "The resume parsing is scary good. It literally picked up a tiny socket programming project from my 2nd year and grilled me on TCP/IP. Best mock interview tool hands down.",
    replay: {
      ai: "Explain the handshake process in your socket project.",
      user: "It follows the standard SYN, SYN-ACK, ACK sequence."
    },
    color: "#D4A017"
  }
];

function TestimonialCard({ item, isFeatured }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.01 }}
      className={`glass-card relative overflow-hidden transition-all duration-500 border-orange/10 backdrop-blur-md flex flex-col ${
        isFeatured 
          ? 'p-8 lg:p-10 h-full bg-gradient-to-br from-white/95 via-white/98 to-[#FFF9F2]/90 shadow-[0_20px_60px_rgba(255,153,0,0.08)]' 
          : 'p-6 bg-white/95 shadow-sm hover:shadow-md'
      }`}
    >
      <div className="flex flex-col h-full relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold text-white shadow-lg ring-4 ring-white/50`} style={{ backgroundColor: item.color }}>
              {item.name[0]}
            </div>
            <div>
              <h4 className="font-bold text-dark text-base leading-tight">{item.name}</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-muted font-medium">{item.university}</span>
                <span className="w-1 h-1 rounded-full bg-black/10" />
                <span className="text-[10px] text-orange font-bold uppercase tracking-tight">{item.preparation}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] font-bold text-orange uppercase tracking-widest mb-1">Placed at {item.company}</div>
            <div className="text-base font-display font-black text-dark tracking-tighter">{item.package}</div>
          </div>
        </div>

        {/* The Review Content */}
        <div className="relative mb-8">
          <Quote className="absolute -top-6 -left-3 text-orange/[0.05] w-14 h-14 -z-0" />
          <p className={`relative z-10 text-dark/80 leading-relaxed font-semibold italic ${isFeatured ? 'text-lg md:text-xl' : 'text-sm'}`}>
            "{item.text}"
          </p>
        </div>

        {/* Featured Special Modules */}
        {isFeatured && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {/* Stress Analysis Module */}
            <div className="p-5 rounded-2xl bg-orange/[0.03] border border-orange/10 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[9px] font-bold uppercase tracking-widest text-orange">AI Stress Analysis</span>
                <div className="flex gap-0.5">
                  {[1,2,3,4].map(i => <motion.div key={i} animate={{ height: [2, 6, 2] }} transition={{ duration: 1, repeat: Infinity, delay: i*0.1 }} className="w-0.5 bg-orange" />)}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-bold text-dark/60">Voice Stability</span>
                  <span className="text-xs font-bold text-dark">{item.stressAnalysis.stability}%</span>
                </div>
                <div className="h-1 bg-black/5 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: `${item.stressAnalysis.stability}%` }} className="h-full bg-orange" />
                </div>
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-muted">Speed: <span className="text-dark">{item.stressAnalysis.speed}</span></span>
                  <span className="text-muted">Recovery: <span className="text-dark">{item.stressAnalysis.recovery}</span></span>
                </div>
              </div>
            </div>

            {/* Sparkline Progress */}
            <div className="p-5 rounded-2xl bg-black/[0.02] border border-black/5 flex flex-col justify-between">
              <span className="text-[9px] font-bold uppercase tracking-widest text-dark/40">Interview Progression</span>
              <div className="flex items-end gap-1.5 h-12 mb-2">
                {[30, 45, 40, 60, 75, 70, 90].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: 0.5 + i*0.1, duration: 0.8 }}
                    className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-orange shadow-[0_0_10px_rgba(255,122,0,0.3)]' : 'bg-black/10'}`}
                  />
                ))}
              </div>
              <div className="flex justify-between text-[9px] font-bold text-dark/40">
                <span>Week 1</span>
                <span className="text-orange">Week 6 (Target Hit)</span>
              </div>
            </div>
          </div>
        )}

        {/* Conversational Replay Snippet */}
        <div className="mb-8 p-4 rounded-xl bg-white/40 border border-black/5 space-y-3 relative overflow-hidden backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles size={10} className="text-orange animate-pulse" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-dark/40">Session Highlights</span>
          </div>
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <span className="text-[10px] font-black text-orange shrink-0">AI:</span>
              <span className="text-[11px] text-muted leading-tight font-medium">"{item.replay.ai}"<motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-1 h-3 bg-orange/40 ml-1 translate-y-0.5" /></span>
            </div>
            <div className="flex gap-2">
              <span className="text-[10px] font-black text-dark shrink-0">User:</span>
              <span className="text-[11px] text-dark/70 italic leading-tight font-medium">"{item.replay.user}"</span>
            </div>
          </div>
        </div>

        {/* Voice Confidence Waveform (Featured Only) */}
        {isFeatured && (
          <div className="mb-8 p-4 rounded-xl bg-orange/[0.02] border border-orange/5 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold uppercase tracking-widest text-orange/60">Voice Confidence Timeline</span>
              <span className="text-[9px] font-bold text-orange">94% Stability</span>
            </div>
            <div className="flex items-center gap-1 h-8">
              {[...Array(24)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, Math.random() * 24 + 4, 4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.05 }}
                  className="flex-1 bg-orange/30 rounded-full"
                />
              ))}
            </div>
          </div>
        )}

        {/* Metrics Grid */}
        <div className="mt-auto pt-6 border-t border-black/5">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-dark/30 uppercase tracking-wider block">Score</span>
              <div className="text-xs font-black text-dark flex items-center gap-1">
                {item.metrics.score} <motion.div animate={{ y: [-1, 1, -1] }} transition={{ repeat: Infinity, duration: 2 }}><TrendingUp size={10} className="text-orange" /></motion.div>
              </div>
            </div>
            <div className="space-y-1 border-x border-black/5 px-4">
              <span className="text-[9px] font-bold text-dark/30 uppercase tracking-wider block">Mocks</span>
              <div className="text-xs font-black text-dark">{item.metrics.mockInterviews} sessions</div>
            </div>
            <div className="space-y-1 text-right">
              <span className="text-[9px] font-bold text-dark/30 uppercase tracking-wider block">Growth</span>
              <div className="text-xs font-black text-orange">{item.metrics.improvement}</div>
            </div>
          </div>
        </div>

        {/* Proprietary Readiness Score */}
        <div className="mt-6 flex flex-col items-center gap-2">
          <div className="flex items-center gap-3">
            <div className="h-px w-8 bg-black/5" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-dark/40">Readiness Report</span>
            <div className="h-px w-8 bg-black/5" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-display font-black text-dark">{item.readiness}%</span>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-orange leading-none uppercase">Match Score</span>
              <span className="text-[8px] font-bold text-muted leading-none">AI VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials() {
  const featured = testimonials.find(t => t.featured);
  const others = testimonials.filter(t => !t.featured);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section ref={sectionRef} id="testimonials" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Parallax Background Elements */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-10 left-10 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[90px] opacity-[0.05] pointer-events-none" 
      />
      <motion.div 
        style={{ y: y2 }}
        className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[90px] opacity-[0.05] pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange bg-orange/5 px-3 py-1 rounded-full border border-orange/10">
            Success Snapshots
          </span>
          <h2 className="font-display font-bold text-4xl md:text-5xl text-dark">
            Students Who <span className="text-gradient-primary">Cracked It</span>
          </h2>
          <p className="text-muted max-w-2xl mx-auto font-medium">
            Students used VivaX to prepare for real placement pressure — <br className="hidden md:block" />
            then walked into interviews already battle-tested.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
          {/* Featured Snapshot (Left) */}
          <TestimonialCard item={featured} isFeatured={true} />

          {/* Stacked Snapshots (Right) */}
          <div className="flex flex-col gap-8">
            {others.map((item) => (
              <TestimonialCard key={item.id} item={item} isFeatured={false} />
            ))}
          </div>
        </div>

        {/* Company Logos Row */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 pt-10 border-t border-black/5 flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
        >
          {['Amazon', 'TCS Digital', 'Cisco', 'Infosys', 'Accenture'].map(company => (
            <span key={company} className="text-lg font-display font-black text-dark/40 tracking-tighter hover:text-orange/60 cursor-default transition-colors">{company}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
