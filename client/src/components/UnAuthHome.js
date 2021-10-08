import { Button } from "@mui/material";
import React from "react";
import { useHistory } from "react-router";

function UnAuthHome(){

    const history = useHistory()

function handleClick(e){
    history.push(e.target.value)
}

    return(
        <>
            <div className="home-blur"></div>
            <div class="bg-text">
            <h2>Welcome to!</h2>
            <h1>Game-inn</h1>
            <p>The Place for Gamers to talk about Gamin</p>
            <div className="home-btns">
            <Button
            onClick={handleClick}
            value="/login"
            sx={{height:70, width:180, fontSize: 30, color: "#66d24d", fontWeight: "bold", marginRight: 5}}
            >Log In</Button>
            <Button
            onClick={handleClick}
            value="/signup"
            sx={{height:70, width:180, fontSize: 30, color: "#4d7fd2", fontWeight: "bold"}}
            >Sign up</Button>
            </div>
            </div>
        </>
    )
}
export default UnAuthHome