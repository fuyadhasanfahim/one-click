"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const leftBannerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 70, damping: 15, duration: 0.8 },
  },
};

const rightBannerVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 80, damping: 15, duration: 0.6 },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};


export default function Hero() {
  // Fallback images if API fails
  const mainImage = "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738055/v53buf6akycf7svei23d.png";
  const sideImage1 = "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738057/x03wta9dyrvvp4oqtoes.png";
  const sideImage2 = "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738056/jbhtidlhdnkjine5ey9f.png";

  return (
    <section className="container mx-auto px-4 md:px-8 max-w-7xl pt-8 pb-12">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-auto lg:h-125"
      >
        {/* Main Banner */}
        <motion.div
          variants={leftBannerVariants}
          className="lg:col-span-2 relative rounded-3xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-linear-to-br from-[#f8f3f0] to-[#e6ede7] z-0" />
          {/* Decorative blur blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-200/50 rounded-full mix-blend-multiply filter blur-3xl opacity-70" />

          <motion.div
            variants={contentVariants}
            className="relative z-10 p-8 md:p-12 flex flex-col justify-center h-full w-full lg:w-3/5"
          >
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-brand-orange uppercase bg-white/80 backdrop-blur rounded-full w-max shadow-sm">
              New Arrival
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4 tracking-tight">
              Upgrade Your{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-brand-orange to-red-500">
                Everyday Tech
              </span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-md">
              Discover the most advanced devices designed to simplify your life
              and boost productivity. Explore our premium collection today.
            </p>
            <Link
              href="/shop"
              className="group/btn flex items-center justify-center gap-2 bg-gray-900 hover:bg-brand-orange text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 w-max shadow-lg hover:shadow-brand-orange/20"
            >
              Shop Now
              <motion.div whileHover={{ x: 5 }}>
                <ArrowRight className="w-5 h-5 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>

          {/* Main Hero Image */}
          <motion.div
            variants={contentVariants}
            className="absolute right-0 bottom-0 h-[85%] w-[80%] md:w-[60%] lg:w-[50%] z-10"
          >
            <Image
              src={mainImage}
              alt="Upgrade Your Everyday Tech"
              fill
              className="object-contain object-bottom p-8 group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </motion.div>
        </motion.div>

        {/* Side Banners */}
        <div className="flex flex-col gap-6">
          {/* Top Side Banner */}
          <motion.div
            variants={rightBannerVariants}
            className="relative flex-1 rounded-3xl overflow-hidden group bg-linear-to-br from-brand-purple-dark to-brand-purple p-8 flex flex-col justify-center"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/30 rounded-full mix-blend-screen filter blur-2xl opacity-70 group-hover:scale-150 transition-transform duration-700" />
            <motion.div variants={contentVariants} className="relative z-10">
              <h3 className="text-2xl font-bold text-brand-orange mb-2 leading-tight">
                Power Up Your Setup
              </h3>
              <p className="text-white/80 text-sm mb-6 max-w-52.5 leading-relaxed">
                Shop the best smartphones, laptops, and must-have accessories.
              </p>
              <Link
                href="/shop"
                className="text-white text-sm font-medium hover:text-brand-orange transition-colors flex items-center w-max underline underline-offset-4 decoration-white/50 hover:decoration-brand-orange"
              >
                Shop Now
              </Link>
            </motion.div>
            {/* Top Side Banner Image */}
            <div className="absolute right-0 bottom-0 w-36 h-44 md:w-44 md:h-52 z-10">
              <Image
                src={sideImage1}
                alt="Power Up Your Setup"
                fill
                className="object-contain object-bottom p-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 mix-blend-multiply"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </div>
          </motion.div>

          {/* Bottom Side Banner */}
          <motion.div
            variants={rightBannerVariants}
            className="relative flex-1 rounded-3xl overflow-hidden group bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 p-8 flex flex-col justify-center"
          >
            <div className="absolute bottom-0 left-0 w-full h-full bg-linear-to-t from-brand-orange/40 to-transparent opacity-60" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-orange rounded-full mix-blend-screen filter blur-3xl opacity-40 group-hover:scale-125 transition-transform duration-700" />
            <motion.div variants={contentVariants} className="relative z-10">
              <h3 className="text-2xl font-bold text-brand-orange mb-2 leading-tight">
                Level Up Your Playtime
              </h3>
              <p className="text-white/80 text-sm mb-6 max-w-52.5 leading-relaxed">
                Shop the best smartphones, laptops, and must-have accessories.
              </p>
              <Link
                href="/shop"
                className="text-white text-sm font-medium hover:text-brand-orange transition-colors flex items-center w-max underline underline-offset-4 decoration-white/50 hover:decoration-brand-orange"
              >
                Shop Now
              </Link>
            </motion.div>
            {/* Bottom Side Banner Image */}
            <div className="absolute right-4 bottom-0 w-32 h-40 md:w-40 md:h-48 z-10">
              <Image
                src={sideImage2}
                alt="Level Up Your Playtime"
                fill
                className="object-contain object-bottom p-4 group-hover:scale-110 transition-transform duration-500 mix-blend-multiply"
                sizes="(max-width: 1024px) 50vw, 20vw"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
