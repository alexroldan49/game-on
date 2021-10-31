import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { Chip, Typography } from "@mui/material";

function Login({setCurrentUser}){
    let history = useHistory()

    function redirectHome(e){
        history.push("/")
    }
    function redirectSignup(e){
        history.push("/signup")
    }

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    
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
                }else{
                    r.json()
                    .then(error => setError(error.errors))
                }
            })
    }
    
    
    
    return(
        <div className="login-out">
        <Box
        sx={{backgroundColor:"#8d9be5",
            textAlign: "center",
            padding:20,
            marginTop: "200px",
            marginBottom: "200px"
            }}
         component="form" onSubmit={handleSubmit}>
             <div className="rows" >
            <h1>Login</h1>
            <TextField
            sx={{marginBottom:2}}
             label="username"
             type="text"
             value={username}
             onChange={e=> setUsername(e.target.value)}
             />
            <TextField 
            sx={{marginBottom:2}}
            label="password"
            id="outlined-password-input"
            type="password"
            value={password}
            onChange={e=> setPassword(e.target.value)}
            />
            <Typography sx={{marginBottom: 1, fontWeight: "bold"}} color="error" >{error}</Typography>
            <Button type="submit" variant="contained" sx={{height:55}} >submit</Button>
            <Chip sx={{marginLeft: 2, marginRight: 2, marginTop: 2}} color="secondary" value="/"  label="Home" onClick={redirectHome} />
            <Chip sx={{marginLeft: 2, marginRight: 2, marginTop: 2}} color="secondary" value="/login" label="signup" onClick={redirectSignup} />
            </div>
        </Box>
    </div>
    )

}

export default Login