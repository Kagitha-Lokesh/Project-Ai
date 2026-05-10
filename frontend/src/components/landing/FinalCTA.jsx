import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="py-20 md:py-40 relative overflow-hidden flex items-center justify-center min-h-[60vh] md:min-h-[80vh]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/20 via-primary to-primary z-0" />
      
      {/* Floating abstract shapes */}
      <motion.div 
        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-20 w-64 h-64 bg-gold/20 rounded-full blur-[80px]" 
      />
      <motion.div 
        animate={{ y: [20, -20, 20], rotate: [0, -10, 0] }} 
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-orange/10 rounded-full blur-[100px]" 
      />

      {/* Noise overlay */}
      <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="font-display font-bold text-4xl sm:text-6xl md:text-8xl text-dark mb-8 tracking-tight">
            Your Next Interview <span className="block text-gradient-primary">Starts Here.</span>
          </h2>
          <p className="text-lg md:text-2xl text-muted mb-12 max-w-2xl mx-auto">
            Join 50,000+ students who stopped guessing and started practicing smarter with VivaX.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="w-full sm:w-auto"
            >
              <Link 
                to="/register"
                className="btn-primary text-lg px-8 py-4 shadow-[0_15px_40px_rgba(212,160,23,0.3)] flex items-center justify-center"
              >
                Upload Resume & Start &rarr;
              </Link>
            </motion.div>
            <motion.a 
              href="#how-it-works"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="btn-ghost text-lg px-8 py-4 w-full sm:w-auto"
            >
              Watch Demo First
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
