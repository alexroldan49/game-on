import React from "react";
import { Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { CardContent } from "@mui/material";
import { Typography } from "@mui/material";


function Comment({comment}){

    return(
        <div>
            <Card sx={{ width: 350, minHeight:140, marginLeft: 18, marginRight:10, marginTop: 5, marginBottom:7, backgroundColor:"white", color: "black" }}>
            <CardHeader
                sx={{backgroundColor: "#434343", height: 10, color: "white"}}
                avatar={
                    <Avatar
                     alt="profile pic"
                     src={comment.user.profile_picture}
                     sx={{width: 30, height: 30}}
                     />
                }
                title={comment.user.username}
             />
             <CardContent>
                <Typography 
                sx={{color: "black", fontSize: "17px"}}
                variant="h6"
                color="text.primary"

                >
                    {comment.content}
                </Typography>
            </CardContent>
            </Card>
        </div>
    )
}

export default Comment