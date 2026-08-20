"use client";

import React from "react";
import { MapPin, Clock, Car, Bus } from "lucide-react";

export const ContactMapSection: React.FC = () => {
  const infos = [
    {
      icon: <MapPin className="w-6 h-6 text-msk-coral-500" />,
      title: "Adresse",
      desc: "Quartier Oasis / Val Fleuri, Casablanca",
    },
    {
      icon: <Clock className="w-6 h-6 text-msk-sun-500" />,
      title: "Horaires",
      desc: "Lun-Ven : 8h00 - 18h00",
    },
    {
      icon: <Car className="w-6 h-6 text-msk-blue-500" />,
      title: "Parking",
      desc: "Disponible et sécurisé sur place",
    },
    {
      icon: <Bus className="w-6 h-6 text-slate-600" />,
      title: "Accès",
      desc: "Proches des lignes de bus principales",
    },
  ];

  return (
    <section className="py-24 bg-[#FAF8F5]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Info List */}
          <div className="lg:w-1/3 space-y-8">
            <h2 className="text-3xl font-bold text-msk-night-900 mb-8">
              Venir au centre
            </h2>
            <div className="space-y-6">
              {infos.map((info, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-msk-cream-200 flex items-center justify-center shrink-0 shadow-xs">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-msk-night-900">{info.title}</h3>
                    <p className="text-msk-night-700">{info.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div className="lg:w-2/3 w-full h-[400px] md:h-[500px] bg-white rounded-3xl p-2 border border-msk-cream-200 shadow-xl overflow-hidden relative">
            {/* Placeholder Google Maps iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.56000720448!2d-7.669394336082531!3d33.57240182604313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2801456d357%3A0xc3c5c1cb5282542a!2sOasis%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma" 
              width="100%" 
              height="100%" 
              style={{ border: 0, borderRadius: "1.25rem" }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte MSK Casablanca"
            ></iframe>
          </div>
          
        </div>
      </div>
    </section>
  );
};
