"use client";

import React from "react";
import { MapPin, Clock, Car, Bus } from "lucide-react";
import { FadeUp } from "@/components/motion/FadeUp";

export const ContactMapSection: React.FC = () => {
  const infos = [
    {
      icon: <MapPin className="h-6 w-6 text-msk-coral-600" />,
      title: "Adresse",
      desc: "Quartier Oasis / Val Fleuri, Casablanca",
    },
    {
      icon: <Clock className="h-6 w-6 text-msk-sun-500" />,
      title: "Horaires",
      desc: "Lun-Ven : 8h00 - 18h00",
    },
    {
      icon: <Car className="h-6 w-6 text-msk-blue-700" />,
      title: "Parking",
      desc: "Disponible et sécurisé sur place",
    },
    {
      icon: <Bus className="h-6 w-6 text-slate-600" />,
      title: "Accès",
      desc: "Proches des lignes de bus principales",
    },
  ];

  return (
    <section className="bg-msk-cream-100 py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <div className="flex flex-col items-center gap-12 lg:flex-row">
          
          {/* Info List */}
          <div className="w-full space-y-8 lg:w-1/3">
            <FadeUp>
              <h2 className="font-display text-3xl font-bold text-msk-night-900 md:text-4xl">
                Venir au centre
              </h2>
            </FadeUp>
            
            <div className="space-y-6">
              {infos.map((info, idx) => (
                <FadeUp key={idx} delay={0.1 + idx * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-msk-cream-300 bg-white shadow-xs">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-msk-night-900">{info.title}</h3>
                      <p className="font-medium text-msk-night-700">{info.desc}</p>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>

          {/* Map Embed */}
          <div className="relative h-[400px] w-full overflow-hidden rounded-3xl border border-msk-cream-300 bg-white p-2 shadow-xl md:h-[500px] lg:w-2/3">
            <FadeUp delay={0.2} className="h-full w-full">
              {/* Placeholder Google Maps iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.56000720448!2d-7.669394336082531!3d33.57240182604313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7d2801456d357%3A0xc3c5c1cb5282542a!2sOasis%2C%20Casablanca!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: "1rem" }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Carte MSK Casablanca"
              ></iframe>
            </FadeUp>
          </div>
          
        </div>
      </div>
    </section>
  );
};
