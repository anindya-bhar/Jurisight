import { useState } from 'react'
import React, { memo } from 'react'
import axios from 'axios';

import './Left.css'

const Left = ({ selectedFile, onFileSelect }) => {


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(onFileSelect(file));
  };


// const Left = memo(() => {
  return (
    <form className='left'>
      <span className='left-title'>
          DOCUMENT
      </span>
      <div className="upload-file">
        <input type="file" id="file-up" accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg" className="file-up" onChange={handleFileChange}/>
        <label htmlFor="file-up" className="file-up-label">
          <img src="logo192.png" alt="no photo" className='file-up-photo'/>
          <span className='file-up-text'>Drag & Drop or Browse File</span>     
        </label>
        <p className="file-type">PDF, DOCX, TXT, PNG, JPG (Max 10MB)</p>
      </div>
      <button className="process-button" type='submit'>Process Document</button>
      <div className="select-type">
        <span className='left-sub'>
            Summarisation Level
        </span>
        <div className="type-div">
          <input type="radio" name="option" className='type-radio'/>
          <span className="type-text">Detailed Clause by Clause</span>
        </div>
        <div className="type-div">
          <input type="radio" name="option" className='type-radio'/>
          <span className="type-text">Quick Bullet Points</span>
        </div>
        <div className="type-div">
          <input type="radio" name="option" className='type-radio'/>
          <span className="type-text">Risk and Highlights</span>
        </div>
      </div>
    </form>
  );
};
// const h=window.innerHeight-65;
// document.getElementsByClassName("left").style.height=(h+"px");
// console.log(h);

export default Left