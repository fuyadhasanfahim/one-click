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
  // Mock price scaling to make it look like Tk in the thousands as per screenshot
  const displayPrice = product.price * 110;

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { type: "spring", stiffness: 100, damping: 15 },
        },
      }}
      className="group bg-white rounded-[2rem] p-4 md:p-6 transition-all duration-500 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col h-full cursor-pointer relative overflow-hidden"
    >
      {/* Quick View Frosted Glass Overlay */}
      <div className="absolute inset-0 z-20 bg-white/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 pointer-events-none">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          className="pointer-events-auto bg-[#0A0A0A] text-white px-6 py-3 rounded-full font-semibold shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:bg-black transition-colors flex items-center gap-2 translate-y-4 group-hover:translate-y-0 duration-300 ease-out"
        >
          Quick View
        </motion.button>
      </div>

      <div className="relative aspect-square w-full mb-6 flex items-center justify-center z-10">
        <motion.div
          className="w-full h-full relative"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          {product.image.startsWith("http") ? (
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-contain drop-shadow-md mix-blend-multiply" 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            product.image
          )}
        </motion.div>
      </div>

      <div className="flex flex-col items-center text-center flex-1">
        <h3 className="text-gray-900 font-bold text-base mb-2 line-clamp-1 transition-colors">
          {product.name}
        </h3>
        <div className="text-brand-orange font-bold text-lg mb-2">
          Tk.{displayPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        
        <div className="flex items-center gap-1.5 mb-5 text-[11px] font-semibold text-gray-500">
          <Star className="w-3.5 h-3.5 text-gray-300 group-hover:text-brand-orange group-hover:fill-brand-orange transition-colors" />
          {product.reviews === 0 ? "No review Yet" : `${product.reviews}+`}
        </div>

        <div className="w-full flex items-center justify-between gap-3 mt-auto">
          <motion.button 
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 px-2 text-sm font-bold rounded-xl bg-gray-50 text-[#0A0A0A] hover:bg-gray-100 transition-colors shadow-sm border border-gray-100"
          >
            Buy Now
          </motion.button>
          <motion.button 
            whileTap={{ scale: 0.97 }}
            className="flex-1 py-3 px-2 text-sm font-bold rounded-xl bg-[#0A0A0A] text-white hover:bg-black transition-colors shadow-sm"
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
