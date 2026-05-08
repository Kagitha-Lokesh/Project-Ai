import Navbar from './components/Navbar';
import Hero from './components/Hero';
import StatsStrip from './components/StatsStrip';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import DemoPreview from './components/DemoPreview';
import CompanyModes from './components/CompanyModes';
import Analytics from './components/Analytics';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import SpotlightCursor from './components/SpotlightCursor';
import { motion, useScroll } from 'framer-motion';

export default function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange to-gold z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      <SpotlightCursor />
      <Navbar />
      <main>
        <Hero />
        <StatsStrip />
        <HowItWorks />
        <Features />
        <DemoPreview />
        <CompanyModes />
        <Analytics />
        <Testimonials />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
