import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { useAnalysis } from '../context/AnalysisContext';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import api from "../utils/axios"

const ExploreProducts = () => {
  const navigate = useNavigate();
  const { analysis, loading, error } = useAnalysis();
  const products = analysis?.products || [];
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [savedProducts, setSavedProducts] = useState({});
  const [savingStates, setSavingStates] = useState({});
  const [fetchingSaved, setFetchingSaved] = useState(false);

  // ✅ Fetch saved products from database when component mounts or user changes
  useEffect(() => {
    if (user) {
      fetchSavedProducts();
    } else {
      setSavedProducts({}); // Clear saved products when logged out
    }
  }, [user]); // Re-run when user logs in/out

  const fetchSavedProducts = async () => {
    if (fetchingSaved) return;
    
    setFetchingSaved(true);
    try {
      const response = await api.get('/api/product/my-products');
      console.log("Fetched saved products:", response.data);
      
      const savedMap = {};
      
      // Handle different response structures from your backend
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
      } else if (typeof response.data === 'object' && response.data !== null) {
        // If response is an object with product IDs as keys
        Object.keys(response.data).forEach(key => {
          if (response.data[key] === true || response.data[key]?.saved) {
            savedMap[key] = true;
          }
        });
      }
      
      setSavedProducts(savedMap);
      console.log("Saved products map:", savedMap);
    } catch (error) {
      console.error("Failed to fetch saved products:", error);
      // Don't show toast error on page load to avoid annoyance
    } finally {
      setFetchingSaved(false);
    }
  };

  // ✅ Compute filtered products directly
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'all' || p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // ✅ Handle save for a specific product
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

    // Prevent multiple clicks
    if (savingStates[product.id]) return;

    const isAlreadySaved = savedProducts[product.id];

    // Set loading state for this product
    setSavingStates(prev => ({ ...prev, [product.id]: true }));

    try {
      if (isAlreadySaved) {
        // Unsave product
        await api.delete('/api/product/unsave', {
          data: { productId: product.id }
        });

        setSavedProducts(prev => ({
          ...prev,
          [product.id]: false
        }));

        toast.success("Removed 🗑️");
      } else {
        // Save product
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

  const handleGoBack = () => {
    navigate(-1);
  };

  // Categories (dynamic)
  const categories = [
    'all',
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-primary-dull/10 via-white to-primary-light/10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-primary">All Products</h1>
          <p className="text-sm text-primary-light">{filteredProducts.length} items</p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 pl-12 rounded-full border border-primary-dull/50 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-700"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-primary-light"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-5 py-3 rounded-full border border-primary-dull/50 bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-primary-light text-lg">No products found.</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="mt-4 text-primary underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              // ✅ Check if this specific product is saved (from database)
              const isSaved = savedProducts[product.id] === true;
              const isSaving = savingStates[product.id];
              
              return (
                <div key={product.id} className="w-full">
                  <div
                    className="relative rounded-2xl overflow-hidden 
                      border border-primary/20
                      shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
                      hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
                      transition-all duration-500 group h-85"
                  >
                    <img
                      src={product.thumbnail || product.image || 'https://via.placeholder.com/200'}
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary/50 via-primary/40 to-transparent"></div>
                    
                    <button
                      onClick={() => handleSave(product)}
                      disabled={isSaving}
                      className={`absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 
                        ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}
                        ${isSaved ? 'bg-black scale-110' : 'bg-white/80 hover:bg-white'}
                      `}
                    >
                      <Bookmark 
                        className={`w-4 h-4 transition-colors duration-300 
                          ${isSaved ? 'text-white fill-white' : 'text-black'}
                        `}
                      />
                    </button>
                    
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
                          ⭐ {product.rating?.toFixed(1) || '4.5'}
                        </span>
                        <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
                          {product.category === 'beauty' ? 'Beauty' : 'Fragrance'}
                        </span>
                      </div>
                      <button
                        onClick={() => window.open(`${product.url}`, '_blank')}
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
        )}

        {/* Back Button */}
        <div className="mt-10 flex justify-center">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full border border-primary-dull/40 shadow-md hover:shadow-lg hover:bg-primary/5 transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back
          </button>
        </div>
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
    </div>
  );
};

export default ExploreProducts;