// context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

// Yaha change kiya - AppProvider se AppContextProvider
export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedProducts, setSavedProducts] = useState([]);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [showFormPopup, setShowFormPopup] = useState(false);

  const addToSavedProducts = (product) => {
    setSavedProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        savedProducts,
        addToSavedProducts,
        showUserLogin,
        setShowUserLogin,
        showFormPopup,
        setShowFormPopup,

      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);