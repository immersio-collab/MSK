"use client";

import React from "react";
import { PARENT_CONCERNS_FAQ } from "@/lib/data/site-content";
import { FadeUp } from "@/components/magicui/fade-up";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
  useAccordionItem,
} from "@/components/animate-ui/primitives/radix/accordion";
import { cn } from "@/lib/utils";

const CustomTrigger = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof AccordionTrigger>>(
  ({ children, className, ...props }, ref) => {
    const { isOpen } = useAccordionItem();
    return (
      <AccordionHeader className="flex">
        <AccordionTrigger
          ref={ref}
          className={cn(
            "flex flex-1 items-center justify-between py-6 text-left font-bold transition-all hover:text-msk-coral-600 outline-none text-lg md:text-xl",
            isOpen ? "text-msk-coral-600" : "text-msk-night-800",
            className
          )}
          {...props}
        >
          {children}
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-msk-cream-100 text-msk-night-400 transition-transform duration-300",
              isOpen && "rotate-180 bg-msk-coral-100 text-msk-coral-600"
            )}
          >
            <ChevronDown className="h-5 w-5" />
          </div>
        </AccordionTrigger>
      </AccordionHeader>
    );
  }
);
CustomTrigger.displayName = "CustomTrigger";

export const ParentFAQSection: React.FC = () => {
  return (
    <section id="faq-parents" className="py-20 md:py-32 bg-[#FDFBF7] relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-msk-coral-50/60 rounded-full blur-3xl translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-msk-blue-50/60 rounded-full blur-3xl -translate-x-1/2 translate-y-1/3 pointer-events-none" />

      <div className="w-full max-w-[1000px] mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <FadeUp>
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-msk-coral-100 text-msk-coral-700 px-5 py-2 text-sm font-bold uppercase tracking-widest mb-6 shadow-sm border border-msk-coral-200">
              <MessageCircleQuestion className="h-4 w-4" />
              <span>Vos Questions, Nos Réponses</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-msk-night-900 tracking-tight leading-tight mb-6">
              Réponses aux hésitations des parents
            </h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto">
              Nous comprenons vos doutes. MSK s&apos;engage pour une inclusion 
              scolaire et sociale en toute transparence.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.3} y={30} duration={0.8}>
          <div className="bg-white rounded-[2rem] p-6 md:p-10 shadow-2xl shadow-slate-200/50 border border-msk-cream-200">
            <Accordion type="single" collapsible className="w-full">
              {PARENT_CONCERNS_FAQ.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-b border-msk-cream-200 last:border-0"
                >
                  <CustomTrigger>
                    <span className="pr-6 leading-snug">{faq.question}</span>
                  </CustomTrigger>
                  <AccordionContent className="text-slate-600 text-base md:text-lg pb-6 leading-relaxed pr-12">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </FadeUp>
      </div>
    </section>
  );
};
