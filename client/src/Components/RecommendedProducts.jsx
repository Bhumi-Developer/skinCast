import { useEffect, useState } from "react";
import InfiniteRecommendedCarousel from "./InfiniteRecommendedCarousel";

export default function RecommendedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        
        // Filter only beauty and fragrance products
        const beautyProducts = data.products.filter(
          product => product.category === "beauty" || product.category === "fragrances"
        );
        
        setProducts(beautyProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="w-full py-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-primary-dull/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <span>🛍️</span> Curated for Today
              </h2>
              <span className="text-xs bg-primary-dull/30 text-gray-700 px-3 py-1 rounded-full">
                AI‑Powered Picks
              </span>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <section className="w-full py-8">
      <div className="max-w-[1400px] mx-auto px-4">
        <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-6 md:p-8 shadow-xl border border-primary-dull/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
             Recommended <span className="font-bold text-gray-800">For You</span>
            </h2>
           
          </div>
          
          <InfiniteRecommendedCarousel products={products} speed="slow" />
          
      
        </div>
      </div>
    </section>
  );
}