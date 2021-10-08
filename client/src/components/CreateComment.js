import { Chip, Input, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

function CreateComment({currentUser, post}){
    
    const [comment, setComment] = useState("")
    
    const createdComment = {
        content: comment,
        user_id: currentUser.id,
        post_id: post.id
    }
    function handleSubmit(e){
        e.preventDefault()
        
        fetch("/comments",{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(createdComment),
        }
        ).then(r => {
            if (r.ok){
            return r.json()
            }else{
                return r.json().then(errors => Promise.reject(errors))
            }
        })
      setComment("")
    }

return(
        <div className="add-comment">
            <Box sx={{ marginLeft: 27,}} component="form">
            <h4>Add Comment</h4>
                <TextField
                    id="filled-textarea"
                    label="Add Comment..."
                    placeholder="What do you have to say?"
                    multiline
                    variant="filled"
                    sx={{backgroundColor: "white"}}
                    value={comment}
                    onChange={e=> setComment(e.target.value)}
                />
                <div >
                    <Chip sx={{marginLeft: 3, marginTop: 2}} color="secondary" label="Post" onClick={handleSubmit} />
                </div>
            </Box>
        </div>
)

}

export default CreateComment