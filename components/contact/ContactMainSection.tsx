"use client";

import React, { useState } from "react";
import { Send, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { FadeUp } from "@/components/motion/FadeUp";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  childAge: string;
  subject: string;
  message: string;
};

export const ContactMainSection: React.FC = () => {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const isFocused = (name: string) => focusedField === name;

  const onSubmit = (data: FormData) => {
    console.log("Form data:", data);
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000);
    }, 500);
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };

  return (
    <section className="relative z-20 mx-auto w-full max-w-7xl px-6 sm:px-10 -mt-24 md:-mt-32 pb-24">
      {isSuccess && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="rounded-[3rem] bg-white p-8 md:p-16 shadow-2xl overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
          
          {/* Colonne de gauche : Infos et texte */}
          <div className="lg:col-span-2 space-y-12">
            <FadeUp>
              <h1 className="font-display text-4xl font-bold leading-tight text-msk-night-900 md:text-5xl lg:text-6xl">
                Parlons de votre enfant.
              </h1>
              <p className="mt-6 text-lg text-msk-night-700">
                Que vous souhaitiez un bilan, une visite de l'école ou simplement des renseignements, notre équipe est là pour vous accompagner. Sans pression. Juste de l'écoute.
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="space-y-6 pt-4 border-t border-msk-cream-200">
                <a href="mailto:contact@mskschool.com" className="flex items-center gap-4 text-msk-night-900 hover:text-msk-coral-600 transition-colors">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-msk-cream-100 text-msk-coral-600">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="font-medium">contact@mskschool.com</span>
                </a>
                <a href="tel:+212600000000" className="flex items-center gap-4 text-msk-night-900 hover:text-msk-coral-600 transition-colors">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-msk-cream-100 text-msk-coral-600">
                    <Phone className="h-5 w-5" />
                  </div>
                  <span className="font-medium">+212 6 00 00 00 00</span>
                </a>
                <a href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-msk-night-900 hover:text-msk-coral-600 transition-colors">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-msk-cream-100 text-msk-coral-600">
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <span className="font-medium">WhatsApp</span>
                </a>
              </div>
            </FadeUp>
          </div>

          {/* Colonne de droite : Formulaire */}
          <div className="lg:col-span-3">
            <FadeUp delay={0.2}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex h-full flex-col items-center justify-center py-12 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    >
                      <CheckCircle className="mb-6 h-20 w-20 text-emerald-500" />
                    </motion.div>
                    <h3 className="mb-4 font-display text-3xl font-bold text-msk-night-900">Message envoyé !</h3>
                    <p className="text-lg text-msk-night-700">
                      Nous vous remercions pour votre confiance. Notre équipe vous contactera très rapidement.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6" 
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      
                      {/* Full Name */}
                      <motion.div className="relative" animate={errors.fullName ? shakeAnimation : {}}>
                        <input 
                          type="text" 
                          id="fullName" 
                          className={`peer w-full rounded-xl border-2 bg-msk-cream-50 px-5 pb-3 pt-8 text-msk-night-900 placeholder-transparent transition-all focus:bg-white focus:outline-hidden ${errors.fullName ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                          placeholder="Nom complet du parent"
                          {...register("fullName", { required: "Ce champ est requis" })}
                          onFocus={(e) => {
                            setFocusedField("fullName");
                            e.target.select();
                          }}
                          onBlur={() => setFocusedField(null)}
                        />
                        <label 
                          htmlFor="fullName"
                          className="absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                        >
                          Nom complet du parent
                        </label>
                        {errors.fullName && <span className="absolute -bottom-5 left-2 text-xs font-medium text-red-500">{errors.fullName.message}</span>}
                      </motion.div>

                      {/* Phone */}
                      <motion.div className="relative flex" animate={errors.phone ? shakeAnimation : {}}>
                        <div className="flex items-center justify-center rounded-l-xl border-2 border-transparent border-r-0 bg-msk-cream-100 px-4 font-bold text-msk-night-700">
                          +212
                        </div>
                        <div className="relative flex-1">
                          <input 
                            type="tel" 
                            id="phone" 
                            className={`peer w-full rounded-r-xl border-2 border-l-white bg-msk-cream-50 px-5 pb-3 pt-8 text-msk-night-900 placeholder-transparent transition-all focus:bg-white focus:outline-hidden ${errors.phone ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                            placeholder="Téléphone"
                            {...register("phone", { required: "Ce champ est requis" })}
                            onFocus={() => setFocusedField("phone")}
                            onBlur={() => setFocusedField(null)}
                          />
                          <label 
                            htmlFor="phone"
                            className="absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                          >
                            Téléphone
                          </label>
                        </div>
                        {errors.phone && <span className="absolute -bottom-5 left-16 text-xs font-medium text-red-500">{errors.phone.message}</span>}
                      </motion.div>

                      {/* Email */}
                      <motion.div className="relative md:col-span-2" animate={errors.email ? shakeAnimation : {}}>
                        <input 
                          type="email" 
                          id="email" 
                          className={`peer w-full rounded-xl border-2 bg-msk-cream-50 px-5 pb-3 pt-8 text-msk-night-900 placeholder-transparent transition-all focus:bg-white focus:outline-hidden ${errors.email ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                          placeholder="Adresse email"
                          {...register("email", { 
                            required: "L'email est requis",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Adresse email invalide"
                            }
                          })}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                        />
                        <label 
                          htmlFor="email"
                          className="absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                        >
                          Adresse email
                        </label>
                        {errors.email && <span className="absolute -bottom-5 left-2 text-xs font-medium text-red-500">{errors.email.message}</span>}
                      </motion.div>

                      {/* Child Age (Dropdown) */}
                      <motion.div className="relative" animate={errors.childAge ? shakeAnimation : {}}>
                        <select 
                          id="childAge" 
                          className={`w-full appearance-none rounded-xl border-2 bg-msk-cream-50 px-5 pb-3 pt-8 text-msk-night-900 transition-all focus:bg-white focus:outline-hidden ${errors.childAge ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                          {...register("childAge", { required: "Veuillez sélectionner l'âge" })}
                          onFocus={() => setFocusedField("childAge")}
                          onBlur={() => setFocusedField(null)}
                          defaultValue=""
                        >
                          <option value="" disabled className="text-gray-400">Sélectionner l'âge</option>
                          <option value="2-3">2-3 ans (Toute Petite Section)</option>
                          <option value="3-6">3-6 ans (Maison des Enfants)</option>
                          <option value="6-12">6-12 ans (Primaire)</option>
                          <option value="autre">Autre</option>
                        </select>
                        <label 
                          htmlFor="childAge"
                          className={`absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide transition-all ${isFocused('childAge') ? 'text-msk-coral-500' : 'text-slate-500'}`}
                        >
                          Âge concerné
                        </label>
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                          <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        {errors.childAge && <span className="absolute -bottom-5 left-2 text-xs font-medium text-red-500">{errors.childAge.message}</span>}
                      </motion.div>

                      {/* Subject (Dropdown) */}
                      <motion.div className="relative" animate={errors.subject ? shakeAnimation : {}}>
                        <select 
                          id="subject" 
                          className={`w-full appearance-none rounded-xl border-2 bg-msk-cream-50 px-5 pb-3 pt-8 text-msk-night-900 transition-all focus:bg-white focus:outline-hidden ${errors.subject ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                          {...register("subject", { required: "Veuillez sélectionner un objet" })}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          defaultValue=""
                        >
                          <option value="" disabled className="text-gray-400">Sélectionner l'objet</option>
                          <option value="bilan">Demande de bilan / orientation</option>
                          <option value="inscription">Demande d'inscription</option>
                          <option value="information">Demande d'information</option>
                          <option value="visite">Visite du centre</option>
                          <option value="autre">Autre</option>
                        </select>
                        <label 
                          htmlFor="subject"
                          className={`absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide transition-all ${isFocused('subject') ? 'text-msk-coral-500' : 'text-slate-500'}`}
                        >
                          Objet de la demande
                        </label>
                        <div className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
                          <svg className="h-5 w-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                        {errors.subject && <span className="absolute -bottom-5 left-2 text-xs font-medium text-red-500">{errors.subject.message}</span>}
                      </motion.div>

                      {/* Message */}
                      <motion.div className="relative md:col-span-2" animate={errors.message ? shakeAnimation : {}}>
                        <textarea 
                          id="message" 
                          rows={4}
                          className={`peer w-full resize-none rounded-xl border-2 bg-msk-cream-50 px-5 pb-3 pt-8 text-msk-night-900 placeholder-transparent transition-all focus:bg-white focus:outline-hidden ${errors.message ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                          placeholder="Votre message"
                          {...register("message", { required: "Veuillez écrire un message" })}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                        />
                        <label 
                          htmlFor="message"
                          className="absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide text-slate-500 transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                        >
                          Votre message
                        </label>
                        {errors.message && <span className="absolute -bottom-5 left-2 text-xs font-medium text-red-500">{errors.message.message}</span>}
                      </motion.div>
                    </div>

                    <div className="flex justify-start pt-4">
                      <button 
                        type="submit"
                        className="group inline-flex items-center gap-2 rounded-full bg-msk-coral-600 px-8 py-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition-all hover:-translate-y-1 hover:bg-msk-coral-700 hover:shadow-xl"
                      >
                        Envoyer ma demande
                        <Send className="h-5 w-5 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </FadeUp>
          </div>

        </div>
      </div>
    </section>
  );
};
