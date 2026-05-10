import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, LineChart, Line, ResponsiveContainer } from 'recharts';
import { BookOpen, TimerReset, Sparkles } from 'lucide-react';

const radarData = [
  { subject: 'Communication', A: 85 },
  { subject: 'Technical', A: 65 },
  { subject: 'Confidence', A: 90 },
  { subject: 'Problem Solving', A: 70 },
  { subject: 'Fluency', A: 80 },
  { subject: 'Resume', A: 85 },
];

const timelineData = [
  { session: 1, score: 55 },
  { session: 2, score: 58 },
  { session: 3, score: 62 },
  { session: 4, score: 60 },
  { session: 5, score: 68 },
  { session: 6, score: 71 },
  { session: 7, score: 73 },
];

function AnimatedCounter({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const spring = useSpring(0, { bounce: 0, duration: 2500 });
  
  useEffect(() => {
    if (inView) spring.set(value);
  }, [spring, value, inView]);

  useEffect(() => {
    return spring.on("change", (latest) => setCount(Math.round(latest)));
  }, [spring]);

  return <span ref={ref}>{count}</span>;
}

function AnalyticsCard({ children, className = "" }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
      }}
      className={`glass-card ${className}`}
    >
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

export default function Analytics() {
  return (
    <section id="analytics" className="py-32 relative overflow-hidden bg-secondary border-y border-black/5">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-4">
            Know Exactly <br className="block sm:hidden" />
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="text-gradient-primary bg-[length:200%_auto]"
            >
              Where You Stand
            </motion.span>
          </h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">Get comprehensive analytics after every session. No more guessing why you didn't clear the round.</p>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { 
              opacity: 1, y: 0,
              transition: { duration: 0.8, staggerChildren: 0.2 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="glass-card p-4 sm:p-6 md:p-8 shadow-[0_15px_40px_rgba(212,160,23,0.1)] relative bg-white/70"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-50" />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center mb-8">
            {/* Left: Circular Gauge */}
            <AnalyticsCard className="flex flex-col items-center justify-center p-6 h-[240px] sm:h-[280px]">
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Readiness Score</h3>
              <motion.div 
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-40 h-40 flex items-center justify-center"
              >
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="8" />
                  <motion.circle 
                    cx="50" cy="50" r="45" fill="none" stroke="#FF7A00" strokeWidth="8" 
                    strokeLinecap="round"
                    strokeDasharray="283"
                    initial={{ strokeDashoffset: 283 }}
                    whileInView={{ strokeDashoffset: 283 - (283 * 0.73) }}
                    transition={{ type: "spring", bounce: 0.2, duration: 2.5, delay: 0.2 }}
                    viewport={{ once: true, amount: 0.3 }}
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="font-display font-bold text-4xl text-dark"><AnimatedCounter value={73} />%</span>
                  <span className="text-xs text-orange font-bold">Good</span>
                </div>
              </motion.div>
            </AnalyticsCard>

            {/* Center: Radar Chart */}
            <AnalyticsCard className="flex flex-col items-center justify-center p-6 h-[240px] sm:h-[280px]">
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-2">Skill Breakdown</h3>
              <div className="w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="rgba(0,0,0,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(0,0,0,0.5)', fontSize: 10 }} />
                    <Radar name="Score" dataKey="A" stroke="#D4A017" fill="#D4A017" fillOpacity={0.3} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </AnalyticsCard>

            {/* Right: Sparkline */}
            <AnalyticsCard className="flex flex-col justify-center p-6 h-[240px] sm:h-[280px] md:col-span-2 lg:col-span-1">
              <h3 className="text-sm font-bold text-muted uppercase tracking-wider mb-6">Recent Improvement</h3>
              <div className="w-full h-[150px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={timelineData}>
                    <Line type="monotone" dataKey="score" stroke="#D4A017" strokeWidth={3} dot={{ r: 4, fill: '#D4A017' }} isAnimationActive={true} animationDuration={2000} animationEasing="ease-out" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted font-bold">
                <span>Wk 1</span>
                <span>Wk 2</span>
                <span>Wk 3</span>
                <span>Wk 4</span>
              </div>
            </AnalyticsCard>
          </div>

          {/* Bottom Strip: Coaching Tips */}
          <div className="border-t border-black/5 pt-8">
            <h3 className="text-sm font-bold text-dark mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-orange animate-pulse" /> AI Coaching Tips
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white border border-black/5 shadow-sm rounded-xl p-4 flex gap-3 items-start group">
                <div className="w-10 h-10 rounded-[10px] bg-white border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform shadow-sm">
                  <BookOpen size={18} strokeWidth={1.8} className="text-orange" />
                </div>
                <div>
                  <div className="text-sm font-bold text-dark">Learn async JavaScript</div>
                  <div className="text-xs text-muted mt-1">You hesitated on Promise.all() questions.</div>
                </div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white border border-black/5 shadow-sm rounded-xl p-4 flex gap-3 items-start group">
                <div className="w-10 h-10 rounded-[10px] bg-white border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:rotate-3 transition-transform shadow-sm">
                  <TimerReset size={18} strokeWidth={1.8} className="text-orange" />
                </div>
                <div>
                  <div className="text-sm font-bold text-dark">Speak 10% slower</div>
                  <div className="text-xs text-muted mt-1">Your WPM spiked to 160 when asked about DSA.</div>
                </div>
              </motion.div>
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="bg-white border border-black/5 shadow-sm rounded-xl p-4 flex gap-3 items-start group">
                <div className="w-10 h-10 rounded-[10px] bg-white border border-gold/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:-rotate-3 transition-transform shadow-sm">
                  <Sparkles size={18} strokeWidth={1.8} className="text-orange" />
                </div>
                <div>
                  <div className="text-sm font-bold text-dark">Add STAR structure</div>
                  <div className="text-xs text-muted mt-1">Behavioral answers lack concrete results.</div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
