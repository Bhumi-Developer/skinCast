import React, { useEffect, useState } from 'react';
import api from '../../utils/axios';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

const SavedProducts = () => {
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSaved = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/product/my-products');
        setSaved(res?.data?.data || []);
        console.log(res.data.data)
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Failed to load saved products');
        setSaved([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, []);

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Saved products background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dull/20 via-white/10 to-primary-light/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8">
          Saved Products
        </h1>

        {loading ? (
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center shadow-lg border border-white/30">
            <p className="text-primary-light text-lg">Loading…</p>
          </div>
        ) : saved.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-12 text-center shadow-lg border border-white/30">
            <p className="text-primary-light text-lg">No saved products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" >
            {saved.map((product) => (
              <Link
                key={product._id || product.productId}
                to={product.url}
                className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/30 hover:shadow-lg transition-all"
              >
                <div className="flex gap-3 min-w-0">
                  <img
                    src={product.image || product.thumbnail}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate">
                      {product.name}
                    </h3>
                    <p className="text-primary font-bold">
                      {product.price ? `₹${product.price}` : '—'}
                      
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProducts;