// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
// import SignUp from './Components/SignUp'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//      <SignUp></SignUp>
//     </>
//   )
// }

// export default App







// App.jsx
import React from 'react';
// import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
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
        {/* <Route path="/" element={<Home />} /> */}
        <Home></Home>
        {/* <Route path="/profile-form" element={<Form onComplete={(profile) => {
          // Optional: save profile to localStorage or context
          localStorage.setItem('userProfile', JSON.stringify(profile));
        }} />} />
        <Route path="/analysis" element={<Analyses />} />
        <Route path="/products" element={<Explore />} />
        {/* <Route path="/home-remedies" element={<HomeRemedies />} /> */}

        
      
      {/* <Route path="/profile/*" element={<MyProfile />} />  */}
    {/* </Routes> */}
      
    </div>
  );
};

export default App;
