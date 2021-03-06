import React from "react";
import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import { useHistory } from "react-router";
import { Link } from "react-router-dom";


function UserNav({setCurrentUser, currentUser}){
    
    const history = useHistory()
    
    function logout(){
        fetch("/logout", { method: "DELETE"}).then(r=>{
          if (r.ok){
            setCurrentUser(null)
          }
        })
        history.push("/")
      }

      function goHome(){
        history.push("/")
      }
      
      function handleLink(){
        history.push(`/profile/${currentUser.username}`)
      }
      
    return(
        <ul className="navbar">
            <li>
                {/* <Link to={`/profile/${currentUser.username}`} > */}
            <Avatar
                alt="profile pic"
                src={currentUser.profile_picture}
                sx={{ width: 50, height: 50 }}
                onClick={handleLink}
                
            />
            
            </li>
            <li>
              
                <h2 className="username">{currentUser.username} </h2>
            </li>
                <li>
                <Button sx={{marginLeft: 3}} variant="outlined" size="small" onClick={logout}>Log Out</Button>
                </li>
            <li href="#" onClick={goHome} >
              <h2 className="logo" >GAME-INN</h2>
            </li>
        </ul>
    )
}

export default UserNav