import React from 'react'
import "./HeroBlog.css"

export default function HeroBlog() {
  return (
    <div className='HeroBlog'>
        <div className='heroBlog-container'>
            <div className='blog-title'>
                <div className='title'>
                    <h4>Blog Title</h4>
                    <h4>Minutes Read</h4>
                </div>
                <button>Read More</button>
            </div>
        </div>
    </div>
  )
}
