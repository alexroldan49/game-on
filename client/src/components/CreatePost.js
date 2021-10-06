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


function CreatePost({setClicked}){
    const [option, setOption] = useState("")
    const [content, setContent] = useState("")
    const [image, setImage] = useState("")
    const gameOptions = ["New World", "Destiny 2", "Halo Infinite", "MineCraft", "Valorant", "OverWatch", "Super Smash Bros Ultimate", "Legends of Zelda: Breath of the Wild", "Apex Legends", "Rainbow Six Siege"]
    
    const Input = styled('input')({
        display: 'none',
      });
    
    const createdPost = {
        game: option,
        description: content,
        image: image
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
            return r.json().then(r=> setClicked(r))
            }else{
                return r.json().then(errors => Promise.reject(errors))
            }
        })
      setOption("")
      setContent("")
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
        <Input accept="image/*" id="icon-button-file" type="file" />
        <IconButton size="large" color="secondary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
        </label>
        </div>
        <div className="postbtn">
            <Button onClick={handleSubmit} variant="contained" disableElevation>Post</Button>
        </div>
        </Card>
    </div>
)
}
export default CreatePost