import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const stats = [
  { value: '500+', label: 'Practice Interviews', suffix: '', color: 'from-orange to-gold' },
  { value: '92', label: 'Improved Confidence', suffix: '%', color: 'from-amber to-orange' },
  { value: '50+', label: 'Company Simulations', suffix: '', color: 'from-gold to-amber' },
  { value: '3x', label: 'Better Placement Rate', suffix: '', color: 'from-orange to-amber' },
]

const colleges = ['VIT', 'JNTUH', 'Osmania', 'BITS', 'NIT Warangal', 'CBIT', 'MVSR', 'KL University']

export default function SocialProof() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="relative py-16 px-6 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange/40 to-transparent" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: i * 0.1 }} className="relative glass-card rounded-2xl p-6 text-center overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-[0.04] group-hover:opacity-[0.08] transition-opacity`} />
              <div className={`text-3xl sm:text-4xl font-display font-black mb-1 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>{stat.value}{stat.suffix}</div>
              <div className="text-xs text-muted font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.4 }} className="text-center">
          <p className="text-xs text-muted font-medium tracking-widest uppercase mb-6">Students from leading colleges</p>
          <div className="flex flex-wrap justify-center gap-3">
            {colleges.map((college, i) => (
              <motion.div key={college} initial={{ opacity: 0, scale: 0.8 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.4, delay: 0.5 + i * 0.05 }} className="glass-card px-4 py-2 rounded-xl text-xs text-muted font-medium border border-black/[0.07] hover:border-orange/30 hover:text-dark transition-all cursor-default">
                {college}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
