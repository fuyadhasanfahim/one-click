import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryScroller from "@/components/CategoryScroller";
import ProductGrid from "@/components/ProductGrid";
import PromoBanner from "@/components/PromoBanner";
import FeaturesBar from "@/components/FeaturesBar";
import Footer from "@/components/Footer";

// Dummy data for visual presentation
const DUMMY_PRODUCTS = [
  {
    id: "1",
    name: "iPhone 15 Pro Max 256GB Platinum Black",
    price: 130000.00,
    oldPrice: 145000.00,
    rating: 4.8,
    reviews: 124,
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738057/kzqumox7k5zqs6jfzhtf.png",
    isNew: true,
  },
  {
    id: "2",
    name: "Apple Watch Series 9 GPS",
    price: 45000.00,
    oldPrice: 48000.00,
    rating: 4.9,
    reviews: 89,
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773745639/bwxwx8ogz9mnwcwougxc.png",
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Noise Cancelling",
    price: 35000.00,
    oldPrice: 40000.00,
    rating: 4.5,
    reviews: 240,
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738057/pwssq1mc0wsmjl87vohv.png",
    isNew: true,
  },
  {
    id: "4",
    name: "MacBook Pro M3 14-inch Space Gray",
    price: 195000.00,
    rating: 5.0,
    reviews: 56,
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738058/xqm5xgpqgfcklolq06um.png",
  },
  {
    id: "5",
    name: "Samsung Neo QLED 8K Smart TV",
    price: 350000.00,
    oldPrice: 400000.00,
    rating: 4.7,
    reviews: 312,
    image: "https://res.cloudinary.com/dny7zfbg9/image/upload/v1773738055/cmyeoyyeyklrny6l7zou.png",
  },
];

const DUMMY_PRODUCTS_2 = [
  ...DUMMY_PRODUCTS.slice(2, 5).reverse(),
  {
    id: "6",
    name: "Marshall Kilburn II Portable Bluetooth",
    price: 25000.00,
    rating: 4.6,
    reviews: 45,
    image: "📻",
  },
  {
    id: "7",
    name: "DJI Mini 4 Pro Drone with Remote",
    price: 85000.00,
    rating: 4.9,
    reviews: 18,
    image: "🚁",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-brand-orange selection:text-white">
      <Navbar />
      
      <main>
        <Hero />
        
        <CategoryScroller />
        
        <ProductGrid 
          title="Highly Recommended Product" 
          products={[...DUMMY_PRODUCTS, ...DUMMY_PRODUCTS_2, ...DUMMY_PRODUCTS].slice(0, 15).map((p, i) => ({ ...p, id: `hr-${p.id}-${i}` }))}
          isCarousel
        />
        
        <ProductGrid 
          title="Popular Products" 
          products={[...DUMMY_PRODUCTS_2, ...DUMMY_PRODUCTS].slice(0, 10).map((p, i) => ({ ...p, id: `pop-${p.id}-${i}` }))} 
        />
        
        <PromoBanner />
        
        <ProductGrid 
          title="Products for you" 
          products={DUMMY_PRODUCTS.slice(0, 4).map((p, i) => ({ ...p, id: `foryou-${p.id}-${i}` }))} 
        />
        
        <FeaturesBar />
      </main>
      
      <Footer />
    </div>
  );
}
