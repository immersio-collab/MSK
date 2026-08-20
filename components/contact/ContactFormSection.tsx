"use client";

import React, { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  childAge: string;
  subject: string;
  message: string;
};

export const ContactFormSection: React.FC = () => {
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
    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 5000); // Hide confetti after 5s
    }, 500);
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 },
  };

  return (
    <section className="py-24 bg-white relative">
      {isSuccess && <Confetti recycle={false} numberOfPieces={500} />}
      
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-msk-night-900 mb-4">
            Envoyez-nous un message
          </h2>
          <p className="text-lg text-msk-night-700/80 max-w-2xl mx-auto">
            Remplissez ce formulaire et notre équipe vous recontactera dans les plus brefs délais.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-msk-cream-200 p-8 md:p-12 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-msk-sun-50 rounded-full mix-blend-multiply filter blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 flex flex-col items-center justify-center py-12 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <CheckCircle className="w-20 h-20 text-emerald-500 mb-6" />
                </motion.div>
                <h3 className="text-3xl font-bold text-msk-night-900 mb-4">Message envoyé !</h3>
                <p className="text-lg text-slate-600">
                  Nous vous remercions pour votre confiance. Notre équipe vous contactera très rapidement.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="relative z-10 space-y-6" 
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Full Name */}
                  <motion.div className="relative" animate={errors.fullName ? shakeAnimation : {}}>
                    <input 
                      type="text" 
                      id="fullName" 
                      className={`peer w-full bg-[#FAF8F5] border-2 rounded-xl px-5 pt-8 pb-3 text-msk-night-900 focus:outline-none focus:bg-white transition-all placeholder-transparent ${errors.fullName ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
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
                      className="absolute left-5 top-2.5 text-xs font-bold text-slate-500 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                    >
                      Nom complet du parent
                    </label>
                    {errors.fullName && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium">{errors.fullName.message}</span>}
                  </motion.div>

                  {/* Phone */}
                  <motion.div className="relative flex" animate={errors.phone ? shakeAnimation : {}}>
                    <div className="bg-msk-cream-100 border-2 border-transparent rounded-l-xl px-4 flex items-center justify-center font-bold text-msk-night-700 border-r-0">
                      +212
                    </div>
                    <div className="relative flex-1">
                      <input 
                        type="tel" 
                        id="phone" 
                        className={`peer w-full bg-[#FAF8F5] border-2 border-l-white rounded-r-xl px-5 pt-8 pb-3 text-msk-night-900 focus:outline-none focus:bg-white transition-all placeholder-transparent ${errors.phone ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                        placeholder="Téléphone"
                        {...register("phone", { required: "Ce champ est requis" })}
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                      />
                      <label 
                        htmlFor="phone"
                        className="absolute left-5 top-2.5 text-xs font-bold text-slate-500 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                      >
                        Téléphone
                      </label>
                    </div>
                    {errors.phone && <span className="absolute -bottom-5 left-16 text-xs text-red-500 font-medium">{errors.phone.message}</span>}
                  </motion.div>

                  {/* Email */}
                  <motion.div className="relative md:col-span-2" animate={errors.email ? shakeAnimation : {}}>
                    <input 
                      type="email" 
                      id="email" 
                      className={`peer w-full bg-[#FAF8F5] border-2 rounded-xl px-5 pt-8 pb-3 text-msk-night-900 focus:outline-none focus:bg-white transition-all placeholder-transparent ${errors.email ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
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
                      className="absolute left-5 top-2.5 text-xs font-bold text-slate-500 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                    >
                      Adresse email
                    </label>
                    {errors.email && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium">{errors.email.message}</span>}
                  </motion.div>

                  {/* Child Age (Dropdown) */}
                  <motion.div className="relative" animate={errors.childAge ? shakeAnimation : {}}>
                    <select 
                      id="childAge" 
                      className={`w-full bg-[#FAF8F5] border-2 rounded-xl px-5 pt-8 pb-3 text-msk-night-900 focus:outline-none focus:bg-white transition-all appearance-none ${errors.childAge ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                      {...register("childAge", { required: "Veuillez sélectionner l'âge" })}
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
                      className={`absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide transition-all ${isFocused('childAge') ? 'text-msk-coral-500' : 'text-slate-500'}`}
                    >
                      Âge concerné
                    </label>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    {errors.childAge && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium">{errors.childAge.message}</span>}
                  </motion.div>

                  {/* Subject (Dropdown) */}
                  <motion.div className="relative" animate={errors.subject ? shakeAnimation : {}}>
                    <select 
                      id="subject" 
                      className={`w-full bg-[#FAF8F5] border-2 rounded-xl px-5 pt-8 pb-3 text-msk-night-900 focus:outline-none focus:bg-white transition-all appearance-none ${errors.subject ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                      {...register("subject", { required: "Veuillez sélectionner un objet" })}
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
                      className={`absolute left-5 top-2.5 text-xs font-bold uppercase tracking-wide transition-all ${isFocused('subject') ? 'text-msk-coral-500' : 'text-slate-500'}`}
                    >
                      Objet de la demande
                    </label>
                    <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    {errors.subject && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium">{errors.subject.message}</span>}
                  </motion.div>

                  {/* Message */}
                  <motion.div className="relative md:col-span-2" animate={errors.message ? shakeAnimation : {}}>
                    <textarea 
                      id="message" 
                      rows={4}
                      className={`peer w-full bg-[#FAF8F5] border-2 rounded-xl px-5 pt-8 pb-3 text-msk-night-900 focus:outline-none focus:bg-white transition-all placeholder-transparent resize-none ${errors.message ? "border-red-400 focus:border-red-500" : "border-transparent focus:border-msk-coral-400"}`}
                      placeholder="Votre message"
                      {...register("message", { required: "Veuillez écrire un message" })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                    />
                    <label 
                      htmlFor="message"
                      className="absolute left-5 top-2.5 text-xs font-bold text-slate-500 uppercase tracking-wide transition-all peer-placeholder-shown:text-base peer-placeholder-shown:top-5 peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:font-bold peer-focus:uppercase peer-focus:text-msk-coral-500"
                    >
                      Votre message
                    </label>
                    {errors.message && <span className="absolute -bottom-5 left-2 text-xs text-red-500 font-medium">{errors.message.message}</span>}
                  </motion.div>
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
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
