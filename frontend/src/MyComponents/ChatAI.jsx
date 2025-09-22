import React from 'react'
import './ChatHis.css'
import AIicon from '../images/bot.svg'

export default function ChatAI(prop){
    return (
    <div className="chat-ai">
        <img src={AIicon} alt="" className="chat-logo" />
        <span className="chat-text">
            {prop.message}
        </span>
    </div>
  )
}