import Navbar from '../components/layout/Navbar';
import Hero from '../components/landing/Hero';
import StatsStrip from '../components/landing/StatsStrip';
import HowItWorks from '../components/landing/HowItWorks';
import Features from '../components/landing/Features';
import DemoPreview from '../components/landing/DemoPreview';
import CompanyModes from '../components/landing/CompanyModes';
import Analytics from '../components/landing/Analytics';
import Testimonials from '../components/landing/Testimonials';
import Pricing from '../components/landing/Pricing';
import FAQ from '../components/landing/FAQ';
import FinalCTA from '../components/landing/FinalCTA';
import SocialProof from '../components/landing/SocialProof';
import Footer from '../components/layout/Footer';
import { motion, useScroll } from 'framer-motion';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-primary transition-colors duration-300">
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange to-gold z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
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
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
