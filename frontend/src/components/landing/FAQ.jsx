import { useState, useRef, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, Sparkles, Brain, Cpu, Zap, CreditCard } from 'lucide-react';

const categories = [
  { id: 'all', label: 'All', icon: <Sparkles size={14} /> },
  { id: 'ai', label: 'AI Voice', icon: <Cpu size={14} /> },
  { id: 'resume', label: 'Resume', icon: <Brain size={14} /> },
  { id: 'placement', label: 'Placement', icon: <Zap size={14} /> },
  { id: 'pricing', label: 'Pricing', icon: <CreditCard size={14} /> },
];

const faqs = [
  { 
    cat: 'resume',
    q: 'How does VivaX understand my resume?', 
    a: 'You upload your PDF resume. Our proprietary parsing engine extracts your skills, projects, and experience, creating a structured profile that the AI interviewer uses to generate context-aware questions.' 
  },
  { 
    cat: 'ai',
    q: 'Is voice interaction actually real-time?', 
    a: 'Yes. We use advanced Speech-to-Text and Text-to-Speech models optimized for extremely low latency, making the conversation flow naturally just like a Zoom call.' 
  },
  { 
    cat: 'placement',
    q: 'Can I practice for TCS/Infosys specifically?', 
    a: 'Absolutely. We have dedicated Company Modes that simulate the exact question patterns, difficulty levels, and behavioral criteria of major mass recruiters and product companies.' 
  },
  { 
    cat: 'placement',
    q: 'What is Tenglish mode?', 
    a: 'Tenglish mode allows the AI to understand and respond in a mix of Telugu and English. This is incredibly helpful for students transitioning from regional language mediums to English corporate environments.' 
  },
  { 
    cat: 'ai',
    q: 'How accurate is the AI feedback?', 
    a: 'Our feedback engine is trained on thousands of real interview transcripts. It evaluates not just your technical accuracy, but also your confidence, filler words, and communication structure.' 
  },
  { 
    cat: 'placement',
    q: 'Does it support coding rounds?', 
    a: 'Currently, VivaX focuses on the verbal technical and HR rounds where most students struggle with communication and articulation under pressure. Dedicated coding environments are on our roadmap.' 
  },
  { 
    cat: 'resume',
    q: 'Is my resume data private?', 
    a: '100% private. Your resume is processed securely to generate your interview context and is never shared with third parties or used to train public models.' 
  },
];

const FAQItem = forwardRef(({ faq, isOpen, onToggle, index, onHover }, ref) => {
  return (
    <motion.div 
      ref={ref}
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      onMouseEnter={onHover}
      className="mb-3"
    >
      <div
        className={`glass-card overflow-hidden transition-all duration-500 rounded-[22px] ${
          isOpen 
            ? 'border-orange/40 shadow-[0_20px_50px_rgba(255,122,0,0.12)] bg-orange/[0.02]' 
            : 'border-black/5 hover:border-black/10'
        }`}
      >
        <button 
          onClick={onToggle}
          className="w-full text-left py-5 px-6 flex justify-between items-center group relative z-10"
        >
          <div className="flex items-center gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
              isOpen ? 'bg-orange text-white' : 'bg-black/5 text-muted group-hover:text-dark'
            }`}>
              <MessageSquare size={14} />
            </div>
            <span className={`font-bold text-base transition-colors duration-300 ${
              isOpen ? 'text-dark' : 'text-dark/70 group-hover:text-dark'
            }`}>
              {faq.q}
            </span>
          </div>
          <motion.div 
            animate={{ rotate: isOpen ? 180 : 0 }} 
            className={isOpen ? 'text-orange' : 'text-muted'}
          >
            <ChevronDown size={18} strokeWidth={2.5} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2">
                <p className="text-muted text-sm leading-relaxed max-w-[90%] font-medium">
                  {faq.a}
                </p>
                <div className="mt-4 flex gap-2">
                  <div className="px-2 py-1 rounded bg-orange/5 border border-orange/10 text-[9px] font-black text-orange uppercase tracking-widest">AI Verified</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
});

function AIOrb({ isReacting }) {
  const bars = [1, 2, 3, 4, 3, 2, 1];
  return (
    <div className="relative w-48 h-48 md:w-56 md:h-56">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute inset-0 border border-orange/20 rounded-full opacity-40" />
      <motion.div animate={{ scale: isReacting ? [1, 1.2, 1] : 1 }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-14 bg-gradient-to-br from-orange to-gold rounded-full blur-2xl opacity-20" />
      <div className="absolute inset-16 bg-white/95 backdrop-blur-xl rounded-full border border-orange/20 flex items-center justify-center">
        <div className="flex gap-1.5 items-center">
          {bars.map((h, i) => (
            <motion.div key={i} animate={{ height: isReacting ? [h*6+8, h*12+16, h*6+8] : [h*2+4, h*6+8, h*2+4] }} transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.05 }} className="w-1 bg-orange rounded-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState(faqs[0].q);
  const [activeTab, setActiveTab] = useState('all');
  const [isOrbReacting, setIsOrbReacting] = useState(false);

  const filteredFaqs = activeTab === 'all' ? faqs : faqs.filter(f => f.cat === activeTab);

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#F8F6F2] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-12 md:gap-20">
          
          <div className="flex flex-col">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-orange bg-orange/5 px-3 py-1 rounded-full border border-orange/10 w-fit">Support Hub</span>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-dark leading-[0.9] tracking-tighter">Questions<br />Students<br /><span className="text-orange/70 font-normal">Actually</span> Ask</h2>
            </motion.div>
            <div className="hidden lg:flex mt-12"><AIOrb isReacting={isOrbReacting || openQuestion !== null} /></div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-300 ${activeTab === cat.id ? 'bg-dark text-white' : 'bg-white border border-black/5 text-muted hover:border-black/10'}`}
                >
                  <span className="relative z-10 flex items-center gap-2">{cat.icon}{cat.label}</span>
                </button>
              ))}
            </div>

            <div className="relative">
              <AnimatePresence mode="popLayout">
                {filteredFaqs.map((faq, i) => (
                  <FAQItem 
                    key={faq.q} 
                    faq={faq} 
                    index={i}
                    isOpen={openQuestion === faq.q} 
                    onToggle={() => setOpenQuestion(openQuestion === faq.q ? null : faq.q)} 
                    onHover={() => setIsOrbReacting(true)}
                  />
                ))}
              </AnimatePresence>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
