// import React, { useState, useEffect } from 'react';
// import { Bookmark } from 'lucide-react';
// // If you don't have lucide-react installed, run: npm install lucide-react
// // If you prefer not to use the library, replace with a simple SVG icon.

// const ExploreProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('all');

//   // Mock saved products function (replace with your actual context if needed)
//   // If you have a real context, import useAppContext and use addToSavedProducts.
//   // For now, this shows an alert and saves to localStorage as an example.
//   const addToSavedProducts = (product) => {
//     // Example implementation: store in localStorage and show feedback
//     const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
//     if (!saved.some((p) => p.id === product.id)) {
//       const updated = [...saved, product];
//       localStorage.setItem('savedProducts', JSON.stringify(updated));
//       alert(`Saved: ${product.title}`);
//     } else {
//       alert('Product already saved');
//     }
//   };

//   const handleGoBack = () => {
//     if (window.history.length > 1) {
//       window.history.back();
//     } else {
//       window.location.href = '/';
//     }
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://dummyjson.com/products?limit=100');
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         const beautyProducts = data.products.filter(
//           (p) => p.category === 'beauty' || p.category === 'fragrances'
//         );
//         setProducts(beautyProducts);
//         setFilteredProducts(beautyProducts);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     let filtered = [...products];
//     if (searchTerm.trim() !== '') {
//       filtered = filtered.filter(
//         (p) =>
//           p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           p.description?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (selectedCategory !== 'all') {
//       filtered = filtered.filter((p) => p.category === selectedCategory);
//     }
//     setFilteredProducts(filtered);
//   }, [searchTerm, selectedCategory, products]);

//   const categories = ['all', ...new Set(products.map((p) => p.category))];

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dull/10 via-white to-primary-light/10">
//         <div className="text-center">
//           <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-primary">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dull/10 via-white to-primary-light/10">
//         <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
//           <p className="text-red-500 text-lg mb-4">Error: {error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition"
//           >
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-dull/10 via-white to-primary-light/10 py-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-6">
//           <h1 className="text-2xl md:text-3xl font-bold text-primary">All Products</h1>
//           <p className="text-sm text-primary-light">{filteredProducts.length} items</p>
//         </div>

//         {/* Search & Filter Bar */}
//         <div className="flex flex-col sm:flex-row gap-3 mb-8">
//           <div className="flex-1 relative">
//             <input
//               type="text"
//               placeholder="Search products, brands..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="w-full px-4 py-3 pl-12 rounded-full border border-primary-dull/50 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/30 text-gray-700"
//             />
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5 absolute left-4 top-1/2 -translate-y-1/2 text-primary-light"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//             </svg>
//           </div>
//           <select
//             value={selectedCategory}
//             onChange={(e) => setSelectedCategory(e.target.value)}
//             className="px-5 py-3 rounded-full border border-primary-dull/50 bg-white/80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
//           >
//             {categories.map((cat) => (
//               <option key={cat} value={cat}>
//                 {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Products Grid - New Card Design */}
//         {filteredProducts.length === 0 ? (
//           <div className="text-center py-12">
//             <p className="text-primary-light text-lg">No products found.</p>
//             <button
//               onClick={() => {
//                 setSearchTerm('');
//                 setSelectedCategory('all');
//               }}
//               className="mt-4 text-primary underline"
//             >
//               Clear filters
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {filteredProducts.map((product) => (
//               <div key={product.id} className="w-full">
//                 <div
//                   className="relative rounded-2xl overflow-hidden 
//                     border border-primary/20
//                     shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
//                     hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
//                     transition-all duration-500 group h-[340px]"
//                 >
//                   {/* IMAGE */}
//                   <img
//                     src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/200'}
//                     alt={product.title}
//                     className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//                   />

//                   {/* GRADIENT OVERLAY */}
//                   <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/40 to-transparent"></div>

//                   {/* SAVE ICON - Hover becomes black with white icon */}
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       addToSavedProducts(product);
//                     }}
//                     className="absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 z-10
//                       bg-white/80 hover:bg-black"
//                   >
//                     <Bookmark
//                       className="w-4 h-4 transition-all duration-300 
//                         text-black hover:text-white hover:fill-white"
//                     />
//                   </button>

//                   {/* CONTENT AT BOTTOM */}
//                   <div className="absolute bottom-0 p-4 text-white w-full">
//                     <div className="flex justify-between items-center">
//                       <h3 className="font-semibold text-sm md:text-base line-clamp-2">
//                         {product.title}
//                       </h3>
//                       <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                         ${product.price}
//                       </span>
//                     </div>
//                     <p className="text-[15px] text-white mt-1 line-clamp-2">
//                       {product.description}
//                     </p>
//                     <div className="flex gap-2 mt-2 flex-wrap">
//                       <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
//                         ⭐ {product.rating?.toFixed(1) || '4.5'}
//                       </span>
//                       <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
//                         {product.category === 'beauty' ? 'Beauty' : 'Fragrance'}
//                       </span>
//                     </div>
//                     <button
//                       onClick={() => window.open(`https://dummyjson.com/products/${product.id}`, '_blank')}
//                       className="mt-3 w-full bg-white text-black text-xs font-semibold py-2 rounded-full hover:bg-gray-200 transition"
//                     >
//                       Shop now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Back Button */}
//         <div className="mt-10 flex justify-center">
//           <button
//             onClick={handleGoBack}
//             className="flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary px-6 py-3 rounded-full border border-primary-dull/40 shadow-md hover:shadow-lg hover:bg-primary/5 transition-all"
//           >
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//             </svg>
//             Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExploreProducts;




import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import useNavigate
import { Bookmark } from 'lucide-react';

const ExploreProducts = () => {
  const navigate = useNavigate(); // 👈 initialize navigation
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Scroll to top when this page loads (not strictly needed for back, but good practice)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  const addToSavedProducts = (product) => {
    const saved = JSON.parse(localStorage.getItem('savedProducts') || '[]');
    if (!saved.some((p) => p.id === product.id)) {
      const updated = [...saved, product];
      localStorage.setItem('savedProducts', JSON.stringify(updated));
      alert(`Saved: ${product.title}`);
    } else {
      alert('Product already saved');
    }
  };

  const handleGoBack = () => {
    navigate(-1); // 👈 go back one page using React Router
    // The previous page must have a useEffect that scrolls to top on mount,
    // e.g. useEffect(() => { window.scrollTo(0, 0); }, []);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=100');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const beautyProducts = data.products.filter(
          (p) => p.category === 'beauty' || p.category === 'fragrances'
        );
        setProducts(beautyProducts);
        setFilteredProducts(beautyProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const categories = ['all', ...new Set(products.map((p) => p.category))];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dull/10 via-white to-primary-light/10">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-primary">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-dull/10 via-white to-primary-light/10">
        <div className="text-center p-6 bg-white/80 rounded-2xl shadow-lg">
          <p className="text-red-500 text-lg mb-4">Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary-light transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-dull/10 via-white to-primary-light/10 py-8 px-4">
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
            {filteredProducts.map((product) => (
              <div key={product.id} className="w-full">
                <div
                  className="relative rounded-2xl overflow-hidden 
                    border border-primary/20
                    shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
                    hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
                    transition-all duration-500 group h-[340px]"
                >
                  <img
                    src={product.thumbnail || product.images?.[0] || 'https://via.placeholder.com/200'}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary/40 to-transparent"></div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToSavedProducts(product);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 z-10
                      bg-white/80 hover:bg-black"
                  >
                    <Bookmark
                      className="w-4 h-4 transition-all duration-300 
                        text-black hover:text-white hover:fill-white"
                    />
                  </button>
                  <div className="absolute bottom-0 p-4 text-white w-full">
                    <div className="flex justify-between items-center">
                      <h3 className="font-semibold text-sm md:text-base line-clamp-2">
                        {product.title}
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
                      onClick={() => window.open(`https://dummyjson.com/products/${product.id}`, '_blank')}
                      className="mt-3 w-full bg-white text-black text-xs font-semibold py-2 rounded-full hover:bg-gray-200 transition"
                    >
                      Shop now
                    </button>
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  );
};

export default ExploreProducts;