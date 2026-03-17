"use client";

import ProductCard, { Product } from "./ProductCard";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef, useState } from "react";

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  columns?: 2 | 3 | 4;
  isCarousel?: boolean;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const headerVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export default function ProductGrid({ title, products, viewAllLink = "/shop", columns = 4, isCarousel = false }: ProductGridProps) {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!scrollRef.current || !isCarousel) return;
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

  // Estimated pages, typically 4 items per page on xl screens (1280px)
  const itemsPerPage = 4; 
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-7xl py-12" ref={containerRef}>
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="flex items-end justify-between mb-8 border-b border-gray-100 pb-4"
      >
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{title}</h2>
        <div className="flex items-center gap-4">
          {isCarousel && (
            <div className="hidden md:flex items-center gap-2 mr-4">
              <button
                onClick={() => scrollByAmount("left")}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollByAmount("right")}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-brand-orange hover:text-white hover:border-brand-orange transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
          <Link href={viewAllLink} className="text-sm font-semibold text-brand-orange flex items-center gap-1 hover:gap-2 transition-all">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        ref={isCarousel ? scrollRef : undefined}
        onScroll={isCarousel ? handleScroll : undefined}
        className={
          isCarousel
            ? "flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-6 px-4 -my-6 -mx-4"
            : `grid gap-6 ${gridClasses[columns]}`
        }
        style={isCarousel ? { scrollbarWidth: "none", msOverflowStyle: "none" } : {}}
      >
        {products.map((product) => (
          <div 
            key={product.id} 
            className={isCarousel ? "w-[calc(100%)] sm:w-[calc(50%-12px)] md:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] snap-start shrink-0" : ""}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </motion.div>

      {/* Pagination Dots for Carousel */}
      {isCarousel && totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToPage(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? "w-8 bg-brand-orange" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
