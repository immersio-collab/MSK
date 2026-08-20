"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";

export const ContactFormSection: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Floating label helper
  const isFocused = (name: string) => focusedField === name;

  return (
    <section className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-forest-950 mb-4">
            Envoyez-nous un message
          </h2>
          <p className="text-lg text-msk-forest-700/80 max-w-2xl mx-auto">
            Remplissez ce formulaire et notre équipe vous recontactera dans les plus brefs délais.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-msk-forest-100 p-8 md:p-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-msk-sun-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          
          <form className="relative z-10 space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Full Name */}
              <div className="relative">
                <input 
                  type="text" 
                  id="fullName" 
                  name="fullName"
                  className="peer w-full bg-[#FAF8F5] border-2 border-transparent rounded-xl px-5 pt-8 pb-3 text-msk-forest-950 focus:outline-none focus:border-msk-coral-400 focus:bg-white transition-all placeholder-transparent"
                  placeholder="Nom complet du parent"
                  onFocus={() => setFocusedField("fullName")}
                  onBlur={() => setFocusedField(null)}
                />
                <label 
                  htmlFor="fullName"
                  className="absolute left-5 top-2.5 text-xs font-bold text-msk-forest-400 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                >
                  Nom complet du parent
                </label>
              </div>

              {/* Phone */}
              <div className="relative flex">
                <div className="bg-msk-forest-50 border-2 border-transparent rounded-l-xl px-4 flex items-center justify-center font-bold text-msk-forest-600 border-r-0">
                  +212
                </div>
                <div className="relative flex-1">
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone"
                    className="peer w-full bg-[#FAF8F5] border-2 border-transparent border-l-white rounded-r-xl px-5 pt-8 pb-3 text-msk-forest-950 focus:outline-none focus:border-msk-coral-400 focus:bg-white transition-all placeholder-transparent"
                    placeholder="Téléphone"
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                  />
                  <label 
                    htmlFor="phone"
                    className="absolute left-5 top-2.5 text-xs font-bold text-msk-forest-400 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                  >
                    Téléphone
                  </label>
                </div>
              </div>

              {/* Email */}
              <div className="relative md:col-span-2">
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  className="peer w-full bg-[#FAF8F5] border-2 border-transparent rounded-xl px-5 pt-8 pb-3 text-msk-forest-950 focus:outline-none focus:border-msk-coral-400 focus:bg-white transition-all placeholder-transparent"
                  placeholder="Adresse email"
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField(null)}
                />
                <label 
                  htmlFor="email"
                  className="absolute left-5 top-2.5 text-xs font-bold text-msk-forest-400 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                >
                  Adresse email
                </label>
              </div>

              {/* Child Age (Dropdown) */}
              <div className="relative">
                <select 
                  id="childAge" 
                  name="childAge"
                  className="w-full bg-[#FAF8F5] border-2 border-transparent rounded-xl px-5 pt-8 pb-3 text-msk-forest-950 focus:outline-none focus:border-msk-coral-400 focus:bg-white transition-all appearance-none"
                  onFocus={() => setFocusedField("childAge")}
                  onBlur={() => setFocusedField(null)}
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-400">Sélectionner l'âge</option>
                  <option value="2-3">2-3 ans</option>
                  <option value="4-5">4-5 ans</option>
                  <option value="6-8">6-8 ans</option>
                  <option value="9-11">9-11 ans</option>
                  <option value="12-14">12-14 ans</option>
                  <option value="15-18">15-18 ans</option>
                  <option value="adulte">Adulte</option>
                </select>
                <label 
                  htmlFor="childAge"
                  className={`absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide transition-all ${isFocused('childAge') ? 'text-msk-coral-500' : 'text-msk-forest-400'}`}
                >
                  Âge concerné
                </label>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-msk-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              {/* Subject (Dropdown) */}
              <div className="relative">
                <select 
                  id="subject" 
                  name="subject"
                  className="w-full bg-[#FAF8F5] border-2 border-transparent rounded-xl px-5 pt-8 pb-3 text-msk-forest-950 focus:outline-none focus:border-msk-coral-400 focus:bg-white transition-all appearance-none"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  defaultValue=""
                >
                  <option value="" disabled className="text-gray-400">Sélectionner l'objet</option>
                  <option value="bilan">Demande de bilan</option>
                  <option value="inscription">Inscription</option>
                  <option value="question">Question générale</option>
                  <option value="autre">Autre</option>
                </select>
                <label 
                  htmlFor="subject"
                  className={`absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide transition-all ${isFocused('subject') ? 'text-msk-coral-500' : 'text-msk-forest-400'}`}
                >
                  Objet de la demande
                </label>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg className="w-5 h-5 text-msk-forest-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>

              {/* Message */}
              <div className="relative md:col-span-2">
                <textarea 
                  id="message" 
                  name="message"
                  rows={4}
                  className="peer w-full bg-[#FAF8F5] border-2 border-transparent rounded-xl px-5 pt-8 pb-3 text-msk-forest-950 focus:outline-none focus:border-msk-coral-400 focus:bg-white transition-all placeholder-transparent resize-none"
                  placeholder="Votre message"
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                />
                <label 
                  htmlFor="message"
                  className="absolute left-5 top-2.5 text-xs font-bold text-msk-forest-400 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                >
                  Votre message
                </label>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button 
                type="submit"
                className="group inline-flex items-center gap-2 bg-msk-coral-500 hover:bg-msk-coral-600 text-white font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Envoyer ma demande
                <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
