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

export default function PromoCards() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-7xl pb-16" ref={containerRef}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {PROMO_CARDS.map((card) => (
          <motion.div
            key={card.id}
            variants={cardVariants}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative h-80 rounded-3xl overflow-hidden shadow-lg group cursor-pointer"
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
            
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Content Content aligned to bottom center */}
            <div className="relative z-20 h-full flex flex-col items-center justify-end p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md tracking-wide">
                {card.title}
              </h3>
              <p className="text-gray-200 text-sm font-medium drop-shadow-md">
                {card.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
