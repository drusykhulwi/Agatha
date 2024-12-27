import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'

function Home() {
  return (
    <div className='Home'>
        <div className='home-container'>
            <Navbar/>
            <Hero/>
        </div>
    </div>
  )
}

export default Home