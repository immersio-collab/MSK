import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "white";
}

export const BrandLogo: React.FC<BrandLogoProps> = ({ className = "", variant = "default" }) => {
  const isWhite = variant === "white";

  return (
    <Link
      href="/"
      className={`group flex items-center gap-1.5 transition-all duration-300 ${className}`}
      aria-label="MSK Montessori School"
    >
      {/* Large, Playful, Child-Friendly Brand Typography */}
      <span className={`text-3xl sm:text-4xl md:text-[38px] font-black tracking-tight ${isWhite ? "text-white" : ""}`}>
        <span className={isWhite ? "" : "text-msk-coral-500"}>M</span>
        <span className={isWhite ? "" : "text-msk-sun-500"}>S</span>
        <span className={isWhite ? "" : "text-msk-blue-500"}>K</span>
        <span className="inline-flex items-center gap-1.5 ml-1 align-baseline">
          <span className="h-3 w-3 rounded-full bg-msk-coral-500 transition-transform group-hover:scale-125 duration-200" />
          <span className="h-3 w-3 rounded-full bg-msk-sun-500 transition-transform group-hover:scale-125 duration-200 delay-75" />
          <span className="h-3 w-3 rounded-full bg-msk-blue-500 transition-transform group-hover:scale-125 duration-200 delay-150" />
        </span>
      </span>
    </Link>
  );
};
