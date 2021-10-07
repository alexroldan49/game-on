import { Avatar } from "@mui/material";
import React from "react";


function Profile({user}){

    

    return(
        <div>
            <Avatar
                alt="profile pic"
             src={user.image}
                sx={{ width: 200, height: 200 }}/>
        </div>
    )
}
export default Profile