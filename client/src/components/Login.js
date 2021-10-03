import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"

function Login({setCurrentUser}){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    function handleSubmit(e){
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify({
                username: username,
                password: password
            }),}).then(r => {
                if (r.ok) {
                    r.json()
                    .then(user => setCurrentUser(user))
                }
            })
    }
    
    
    
    return(
        <div>
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <label>username</label>
            <input
             id="username"
             type="text"
             value={username}
             onChange={e=> setUsername(e.target.value)}
             />
            <input 
            id="password"
            type="text"
            value={password}
            onChange={e=> setPassword(e.target.value)}
            />
            {/* <input 
            id="password confirmation"
            type="text"
            value={passwordConfirmation}
            onChange={e=> setPasswordConfirmation(e.target.value)}
            /> */}
            <button>submit</button>
        </form>
    </div>
    )

}

export default Login