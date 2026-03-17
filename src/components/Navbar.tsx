"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingCart, UserCircle, Globe, Menu, Flame, Truck, MapPin } from "lucide-react";
import { motion, Variants, useScroll, useMotionValueEvent } from "framer-motion";

const navVariants: Variants = {
  initial: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  },
  hidden: {
    y: "-100%",
    transition: { duration: 0.3, ease: "easeInOut" }
  }
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      initial="initial"
      animate={hidden ? "hidden" : "visible"}
      variants={navVariants}
      className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl border-b border-gray-100 shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        {/* Top Header Row */}
        <div className="flex items-center justify-between py-4">
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Image 
                src="https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738054/m0fumm3fo7jxybtkb8nk.png" 
                alt="OneClick Logo" 
                width={150} 
                height={40} 
                className="object-contain"
              />
            </Link>
          </motion.div>

          <motion.div variants={itemVariants} className="hidden flex-1 max-w-xl mx-8 md:flex items-center group relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-orange transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search products, brands, and categories..."
              className="block w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange focus:bg-white transition-all duration-300"
            />
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute inset-y-1 right-1 px-4 text-sm font-medium bg-gray-900 text-white rounded-full hover:bg-brand-orange transition-colors"
            >
              Search
            </motion.button>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center gap-4 sm:gap-6">
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange cursor-pointer transition-colors relative group">
              <Globe className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              <span>EN / $</span>
            </div>
            <div className="h-4 w-px bg-gray-200 hidden sm:block"></div>
            <Link href="/account" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange transition-colors font-medium group relative">
              <UserCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
              <span className="hidden lg:inline">Account</span>
            </Link>
            <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-orange transition-colors font-medium relative group">
              <div className="relative">
                <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, delay: 0.5 }}
                  className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-bold text-white shadow-sm ring-2 ring-white"
                >
                  3
                </motion.span>
              </div>
              <span className="hidden lg:inline">Cart</span>
            </Link>
            
            <button className="md:hidden text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </motion.div>
        </div>

        {/* Bottom Navigation Row */}
        <motion.div variants={itemVariants} className="hidden md:flex items-center justify-between py-3 border-t border-gray-100 mt-2">
          {/* Left Navigation Links */}
          <nav className="flex space-x-8">
            {["Home", "Shop", "Collection", "Gadget", "Electronics"].map((item, i) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className={`relative text-sm font-semibold tracking-wide group pt-1 pb-2 ${
                  i === 0 ? "text-brand-orange" : "text-gray-600 hover:text-brand-orange transition-colors"
                }`}
              >
                {item}
                {/* Animated underline for nav links */}
                <motion.div 
                  className={`absolute bottom-0 left-0 h-0.5 bg-brand-orange ${i === 0 ? "w-full" : "w-0 group-hover:w-full"}`}
                  transition={{ duration: 0.2 }}
                />
              </Link>
            ))}
          </nav>

          {/* Right Action Links */}
          <div className="flex items-center gap-6">
            <Link href="/deals" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors group">
              <Flame className="w-4 h-4 text-brand-orange group-hover:scale-110 transition-transform" />
              Hot Deals
            </Link>
            <div className="h-4 w-px bg-gray-200"></div>
            <Link href="/track" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors group">
              <Truck className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              Track Your order
            </Link>
            <div className="h-4 w-px bg-gray-200"></div>
            <Link href="/stores" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-brand-orange transition-colors group">
              <MapPin className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Store Location
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}
