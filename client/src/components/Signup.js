import React, {useState} from "react"
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from '@mui/material/Button';
import { useHistory } from "react-router-dom";
import { Chip } from "@mui/material";



function Signup( {setCurrentUser} ){

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
const [passwordConfirmation, setPasswordConfirmation] = useState("")
let history = useHistory()

    function redirectHome(e){
        history.push("/")
    }
    function redirectLogin(e){
        history.push("/login")
    }

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
            <h1>Signup</h1>
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
            <Button type="submit" variant="contained" sx={{height:55}} >submit</Button>
            <Chip sx={{marginLeft: 2, marginRight: 2, marginTop: 2}} color="secondary" value="/"  label="Home" onClick={redirectHome} />
            <Chip sx={{marginLeft: 2, marginRight: 2, marginTop: 2}} color="secondary" value="/login" label="login" onClick={redirectLogin} />
            </div>
        </Box>
    </div>
    )
}


export default Signup