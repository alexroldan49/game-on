import React, { useEffect, useState } from "react";
import Post from "./Post";
import UserNav from "./UserNav";
import CreatePost from "./CreatePost";

function SignedInHome( { setCurrentUser, currentUser}){

    const [displayPosts, setDisplayPosts] = useState([])
    const [clicked, setClicked] = useState("")
      
    useEffect(()=>{
        fetch("/posts")
        .then(r => r.json())
        .then(posts => setDisplayPosts(posts.reverse()))
    }, [clicked])

    // const reversedPosts = displayPosts.reverse()
    const mappedPosts = displayPosts.map(post=>{
       return <Post setClicked={setClicked}  setDisplayPosts={setDisplayPosts} currentUser={currentUser} post={post} />
    })

return(
    <div className="home">
        <UserNav currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        <div>
            <CreatePost setClicked={setClicked}/>
        </div>
        <div className="content">
            {mappedPosts}
            {/* <Post displayPosts={displayPosts} currentUser={currentUser} /> */}
        </div>
  </div>
)

}

export default SignedInHome