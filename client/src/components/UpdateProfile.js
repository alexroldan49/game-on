import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextField } from "@mui/material";

function UpdateProfile(){

    const [previewFile, setPreviewFile] = useState("")
    const [bio, setBio] = useState("")

    const handleFileInputChange = (e)=>{
        const file = e.target.files[0]
        previewFile(file)
    }
    
return (
    <div>   
      <label htmlFor="icon-button-file">
        <Input onChange={handleFileInputChange} value={previewFile} accept="image/*" id="icon-button-file" type="file" />
        <IconButton size="large" color="secondary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        </label>
      <TextField
                         sx={{width: 325, backgroundColor:"white" }}
                         id="filled-textarea"
                         label="Write your content here..."
                         placeholder="Placeholder"
                         multiline
                         variant="filled"
                         value={bio}
                         onChange={e=> setBio(e.target.value)}
                    />
    </div>
    
)

}

export default UpdateProfile