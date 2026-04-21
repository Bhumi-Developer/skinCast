import React from 'react';

const SavedProducts = () => {
  const saved = JSON.parse(localStorage.getItem('savedProducts')) || [];

  return (
    <div className="relative min-h-screen overflow-hidden">
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
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Saved Products</h1>
        {saved.length === 0 ? (
          <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-12 text-center shadow-lg border border-white/30">
            <p className="text-primary-light text-lg">No saved products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {saved.map((product) => (
              <div
                key={product.id}
                className="bg-white/40 backdrop-blur-sm p-4 rounded-2xl shadow-md border border-white/30 hover:shadow-lg transition-all"
              >
                <div className="flex gap-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-800">{product.name}</h3>
                    <p className="text-primary font-bold">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedProducts;