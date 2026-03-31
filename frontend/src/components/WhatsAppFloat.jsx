import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function WhatsAppFloat() {
  const number = import.meta.env.VITE_WHATSAPP_NUMBER || '91XXXXXXXXXX';
  const message = encodeURIComponent('Hi Tillu Works, I would like to get a quote for custom printing.');

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-float"
      aria-label="WhatsApp Us"
    >
      <div className="wa-pulse" />
      <MessageCircle size={28} className="relative z-10 fill-white" />
    </a>
  );
}
