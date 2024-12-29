import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroPod from '../components/HeroPod'
function Podcasts() {
  return (
    <div className='Podcasts'>
        <div className='podcast-container'>
            <Navbar/>
            <HeroPod/>
            <Footer/>
        </div>
    </div>
  )
}

export default Podcasts