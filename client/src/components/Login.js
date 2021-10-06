import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';

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
        <Box component="form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <TextField
             label="username"
             type="text"
             value={username}
             onChange={e=> setUsername(e.target.value)}
             />
            <TextField 
            label="password"
            id="outlined-password-input"
            type="password"
            value={password}
            onChange={e=> setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{height:55}} >submit</Button>
        </Box>
    </div>
    )

}

export default Login