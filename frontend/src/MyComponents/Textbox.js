import React, { memo } from 'react'
import './Textbox.css'

function Textbox (prop){
  return (
    <div className='textbox'>
        <input type="text" name="" id="txt-box" 
        placeholder='Ask a question about the document ...' 
        className='prompt'
        value={prop.value}/>
        <button className="send" onClick={prop.onClick}>
            <img src="logo192.png" alt="" className='send-button'/>
        </button>
    </div>
  )
}

export default Textbox