import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import About from '../components/About'

function Home() {
  return (
    <div className='Home'>
        <div className='home-container'>
            <Navbar/>
            <Hero/>
            <About/>
        </div>
    </div>
  )
}

export default Home