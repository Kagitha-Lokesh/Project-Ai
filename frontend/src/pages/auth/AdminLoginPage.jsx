import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Shield, Lock, Cpu, ArrowRight, Zap, Terminal, Activity, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Elite Sub-Components ---

const SpotlightCursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        background: `radial-gradient(1000px circle at var(--x) var(--y), rgba(255,122,0,0.06), transparent 80%)`,
        '--x': smoothX,
        '--y': smoothY,
      }}
    />
  );
};

const AtmosphericFog = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40">
    <motion.div
      animate={{ 
        x: [-20, 20], 
        y: [-20, 20],
        opacity: [0.02, 0.04, 0.02]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-10%] bg-[radial-gradient(circle_at_30%_30%,rgba(255,122,0,0.05),transparent_50%)] blur-[100px]"
    />
    <motion.div
      animate={{ 
        x: [20, -20], 
        y: [20, -20],
        opacity: [0.01, 0.03, 0.01]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute inset-[-10%] bg-[radial-gradient(circle_at_70%_70%,rgba(0,0,0,0.4),transparent_60%)] blur-[120px]"
    />
  </div>
);

const TacticalOverlay = () => (
  <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
    {/* Noise Overlay - High Density Material Realism */}
    <div className="absolute inset-0 opacity-[0.04] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] pointer-events-none mix-blend-overlay" />
    
    {/* Grid System - Subtle Deep Depth */}
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:40px_40px]" />
    
    {/* Idle System Indicators - Responsive */}
    <div className="absolute top-4 left-4 md:top-10 md:left-10 flex flex-col gap-1.5 md:gap-2">
      <div className="flex items-center gap-2 md:gap-3">
        <motion.div 
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="w-0.5 h-2 md:w-1 md:h-3 bg-orange/40 rounded-full" 
        />
        <span className="text-[7px] md:text-[8px] font-black text-orange/40 tracking-[0.4em] md:tracking-[0.6em] uppercase">Sys://Vivax_Core</span>
      </div>
      <div className="flex items-center gap-2 ml-2 md:ml-4">
        <motion.div 
          animate={{ 
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-1 h-1 rounded-full bg-orange shadow-[0_0_8px_rgba(255,122,0,0.4)]" 
        />
        <span className="text-[6px] md:text-[7px] font-bold text-white/5 uppercase tracking-[0.2em] md:tracking-[0.3em]">Neural_Active</span>
      </div>
    </div>

    {/* Micro Signal Scans */}
    {[...Array(8)].map((_, i) => (
      <motion.div
        key={i}
        animate={{
          y: ['100vh', '-10vh'],
          opacity: [0, 0.1, 0]
        }}
        transition={{
          duration: 8 + Math.random() * 8,
          repeat: Infinity,
          delay: Math.random() * 5,
          ease: "linear"
        }}
        className="absolute w-px h-16 bg-gradient-to-t from-transparent via-orange/10 to-transparent"
        style={{ left: `${Math.random() * 100}%` }}
      />
    ))}
  </div>
);


const InputField = ({ icon: Icon, label, type, placeholder, value, onChange, name, focused, setFocused }) => {
  const [show, setShow] = useState(false);
  const isPassword = type === 'password';

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-1.5 group"
    >
      <div className="flex justify-between items-center px-1">
        <label className="text-[9px] md:text-[8px] font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-white/20 group-focus-within:text-orange/50 transition-colors">
          {label}
        </label>
        <motion.span 
          animate={focused === name ? { opacity: [0.1, 0.3, 0.1] } : {}}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-[7px] font-bold text-white/5 uppercase tracking-widest hidden xs:block"
        >
          {focused === name ? 'Intelligent_Link_Active' : 'Secure_Encrypted'}
        </motion.span>
      </div>
      
      <div className={`relative transition-all duration-700 ${focused === name ? 'scale-[1.005]' : ''}`}>
        {/* Animated Border Current */}
        <AnimatePresence>
          {focused === name && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-[1px] rounded-xl overflow-hidden pointer-events-none z-0"
            >
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_60%,rgba(255,122,0,0.3)_100%)]"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className={`absolute inset-y-0 left-4 flex items-center z-10 transition-colors duration-500 ${focused === name ? 'text-orange' : 'text-white/10'}`}>
          <Icon className={`w-3.5 h-3.5 ${focused === name ? 'shadow-[0_0_10px_rgba(255,122,0,0.5)]' : ''}`} />
        </div>
        
        <input
          type={isPassword ? (show ? 'text' : 'password') : type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(name)}
          onBlur={() => setFocused(null)}
          placeholder={placeholder}
          className="w-full bg-black/40 backdrop-blur-md border border-white/5 rounded-xl py-3 pl-12 pr-12 text-[13px] font-medium text-white/90 outline-none transition-all duration-700 focus:border-orange/20 focus:bg-white/[0.02] placeholder:text-white/5 relative z-1"
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-4 flex items-center text-white/5 hover:text-orange/40 transition-colors z-10"
          >
            {show ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
        )}
      </div>
    </motion.div>
  );
};

// --- Main Elite Terminal Component ---

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [focused, setFocused] = useState(null);
  const [isInitializing, setIsInitializing] = useState(false);

  const handleInitialize = () => {
    setIsInitializing(true);
    setTimeout(() => setIsInitializing(false), 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="h-screen w-full bg-[#030303] flex flex-col items-center justify-center p-4 relative overflow-hidden"
    >
      <SpotlightCursor />
      <AtmosphericFog />
      <TacticalOverlay />

      {/* Atmospheric Haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,122,0,0.03),transparent_80%)] pointer-events-none" />

      <div className="w-full max-w-sm md:max-w-md relative z-10 flex flex-col items-center">
        {/* Cinematic Header - Micro Polished */}
        <motion.div variants={itemVariants} className="text-center mb-4 md:mb-5">
          <div className="inline-flex items-center justify-center w-10 h-10 md:w-14 md:h-14 rounded-xl bg-white/[0.01] border border-white/5 mb-2 md:mb-3 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <Shield className="w-5 h-5 md:w-7 md:h-7 text-orange/80 relative z-10 group-hover:scale-105 group-hover:text-orange transition-all duration-1000" />
            {/* Edge Illumination */}
            <div className="absolute inset-0 border border-white/5 rounded-xl pointer-events-none" />
          </div>

          <motion.h1 
            initial={{ opacity: 0, letterSpacing: '0.4em', filter: 'blur(10px)' }}
            animate={{ opacity: 1, letterSpacing: '0.15em', filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-lg md:text-2xl font-display font-black text-white/90 uppercase leading-tight relative"
          >
            Authorized Access
            <motion.div 
              animate={{ left: ['-100%', '200%'] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none mix-blend-overlay"
            />
          </motion.h1>
          <p className="text-[7px] md:text-[8px] font-black text-white/10 uppercase tracking-[0.4em] md:tracking-[0.6em] mt-2 md:mt-2.5">
            Internal AI Control System
          </p>
        </motion.div>

        {/* Terminal Card - High-Density Material */}
        <motion.div
          variants={itemVariants}
          className="relative group w-full px-1 md:px-0"
        >
          {/* Extremely Subtle Outer Glow */}
          <div className="absolute -inset-1 bg-orange/5 blur-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          
          <div className="relative bg-[#080808]/60 backdrop-blur-[60px] border border-white/[0.04] rounded-2xl p-5 md:p-9 shadow-2xl overflow-hidden">
            {/* Scanning Reflection Refinement */}
            <motion.div 
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-2/3 h-[1px] bg-gradient-to-r from-transparent via-orange/20 to-transparent z-20"
            />
            
            {/* Layered Noise Reflection */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02] pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />

            <form className="space-y-4 md:space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
              <InputField 
                icon={Terminal} 
                label="Access Identifier" 
                name="email"
                type="email" 
                placeholder="ROOT_SECURE" 
                value={email} 
                onChange={setEmail}
                focused={focused}
                setFocused={setFocused}
              />
              <InputField 
                icon={Lock} 
                label="Encryption Key" 
                name="password"
                type="password" 
                placeholder="VALIDATE_SEQUENCE" 
                value={password} 
                onChange={setPassword}
                focused={focused}
                setFocused={setFocused}
              />
              <InputField 
                icon={Cpu} 
                label="Neural PIN" 
                name="pin"
                type="text" 
                placeholder="----" 
                value={pin} 
                onChange={setPin}
                focused={focused}
                setFocused={setFocused}
              />

              <motion.button
                whileHover={{ scale: 1.005, y: -2 }}
                whileTap={{ scale: 0.99, y: 0 }}
                onClick={handleInitialize}
                disabled={isInitializing}
                className="w-full bg-orange text-dark font-black text-[9px] tracking-[0.4em] uppercase py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-700 shadow-[0_10px_30px_rgba(255,122,0,0.1)] mt-6 relative overflow-hidden group/btn"
              >
                {/* Metallic Reflection Sweep */}
                <motion.div 
                  animate={{ left: ['-150%', '250%'] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-y-0 w-24 bg-white/10 skew-x-[45deg] pointer-events-none"
                />
                
                <AnimatePresence mode="wait">
                  {isInitializing ? (
                    <motion.div 
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-3"
                    >
                      <Activity className="w-3.5 h-3.5 animate-spin" />
                      <span>Initializing...</span>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="static"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span>Initialize Session</span>
                      <Zap className="w-3.5 h-3.5 group-hover/btn:rotate-12 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </form>

            {/* Status Panel - Elite Polish */}
            <div className="mt-8 flex flex-col items-center gap-4">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <motion.div 
                    key={i}
                    animate={{ 
                      opacity: [0.05, 0.2, 0.05],
                      scaleY: [1, 1.5, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: i * 0.2 }}
                    className="w-[2px] h-1 bg-orange/40 rounded-full"
                  />
                ))}
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <p className="text-[7px] font-black text-white/5 uppercase tracking-[0.4em]">
                  Security Protocol: <span className="text-orange/40">VIVAX_SHIELD_PRO_07</span>
                </p>
                <motion.p 
                  animate={{ opacity: [0.05, 0.1, 0.05] }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="text-[6px] font-bold text-white/5 uppercase tracking-[0.5em]"
                >
                  SYS_LINK_READY // 0xFA42_SECURE
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exit Node */}
        <motion.div 
          variants={itemVariants}
          className="mt-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 text-[8px] font-black text-white/5 hover:text-orange/30 transition-all uppercase tracking-[0.5em] group">
            <ArrowRight className="w-2.5 h-2.5 rotate-180 group-hover:-translate-x-1 transition-transform" />
            Terminate Protocol
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
