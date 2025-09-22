import React from 'react'
import './ChatHis.css'
import UserIcon from '../images/profile.svg'

export default function ChatUser(prop){
    return (
    <div className="chat-user">
        <span className="chat-text">
            {prop.message}
        </span>
        <img src={UserIcon} alt="" className="chat-logo" />
    </div>
  )
}