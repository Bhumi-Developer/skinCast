// App.jsx
import React from 'react';
import Home from './Pages/Home';
// import { Routes, Route } from 'react-router-dom';

// import Analyses from './Pages/Analyses';
// import Form from './Components/Form';  // the form component you provided
// import MoreProducts from './Pages/MoreProducts';
// import Explore from './Components/Explore';
// // import HomeRemedies from './Components/HomeRemedy';

// import MyProfile from './Pages/Profile/MyProfile';

const App = () => {
  return (
    <div>
      {/* <Routes> */}
        {/* <Route path="/" element={<Home />} />
        <Route path="/profile-form" element={<Form onComplete={(profile) => {
          // Optional: save profile to localStorage or context
          localStorage.setItem('userProfile', JSON.stringify(profile));
        }} />} />
        <Route path="/analysis" element={<Analyses />} />
        <Route path="/products" element={<Explore />} /> */}
        {/* <Route path="/home-remedies" element={<HomeRemedies />} /> */}

        
      
      {/* <Route path="/profile/*" element={<MyProfile />} /> */}
    {/* </Routes> */}
      
     <Home></Home>
    </div>
  );
};

export default App;
