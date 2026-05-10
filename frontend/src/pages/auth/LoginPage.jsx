import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Github, Hand } from 'lucide-react';
import AuthPresentation from '../../components/auth/AuthPresentation';
import AuthCard from '../../components/auth/AuthCard';

const SocialButton = ({ icon: Icon, label, color }) => (
  <motion.button
    whileHover={{ y: -2, scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3 px-3 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:border-black/10 transition-all duration-300"
  >
    <Icon className={`w-3.5 h-3.5 ${color}`} />
    <span className="text-[10px] font-bold text-dark/70">{label}</span>
  </motion.button>
);

const InputField = ({ icon: Icon, label, type, placeholder, value, onChange, showPasswordToggle, onTogglePassword }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="space-y-2">
      <label className="text-[9px] font-black uppercase tracking-widest text-muted ml-1">{label}</label>
      <div className={`relative group transition-all duration-300 ${focused ? 'scale-[1.01]' : ''}`}>
        <div className={`absolute inset-y-0 left-4 flex items-center transition-colors duration-300 ${focused ? 'text-orange' : 'text-muted'}`}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className={`w-full bg-white border ${focused ? 'border-orange shadow-[0_0_20px_rgba(255,122,0,0.1)]' : 'border-black/5 shadow-sm'} rounded-xl py-3 md:py-4 pl-12 pr-12 text-sm font-medium transition-all duration-300 outline-none placeholder:text-muted/50`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute inset-y-0 right-4 flex items-center text-muted hover:text-dark transition-colors"
          >
            {showPasswordToggle === 'text' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-screen lg:h-screen w-full flex bg-primary overflow-x-hidden overflow-y-auto lg:overflow-hidden justify-center">
      <div className="w-full max-w-7xl flex flex-col lg:flex-row h-full">
        {/* Left Side: Cinematic Presentation */}
        <div className="hidden lg:flex flex-[1.1] h-full">
          <AuthPresentation />
        </div>

        {/* Right Side: Auth Form */}
        <div className="flex-1 lg:flex-[0.9] flex flex-col items-center justify-center p-4 sm:p-8 lg:p-4 relative min-h-screen lg:min-h-0">
        <AuthCard 
          title={<div className="flex items-center gap-2">Welcome back <Hand className="w-6 h-6 md:w-8 md:h-8 text-orange" /></div>} 
          subtitle="Login to continue your preparation journey."
        >
          <form className="space-y-4 md:space-y-5" onSubmit={(e) => e.preventDefault()}>
            <InputField 
              icon={Mail}
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <InputField 
              icon={Lock}
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle={showPassword ? 'text' : 'password'}
              onTogglePassword={() => setShowPassword(!showPassword)}
            />

            <div className="flex items-center justify-between px-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-all duration-200 ${rememberMe ? 'bg-dark border-dark' : 'border-black/10 bg-white group-hover:border-orange'}`} onClick={() => setRememberMe(!rememberMe)}>
                  {rememberMe && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 bg-white rounded-full" />}
                </div>
                <span className="text-[10px] font-bold text-muted group-hover:text-dark transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-[10px] font-bold text-orange hover:text-orange/80 transition-colors">Forgot password?</a>
            </div>

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-dark text-white py-3.5 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Login 
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="text-center pt-2">
              <p className="text-[10px] font-medium text-muted">
                New here?{' '}
                <Link to="/register" className="text-orange font-black uppercase tracking-widest hover:underline underline-offset-4">
                  Create an account
                </Link>
              </p>
            </div>

            <div className="relative flex items-center justify-center py-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-black/5"></div>
              </div>
              <span className="relative z-10 px-4 bg-white/70 text-[8px] font-bold text-muted uppercase tracking-widest">or continue with</span>
            </div>

            <div className="flex gap-3">
              <SocialButton icon={Github} label="GitHub" color="text-dark" />
              <SocialButton icon={Mail} label="Google" color="text-red-500" />
              <SocialButton icon={Lock} label="Microsoft" color="text-blue-500" />
            </div>
          </form>
        </AuthCard>

        {/* Global Logo for Mobile */}
        <div className="absolute top-4 left-6 lg:hidden">
          <Link to="/" className="flex items-center gap-1 font-display font-black text-lg tracking-tighter text-dark">
            VivaX<span className="w-1 h-1 bg-orange rounded-full mt-1" />
          </Link>
      </div>
    </div>
  </div>
</div>
  );
}
