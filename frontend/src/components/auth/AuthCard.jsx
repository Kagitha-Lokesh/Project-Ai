import React from 'react';
import { motion } from 'framer-motion';

export default function AuthCard({ children, title, subtitle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-lg"
    >
      <div className="glass-card bg-white/70 backdrop-blur-3xl border border-black/[0.03] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] p-5 md:p-10 relative overflow-hidden">
        {/* Subtle top gradient */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-orange/20 to-transparent" />
        
        <div className="mb-3">
          <motion.h2 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-2xl md:text-3xl font-display font-black text-dark tracking-tight"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-xs md:text-sm text-muted font-medium mt-1"
          >
            {subtitle}
          </motion.p>
        </div>

        {children}

        {/* Security Footer */}
        <div className="mt-6 flex items-center justify-center gap-2 py-3 border-t border-black/5">
          <div className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
          <p className="text-[9px] font-bold text-muted uppercase tracking-widest">
            Your data is <span className="text-dark">safe</span> and <span className="text-dark">encrypted</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
