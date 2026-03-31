import { Link } from 'react-router-dom';
import { Camera, Globe, Mail, Phone, MapPin, Heart, ArrowUpRight } from 'lucide-react';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-border pt-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                <span className="font-bold text-white text-lg">T</span>
              </div>
              <span className="font-bold text-xl tracking-tight text-secondary">Tillu Works</span>
            </Link>
            <p className="text-muted font-medium text-sm leading-relaxed mb-8">
              Hyderabad's premium destination for custom branding and high-quality printing solutions. From ID cards to luxury gifts.
            </p>
            <div className="flex gap-4">
               {[
                 { icon: <MessageCircle size={18} />, href: 'https://wa.me/919999999999' },
                 { icon: <Camera size={18} />, href: 'https://instagram.com' },
                 { icon: <Globe size={18} />, href: 'https://facebook.com' },
               ].map((social, i) => (
                 <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-all">
                    {social.icon}
                 </a>
               ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-secondary mb-8">Company</h4>
            <ul className="space-y-4">
              {navLinks.map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm font-semibold text-muted hover:text-primary transition-colors flex items-center gap-2 group">
                     {link.label} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black text-xs uppercase tracking-widest text-secondary mb-8">Support</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                 <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                 <span className="text-sm font-semibold text-muted leading-relaxed">Kukatpally, Hyderabad, India 500072</span>
              </li>
              <li>
                 <a href="tel:+919999999999" className="flex items-center gap-4 group">
                    <Phone size={18} className="text-primary shrink-0" />
                    <span className="text-sm font-semibold text-muted group-hover:text-primary">+91 99999 99999</span>
                 </a>
              </li>
              <li>
                 <a href="mailto:hello@tilluworks.in" className="flex items-center gap-4 group">
                    <Mail size={18} className="text-primary shrink-0" />
                    <span className="text-sm font-semibold text-muted group-hover:text-primary">hello@tilluworks.in</span>
                 </a>
              </li>
            </ul>
          </div>

          {/* Newsletter / Meta */}
          <div className="bg-surface rounded-[32px] p-8 border border-border">
             <h4 className="font-black text-xs uppercase tracking-widest text-secondary mb-4">Printing Hours</h4>
             <p className="text-sm font-bold text-muted mb-6">Open Mon – Sat <br /> 09:00 AM – 07:00 PM</p>
             <Link to="/quote" className="btn-primary w-full py-4 text-xs font-black uppercase tracking-widest">Get Quote Now</Link>
          </div>
        </div>

        <div className="border-t border-border py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
           <p className="text-xs font-bold text-muted uppercase tracking-widest">
              © {year} Tillu Works. All Rights Reserved.
           </p>
           <p className="text-xs font-bold text-muted flex items-center gap-2">
              DESIGNED WITH <Heart size={14} className="text-primary fill-primary" /> IN HYDERABAD
           </p>
        </div>
      </div>
    </footer>
  );
}

import { MessageCircle } from 'lucide-react';
