import React from 'react'
import "./About.css"

function About() {
  return (
    <div className='About'>
        <div className='about-container'>
            <div className='about-image'></div>
            <div className='about-content'>
                <div className='about-content-container'>
                    <h2>About Me</h2>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Vivamus nec nulla sem. Sed at erat nec nunc lobortis congue.
                        Integer in est tristique, vulputate sem at, lacinia velit. In 
                        ultricies turpis justo, in interdum magna accumsan sit amet. Nam 
                        eget iaculis nibh. Proin nec porttitor leo, vitae interdum neque. 
                        In eget orci ligula.
                    </p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About