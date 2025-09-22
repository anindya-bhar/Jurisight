import React, { memo } from 'react'
import './Footer.css'

const Footer = memo(() => {
  return (
    <footer>
         <p className='footer-text'>
            &copy; 2023 Jurisight AI. Powered by Google Gemini & Cloud Vision.
        </p>
    </footer>
  )
})

export default Footer