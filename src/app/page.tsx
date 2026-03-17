import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryScroller from "@/components/CategoryScroller";
import PromoCards from "@/components/PromoCards";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import FeaturesBar from "@/components/FeaturesBar";
import Footer from "@/components/Footer";

import { Product } from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface DummyProduct {
  id: number;
  title: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  reviews?: unknown[];
  thumbnail: string;
}

async function fetchCategory(category: string): Promise<Product[]> {
  try {
    const res = await fetch(
      `https://dummyjson.com/products/category/${category}`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products.map((p: DummyProduct) => ({
      id: p.id.toString(),
      name: p.title,
      price: p.price,
      oldPrice: p.discountPercentage
        ? p.price + p.price * (p.discountPercentage / 100)
        : undefined,
      rating: p.rating,
      reviews: p.reviews?.length || (Math.abs(p.id * 17) % 200) + 20,
      image: p.thumbnail,
      isNew: p.rating > 4.5,
    }));
  } catch (error) {
    console.error(`Failed to fetch ${category}:`, error);
    return [];
  }
}

export default async function Home() {
  const [laptops, smartphones, tablets] = await Promise.all([
    fetchCategory("laptops"),
    fetchCategory("smartphones"),
    fetchCategory("tablets"),
  ]);

  const popularRes = await fetch("https://dummyjson.com/products/category/smartphones?limit=4");
  const popularRes2 = await fetch("https://dummyjson.com/products/category/laptops?limit=4");
  
  const [popularData1, popularData2] = await Promise.all([
    popularRes.ok ? popularRes.json() : { products: [] },
    popularRes2.ok ? popularRes2.json() : { products: [] }
  ]);
  
  const combinedPopular = [...popularData1.products, ...popularData2.products];
  
  const popularProducts = combinedPopular.map((p: DummyProduct) => ({
      id: p.id.toString(),
      name: p.title,
      price: p.price,
      oldPrice: p.discountPercentage
        ? p.price + p.price * (p.discountPercentage / 100)
        : undefined,
      rating: p.rating,
      reviews: p.reviews?.length || (Math.abs(p.id * 17) % 200) + 20,
      image: p.thumbnail,
      isNew: p.rating > 4.5,
  }));

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#0A0A0A] selection:bg-brand-orange selection:text-white">
      <Navbar />

      <main>
        <Hero />

        <CategoryScroller
          className="bg-[#F9FAFB]"
          categories={[
            {
              id: "1",
              name: "Laptops",
              image: laptops[1]?.image || laptops[0]?.image,
            },
            {
              id: "2",
              name: "Phones",
              image: smartphones[1]?.image || smartphones[0]?.image,
            },
            {
              id: "3",
              name: "Tablets",
              image: tablets[1]?.image || tablets[0]?.image,
            },
            {
              id: "4",
              name: "Gaming",
              image: laptops[2]?.image || laptops[0]?.image,
            },
            {
              id: "5",
              name: "Audio",
              image: smartphones[2]?.image || smartphones[0]?.image,
            },
            {
              id: "6",
              name: "Desktop",
              image: tablets[2]?.image || tablets[0]?.image,
            },
            {
              id: "7",
              name: "Accessories",
              image: laptops[3]?.image || laptops[0]?.image,
            },
          ]}
        />
        <PromoCards className="bg-white" />

        {laptops.length > 0 && (
          <ProductGrid
            title="Highly Recommended Laptops"
            products={laptops}
            isCarousel
            className="bg-[#F9FAFB]"
          />
        )}

        {popularProducts.length > 0 && (
          <div className="flex flex-col bg-white">
            <ProductGrid
              title="Popular Products"
              products={popularProducts}
              className="bg-white pb-12!"
            />
            <div className="flex justify-center -mt-6 z-10 pb-24 md:pb-32">
              <Link 
                href="/shop" 
                className="bg-[#1a1a1a] text-white px-10 py-4 rounded-full font-bold hover:bg-black transition-colors flex items-center gap-2 shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
              >
                Check All Products <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        )}

        <PromoBanner className="bg-[#F9FAFB]" />

        {tablets.length > 0 && (
          <ProductGrid title="Tablets for You" products={tablets.slice(0, 8)} className="bg-white" />
        )}

        <FeaturesBar className="bg-[#F9FAFB]" />
      </main>

      <Footer />
    </div>
  );
}
