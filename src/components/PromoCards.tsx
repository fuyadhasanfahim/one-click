"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const PROMO_CARDS = [
  {
    id: 1,
    title: "Go Pro 12 Blue",
    subtitle: "4k Video captured, 12 hours backup.",
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738060/ycpkeotsruzgxki7sqnl.png",
  },
  {
    id: 2,
    title: "Smart Watch",
    subtitle: "Water resistance, 15day backup.",
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738060/tjdngf1ucuhfiagqrlxt.png",
  },
  {
    id: 3,
    title: "Headphone",
    subtitle: "Noiseless music up to 4000 times.",
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738054/hdcvuowyylrvxvzqd57t.png",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  }
};

export default function PromoCards({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section className={`w-full py-24 md:py-32 ${className}`} ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-4 md:gap-6 lg:h-150"
      >
        {PROMO_CARDS.map((card, index) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            whileHover={{ scale: 0.99 }} // Tactile scale down instead of pop up
            className={`relative rounded-[2rem] overflow-hidden group cursor-pointer shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] ${
              index === 0 ? "lg:col-span-2 lg:row-span-2 h-96 lg:h-full" : "h-72 lg:h-full"
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110">
              <Image 
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            
            {/* Gradient Overlay for Text Readability - Strict Editorial Control */}
            <div className={`absolute inset-0 z-10 bg-linear-to-t ${index === 0 ? "from-[#0A0A0A]/90 via-[#0A0A0A]/40" : "from-[#0A0A0A]/95 via-[#0A0A0A]/60"} to-transparent opacity-90 transition-opacity duration-500`} />

            {/* Content aligned to bottom center */}
            <div className={`relative z-20 h-full flex flex-col items-center flex-end p-8 md:p-10 text-center ${index === 0 ? "justify-end pb-12" : "justify-end"}`}>
              <h3 className={`font-extrabold text-white mb-2 tracking-tight ${index === 0 ? "text-4xl md:text-5xl" : "text-2xl"}`}>
                {card.title}
              </h3>
              <p className={`text-white/80 font-medium ${index === 0 ? "text-lg max-w-md" : "text-sm"}`}>
                {card.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      </div>
    </section>
  );
}
