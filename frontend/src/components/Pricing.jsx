import { motion } from 'framer-motion';
import { slideInLeft, slideInRight } from '../utils/animations';
import { Check } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-secondary border-t border-black/5 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-dark mb-6">Start Free. <span className="text-gradient-primary">Upgrade When Ready.</span></h2>
          <p className="text-base sm:text-lg text-muted max-w-2xl mx-auto">No hidden fees. Simple, transparent pricing designed for students.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Free Plan */}
          <motion.div 
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card p-6 sm:p-10 bg-primary/80 border-black/5 relative shadow-sm"
          >
            <div className="mb-8">
              <h3 className="font-display font-bold text-2xl text-dark mb-2">Free Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-5xl text-dark">₹0</span>
              </div>
              <p className="text-muted mt-4">Perfect to get a feel of the AI.</p>
            </div>
            
            <ul className="space-y-4 mb-10">
              {['Limited interview minutes', 'Basic AI feedback', 'Resume parsing', 'Standard company modes'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={18} strokeWidth={2} className="text-muted mt-0.5" />
                  <span className="text-dark/80">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="#" className="btn-ghost w-full">Start Free</a>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="glass-card p-6 sm:p-10 bg-gradient-to-b from-orange/5 to-primary border-orange/30 shadow-[0_15px_50px_rgba(212,160,23,0.15)] relative transform md:scale-105 z-10"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange to-gold rounded-t-2xl" />
            <div className="absolute -top-4 right-8 px-4 py-1 bg-gradient-to-r from-orange to-gold text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
              Most Popular
            </div>

            <div className="mb-8">
              <h3 className="font-display font-bold text-2xl text-dark mb-2">Pro Plan</h3>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-bold text-5xl text-dark">₹299</span>
                <span className="text-muted">/month</span>
              </div>
              <p className="text-orange mt-4 font-medium">Everything you need to clear placements.</p>
            </div>
            
            <ul className="space-y-4 mb-10">
              {['Unlimited interviews', 'Advanced analytics + memory', 'All company simulations', 'Pressure + personality modes', 'Priority AI processing'].map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Check size={18} strokeWidth={2} className="text-orange mt-0.5" />
                  <span className="text-dark font-medium">{feature}</span>
                </li>
              ))}
            </ul>
            
            <a href="#" className="btn-primary w-full">Upgrade to Pro &rarr;</a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
