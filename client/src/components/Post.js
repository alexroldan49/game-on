import React from "react";
import { Avatar, Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";

function Post( { setClicked, setDisplayPosts, currentUser, post} ){

    function handleDelete(){
        fetch(`/posts/${post.id}`,{
            method: "DELETE"
        }).then(r => {
            if (r.ok){
                setClicked(r)
            }
        })
    }
    

return(
    <div>
        <Card sx={{ maxWidth: 700, minWidth: 700, minHeight:250, marginLeft: 20, marginRight:20, marginTop: 10, backgroundColor:"#262626", color: "green" }}>
            <CardHeader
                sx={{backgroundColor: "#434343"}}
                avatar={
                    <Avatar
                     alt="profile pic"
                     src={post.author.profile_picture}
                     sx={{width: 40, height: 40}}
                     />
                }
                title={post.author.username}
                subheader={`Game : ${post.game}`}
             />
            <CardMedia/>
            <CardContent>
                <Typography 
                sx={{color: "white"}}
                variant="h6"
                color="text.primary"

                >
                    {post.description}
                </Typography>
            </CardContent>
            {currentUser.id === post.author.id ? (
                <div className="postbtn">
                <Button onClick={handleDelete} size="small" color="error">Delete</Button>
                </div>
            ):
            <div></div>
            }
        </Card>
    </div>
)
}

export default Post