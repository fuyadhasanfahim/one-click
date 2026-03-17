"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

export interface CategoryData {
  id: string | number;
  name: string;
  image?: string;
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    setActiveIndex(Math.round(scrollLeft / clientWidth));
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -amount : amount,
        behavior: "smooth",
      });
    }
  };

  const scrollToPage = (index: number) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
      setActiveIndex(index);
    }
  };

  // Estimate 4 categories per view on desktop, 2 on mobile
  const itemsPerPage = 6; 
  const totalPages = Math.ceil(categories.length / itemsPerPage);

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
          onClick={() => scrollByAmount("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-brand-orange border border-orange-100 hover:bg-brand-orange hover:text-white transition-colors opacity-0 group-hover/scroller:opacity-100 disabled:opacity-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scrollByAmount("right")}
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
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6 px-4 -mx-4 -my-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat) => {
            return (
              <motion.div
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                key={cat.id}
                className="w-[calc(100%-16px)] sm:w-[calc(50%-16px)] md:w-[calc(33.333%-16px)] xl:w-[calc(16.666%-20px)] snap-start shrink-0 cursor-pointer"
              >
                <div className="w-full aspect-4/5 bg-white rounded-[2rem] flex flex-col items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] transition-shadow duration-500 relative overflow-hidden">
                  <motion.div
                    className="w-full h-full relative p-6 flex-1 mb-12"
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    <Image 
                      src={cat.image || "https://dummyjson.com/image/200x200/ffffff/282828?text=Category"} 
                      alt={cat.name} 
                      fill 
                      className="object-contain p-2" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    />
                  </motion.div>
                  <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-xl border-t border-gray-100 py-3.5 px-4 text-center z-10 transition-colors group-hover:bg-white group-hover:border-gray-200">
                    <span className="text-[#0A0A0A] font-bold text-sm tracking-wide">
                      {cat.name}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Pagination Dots */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToPage(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-brand-orange" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to category page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
