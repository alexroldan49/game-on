import React, { useState } from "react";
import { Avatar, Card } from "@mui/material";
import { CardHeader } from "@mui/material";
import { CardMedia } from "@mui/material";
import { CardContent } from "@mui/material";
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import Comment from "./Comment"
import CreateComment from "./CreateComment";

function Post( { displayPosts, setDisplayPosts, currentUser, post} ){
    const [expanded, setExpanded] = useState(false)

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
      })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        color: "white",
        transition: theme.transitions.create('transform', {
          duration: theme.transitions.duration.shortest,
        }),
      }));

      const handleExpandClick = () => {
        setExpanded(!expanded);
      };
    
    function removePost(){
        setDisplayPosts(displayPosts.filter(po=> po.id !== post.id))
    }
    
    function handleDelete(){
        fetch(`/posts/${post.id}`,{
            method: "DELETE"
        }).then(r => {
            if (r.ok){
                removePost()
            }
        })
    }
    
    const mappedComments = post.comments.map( comment =>{
        return <Comment comment={comment} />
    })

return(
    <div>
        <Card sx={{ maxWidth: 700, minWidth: 700, minHeight:250, marginLeft: 20, marginRight:20, marginTop: 10, marginBottom:7, backgroundColor:"#262626", color: "green" }}>
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
                {post.image?
                <img src={post.image} alt="image" style={{marginBottom: 15,height:"380px", width:668}} />:
                <div></div>
                 }
                
            </CardContent>
            {currentUser.id === post.author.id ? (
                <div className="postbtn">
                <Button onClick={handleDelete} size="small" color="error">Delete</Button>
                </div>
            ):
            <div></div>
        }
            <div className="posts">
                <h4>Comments</h4>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                    <ExpandMoreIcon />
                {/* <Typography sx={{color:"darkgrey", fontSize: "13px"}}>Comments</Typography> */}
                </ExpandMore>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CreateComment post={post} currentUser={currentUser}/>
                <CardContent>
                    {mappedComments}
                </CardContent>
            </Collapse>
            </div>
        </Card>
    </div>
)
}

export default Post