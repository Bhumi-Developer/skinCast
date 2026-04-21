import React from 'react'
import Navbar from '../Components/Navbar'
import Banners from '../Components/Banner'
import TrustSection from '../Components/TrustSection'
import Footer from '../Components/Footer'
// import Signup from '../Components/Signup'
import { useAppContext } from '../context/AppContext'
import RecommendedProducts from '../Components/RecommendedProducts'
import IngredientsSection from '../Components/Ingridents'
import AvoidSection from '../Components/AvoidSection'
import Form from '../Components/Form';
import AnimatedBanner from '../Components/AnimatedBanner'
import Skin from '../Components/Provide'
import ChatbotWidget from '../Components/ChatbotWidget'

const Home = () => {
  const { showUserLogin, setShowUserLogin,showFormPopup, setShowFormPopup } = useAppContext();
  const handleFormComplete = (profile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    setShowFormPopup(false); // close modal after save
    // optionally navigate or show success message
  };
  return (
    <div>
      <Banners />
      <RecommendedProducts />
      <AnimatedBanner />
      <Skin />
      <TrustSection />
      <Footer />
      <ChatbotWidget />
      
     
       {showUserLogin && <Signup />}

       {/* Form Popup Modal */}
      {showFormPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowFormPopup(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10 bg-white rounded-full p-1 shadow-md"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
              <Form onComplete={handleFormComplete} />
          </div>
        </div>
      )}
    </div>
  )
}

export default Home