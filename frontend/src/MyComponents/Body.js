import React, { memo } from 'react'
import './Body.css';
import Left from "./Left";
import Right from "./Right";

function Body (uploadedFile, 
  textInput, 
  chatHistory, 
  onFileSelect, 
  onTextChange, 
  onProcess ){
  return (
    <div className='main-body'>
        <Left selectedFile={uploadedFile}
          onFileSelect={onFileSelect} />
        <Right value={textInput}
          onChange={onTextChange} 
          onClick={onProcess}
          file={uploadedFile}
          history={chatHistory}/>
    </div>
  )
}

export default Body