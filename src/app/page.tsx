import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryScroller from "@/components/CategoryScroller";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import FeaturesBar from "@/components/FeaturesBar";
import Footer from "@/components/Footer";

import { Product } from "@/components/ProductCard";

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
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.products.map((p: DummyProduct) => ({
      id: p.id.toString(),
      name: p.title,
      price: p.price,
      oldPrice: p.discountPercentage ? p.price + (p.price * (p.discountPercentage / 100)) : undefined,
      rating: p.rating,
      reviews: p.reviews?.length || Math.floor(Math.random() * 200) + 20,
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
    fetchCategory('laptops'),
    fetchCategory('smartphones'),
    fetchCategory('tablets')
  ]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <CategoryScroller 
          categories={[
            { id: '1', name: "Laptops", image: laptops[1]?.image || laptops[0]?.image },
            { id: '2', name: "Phones", image: smartphones[1]?.image || smartphones[0]?.image },
            { id: '3', name: "Tablets", image: tablets[1]?.image || tablets[0]?.image },
            { id: '4', name: "Gaming", image: laptops[2]?.image || laptops[0]?.image },
            { id: '5', name: "Audio", image: smartphones[2]?.image || smartphones[0]?.image },
            { id: '6', name: "Desktop", image: tablets[2]?.image || tablets[0]?.image },
            { id: '7', name: "Accessories", image: laptops[3]?.image || laptops[0]?.image },
          ]} 
        />
        
        {laptops.length > 0 && (
          <ProductGrid 
            title="Highly Recommended Laptops" 
            products={laptops} 
            isCarousel
          />
        )}
        
        {smartphones.length > 0 && (
          <ProductGrid 
            title="Popular Smartphones" 
            products={smartphones.slice(0, 10)} 
          />
        )}
        
        <PromoBanner />
        
        {tablets.length > 0 && (
          <ProductGrid 
            title="Tablets for You" 
            products={tablets.slice(0, 8)} 
          />
        )}
        
        <FeaturesBar />
      </main>
      
      <Footer />
    </div>
  );
}
