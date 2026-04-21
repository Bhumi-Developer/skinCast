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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Fetch saved products when user is logged in
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
      console.log("Fetched saved products:", response.data);
      
      const savedMap = {};
      
      // Handle different response structures
      if (Array.isArray(response.data)) {
        response.data.forEach(product => {
          const productId = product.productId || product.id;
          savedMap[productId] = true;
        });
      } else if (response.data.products && Array.isArray(response.data.products)) {
        response.data.products.forEach(product => {
          const productId = product.productId || product.id;
          savedMap[productId] = true;
        });
      } else if (response.data.data && Array.isArray(response.data.data)) {
        response.data.data.forEach(product => {
          const productId = product.productId || product.id;
          savedMap[productId] = true;
        });
      }
      
      setSavedProducts(savedMap);
    } catch (error) {
      console.error("Failed to fetch saved products:", error);
    }
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

    const isAlreadySaved = savedProducts[product.id];

    setSavingStates(prev => ({ ...prev, [product.id]: true }));

    try {
      if (isAlreadySaved) {
        await api.delete('/api/product/unsave', {
          data: { productId: product.id }
        });

        setSavedProducts(prev => ({
          ...prev,
          [product.id]: false
        }));

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

        setSavedProducts(prev => ({
          ...prev,
          [product.id]: true
        }));

        toast.success("Saved ❤️");
      }
    } catch (err) {
      console.log("FULL ERROR:", err.response);
      console.log("BACKEND MESSAGE:", err.response?.data);
      
      if (err.response?.status === 404) {
        toast.error("Product not found");
      } else {
        toast.error(err.response?.data?.message || "Error saving product");
      }
    } finally {
      setSavingStates(prev => ({ ...prev, [product.id]: false }));
    }
  };

  const handleShopNow = (product) => {
    window.open(`${product.url}`, '_blank');
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <p className="text-red-500">⚠️ {error}</p>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Curated for <span className='text-primary'>Your Skin</span>
        </h2>
        <p className="text-gray-500">
          Discover products tailored for your routine
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
          const isSaved = savedProducts[product.id];
          const isSaving = savingStates[product.id];
          
          return (
            <div key={product.id} className="w-full">
              <div className="relative rounded-2xl overflow-hidden 
                border border-primary/20
                shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
                hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
                transition-all duration-500 group h-85">

                {/* IMAGE */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                />

                {/* GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-primary-middle/40 to-transparent"></div>

                {/* SAVE ICON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSave(product);
                  }}
                  disabled={isSaving}
                  className={`absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 z-10
                    ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}
                    ${isSaved ? 'bg-black scale-110' : 'bg-white/80 hover:bg-black'}
                  `}
                >
                  <Bookmark
                    className={`w-4 h-4 transition-all duration-300 
                      ${isSaved ? 'text-white fill-white' : 'text-black hover:text-white hover:fill-white'}
                    `}
                  />
                </button>

                {/* CONTENT */}
                <div className="absolute bottom-0 p-4 text-white w-full">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                      {product.name}
                    </h3>
                    <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                      ${product.price}
                    </span>
                  </div>
                  <p className="text-[15px] text-white mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex gap-2 mt-2 flex-wrap">
                    <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
                      ⭐ {product.rating}
                    </span>
                    <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
                      Skincare
                    </span>
                  </div>
                  <button
                    onClick={() => handleShopNow(product)}
                    className="mt-3 w-full bg-white text-black text-xs font-semibold py-2 rounded-full hover:bg-gray-200 transition"
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* EXPLORE BUTTON - navigates to the ExploreProducts page */}
      <div className="text-center mt-10">
        <button
          onClick={() => navigate('/products')}
          className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full font-semibold text-sm"
        >
          Explore Full Collection →
        </button>
      </div>

      {/* Login Modal */}
      {showUserLogin && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Sign In Required</h3>
            <p className="mb-4">Please sign in to save products</p>
            <div className="flex gap-3">
              <button
                onClick={() => navigate('/login')}
                className="bg-primary text-white px-4 py-2 rounded-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => setShowUserLogin(false)}
                className="bg-gray-200 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style global>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default ProductsSection;