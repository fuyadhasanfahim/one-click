"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";

import Image from "next/image";

export interface CategoryData {
  id: string | number;
  name: string;
  image: string;
}

const FALLBACK_CATEGORIES: CategoryData[] = [
  { id: 1, name: "Smartphone", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=Phone" },
  { id: 2, name: "Smart Watch", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=Watch" },
  { id: 3, name: "Camera", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=Camera" },
  { id: 4, name: "Headphone", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=Audio" },
  { id: 5, name: "Desktop", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=PC" },
  { id: 6, name: "Smart TV", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=TV" },
  { id: 7, name: "Audio", image: "https://dummyjson.com/image/200x200/ffffff/282828?text=Speaker" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.5, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 }
  }
} as Variants;

const headerVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function CategoryScroller({ categories = FALLBACK_CATEGORIES }: { categories?: CategoryData[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-7xl py-12" ref={containerRef}>
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex flex-col items-center mb-8"
      >
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Category</h2>
        <p className="text-gray-500 text-sm max-w-xl text-center">
          Explore our wide range of categories to find exactly what you need. From the latest gadgets and accessories to premium sound systems.
        </p>
      </motion.div>

      <div className="relative group/scroller">
        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-orange border border-orange-100 hover:bg-brand-orange hover:text-white transition-colors opacity-0 group-hover/scroller:opacity-100 disabled:opacity-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-orange border border-orange-100 hover:bg-brand-orange hover:text-white transition-colors opacity-0 group-hover/scroller:opacity-100 disabled:opacity-0"
        >
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => (
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              key={cat.id}
              className="min-w-35 md:min-w-40 flex flex-col items-center snap-center group cursor-pointer"
            >
              <div className="w-full aspect-square bg-white rounded-full flex items-center justify-center mb-4 border border-gray-200 group-hover:border-brand-orange/50 group-hover:shadow-lg transition-all duration-300 p-6 relative">
                <motion.div
                  className="w-full h-full relative"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <Image 
                    src={cat.image} 
                    alt={cat.name} 
                    fill 
                    className="object-contain" 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </motion.div>
              </div>
              <div className="bg-white border border-gray-200 rounded-full py-2.5 px-6 w-full text-center group-hover:border-brand-orange/50 group-hover:shadow-md transition-all duration-300">
                <span className="text-sm font-bold text-gray-800 group-hover:text-brand-orange transition-colors truncate block">
                  {cat.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
