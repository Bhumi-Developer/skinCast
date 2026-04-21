import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import api from "../utils/axios";

const ProductsSection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { analysis, loading, error } = useAnalysis();
  const products = analysis?.products || [];
  const { user } = useAuth();
  
  const visibleProducts = products.slice(0, 4);
  const [savedProducts, setSavedProducts] = useState({});
  const [savingStates, setSavingStates] = useState({});
  const [showUserLogin, setShowUserLogin] = useState(false);

  // 🔥 Scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // 🔥 Fetch saved products
  useEffect(() => {
    if (user) {
      fetchSavedProducts();
    } else {
      setSavedProducts({});
    }
  }, [user]);

  const fetchSavedProducts = async () => {
    try {
      const response = await api.get('/api/product/my-products');
      const savedMap = {};

      if (Array.isArray(response.data)) {
        response.data.forEach(p => {
          savedMap[p.productId || p.id] = true;
        });
      } else if (response.data.products) {
        response.data.products.forEach(p => {
          savedMap[p.productId || p.id] = true;
        });
      } else if (response.data.data) {
        response.data.data.forEach(p => {
          savedMap[p.productId || p.id] = true;
        });
      }

      setSavedProducts(savedMap);
    } catch (err) {
      console.error("Fetch saved error:", err);
    }
  };

  // 🔥 Match % helper

//   const percent = analysis.products[0]?.matchPercentage;
// console.log(percent);
  const getMatchPercent = (product) => {
    const raw = product.matchPercentage;

    // if 0–1 → convert to %
    if (raw <= 1) return Math.round(raw * 100);

    return Math.round(raw);
  };

  const getMatchColor = (percent) => {
    if (percent >= 80) return "bg-green-500";
    if (percent >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleSave = async (product) => {
    if (!user) {
      toast.error("Please sign in to save products", {
        action: {
          label: "Sign In",
          onClick: () => setShowUserLogin(true),
        },
      });
      return;
    }

    if (savingStates[product.id]) return;

    const isSaved = savedProducts[product.id];
    setSavingStates(prev => ({ ...prev, [product.id]: true }));

    try {
      if (isSaved) {
        await api.delete('/api/product/unsave', {
          data: { productId: product.id }
        });

        setSavedProducts(prev => ({ ...prev, [product.id]: false }));
        toast.success("Removed 🗑️");
      } else {
        await api.post('/api/product/save', {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          rating: product.rating,
          description: product.description,
          url: product.url
        });

        setSavedProducts(prev => ({ ...prev, [product.id]: true }));
        toast.success("Saved ❤️");
      }
    } catch (err) {
      console.log(err.response);
      toast.error(err.response?.data?.message || "Error");
    } finally {
      setSavingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleShopNow = (product) => {
    window.open(product.url, '_blank');
  };

  if (loading) {
    return (
      <div className="text-center py-10">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        {error}
      </div>
    );
  }

  if (!products.length) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">
          Curated for <span className="text-primary">Your Skin</span>
        </h2>
        <p className="text-gray-500">
          Personalized recommendations
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map(product => {
          const isSaved = savedProducts[product.id];
          const isSaving = savingStates[product.id];

          const matchPercent = getMatchPercent(product);

          return (
            <div key={product.id} className="relative group">

              {/* CARD */}
              <div className="relative rounded-2xl overflow-hidden shadow-lg h-80">

                {/* IMAGE */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition"
                />

                {/* 🔥 MATCH BADGE */}
                <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-full shadow z-10 ${getMatchColor(matchPercent)}`}>
                  {matchPercent}% Match
                </div>

                {/* SAVE BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave(product);
                  }}
                  disabled={isSaving}
                  className={`absolute top-3 right-3 p-2 rounded-full z-10
                    ${isSaved ? 'bg-black' : 'bg-white/80'}
                  `}
                >
                  <Bookmark
                    className={`w-4 h-4 
                      ${isSaved ? 'text-white fill-white' : 'text-black'}
                    `}
                  />
                </button>

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

                {/* CONTENT */}
                <div className="absolute bottom-0 p-4 text-white w-full">
                  <h3 className="text-sm font-semibold line-clamp-2">
                    {product.name}
                  </h3>

                  <p className="text-xs line-clamp-2 mt-1">
                    {product.description}
                  </p>

                  <div className="flex justify-between mt-2">
                    <span className="text-xs">⭐ {product.rating}</span>
                    <span className="text-xs">${product.price}</span>
                  </div>

                  <button
                    onClick={() => handleShopNow(product)}
                    className="mt-3 w-full bg-white text-black text-xs py-2 rounded-full"
                  >
                    Shop Now
                  </button>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* EXPLORE */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/products')}
          className="bg-gray-200 px-6 py-2 rounded-full"
        >
          Explore Full Collection →
        </button>
      </div>

    </div>
  );
};

export default ProductsSection;