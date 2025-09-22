import React, { memo } from 'react'
import './Right.css'
import ChatHis from "./ChatHis";
import Textbox from "./Textbox";

function Right (prop) {
  return (
    <div className='right'>
        <ChatHis history={prop.history}/>
        <Textbox onClick={prop.onClick}
          uploadedFile={!prop.uploadedFile}
          value={prop.value}
          onChange={prop.onChange}/>
    </div>
  )
}

export default Right