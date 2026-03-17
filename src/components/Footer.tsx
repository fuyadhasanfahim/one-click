"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const footerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      ease: "easeOut",
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  return (
    <motion.footer 
      ref={containerRef}
      variants={footerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-gray-900 text-gray-400 pt-16 pb-8 border-t border-gray-800"
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Info */}
          <motion.div variants={columnVariants} className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6 group w-max">
              <div className="w-8 h-8 rounded bg-brand-orange flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
                O
              </div>
              <span className="font-bold text-2xl tracking-tight text-white">
                ONECLICK
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-8 max-w-sm text-gray-400">
              Your one-stop destination for premium electronics. We curate the best innovative tech to elevate your everyday digital lifestyle, delivering quality straight to your door.
            </p>
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-white">Follow us on social media</span>
              <div className="flex items-center gap-3">
                {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                  <motion.a 
                    whileHover={{ scale: 1.1, y: -2 }}
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-brand-orange hover:bg-brand-orange hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {["Shop All", "New Arrivals", "Best Sellers", "Track Order", "About Us"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-brand-orange transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Customer Service */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-bold mb-6 text-lg">Customer Service</h4>
            <ul className="flex flex-col gap-3">
              {["Help Center", "Returns & Exchanges", "Shipping Info", "Terms & Conditions", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <Link href="#" className="text-sm hover:text-brand-orange transition-colors flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-brand-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={columnVariants}>
            <h4 className="text-white font-bold mb-6 text-lg">Contact Us</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 text-sm">
                <svg className="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>1234 Tech Boulevard, Suite 500<br/>San Francisco, CA 94103</span>
              </li>
              <li className="flex gap-3 text-sm">
                <svg className="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex gap-3 text-sm">
                <svg className="w-5 h-5 text-brand-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>support@oneclick.com</span>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Copyright Bar */}
        <motion.div variants={columnVariants} className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} OneClick Electronics Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xl font-bold text-gray-700 italic">VISA</span>
            <span className="text-xl font-bold text-gray-700 italic">MasterCard</span>
            <span className="text-xl font-bold text-gray-700 italic">PayPal</span>
            <span className="text-xl font-bold text-gray-700 italic">Apple Pay</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
