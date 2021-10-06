import React, {useState} from "react"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";



function Signup( {setCurrentUser} ){

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [passwordConfirmation, setPasswordConfirmation] = useState("")
// let history = useHistory()

//     function redirectToLogin(){
//         history.push("/login")
//     }

    function handleSubmit(e){
        e.preventDefault()
        const user = {
            username: username,
            password: password
        }
        fetch("/signup",{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(user),
        }
        ).then(r => {
            if (r.ok){
             r.json().then((us) => setCurrentUser(us))
            }
        })
    }

    return(
        <div>
         <Box component="form" onSubmit={handleSubmit}>
            <h1>Signup</h1>
            <TextField
             label="username"
             type="text"
             value={username}
             onChange={e=> setUsername(e.target.value)}
             />
            <TextField 
            label="password"
            id="outlined-password-input"
            
            value={password}
            onChange={e=> setPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" sx={{height:55}} >submit</Button>
        </Box>
        </div>
    )
}


export default Signup