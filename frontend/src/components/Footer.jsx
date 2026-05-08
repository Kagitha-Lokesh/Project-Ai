import { Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const footerLinks = {
  Product: ['Features', 'Company Modes', 'Analytics', 'Pricing', 'Changelog'],
  Company: ['About Us', 'Careers', 'Blog', 'Contact'],
  Resources: ['Interview Guide', 'Resume Templates', 'TCS NQT Prep', 'FAANG Guide'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Cookie Policy'],
};

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-black/5 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
          <div className="col-span-2">
            <a href="#" className="flex items-center gap-1 group mb-6">
              <span className="font-display font-bold text-3xl tracking-wide text-dark">VivaX</span>
              <div className="w-2 h-2 rounded-full bg-orange mt-1 shadow-sm" />
            </a>
            <p className="text-muted leading-relaxed max-w-sm mb-8">
              India's most realistic AI placement interview simulator. Built for students who want to walk into placements already prepared.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/60 border border-black/5 flex items-center justify-center text-muted hover:text-dark hover:border-gold hover:bg-gold/10 transition-all shadow-sm"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/60 border border-black/5 flex items-center justify-center text-muted hover:text-dark hover:border-gold hover:bg-gold/10 transition-all shadow-sm"><Linkedin className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/60 border border-black/5 flex items-center justify-center text-muted hover:text-dark hover:border-gold hover:bg-gold/10 transition-all shadow-sm"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/60 border border-black/5 flex items-center justify-center text-muted hover:text-dark hover:border-gold hover:bg-gold/10 transition-all shadow-sm"><Youtube className="w-4 h-4" /></a>
            </div>
          </div>
          
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-display font-bold text-dark mb-6 uppercase tracking-wider text-sm">{title}</h4>
              <ul className="space-y-4">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-muted hover:text-dark transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-black/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">© 2025 VivaX. Made for Bharat's engineers.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted font-bold uppercase tracking-wider">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
