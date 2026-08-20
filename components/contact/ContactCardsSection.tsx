"use client";

import React from "react";
import { motion } from "framer-motion";
import { PhoneCall, MessageCircle, Mail } from "lucide-react";

export const ContactCardsSection: React.FC = () => {
  const cards = [
    {
      icon: <PhoneCall className="w-8 h-8 text-msk-coral-500 group-hover:text-white transition-colors" />,
      title: "Téléphone",
      value: "+212 5 22 22 22 22", // placeholder
      link: "tel:+212522222222",
      color: "group-hover:bg-msk-coral-500",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(242,106,106,0.5)]"
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-msk-sun-500 group-hover:text-white transition-colors" />,
      title: "WhatsApp",
      value: "Écrivez-nous directement",
      link: "https://wa.me/212600000000?text=Bonjour,%20je%20souhaite%20avoir%20des%20renseignements%20concernant...",
      color: "group-hover:bg-msk-sun-500",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(255,183,77,0.5)]"
    },
    {
      icon: <Mail className="w-8 h-8 text-msk-blue-500 group-hover:text-white transition-colors" />,
      title: "Email",
      value: "contact@mskmontessori.ma",
      link: "mailto:contact@mskmontessori.ma",
      color: "group-hover:bg-msk-blue-500",
      glow: "group-hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)]"
    }
  ];

  return (
    <section className="py-12 bg-[#FAF8F5] relative z-20 -mt-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, idx) => (
            <motion.a
              key={idx}
              href={card.link}
              target={card.title === "WhatsApp" ? "_blank" : undefined}
              rel={card.title === "WhatsApp" ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`group flex flex-col items-center text-center p-8 rounded-3xl bg-white border border-msk-forest-100 transition-all duration-300 transform hover:-translate-y-2 ${card.glow}`}
            >
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-msk-forest-50 flex items-center justify-center transition-colors duration-300 ${card.color}`}>
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-msk-forest-950 mb-2">{card.title}</h3>
              <p className="text-msk-forest-700 font-medium">{card.value}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
