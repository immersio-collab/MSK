"use client";

import { MorphButton } from "@/components/motion/MorphButton";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, MapPin, Clock, HeartHandshake, Instagram, Facebook } from "lucide-react";
import { WhatsAppIcon } from "@/components/common/WhatsAppIcon";

import { SCHOOL_INFO } from "@/lib/data/site-content";

type FormData = {
  fullName: string;
  phone: string;
  email: string;
  childAge: string;
  subject: string;
  message: string;
  agreeToTerms: boolean;
};

/**
 * Contact panel, laid out as in the reference: a white card inset from the page
 * edges, overlapping the scene above it, split across a 12-column grid — the
 * invitation and coordinates on the left, the form on the right.
 *
 * Field styling is transcribed rather than approximated: 4.375rem tall, pale
 * mint fill, label stacked above rather than floating inside. Copy, field set
 * and options are MSK's own and unchanged.
 */

/** Shared between every input, select and textarea. */
const FIELD =
  "w-full rounded-lg border border-[#b2e5e1] bg-[#eef9f8] px-4 py-3 text-[1.1rem] font-medium leading-[120%] tracking-[-0.02em] text-msk-night-900 placeholder:text-msk-night-700/50 transition-colors focus:border-[#2668fd] focus:outline-none focus:ring-2 focus:ring-[#cff2f1]";

const LABEL =
  "mb-2 block text-[1.1rem] font-medium leading-[120%] tracking-[-0.02em] text-msk-night-900";

const SUBJECTS = [
  { value: "bilan", label: "Demande de bilan / orientation" },
  { value: "inscription", label: "Demande d'inscription" },
  { value: "information", label: "Demande d'information" },
  { value: "visite", label: "Visite du centre" },
  { value: "autre", label: "Autre" },
];

const AGES = [
  { value: "2-3", label: "2-3 ans (Toute Petite Section)" },
  { value: "3-6", label: "3-6 ans (Maison des Enfants)" },
  { value: "6-12", label: "6-12 ans (Primaire)" },
  { value: "autre", label: "Autre" },
];

/** Chevron sitting over the native select, which is appearance-none. */
const Chevron = () => (
  <span className="pointer-events-none absolute right-6 top-1/2 z-10 -translate-y-1/2">
    <svg
      className="h-auto w-[0.5625rem]"
      viewBox="0 0 9 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M8.79004 1.37012C9.02592 1.71932 9.06578 2.15114 8.89648 2.53125C7.90737 4.75144 7.14347 5.87223 5.50879 7.41016C5.23506 7.66764 4.85548 7.80826 4.46289 7.79883C4.07044 7.78929 3.69986 7.63051 3.44141 7.36035C1.82241 5.66665 1.08387 4.55556 0.120117 2.56641C-0.0607564 2.19261 -0.0364995 1.76201 0.185547 1.40723C0.407743 1.05242 0.801836 0.815185 1.24609 0.768554C3.82668 0.498131 5.30274 0.594293 7.70215 0.764648C8.14957 0.796415 8.5541 1.02112 8.79004 1.37012Z"
        fill="#2668fd"
      />
    </svg>
  </span>
);

export const ContactMainSection: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = () => {
    setIsSuccess(true);
    reset();
    window.setTimeout(() => setIsSuccess(false), 6000);
  };

  return (
    // Gutter trimmed from the reference's 3.125rem so the panel runs a little
    // wider. Mobile keeps its own padding.
    <div className="relative z-20 -mt-8 w-full bg-transparent px-5 pb-[4.1875rem] lg:-mt-12 lg:px-[2rem]">
      <div className="relative grid grid-cols-12 gap-5 rounded-[0.625rem] bg-white px-5 py-[1.5625rem] lg:px-0 lg:py-20">
        <div className="col-span-12 flex flex-col justify-between max-lg:mb-12 lg:col-start-2 lg:col-span-4 lg:pr-6">
          <div className="space-y-8">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-msk-coral-200 bg-msk-coral-50 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-msk-coral-600">
                <HeartHandshake className="h-3.5 w-3.5" />
                À votre écoute
              </span>
              <h2 className="font-heading text-2xl font-bold leading-tight tracking-tight text-msk-night-900 lg:text-3xl">
                Une question, un doute, ou simplement l&apos;envie d&apos;en parler ?
              </h2>
              <p className="text-base font-medium text-slate-600 leading-relaxed">
                Nous sommes là. Sans pression. Juste des gens qui écoutent.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 rounded-2xl border border-msk-cream-200 bg-[#fbfdfd] p-4 transition-all hover:border-msk-blue-300 hover:bg-white hover:shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-msk-blue-50 text-msk-blue-700 border border-msk-blue-100">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Adresse Email
                  </p>
                  <a
                    href={`mailto:${SCHOOL_INFO.email}`}
                    className="block truncate text-base font-semibold text-msk-night-900 hover:text-msk-blue-700 transition-colors"
                  >
                    {SCHOOL_INFO.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-msk-cream-200 bg-[#fbfdfd] p-4 transition-all hover:border-msk-coral-300 hover:bg-white hover:shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-msk-coral-50 text-msk-coral-600 border border-msk-coral-100">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Téléphone
                  </p>
                  <a
                    href={`tel:${SCHOOL_INFO.phone.replace(/\s/g, "")}`}
                    className="block text-base font-semibold text-msk-night-900 hover:text-msk-coral-600 transition-colors"
                  >
                    {SCHOOL_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-msk-cream-200 bg-[#fbfdfd] p-4 transition-all hover:border-msk-sun-300 hover:bg-white hover:shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-msk-sun-50 text-msk-sun-600 border border-msk-sun-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Adresse
                  </p>
                  <p className="text-base font-semibold text-msk-night-900">
                    {SCHOOL_INFO.address}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-msk-cream-200 bg-[#fbfdfd] p-4 transition-all hover:border-slate-300 hover:bg-white hover:shadow-sm">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Horaires d&apos;ouverture
                  </p>
                  <p className="text-base font-semibold text-msk-night-900">
                    {SCHOOL_INFO.hours}
                  </p>
                </div>
              </div>
            </div>

            {/* Social & WhatsApp direct channels */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
                Réseaux & Échanges directs
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={SCHOOL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-msk-cream-300 bg-[#fbfdfd] px-3.5 py-2.5 text-sm font-semibold text-msk-night-900 transition-all hover:border-green-400 hover:bg-green-50/50 hover:text-green-700 shadow-2xs"
                >
                  <WhatsAppIcon className="h-4 w-4 text-green-600" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={SCHOOL_INFO.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-msk-cream-300 bg-[#fbfdfd] px-3.5 py-2.5 text-sm font-semibold text-msk-night-900 transition-all hover:border-msk-coral-300 hover:bg-msk-coral-50/50 hover:text-msk-coral-700 shadow-2xs"
                >
                  <Instagram className="h-4 w-4 text-msk-coral-600" />
                  <span>Instagram</span>
                </a>
                <a
                  href={SCHOOL_INFO.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-xl border border-msk-cream-300 bg-[#fbfdfd] px-3.5 py-2.5 text-sm font-semibold text-msk-night-900 transition-all hover:border-msk-blue-300 hover:bg-msk-blue-50/50 hover:text-msk-blue-700 shadow-2xs"
                >
                  <Facebook className="h-4 w-4 text-msk-blue-600" />
                  <span>Facebook</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* `id` is the anchor the FAQ at the foot of the page sends the reader
            back to — it has no CTA section of its own to hand off to. */}
        <div id="formulaire" className="col-span-12 scroll-mt-28 lg:col-start-7 lg:col-span-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid grid-cols-2 gap-x-5 gap-y-10"
          >
            <div className="col-span-2 lg:col-span-1">
              <label htmlFor="fullName" className={LABEL}>
                Nom complet du parent*
              </label>
              <input
                id="fullName"
                type="text"
                className={`${FIELD} h-[4.375rem]`}
                aria-invalid={!!errors.fullName}
                {...register("fullName", { required: true })}
              />
            </div>

            <div className="col-span-2 lg:col-span-1">
              <label htmlFor="phone" className={LABEL}>
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                className={`${FIELD} h-[4.375rem]`}
                {...register("phone")}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="email" className={LABEL}>
                Adresse email*
              </label>
              <input
                id="email"
                type="email"
                className={`${FIELD} h-[4.375rem]`}
                aria-invalid={!!errors.email}
                {...register("email", { required: true })}
              />
            </div>

            <div className="col-span-2">
              <label htmlFor="childAge" className={LABEL}>
                Âge de l&apos;enfant
              </label>
              <div className="relative h-[4.375rem]">
                <Chevron />
                <select
                  id="childAge"
                  defaultValue=""
                  className={`${FIELD} h-full cursor-pointer appearance-none`}
                  {...register("childAge")}
                >
                  <option value="" disabled>
                    Sélectionner l&apos;âge
                  </option>
                  {AGES.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="subject" className={LABEL}>
                Objet*
              </label>
              <div className="relative h-[4.375rem]">
                <Chevron />
                <select
                  id="subject"
                  defaultValue=""
                  className={`${FIELD} h-full cursor-pointer appearance-none`}
                  aria-invalid={!!errors.subject}
                  {...register("subject", { required: true })}
                >
                  <option value="" disabled>
                    Sélectionner l&apos;objet
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-span-2">
              <label htmlFor="message" className={LABEL}>
                Message*
              </label>
              <textarea
                id="message"
                rows={3}
                className={`${FIELD} min-h-[7.5rem] resize-y overflow-hidden transition-[height] duration-150`}
                aria-invalid={!!errors.message}
                {...register("message", { required: true })}
                onInput={(e) => {
                  const target = e.currentTarget;
                  target.style.height = "auto";
                  target.style.height = `${Math.max(120, target.scrollHeight)}px`;
                }}
              />
            </div>

            <div className="relative z-10 col-span-2">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border-[#2668fd] bg-[#eef9f8] focus:ring-2 focus:ring-[#cff2f1]"
                  {...register("agreeToTerms", { required: true })}
                />
                <span className="text-[1.1rem] font-medium leading-[120%] tracking-[-0.02em] text-msk-night-900">
                  J&apos;accepte que mes données soient utilisées pour traiter ma
                  demande.
                </span>
              </label>
            </div>

            <div className="col-span-2 mt-5 flex items-center gap-5">
              <MorphButton
                type="submit"
                className="h-[3.625rem] px-7 text-[1.0625rem] font-medium leading-[120%] tracking-[-0.02em] text-white lg:text-[1.25rem]"
                fillClassName="bg-[#2668fd]"
              >
                Envoyer
              </MorphButton>

              {isSuccess ? (
                <p
                  role="status"
                  className="text-[1.0625rem] font-medium text-msk-night-900"
                >
                  Message envoyé, merci.
                </p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
