// import React, { memo } from 'react'
import React, { useEffect, useState } from 'react';
import ChatAI from "./ChatAI";
import ChatUser from "./ChatUser";
import axios from 'axios';
import './ChatHis.css'

// const ChatHis = memo(() => {
const ChatHis = ({history}) => {

  return (
      <div className='chat-history'>
        <ChatAI message="How can I help you undwerstand legal documents"/>
        <ChatAI message={history}/>
        {/* <div className="chat-ai">
            <img src="logo192.png" alt="" className="chat-logo" />
            <span className="chat-text">
                How can I help you undwerstand legal documents
            </span>
        </div>
        <div className="chat-user">
            <span className="chat-text">
                {(message=="")?'...':message}
            </span>
            <img src="logo192.png" alt="" className="chat-logo"/>
        </div> */}
    </div>
  )
};

export default ChatHis