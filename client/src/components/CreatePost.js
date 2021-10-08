import React, { useState } from "react";
import { Card, MenuItem, Typography } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import { Button } from "@mui/material";
import { useHistory } from "react-router";
import { EditNotifications } from "@mui/icons-material";


function CreatePost({addPost}){
    const [option, setOption] = useState("")
    const [content, setContent] = useState("")
    // const [image, setImage] = useState("")
    const gameOptions = ["New World", "Destiny 2", "Halo Infinite", "MineCraft", "Valorant", "OverWatch", "Super Smash Bros Ultimate", "Legends of Zelda: Breath of the Wild", "Apex Legends", "Rainbow Six Siege", "Fortnite", "Sea of Thieves"]
    // const [fileInput, setFileInput] = useState("")
    const [selectedFile, setSelectedFile] = useState("")
    const [previewSource, setPreviewSource] = useState("")

    
    const Input = styled('input')({
        display: 'none',
      });
    
    // function uploadImage(){
    //    const formData = new FormData()
    //    formData.append("file", image)
    //    formdata.append("upload_preset", "gbkccvjx")
    //    fetch("https://api.cloudinary.com/v1_1/dnbus7ifm/image/upload", formData)
    //    .then(r => )
    // }
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
      
    const createdPost = {
        game: option,
        description: content,
        image: selectedFile.secure_url
    }
    function handleSubmit(e){
        e.preventDefault()
        
        fetch("/posts",{
            method: "POST",
            headers: {"content-type": "application/json"},
            body: JSON.stringify(createdPost),
        }
        ).then(r => {
            if (r.ok){
            return r.json().then(r=> addPost(r))
            }else{
                return r.json().then(errors => Promise.reject(errors))
            }
        })
      setOption("")
      setContent("")
      setPreviewSource('')
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
    
    
    function handleChange(e){
        setOption(e.target.value)
    }
    
return(
    <div className="post">
        <Card sx={{backgroundImage: "linear-gradient(to bottom right,#64c6ec,#cbf6e2,#53dd71,rgb(46, 116, 46), rgb(0, 0, 0))", minWidth: 800, minHeight: 200, marginTop: 2}}>
           <Typography sx={{margin: 2}} color="blue" variant="h5" >Create a Post</Typography>
        <FormControl variant="filled" sx={{height: 50}}>
            <Select
            sx={{backgroundColor:"#3e3e3e", color:"lightgrey"}}
            id="demo-simple-select-filled"
            displayEmpty
            value={option}
            // renderValue={option=>{
            //     if (option.length === 0){
            //         return <em>Choose Game</em>
            //     }
            // }}
            onChange={handleChange}
            >
                <MenuItem disabled value="">
                    <em>Choose Game</em>
                </MenuItem>
                {gameOptions.map(game =>(
                <MenuItem
                key={game}
                value={game}>
                {game}
                </MenuItem>
                ))}
            </Select>
        </FormControl>
        <TextField
                sx={{width: 500, backgroundColor:"white" }}
                id="filled-textarea"
                label="Write your content here..."
                placeholder="Placeholder"
                multiline
                variant="filled"
                value={content}
                onChange={e=> setContent(e.target.value)}
                />
        <div className="upload">
        <label htmlFor="icon-button-file">
        <Input onChange={handleFileInputChange} value={previewFile} accept="image/*" id="icon-button-file" type="file" />
        <IconButton size="large" color="secondary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        </label>
        {previewSource &&(
            <div>
            <img src={previewSource} alt="chosen" style={{height:"200px"}} />
            <div>
            <Button onClick={uploadImage} variant="contained" color="primary" size="small" sx={{height:20, width:30}} disableElevation >Select</Button>
            <Button onClick={clearImage}  variant="contained" color="error" size="small" sx={{height:20, width:30}} disableElevation>x</Button>
            </div>
            </div>
        ) }
        </div>
        <div className="postbtn">
            <Button onClick={handleSubmit} variant="contained" disableElevation>Post</Button>
        </div>
        </Card>
    </div>
)
}
export default CreatePost