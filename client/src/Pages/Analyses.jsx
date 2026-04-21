import React from 'react'

import WeatherPage from '../Components/WeatherPage'
import IngredientsSection from '../Components/Ingridents'
import AvoidSection from '../Components/AvoidSection'
import ProductsSection from '../Components/Products'
import ExploreProducts from '../Components/Explore'
// import HomeRemedies from '../Components/HomeRemedy'
import AlternativeRemedySection from '../Components/AlternativeHomeRemedy';

const Analyses = () => {

  return (

    <div className='bg-primary/30'>
      <WeatherPage></WeatherPage>
      <IngredientsSection></IngredientsSection>
      <AvoidSection></AvoidSection>
      <ProductsSection></ProductsSection>
      <AlternativeRemedySection></AlternativeRemedySection>
      
    
    </div>
  )
}

export default Analyses