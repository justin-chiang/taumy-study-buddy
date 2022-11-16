import React from 'react'
import {useState} from 'react'
import '../styles/login.css'

export default function Login() {
    return (
        <div className = "main">
            <h1 className = "header"> Login </h1>
            <div className = "bottom">
                <div className = "fields">
                    <h2 className = "h2"> Login</h2>
                    <form >
                        <label className = "label">Username:
                            <input className = "input" type="text" />
                        </label>
                    </form>
                    <form >
                        <label className = "label">Password:
                            <input className = "input" type="text" />
                        </label>
                    </form>
                    <button className="login" type="submit"> Login </button>
                </div>
            </div>
        </div>
    )
}