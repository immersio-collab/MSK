"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

import { FadeUp } from "@/components/motion/FadeUp";
import { PARENT_CONCERNS_FAQ } from "@/lib/data/site-content";

/**
 * Questions read from PARENT_CONCERNS_FAQ — imported, never redeclared, so the
 * shared file stays the single source of truth.
 *
 * Rows are hairline-ruled rather than carded, the way the reference handles
 * long text lists: the type does the separating.
 */
export const AccueilFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="w-full bg-msk-blue-50 py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <FadeUp>
            <div className="lg:sticky lg:top-28">
              <span className="inline-block rounded-[0.4rem] bg-msk-blue-200 px-3 py-1.5 font-display text-xs font-semibold uppercase tracking-[0.18em] text-msk-night-950">
                Vos questions
              </span>
              <h2 className="mt-6 font-display text-[1.75rem] font-bold uppercase leading-[1.05] text-msk-night-950 sm:text-[2.25rem] lg:text-[2.5rem]">
                Ce que les parents nous demandent
              </h2>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-msk-night-800">
                Une question qui n&apos;est pas là ? Écrivez-nous, nous répondons
                à chacune.
              </p>
            </div>
          </FadeUp>

          <div className="border-t border-msk-night-950/15">
            {PARENT_CONCERNS_FAQ.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={item.question}
                  className="border-b border-msk-night-950/15"
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start justify-between gap-6 py-6 text-left"
                    >
                      <span className="font-display text-base font-bold uppercase leading-tight text-msk-night-950 sm:text-lg">
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden
                        className={`mt-1 h-5 w-5 shrink-0 text-msk-coral-600 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 text-base leading-relaxed text-msk-night-800">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
