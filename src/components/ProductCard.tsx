"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.9, y: 30 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 },
        },
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-2xl hover:border-brand-orange/40 transition-all duration-500 overflow-hidden flex flex-col h-full z-10 hover:z-20 cursor-pointer"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-linear-to-t from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none" />

      {product.isNew && (
        <span className="absolute top-4 left-4 z-20 bg-brand-purple text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider uppercase shadow-sm">
          New
        </span>
      )}

      {/* Wishlist Button Placeholder */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute top-4 right-4 z-20 w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100 duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </motion.button>

      <div className="relative aspect-square w-full mb-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center z-10 group-hover:bg-white transition-colors duration-500">
        <motion.div
          className="w-full h-full relative flex items-center justify-center text-7xl select-none"
          whileHover={{ scale: 1.1, rotate: [-2, 2, -2, 0] }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {product.image.startsWith("http") ? (
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-contain p-4 mix-blend-multiply drop-shadow-sm" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            product.image
          )}
        </motion.div>
      </div>

      <div className="flex flex-col flex-1 z-10 relative bg-white pb-2">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2.5 text-xs">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-500" : "fill-gray-100 text-gray-200"}`}
              />
            ))}
          </div>
          <span className="text-gray-400 ml-1 font-medium">
            ({product.reviews})
          </span>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 leading-tight group-hover:text-brand-orange transition-colors">
          {product.name}
        </h3>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-50 border-dashed">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 leading-none group-hover:text-brand-orange transition-colors duration-300">
              ${product.price.toFixed(2)}
            </span>
            {product.oldPrice && (
              <span className="text-xs text-gray-400 line-through mt-1">
                ${product.oldPrice.toFixed(2)}
              </span>
            )}
          </div>

          <motion.div
            className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-md cursor-pointer group-hover:bg-brand-orange transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
