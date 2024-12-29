import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroBlog from '../components/HeroBlog'

function Blog() {
  return (
    <div className='Blog'>
        <div className='blog-container'>
            <Navbar/>
            <HeroBlog/>
            <Footer/>
        </div>
    </div>
  )
}

export default Blog