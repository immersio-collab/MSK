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
      {/* Playful & Joyful Logo */}
      <span className={`text-2xl md:text-3xl font-extrabold tracking-tight ${isWhite ? "text-white" : "text-msk-night-900"}`}>
        msk<span className="inline-flex items-center gap-1 ml-1 align-baseline">
          <span className="h-2.5 w-2.5 rounded-full bg-msk-coral-500 transition-transform group-hover:scale-125 duration-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-msk-sun-500 transition-transform group-hover:scale-125 duration-200 delay-75" />
          <span className="h-2.5 w-2.5 rounded-full bg-msk-blue-500 transition-transform group-hover:scale-125 duration-200 delay-150" />
        </span>
      </span>
    </Link>
  );
};
