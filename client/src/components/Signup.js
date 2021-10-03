import React, {useState} from "react"



function Signup( setCurrentUser ){

const [username, setUsername] = useState("")
const [password, setPassword] = useState("")
// const [passwordConfirmation, setPasswordConfirmation] = useState("")
    

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
        )}

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <h1>Signup</h1>
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


export default Signup