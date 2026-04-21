

// // export default ProductsSection;

// // components/ProductsSection.jsx
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // add this import
// import { useAppContext } from '../context/AppContext';
// import { Bookmark } from 'lucide-react';

// const ProductsSection = () => {
//   const navigate = useNavigate(); // initialize navigation
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { addToSavedProducts } = useAppContext();


//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch('https://dummyjson.com/products?limit=4');
//         if (!response.ok) throw new Error('Failed to fetch products');
//         const data = await response.json();
//         setProducts(data.products);
//       } catch (err) {
//         setError(err.message);
//         setProducts([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   const handleSave = (product) => {
//     addToSavedProducts(product);
//   };

//   const handleShopNow = (product) => {
//     window.open(`https://dummyjson.com/products/${product.id}`, '_blank');
//   };

//   if (loading) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12 text-center">
//         <h2 className="text-2xl font-bold mb-4">Loading products...</h2>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-7xl mx-auto px-4 py-12 text-center">
//         <p className="text-red-500">⚠️ {error}</p>
//       </div>
//     );
//   }

//   if (products.length === 0) return null;

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-12">
//       {/* HEADER */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
//           Curated for <span className='text-primary/100'>Your Skin</span>
//         </h2>
//         <p className="text-gray-500">
//           Discover products tailored for your routine
//         </p>
//       </div>

//       {/* CARDS GRID */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {products.map((product) => (
//           <div key={product.id} className="w-full">
//             <div className="relative rounded-2xl overflow-hidden 
//               border border-primary/20
//               shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
//               hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
//               transition-all duration-500 group h-[340px]">

//               {/* IMAGE */}
//               <img
//                 src={product.thumbnail}
//                 alt={product.title}
//                 className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
//               />

//               {/* GRADIENT OVERLAY */}
//               <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary-middle/40 to-transparent"></div>

//               {/* SAVE ICON */}
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSave(product);
//                 }}
//                 className="absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 z-10
//                   bg-white/80 hover:bg-black"
//               >
//                 <Bookmark
//                   className="w-4 h-4 transition-all duration-300 
//                     text-black hover:text-white hover:fill-white"
//                 />
//               </button>

//               {/* CONTENT */}
//               <div className="absolute bottom-0 p-4 text-white w-full">
//                 <div className="flex justify-between items-center">
//                   <h3 className="font-semibold text-sm md:text-base line-clamp-2">
//                     {product.title}
//                   </h3>
//                   <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
//                     ${product.price}
//                   </span>
//                 </div>
//                 <p className="text-[15px] text-white mt-1 line-clamp-2">
//                   {product.description}
//                 </p>
//                 <div className="flex gap-2 mt-2 flex-wrap">
//                   <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
//                     ⭐ {product.rating}
//                   </span>
//                   <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
//                     Skincare
//                   </span>
//                 </div>
//                 <button
//                   onClick={() => handleShopNow(product)}
//                   className="mt-3 w-full bg-white text-black text-xs font-semibold py-2 rounded-full hover:bg-gray-200 transition"
//                 >
//                   Shop now
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* EXPLORE BUTTON - now navigates to the ExploreProducts page */}
//       <div className="text-center mt-10">
//         <button
//           onClick={() => navigate('/products')} // or whatever route you've set for ExploreProducts
//           className="bg-gray-200 hover:bg-gray-300 px-6 py-2 rounded-full font-semibold text-sm"
//         >
//           Explore Full Collection →
//         </button>
//       </div>

//       <style global>{`
//         .line-clamp-2 {
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default ProductsSection;




// components/ProductsSection.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // added useLocation
import { useAppContext } from '../context/AppContext';
import { Bookmark } from 'lucide-react';

const ProductsSection = () => {
  const navigate = useNavigate();
  const location = useLocation(); // to detect route changes
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToSavedProducts } = useAppContext();

  // Scroll to top every time this component is mounted or when route path changes to this section's parent route
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]); // triggers on route change (including back navigation)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products?limit=4');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleSave = (product) => {
    addToSavedProducts(product);
  };

  const handleShopNow = (product) => {
    window.open(`https://dummyjson.com/products/${product.id}`, '_blank');
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
          Curated for <span className='text-primary/100'>Your Skin</span>
        </h2>
        <p className="text-gray-500">
          Discover products tailored for your routine
        </p>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <div className="relative rounded-2xl overflow-hidden 
              border border-primary/20
              shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
              hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
              transition-all duration-500 group h-[340px]">

              {/* IMAGE */}
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />

              {/* GRADIENT OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary-middle/40 to-transparent"></div>

              {/* SAVE ICON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSave(product);
                }}
                className="absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 z-10
                  bg-white/80 hover:bg-black"
              >
                <Bookmark
                  className="w-4 h-4 transition-all duration-300 
                    text-black hover:text-white hover:fill-white"
                />
              </button>

              {/* CONTENT */}
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
        ))}
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