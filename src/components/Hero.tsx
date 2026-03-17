"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 20 },
  },
};

export default function Hero() {
  const mainImage = "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738055/v53buf6akycf7svei23d.png";

  return (
    <section className="relative container mx-auto px-4 md:px-8 max-w-7xl pt-16 pb-24 overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-brand-orange/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 h-auto lg:min-h-[70vh]"
      >
        {/* Left Content Area */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10 w-full max-w-3xl mx-auto lg:mx-0">
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white/50 backdrop-blur-md shadow-xs">
            <Sparkles className="w-4 h-4 text-brand-orange" />
            <span className="text-xs font-bold tracking-widest text-[#0A0A0A] uppercase">
              The Next Generation
            </span>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants} 
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-extrabold text-[#0A0A0A] leading-[1.1] mb-6 tracking-tighter"
          >
            Upgrade Your <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-br from-[#0A0A0A] via-gray-700 to-gray-400">
              Everyday Tech.
            </span>
          </motion.h1>
          
          <motion.p 
            variants={itemVariants} 
            className="text-gray-500 text-lg md:text-xl mb-10 max-w-xl leading-relaxed font-medium"
          >
            Discover the most advanced devices designed to simplify your life and boost productivity. Precision engineering meets minimalist design.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
            <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-max">
              <Link
                href="/shop"
                className="group flex items-center justify-center gap-3 bg-[#0A0A0A] hover:bg-black text-white px-10 py-4 rounded-2xl font-semibold transition-all duration-300 w-full shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]"
              >
                Shop Collection
                <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 200 }}>
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </motion.div>
            <motion.div whileTap={{ scale: 0.97 }} className="w-full sm:w-max">
              <Link
                href="#categories"
                className="group flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#0A0A0A] px-10 py-4 rounded-2xl font-semibold transition-all duration-300 border border-gray-200 w-full shadow-xs"
              >
                Explore Features
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Floating Image Area */}
        <motion.div 
          variants={itemVariants}
          className="flex-1 relative w-full h-[50vh] lg:h-[70vh] flex flex-col items-center justify-center -mt-10 lg:mt-0"
        >
          {/* Continuous Floating Animation */}
          <motion.div
            animate={{ y: [-20, 10, -20] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative w-full h-full z-10 flex flex-col justify-center items-center"
          >
            <Image
              src={mainImage}
              alt="Premium Tech Device"
              fill
              className="object-contain object-center scale-[1.1] lg:scale-[1.2] drop-shadow-2xl mix-blend-multiply"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>
          
          {/* Dynamic Elliptical Shadow */}
          <motion.div 
            animate={{ 
              scale: [1, 0.85, 1],
              opacity: [0.3, 0.15, 0.3],
            }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="absolute bottom-[5%] lg:bottom-[10%] left-1/2 -translate-x-1/2 w-64 md:w-96 h-6 md:h-10 bg-black/40 blur-xl rounded-[100%] z-0"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
