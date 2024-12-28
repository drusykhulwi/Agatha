import React from 'react'
import "./Footer.css"
import Logo from "../logo.png"
import { Link } from 'react-router-dom'
import { FaEnvelope, FaLinkedin, FaPhone, FaTwitter } from 'react-icons/fa';


function Footer() {
  return (
    <div className='Footer'>
        <div className='footer-container'>
           <div className='footer-logo'>
            <img src={Logo} alt='logo'/>
            <p>"YOUR MANTRA"</p>
           </div> 
           <div className='quick-links'>
            <h3>QUICK LINKS</h3>
            <Link to="/">Home</Link>
            <Link to='/Blog'>Blogs</Link>
            <Link to='/Podcast'>Podcasts</Link>
           </div>
           <div className='contacts'>
            <h3>CONTACTS</h3>
            <p>
                <FaEnvelope/>
                <a href="mailto:email@gmail.com">email@gmail.com</a>
            </p>
            <p>
                <FaPhone/>
                <a href="tel:+254712345678">+254712345678</a>
            </p>
            <div className='socials'>
                <a href='https'><FaLinkedin/></a>
                <a href='https'><FaTwitter/></a>
            </div>
           </div>
        </div>
        <div className='copyright-container'>
            Copyright &copy; 2024 <b>Agatha Nafula</b>
        </div>
    </div>
  )
}

export default Footer