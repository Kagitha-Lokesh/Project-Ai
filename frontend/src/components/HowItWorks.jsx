import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';

function StepCard({ index, title, desc, visual, indexStr, chips }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 20%"]
  });
  
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // For sticky stacking effect
  const stickyTop = `calc(100px + ${index * 40}px)`;

  return (
    <motion.div 
      ref={cardRef}
      style={{ scale, opacity, top: stickyTop }}
      className="sticky w-full mb-24 glass-card p-8 md:p-12 border-t-2 border-t-white"
    >
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-gold font-display font-bold text-6xl opacity-30 mb-4">{indexStr}</div>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-dark mb-4">{title}</h3>
          <p className="text-lg text-muted mb-8 leading-relaxed">{desc}</p>
          {chips && (
            <div className="flex flex-wrap gap-3">
              {chips.map(chip => (
                <div key={chip} className="px-3 py-1.5 rounded-full bg-white/60 border border-black/5 text-sm font-bold text-dark/80 shadow-sm">
                  {chip}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="h-[300px] rounded-2xl bg-white/80 border border-black/5 relative overflow-hidden flex items-center justify-center shadow-inner">
          {visual}
        </div>
      </div>
    </motion.div>
  );
}

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="font-display font-bold text-5xl md:text-6xl text-dark">From Resume to <span className="text-gradient-primary">Ready.</span></h2>
        </div>

        <div className="relative">
          <StepCard 
            index={0}
            indexStr="01"
            title="Upload Your Resume"
            desc="VivaX parses your PDF, extracts your tech stack, and analyzes your projects to build a completely custom question bank tailored just for you."
            chips={['React', 'Node.js', 'AWS', 'Firebase']}
            visual={(
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <motion.div 
                  animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity }}
                  className="w-32 h-40 bg-white border border-black/5 rounded-lg flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
                >
                  <div className="text-orange font-bold text-xl mb-2">PDF</div>
                  <div className="w-16 h-1 bg-black/10 rounded mb-2" />
                  <div className="w-20 h-1 bg-black/10 rounded mb-2" />
                  <div className="w-12 h-1 bg-black/10 rounded" />
                </motion.div>
                <div className="absolute right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3">
                  {['Projects detected', 'Skills mapped', 'Role identified'].map((text, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.2 }}
                      className="px-4 py-2 bg-white/80 border border-gold/20 rounded-lg text-xs font-bold text-dark shadow-sm backdrop-blur-md flex items-center gap-2"
                    >
                      <Check size={14} strokeWidth={1.8} className="text-orange" />
                      {text}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          />

          <StepCard 
            index={1}
            indexStr="02"
            title="AI Voice Interview Begins"
            desc="Speak naturally. The AI listens, understands context, and asks follow-up questions just like a real engineering manager would."
            chips={['TCS Mode', 'Infosys', 'Amazon', 'Startup']}
            visual={(
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5, 4, 3, 2, 1, 2, 3].map((bar, i) => (
                  <motion.div 
                    key={i}
                    animate={{ scaleY: [0.3, 1.5, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                    className="w-3 rounded-full bg-gradient-to-t from-orange to-gold"
                    style={{ height: `${bar * 20}px` }}
                  />
                ))}
              </div>
            )}
          />

          <StepCard 
            index={2}
            indexStr="03"
            title="Get Brutal AI Feedback"
            desc="Stop guessing why you were rejected. Get a detailed breakdown of your technical depth, communication, and confidence immediately."
            chips={['Communication', 'Technical Depth', 'Fluency']}
            visual={(
              <div className="relative w-full h-full flex flex-col items-center justify-center">
                <div className="w-40 h-40 rounded-full border border-black/5 relative flex items-center justify-center bg-white/40">
                  <div className="w-24 h-24 rounded-full border border-black/5 bg-white/60" />
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="absolute inset-0 bg-gold/10 rounded-full"
                    style={{ clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)" }}
                  />
                </div>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-8 glass-card px-4 py-3 text-sm text-dark font-medium border-orange/30 border shadow-md"
                >
                  "Good confidence, but weak technical depth."
                </motion.div>
              </div>
            )}
          />
        </div>
      </div>
    </section>
  );
}
