import { useState, useEffect, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { slideInLeft, slideInRight } from '../utils/animations';
import { AlertTriangle } from 'lucide-react';

function AnimatedCounter({ value, duration = 2500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const spring = useSpring(0, { bounce: 0, duration });
  
  useEffect(() => {
    if (inView) spring.set(value);
  }, [spring, value, inView]);

  useEffect(() => {
    return spring.on("change", (latest) => setCount(Math.round(latest)));
  }, [spring]);

  return <span ref={ref}>{count}</span>;
}

const demoChat = [
  { role: 'ai', text: "I see you've used React + Firebase. Why not PostgreSQL?" },
  { role: 'user', text: "Because Firebase gave real-time sync out of the box which we needed for the chat feature." },
  { role: 'ai', text: "Fair point. But what happens at 100k concurrent users? How does Firebase pricing scale compared to a managed Postgres instance?" },
];

export default function DemoPreview() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [visibleMsgs, setVisibleMsgs] = useState([]);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    
    let timeouts = [];
    setTyping(true);
    
    timeouts.push(setTimeout(() => {
      setVisibleMsgs([demoChat[0]]);
      setTyping(false);
    }, 1200));

    timeouts.push(setTimeout(() => {
      setVisibleMsgs([demoChat[0], demoChat[1]]);
    }, 3000));

    timeouts.push(setTimeout(() => {
      setTyping(true);
    }, 3500));

    timeouts.push(setTimeout(() => {
      setVisibleMsgs(demoChat);
      setTyping(false);
    }, 5500));

    timeouts.push(setTimeout(() => {
      setTyping(true);
    }, 7000));

    return () => timeouts.forEach(clearTimeout);
  }, [isInView]);

  return (
    <section id="demo" className="py-20 md:py-32 bg-secondary border-t border-black/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-amber/10 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-4">See VivaX in <span className="text-gradient-primary">Action</span></h2>
          <p className="text-base sm:text-lg text-muted max-w-xl mx-auto">Real-time analysis running behind the scenes of every interview.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Left: Terminal/Chat */}
          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card flex flex-col h-[400px] sm:h-[500px] overflow-hidden relative"
          >
            <div className="flex items-center gap-2 px-4 py-3 border-b border-black/5 bg-white/60">
              <div className="w-3 h-3 rounded-full bg-red-400/80" />
              <div className="w-3 h-3 rounded-full bg-amber/80" />
              <div className="w-3 h-3 rounded-full bg-green-400/80" />
              <span className="ml-4 text-xs font-mono text-muted">terminal - live-interview.sh</span>
            </div>
            
            <div className="p-6 flex-1 flex flex-col gap-4 overflow-y-auto">
              {visibleMsgs.map((msg, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-dark text-white rounded-tr-sm border border-black/10' 
                      : 'bg-white text-dark rounded-tl-sm border border-black/5'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              
              {typing && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="px-4 py-3 rounded-2xl bg-white border border-black/5 rounded-tl-sm flex gap-1 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Right: Live Analysis Panel */}
          <motion.div 
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card p-6 sm:p-8 flex flex-col justify-between h-auto sm:h-[500px]"
          >
            <div>
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-display font-bold text-xl text-dark">Live Analysis</h3>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-orange/10 border border-orange/20">
                  <span className="w-2 h-2 rounded-full bg-orange animate-pulse" />
                  <span className="text-[10px] text-orange font-bold uppercase tracking-wider">Recording</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark">Confidence</span>
                    <span className="text-dark font-bold"><AnimatedCounter value={72} />%</span>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '72%' }} transition={{ duration: 1.5, delay: 0.5, type: 'spring', bounce: 0.2 }} className="h-full bg-gold" viewport={{ once: true }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark">Technical Depth</span>
                    <span className="text-orange font-bold"><AnimatedCounter value={58} />%</span>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '58%' }} transition={{ duration: 1.5, delay: 0.7, type: 'spring', bounce: 0.2 }} className="h-full bg-orange" viewport={{ once: true }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-dark">Fluency</span>
                    <span className="text-green-500 font-bold"><AnimatedCounter value={81} />%</span>
                  </div>
                  <div className="w-full h-2 bg-black/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} whileInView={{ width: '81%' }} transition={{ duration: 1.5, delay: 0.9, type: 'spring', bounce: 0.2 }} className="h-full bg-green-400" viewport={{ once: true }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-orange/30 bg-orange/5 flex gap-3 items-start">
              <AlertTriangle size={16} strokeWidth={2} className="text-orange mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-orange font-bold mb-1">Filler Words Detected: 3</p>
                <p className="text-xs text-muted">"uhm", "like", "you know" detected in last response. Try to pause instead of using fillers.</p>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-black/5 pt-6">
              <div className="flex gap-1 h-8 items-center">
                {[1,2,3,4,5,6,5,4,3,2,1].map((h, i) => (
                  <motion.div key={i} animate={{ scaleY: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }} className="w-1.5 bg-orange rounded-full" style={{ height: `${h * 4 + 8}px` }} />
                ))}
              </div>
              <a href="#" className="text-sm font-bold text-orange hover:text-dark transition-colors">Try Your Own Interview &rarr;</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
