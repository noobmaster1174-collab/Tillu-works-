import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Mail, Phone, MapPin, Heart } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/quote', label: 'Get a Quote' },
];

const products = [
  { to: '/products#id-cards', label: 'ID Cards' },
  { to: '/products#water-bottles', label: 'Water Bottles' },
  { to: '/products#mugs', label: 'Printed Mugs' },
  { to: '/products#pens', label: 'Printed Pens' },
  { to: '/products#keychains', label: 'Keychains' },
  { to: '/products#diaries', label: 'Custom Diaries' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A1A] text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B00] to-[#FFD700] flex items-center justify-center shadow-lg">
                <span className="font-syne font-black text-white">TW</span>
              </div>
              <div>
                <p className="font-syne font-bold text-white text-xl">Tillu Works</p>
                <p className="text-xs text-[#FFD700]">Your Brand, Beautifully Printed</p>
              </div>
            </Link>
            <p className="text-white/60 font-dm text-sm leading-relaxed mb-6">
              Hyderabad's trusted custom printing and branding solutions company. We bring your brand to life with quality products and fast delivery.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a
                href="https://wa.me/91XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#25D366]/20 text-[#25D366] flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-200"
                aria-label="WhatsApp"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#E1306C]/20 text-[#E1306C] flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-syne font-bold text-white mb-5 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-white/60 hover:text-[#FF6B00] font-dm text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-syne font-bold text-white mb-5 text-sm uppercase tracking-widest">Our Products</h4>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.to}>
                  <Link
                    to={p.to}
                    className="text-white/60 hover:text-[#FF6B00] font-dm text-sm transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-syne font-bold text-white mb-5 text-sm uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#FF6B00] mt-1 shrink-0" />
                <span className="text-white/60 font-dm text-sm leading-relaxed">
                  Tillu Works, Kukatpally,<br />Hyderabad, Telangana 500072
                </span>
              </li>
              <li>
                <a href="tel:+919999999999" className="flex items-center gap-3 text-white/60 hover:text-[#FF6B00] font-dm text-sm transition-colors">
                  <Phone size={16} className="text-[#FF6B00] shrink-0" />
                  +91 99999 99999
                </a>
              </li>
              <li>
                <a href="mailto:hello@tilluworks.in" className="flex items-center gap-3 text-white/60 hover:text-[#FF6B00] font-dm text-sm transition-colors">
                  <Mail size={16} className="text-[#FF6B00] shrink-0" />
                  hello@tilluworks.in
                </a>
              </li>
            </ul>
            <div className="mt-6 p-4 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20">
              <p className="text-[#FFD700] font-syne font-bold text-sm mb-1">Business Hours</p>
              <p className="text-white/60 font-dm text-xs">Mon – Sat: 9 AM – 7 PM</p>
              <p className="text-white/60 font-dm text-xs">Sunday: 10 AM – 4 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 font-dm text-sm">
            © {year} Tillu Works. All rights reserved.
          </p>
          <p className="text-white/40 font-dm text-sm flex items-center gap-1.5">
            Made with <Heart size={13} className="text-[#FF6B00] fill-[#FF6B00]" /> in Hyderabad
          </p>
        </div>
      </div>
    </footer>
  );
}
