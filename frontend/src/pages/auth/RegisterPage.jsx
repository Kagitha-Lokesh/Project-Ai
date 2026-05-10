import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { User, Mail, Lock, Building, Target, ArrowRight, Check } from 'lucide-react';
import AuthPresentation from '../../components/auth/AuthPresentation';
import AuthCard from '../../components/auth/AuthCard';

const InputField = ({ icon: Icon, label, type, placeholder, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  
  return (
    <div className="space-y-2 flex-1">
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
          className={`w-full bg-white border ${focused ? 'border-orange shadow-[0_0_20px_rgba(255,122,0,0.1)]' : 'border-black/5 shadow-sm'} rounded-xl py-3 md:py-3.5 pl-12 pr-4 text-[13px] font-medium transition-all duration-300 outline-none placeholder:text-muted/50`}
        />
      </div>
    </div>
  );
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    college: '',
    goal: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          title="Join the Evolution" 
          subtitle="Create your AI placement identity today."
        >
          <form className="space-y-3.5 md:space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-4">
              <InputField 
                icon={User}
                label="Full Name"
                type="text"
                placeholder="John Doe"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />

              <InputField 
                icon={Mail}
                label="Email address"
                type="email"
                placeholder="you@example.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <InputField 
                icon={Lock}
                label="Password"
                type="password"
                placeholder="••••••••"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <InputField 
                icon={Lock}
                label="Confirm"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <InputField 
                icon={Building}
                label="College Name"
                type="text"
                placeholder="University of Excellence"
                name="college"
                value={formData.college}
                onChange={handleChange}
              />

              <div className="space-y-2 flex-1">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-muted ml-1">Career Goal</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-4 flex items-center text-muted">
                    <Target className="w-4 h-4" />
                  </div>
                  <select 
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full bg-white border border-black/5 shadow-sm rounded-xl py-2.5 md:py-3 pl-12 pr-4 text-[13px] font-medium outline-none appearance-none cursor-pointer focus:border-orange transition-all"
                  >
                    <option value="">Select path</option>
                    <option value="sde">SDE</option>
                    <option value="data">Data Science</option>
                    <option value="product">Product</option>
                    <option value="consultant">Consulting</option>
                  </select>
                  <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-muted">
                    <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                  </div>
                </div>
              </div>
            </div>

            <div className="px-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <div className="mt-0.5 w-3.5 h-3.5 rounded border border-black/10 bg-white group-hover:border-orange flex items-center justify-center transition-all" />
                <p className="text-[9px] font-medium text-muted leading-relaxed">
                  I agree to the <span className="text-dark font-bold underline">Terms</span> and <span className="text-dark font-bold underline">Privacy Policy</span>.
                </p>
              </label>
            </div>

            <motion.button
              whileHover={{ scale: 1.01, y: -1 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-dark text-white py-3.5 rounded-xl font-black text-[10px] tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Create Account 
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <div className="text-center pt-2">
              <p className="text-[10px] font-medium text-muted">
                Already a member?{' '}
                <Link to="/login" className="text-orange font-black uppercase tracking-widest hover:underline underline-offset-4">
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </AuthCard>

        {/* Logo for mobile */}
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
