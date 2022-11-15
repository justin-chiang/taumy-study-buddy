import React from 'react'
import {useState} from 'react'
import '../styles/welcome.css'

export default function Welcome() {
    return (
        <div className = "main">
            <h1 className = "header"> Welcome to Taumy! </h1>
            <div className = "buttons">
                <button className="login" type="submit"> Login </button>
                <button className="signup" type="submit"> Signup </button>
            </div>
        </div>
    )
}