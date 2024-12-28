import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'
import Footer from '../components/Footer'

function Home() {
  return (
    <div className='Home'>
        <div className='home-container'>
            <Navbar/>
            <Hero/>
            <About/>
            <Footer/>
        </div>
    </div>
  )
}

export default Home