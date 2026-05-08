import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Building2, ChevronRight } from 'lucide-react'

const companies = [
  { id: 'tcs', name: 'TCS', mode: 'Service Company', focus: 'HR + Aptitude + Communication', rounds: ['Verbal Ability', 'Aptitude Test', 'HR Round', 'Technical Basics'], color: '#22d3ee', bg: 'from-cyan-500/10 to-blue-500/5', difficulty: 'Medium', questions: 180 },
  { id: 'infosys', name: 'Infosys', mode: 'Service Company', focus: 'Communication + Core CS', rounds: ['Aptitude', 'Verbal', 'Technical', 'HR'], color: '#8b5cf6', bg: 'from-purple-500/10 to-indigo-500/5', difficulty: 'Medium', questions: 210 },
  { id: 'amazon', name: 'Amazon', mode: 'Product Company', focus: 'DSA + System Design + LPs', rounds: ['Coding Round', 'System Design', 'Bar Raiser', 'LP Deep Dive'], color: '#f59e0b', bg: 'from-amber-500/10 to-orange-500/5', difficulty: 'Hard', questions: 320 },
  { id: 'startup', name: 'Startup', mode: 'Fast-Paced Startup', focus: 'Projects + Problem Solving + Culture', rounds: ['Take-home Task', 'Technical Interview', 'Founder Round'], color: '#e879f9', bg: 'from-pink-500/10 to-purple-500/5', difficulty: 'Varied', questions: 150 },
  { id: 'wipro', name: 'Wipro', mode: 'Service Company', focus: 'Aptitude + Core + Communication', rounds: ['Online Test', 'Technical', 'HR'], color: '#34d399', bg: 'from-emerald-500/10 to-teal-500/5', difficulty: 'Easy-Medium', questions: 160 },
  { id: 'google', name: 'Google', mode: 'FAANG', focus: 'Algorithms + System Design + Behavioral', rounds: ['Phone Screen', 'Coding x3', 'System Design', 'Behavioral'], color: '#f97316', bg: 'from-orange-500/10 to-red-500/5', difficulty: 'Very Hard', questions: 500 },
]

const difficultyColor = { Easy: '#34d399', 'Easy-Medium': '#34d399', Medium: '#f59e0b', Hard: '#f97316', 'Very Hard': '#ef4444', Varied: '#8b5cf6' }

export default function CompanySimulation() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState('amazon')

  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vivax-navy/20 to-transparent" />
      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10 mb-5"><Building2 className="w-3.5 h-3.5 text-white/40" /><span className="text-xs text-white/50 font-medium tracking-widest uppercase">Company Simulations</span></div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white mb-4">Practice for <span className="gradient-text">Any Company</span></h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Each company has a completely different interview culture. VivaX simulates all of them.</p>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {companies.map((co, i) => (
            <motion.div key={co.id} initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.08 }} onClick={() => setSelected(co.id)} onMouseEnter={() => setHovered(co.id)} onMouseLeave={() => setHovered(null)} id={`company-${co.id}`} className={`relative glass rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${selected === co.id ? 'scale-[1.02]' : 'border-white/[0.08] hover:border-white/20'}`} style={{ borderColor: selected === co.id ? `${co.color}60` : undefined, boxShadow: selected === co.id ? `0 0 30px ${co.color}20` : undefined }}>
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${co.bg} transition-opacity ${selected === co.id || hovered === co.id ? 'opacity-100' : 'opacity-0'}`} />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-2xl text-white">{co.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-lg" style={{ background: `${difficultyColor[co.difficulty]}15`, color: difficultyColor[co.difficulty] }}>{co.difficulty}</span>
                </div>
                <p className="text-xs text-white/40 mb-2">{co.mode}</p>
                <p className="text-xs font-medium mb-3" style={{ color: co.color }}>{co.focus}</p>
                <div className="flex items-center justify-between text-[11px] text-white/30"><span>{co.questions}+ Questions</span><span>{co.rounds.length} Rounds</span></div>
              </div>
            </motion.div>
          ))}
        </div>
        {selected && (() => {
          const co = companies.find(c => c.id === selected)
          return (
            <motion.div key={selected} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="glass-strong rounded-2xl p-6 border border-white/10" style={{ borderColor: `${co.color}20` }}>
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div><h3 className="font-display font-black text-2xl text-white mb-1">{co.name} Mode</h3><p className="text-sm text-white/50">{co.focus}</p></div>
                <a href="#" id={`start-${co.id}-interview`} className="btn-primary" style={{ background: `linear-gradient(135deg, ${co.color}99, ${co.color})` }}>Start {co.name} Interview<ChevronRight className="w-4 h-4" /></a>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {co.rounds.map((round, i) => (
                  <div key={i} className="flex items-center gap-2 glass px-3 py-1.5 rounded-xl text-xs">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: co.color }} /><span className="text-white/70">{round}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )
        })()}
      </div>
    </section>
  )
}
