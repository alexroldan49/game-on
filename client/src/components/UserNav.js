import React from "react";
import { Button } from "@mui/material";
import Avatar from '@mui/material/Avatar';


function UserNav({setCurrentUser, currentUser}){

    
    function logout(){
        fetch("/logout", { method: "DELETE"}).then(r=>{
          if (r.ok){
            setCurrentUser(null)
          }
        })
      }

    return(
        <ul className="navbar">
            <li>
            <Avatar
                alt="profile pic"
             src={currentUser.image}
                sx={{ width: 50, height: 50 }}
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