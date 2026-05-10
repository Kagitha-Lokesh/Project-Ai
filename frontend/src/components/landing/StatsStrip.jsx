import { motion } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

const colleges = [
  "IIT BOMBAY", "BITS PILANI", "NIT WARANGAL", "VIT VELLORE", "IIIT HYDERABAD", 
  "SRM CHENNAI", "JNTUH", "OSMANIA UNIVERSITY", "CBIT", "IIT DELHI", "NIT TRICHY"
];

function StatItem({ value, suffix, label }) {
  const { count, ref } = useCountUp(value, 2.5);
  
  return (
    <div ref={ref} className="text-center px-2 py-6 sm:px-4 sm:py-8 relative">
      <div className="font-display font-bold text-3xl sm:text-4xl md:text-6xl text-dark mb-1 tracking-tighter">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm font-medium text-muted uppercase tracking-widest">{label}</div>
    </div>
  );
}

export default function StatsStrip() {
  return (
    <section className="bg-secondary border-y border-black/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 border-l border-t border-black/5">
          <div className="border-r border-b border-black/5"><StatItem value={50000} suffix="+" label="Interviews Completed" /></div>
          <div className="border-r border-b border-black/5"><StatItem value={87} suffix="%" label="Confidence Improvement" /></div>
          <div className="border-r border-b border-black/5"><StatItem value={12000} suffix="+" label="Resumes Analyzed" /></div>
          <div className="border-r border-b border-black/5"><StatItem value={200} suffix="+" label="Colleges Onboarded" /></div>
        </div>
      </div>
      
      {/* Infinite Marquee */}
      <div className="w-full bg-primary py-4 border-t border-black/5 relative flex overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent z-10" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-primary to-transparent z-10" />
        
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ ease: "linear", duration: 30, repeat: Infinity }}
        >
          {/* Double array for seamless looping */}
          {[...colleges, ...colleges].map((college, i) => (
            <div key={i} className="inline-flex items-center mx-8">
              <span className="font-display font-bold text-black/10 text-xl tracking-widest">{college}</span>
              <span className="mx-8 text-orange/30 font-bold">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
