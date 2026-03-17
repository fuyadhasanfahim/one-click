"use client";

import { Truck, ArrowDownRight, Award, HeadphonesIcon } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

const FEATURES = [
  {
    icon: <Truck className="w-8 h-8" />,
    title: "Fast Shipping",
    description: "Get your products fast with our reliable shipping partners.",
  },
  {
    icon: <ArrowDownRight className="w-8 h-8" />,
    title: "Easy Returns",
    description: "30-day return policy for a hassle-free shopping experience.",
  },
  {
    icon: <Award className="w-8 h-8" />,
    title: "Premium Quality",
    description: "100% authentic and premium brands guaranteed.",
  },
  {
    icon: <HeadphonesIcon className="w-8 h-8" />,
    title: "24/7 Support",
    description: "Our dedicated team is always here to assist you anytime.",
  },
];

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
    transition: { type: "spring", stiffness: 80, damping: 15 },
  },
};

export default function FeaturesBar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });

  return (
    <section
      className="bg-gray-50 border-t border-b border-gray-100 py-16"
      ref={containerRef}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              variants={itemVariants}
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange group-hover:text-white group-hover:shadow-md transition-all duration-300"
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 max-w-50 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
