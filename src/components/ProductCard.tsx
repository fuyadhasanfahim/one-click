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
      className="group bg-[#f8f9fa] rounded-2xl p-4 md:p-6 transition-all duration-300 border-[3px] border-transparent hover:border-brand-orange flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-square w-full mb-6 flex items-center justify-center">
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
          <button className="flex-1 py-2.5 px-2 text-sm font-bold rounded-lg bg-orange-100 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-colors shadow-sm">
            Buy Now
          </button>
          <button className="flex-1 py-2.5 px-2 text-sm font-bold rounded-lg bg-gray-200 text-gray-700 group-hover:bg-gray-900 group-hover:text-white transition-colors shadow-sm">
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}
