import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line, ResponsiveContainer } from 'recharts'
import { TrendingUp } from 'lucide-react'

const radarData = [{ metric: 'Communication', score: 72 }, { metric: 'Confidence', score: 85 }, { metric: 'Technical', score: 68 }, { metric: 'Problem Solving', score: 78 }, { metric: 'Clarity', score: 82 }, { metric: 'Vocabulary', score: 90 }]
const progressData = [{ session: 'S1', score: 52 }, { session: 'S2', score: 58 }, { session: 'S3', score: 65 }, { session: 'S4', score: 70 }, { session: 'S5', score: 78 }, { session: 'S6', score: 84 }]
const skillData = [{ name: 'DBMS', score: 90 }, { name: 'React', score: 82 }, { name: 'DSA', score: 58 }, { name: 'OS', score: 70 }, { name: 'Networks', score: 63 }]
const metricsTop = [
  { label: 'Placement Readiness', value: '84%', color: '#8b5cf6', sub: '32% this week', icon: TrendingUp }, 
  { label: 'Total Sessions', value: '12', color: '#22d3ee', sub: '4h 20m practice' }, 
  { label: 'Top Strength', value: 'Vocabulary', color: '#34d399', sub: '90/100 score' }, 
  { label: 'Weak Area', value: 'DSA', color: '#f97316', sub: 'Needs practice' }
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) return <div className="glass px-3 py-2 rounded-xl border border-white/10 text-xs text-white/80"><p className="font-bold mb-1">{label}</p><p style={{ color: '#8b5cf6' }}>{payload[0].value}%</p></div>
  return null
}

export default function AnalyticsPreview() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  return (
    <section ref={ref} className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-vivax-cyan/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-vivax-navy/30 to-transparent" />
      <div className="container-max relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full border border-white/10 mb-5"><span className="text-xs text-white/50 font-medium tracking-widest uppercase">Analytics Dashboard</span></div>
          <h2 className="font-display font-black text-4xl lg:text-5xl text-white mb-4">See <span className="gradient-text">Every Detail</span> of Your Growth</h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">Beautiful charts that show exactly where you are — and what you need to work on.</p>
        </motion.div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {metricsTop.map((m, i) => (
              <motion.div key={m.label} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.1 }} className="glass rounded-2xl p-5 border border-white/[0.07]">
                <div className="text-2xl font-display font-black mb-1" style={{ color: m.color }}>{m.value}</div>
                <div className="text-xs text-white/60 font-medium mb-1">{m.label}</div>
                <div className="text-[11px] text-white/30 flex items-center gap-1">
                  {m.icon && <m.icon size={10} className="text-[#22d3ee]" />}
                  {m.sub}
                </div>
              </motion.div>
            ))}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.2 }} className="glass rounded-2xl p-6 border border-white/[0.07]">
            <h3 className="text-sm font-semibold text-white/80 mb-4">Skill Radar</h3>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="var(--chart-grid)" />
                <PolarAngleAxis dataKey="metric" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} />
                <Radar name="Score" dataKey="score" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="glass rounded-2xl p-6 border border-white/[0.07]">
            <h3 className="text-sm font-semibold text-white/80 mb-1">Readiness Over Time</h3>
            <p className="text-[11px] text-white/30 mb-4">Last 6 sessions</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={progressData}>
                <XAxis dataKey="session" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--chart-text)', fontSize: 10 }} axisLine={false} tickLine={false} domain={[40, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="score" stroke="#22d3ee" strokeWidth={2.5} dot={{ fill: '#22d3ee', r: 3, strokeWidth: 0 }} activeDot={{ r: 5, fill: '#22d3ee' }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.4 }} className="glass rounded-2xl p-6 border border-white/[0.07]">
            <h3 className="text-sm font-semibold text-white/80 mb-1">Topic Scores</h3>
            <p className="text-[11px] text-white/30 mb-4">By subject area</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={skillData} layout="vertical" barSize={10}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: 'var(--chart-text)', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: 'var(--chart-text)', fontSize: 10 }} axisLine={false} tickLine={false} width={55} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} fill="url(#barGradient)" />
                <defs><linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#6c3de8" /><stop offset="100%" stopColor="#22d3ee" /></linearGradient></defs>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.5 }} className="mt-6 glass-strong rounded-2xl p-6 border border-vivax-purple/20 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-white/40 font-medium mb-1 uppercase tracking-widest">Placement Readiness Index</p>
            <div className="flex items-end gap-3"><span className="font-display font-black text-5xl gradient-text">84</span><span className="text-2xl text-white/30 font-bold mb-1">/ 100</span></div>
            <p className="text-sm text-white/50 mt-1">You are <span className="text-vivax-cyan font-semibold">interview-ready</span> for service companies</p>
          </div>
          <div className="flex-1 max-w-sm">
            <div className="flex justify-between text-xs text-white/40 mb-2"><span>Progress</span><span>84%</span></div>
            <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={inView ? { width: '84%' } : {}} transition={{ duration: 1.5, delay: 0.7, ease: 'easeOut' }} className="h-full rounded-full bg-gradient-to-r from-vivax-purple to-vivax-cyan" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
