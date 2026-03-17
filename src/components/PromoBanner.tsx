"use client";

import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.2, delayChildren: 0.2 } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
};

export default function PromoBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-7xl py-12" ref={containerRef}>
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative rounded-3xl overflow-hidden bg-linear-to-r from-brand-purple to-purple-600 px-8 py-16 md:px-16 md:py-24 shadow-2xl flex flex-col md:flex-row items-center justify-between"
      >
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay z-0" />
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-brand-orange rounded-full mix-blend-screen filter blur-[80px] opacity-70 z-0 animate-pulse" />
        
        <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
          <motion.div variants={itemVariants} className="flex items-center gap-2 justify-center md:justify-start mb-4 text-brand-orange font-semibold tracking-wider text-sm uppercase">
            <Tag className="w-5 h-5" />
            Limited Time Offer
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-white drop-shadow-sm tracking-tight">
            Elevate Your Sound Experience
          </motion.h2>
          <motion.p variants={itemVariants} className="text-purple-100 text-lg mb-8 max-w-md mx-auto md:mx-0">
            Get up to <span className="text-brand-orange font-bold">40% OFF</span> on selected premium noise-cancelling headphones. Promotion ends soon!
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <div className="flex bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
              <div className="flex flex-col items-center px-4">
                <span className="text-2xl font-bold text-white">02</span>
                <span className="text-xs text-purple-200">Days</span>
              </div>
              <div className="w-px h-10 bg-white/20 self-center" />
              <div className="flex flex-col items-center px-4">
                <span className="text-2xl font-bold text-white">14</span>
                <span className="text-xs text-purple-200">Hours</span>
              </div>
              <div className="w-px h-10 bg-white/20 self-center" />
              <div className="flex flex-col items-center px-4">
                <span className="text-2xl font-bold text-white">45</span>
                <span className="text-xs text-purple-200">Mins</span>
              </div>
            </div>

            <Link
              href="/shop"
              className="group/btn flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-gray-900 px-8 py-3.5 rounded-full font-bold transition-all duration-300 w-max shadow-lg shadow-white/10"
            >
              Shop Sale Now
              <motion.div whileHover={{ x: 5 }}>
                <ArrowRight className="w-5 h-5 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* Floating Badge & Placeholder */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.8, rotate: -15 },
            visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 60, delay: 0.4 } }
          }}
          className="relative z-10 hidden md:block w-72 h-72"
        >
          {/* Discount Badge */}
          <motion.div 
            animate={{ rotate: [0, -5, 5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -left-6 z-20 bg-brand-orange text-white w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold shadow-xl border-4 border-white transform -rotate-12"
          >
            <span className="text-2xl leading-none">40%</span>
            <span className="text-xs uppercase tracking-wider">OFF</span>
          </motion.div>
          
          {/* Product Placeholder Graphic */}
          <div className="w-full h-full bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-full shadow-2xl flex items-center justify-center relative shadow-black/20">
             <div className="w-48 h-56 bg-linear-to-tr from-gray-900 to-gray-700 rounded-3xl skew-x-6 rotate-12 shadow-2xl relative overflow-hidden">
               <div className="absolute top-2 left-2 w-16 h-16 bg-white/10 rounded-full" />
               <div className="absolute bottom-4 right-4 w-32 h-4 bg-white/10 rounded-full" />
             </div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
