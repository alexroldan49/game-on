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
                src={currentUser.image}
                sx={{ width: 50, height: 50 }}
                onClick={handleLink}
                
            />
            
            </li>
            <li>
                <h2>{currentUser.username} </h2>
            </li>
            <Button sx={{marginLeft: 3}} variant="outlined" size="small" onClick={logout}>Log Out</Button>
        </ul>
    )
}

export default UserNav