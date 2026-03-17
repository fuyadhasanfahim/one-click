"use client";

import Link from "next/link";
import { ArrowRight, Tag } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

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

export default function PromoBanner({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  return (
    <section className={`w-full py-24 md:py-32 ${className}`} ref={containerRef}>
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative rounded-[2.5rem] overflow-hidden bg-linear-to-br from-indigo-50 via-white to-amber-50 px-8 py-16 md:px-16 md:py-24 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center justify-between"
      >
        {/* Subtle glowing orb for depth */}
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-150 h-150 bg-brand-orange/5 rounded-full filter blur-[100px] pointer-events-none" />
        
        <div className="relative z-10 max-w-xl text-center md:text-left mb-12 md:mb-0">
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 justify-center md:justify-start mb-6 text-brand-orange font-bold tracking-[0.2em] text-xs uppercase border border-brand-orange/20 bg-brand-orange/5 px-4 py-2 rounded-full">
            <Tag className="w-4 h-4" />
            Limited Time Offer
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-semibold tracking-tighter leading-[1.05] mb-6 text-gray-900">
            Elevate Your <br /> Sound Experience.
          </motion.h2>
          <motion.p variants={itemVariants} className="text-gray-600 text-lg md:text-xl mb-10 max-w-md mx-auto md:mx-0 font-medium">
            Get up to <span className="text-brand-orange font-bold">40% OFF</span> on selected premium noise-cancelling headphones. Promotion ends soon.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-6 justify-center md:justify-start">
            <div className="flex bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
              <div className="flex flex-col items-center px-4">
                <span className="text-3xl font-extrabold text-gray-900">02</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Days</span>
              </div>
              <div className="w-px h-12 bg-gray-200 self-center mx-2" />
              <div className="flex flex-col items-center px-4">
                <span className="text-3xl font-extrabold text-gray-900">14</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Hours</span>
              </div>
              <div className="w-px h-12 bg-gray-200 self-center mx-2" />
              <div className="flex flex-col items-center px-4">
                <span className="text-3xl font-extrabold text-gray-900">45</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1">Mins</span>
              </div>
            </div>

            <motion.div whileTap={{ scale: 0.95 }} className="w-full sm:w-max">
              <Link
                href="/shop"
                className="group/btn flex items-center justify-center gap-2 bg-gray-900 hover:bg-brand-orange text-white px-8 py-4 rounded-full font-bold transition-all duration-500 w-full shadow-lg"
              >
                Shop Sale Now
                <motion.div whileHover={{ x: 5 }}>
                  <ArrowRight className="w-5 h-5 transition-transform" />
                </motion.div>
              </Link>
            </motion.div>
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
            className="absolute -top-4 -left-8 z-30 bg-white text-gray-900 w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold shadow-xl border-2 border-brand-orange/10 transform -rotate-12 backdrop-blur-md"
          >
            <span className="text-3xl leading-none">40%</span>
            <span className="text-[10px] uppercase tracking-widest mt-1">OFF</span>
          </motion.div>
          
          {/* Product Graphic */}
          <div className="w-full h-full relative z-20">
             <Image 
               src="https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738060/aer8mmgbsk0wqdj5kcog.png"
               alt="Promotion Product"
               fill
               className="object-contain scale-[1.3] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] translate-y-2 translate-x-1 hover:scale-[1.35] transition-transform duration-700"
               sizes="(max-width: 768px) 100vw, 300px"
             />
          </div>
        </motion.div>

      </motion.div>
      </div>
    </section>
  );
}
