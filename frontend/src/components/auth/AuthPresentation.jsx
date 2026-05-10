import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, Target, ArrowRight } from 'lucide-react';

const FeatureItem = ({ icon: Icon, title, desc, delay }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className="flex items-start gap-4 group"
  >
    <div className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-orange/30 transition-all duration-300">
      <Icon className="w-5 h-5 text-orange" />
    </div>
    <div>
      <h4 className="text-sm font-black text-dark tracking-wide uppercase">{title}</h4>
      <p className="text-xs text-muted font-medium mt-1 leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const AIOrb = () => (
  <div className="relative w-48 h-48 md:w-64 md:h-64 flex items-center justify-center">
    {/* Ambient Glow */}
    <motion.div
      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-orange/30 rounded-full blur-[60px]"
    />
    
    {/* Orbiting Rings */}
    {[1, 2, 3].map((i) => (
      <motion.div
        key={i}
        animate={{ rotate: 360 }}
        transition={{ duration: 15 + i * 5, repeat: Infinity, ease: "linear" }}
        className="absolute border border-orange/20 rounded-full"
        style={{
          width: `${70 + i * 15}%`,
          height: `${70 + i * 15}%`,
          opacity: 0.6 - i * 0.1
        }}
      />
    ))}

    {/* The Core Orb */}
    <motion.div
      animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-28 h-28 md:w-40 md:h-40"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-orange/60 via-gold/30 to-transparent rounded-full blur-2xl" />
      <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl rounded-full border border-orange/30 shadow-2xl overflow-hidden">
        {/* Holographic pattern inside */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-4 bg-orange/10 rounded-full blur-2xl"
        />
      </div>
    </motion.div>

    {/* Floating Particles */}
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: [-20, 20, -20],
          x: [-10, 10, -10],
          opacity: [0, 1, 0]
        }}
        transition={{
          duration: 3 + i,
          repeat: Infinity,
          delay: i * 0.5
        }}
        className="absolute w-1 h-1 bg-orange rounded-full"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`
        }}
      />
    ))}
  </div>
);

export default function AuthPresentation() {
  return (
    <div className="hidden lg:flex flex-col justify-between h-full p-10 xl:p-12 relative overflow-hidden bg-primary/50">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-orange/60 border-l-2 border-orange/40 pl-3">
            AI Placement Simulator
          </span>
          <h1 className="mt-6 font-display font-black text-5xl xl:text-7xl text-dark leading-[0.9] tracking-tighter">
            CRACK <br />
            THE <br />
            <span className="text-gradient-primary">ROUND</span>
          </h1>
          <p className="mt-6 text-sm md:text-base text-muted max-w-sm font-medium leading-relaxed">
            AI-powered mock interviews that think, adapt and make you unstoppable.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6">
          <FeatureItem 
            icon={Sparkles} 
            title="Realistic AI Interviews" 
            desc="Experience real company simulations." 
            delay={0.4}
          />
          <FeatureItem 
            icon={Brain} 
            title="Smart Feedback" 
            desc="Get AI-powered insights." 
            delay={0.5}
          />
          <FeatureItem 
            icon={Target} 
            title="Track & Improve" 
            desc="Analyze performance daily." 
            delay={0.6}
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-start gap-8 mb-4">
        <div className="ml-4">
          <AIOrb />
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="p-5 glass-card bg-white/40 border border-orange/10 flex items-center gap-4 shadow-lg"
        >
          <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center">
            <Target className="w-4 h-4 text-orange" />
          </div>
          <p className="text-[10px] font-bold text-dark/60 tracking-tight">
            Trusted by thousands to <br />
            ace their dream placements.
          </p>
        </motion.div>
      </div>

      {/* Decorative ambient lighting */}
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
