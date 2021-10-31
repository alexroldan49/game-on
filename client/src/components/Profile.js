import { Avatar, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { useHistory } from "react-router";
import UserNav from "./UserNav";
import CreateIcon from '@mui/icons-material/Create';
import UpdateProfile from "./UpdateProfile";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { IconButton, Input} from "@mui/material";
import { Button } from "@mui/material";


function Profile({ currentUser, user}){
    const [form, setForm] = useState(false)
    // const [updatedBio, setUpdatedBio] = useState(user.profile_image)
    // const [updatedImage, setUpdatedImage] = useState(user.bio)
    const [previewSource, setPreviewSource] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [bio, setBio] = useState("")
    const [updatedUser, setUpdatedUser] = useState(user)

    const handleFileInputChange = (e)=>{
        const file = e.target.files[0]
        previewFile(file)
    }

    const previewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () =>{
            setPreviewSource(reader.result)
        }
    }
    
    function clearImage(){
        setPreviewSource('')
    }
    
    function handleToggle(){
        setForm(!form)
    }
    // setUpdatedBio(updatedUser.bio)
    // setUpdatedImage(updatedUser.Image)
    
    const updatedProfile = {
        bio : bio,
        profile_picture : selectedFile.secure_url
    }

    function handleSubmit(e){
        e.preventDefault()

        fetch(`/update/${currentUser.id}`,{
            method: "PATCH",
            headers: { "Content-type": "application/json"},
            body: JSON.stringify(updatedProfile)
        }).then(r => r.json())
        .then(user => setUpdatedUser(user))
        .then( console.log(selectedFile))
    }
    
    
    const uploadImage = (encodedImage) =>{
        const formData = new FormData()
            formData.append("file", previewSource)
            formData.append("upload_preset", "gbkccvjx")
            fetch("https://api.cloudinary.com/v1_1/dnbus7ifm/image/upload", {
                method: "POST",
                body: formData
            })
            .then(r => {
                if(r.ok){
                    r.json().then(r => setSelectedFile(r))
                }
            } )
    }
    
    return(
        <>
        
        <div className="content">
            <Avatar
                alt="profile pic"
                src={updatedUser.profile_picture}
                sx={{ margin: 10, width: 200, height: 200 }}/>
        </div>
        <div className="content">
                <h1 className="gameFont">{user.username}</h1>
        </div>
        <div className="content">
                {updatedUser.bio ? 
            <Box sx={{ p: 2,
                bgcolor: 'background.default',
                display: 'row',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                textAlign: "center",
                width: 700
                }}>
                <Paper>
                <Typography sx={{fontSize: 30, margin: 10}}>{user.bio}</Typography>
                </Paper>
            </Box>:
                <Box sx={{ p: 2,
                    bgcolor: 'background.default',
                    display: 'row',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                    textAlign: "center",
                    width: 300
                    }}>
                    <Paper>
                    <Typography sx={{fontSize: 30, color: "lightgrey"}}>Bio empty...</Typography>
                    </Paper>
                </Box>
                
            }
        </div>
        {user.id === currentUser.id ?
        <>
        <div className="content">
            <CreateIcon
            className="pencil"
             sx={{marginRight: 30, marginBottom: 5}}
             fontSize="large"
             onClick={handleToggle}
             />
            </div>
            {
                form ? 
        <div className="content">
             <Box sx={{ p: 2,
                    bgcolor: '#76a1c9',
                    display: 'grid',
                    gridTemplateColumns: { md: '1fr 1fr' },
                    gap: 2,
                    minWidth: 600,
                    marginBottom: 30
                    }}>
                    <Paper sx={{ bgcolor: '#4c7294'}}>
                    <Typography sx={{textAlign:"center", padding: "5px",fontSize: 24, color: "white"}}>Image</Typography>
                    </Paper>
                    <Paper sx={{ bgcolor: '#4c7294'}}>
                    <Typography sx={{textAlign:"center", padding: "5px",fontSize: 24, color: "white"}}>Bio</Typography>
                    </Paper>
                    <label htmlFor="icon-button-file">
                    <Input onChange={handleFileInputChange} value={previewFile} accept="image/*" id="icon-button-file" type="file" />
                    <IconButton size="large" color="secondary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                    </label>
                            <TextField
                            sx={{width: 325, height:"55px", backgroundColor:"white" }}
                            id="filled-textarea"
                            label="Write your content here..."
                            placeholder="Tell the world About you..."
                            multiline
                            variant="filled"
                            value={bio}
                            onChange={e=> setBio(e.target.value)}
                                    />
                            {previewSource &&(
                            <div>
                                <img src={previewSource} alt="chosen" style={{height:"200px"}} />
                                <div>
                                    <Button onClick={uploadImage} variant="contained" color="primary" size="small" sx={{height:20, width:30}} disableElevation >Select</Button>
                                    <Button onClick={clearImage}  variant="contained" color="error" size="small" sx={{height:20, width:30}} disableElevation>x</Button>
                                 </div>
                            </div>
                            ) }
                             <div className="postbtn">
                                    <Button onClick={handleSubmit} variant="contained" disableElevation>Post</Button>
                                </div>
                </Box>
            </div> :
            <div></div>
            }
            </> :
            <div></div>
    }
    
        </>
    )
}
export default Profile