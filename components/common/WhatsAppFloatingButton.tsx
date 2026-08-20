"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function WhatsAppFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="https://wa.me/212600000000" target="_blank" rel="noopener noreferrer">
        <motion.div
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 focus:outline-hidden focus:ring-4 focus:ring-green-300"
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageCircle className="h-7 w-7" />
        </motion.div>
      </Link>
    </div>
  );
}
