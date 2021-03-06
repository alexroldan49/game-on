import React, {useEffect, useState} from "react"
import { Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from "./components/Login";
import { Button } from "@mui/material";
import SignedInHome from "./components/SignedInHome";
import Profile from "./components/Profile";
import UserNav from "./components/UserNav";
import UnAuthHome from "./components/UnAuthHome";

function App() {

const [currentUser, setCurrentUser] = useState(null)
const [users, setUsers] = useState([])

 useEffect(()=>{
   fetch("/me")
   .then(r => {
     if(r.ok){
       r.json()
       .then(user => setCurrentUser(user))
     }
   })
 }, []);
 
 useEffect(()=>{
    fetch("/users")
    .then(r=> r.json())
    .then(data => setUsers(data))
 },[])
  
const profilePages = users.map(user=>{
  return( 
          <Route path={`/profile/${user.username}`}>
            <UserNav currentUser={user} />
            <div className="blurred">
            <Profile currentUser={currentUser} user={user}/>
            </div>
          </Route>
          )
})
// const filterUser = users.filter(user =>{
//   return user.username === "user1"
// })

  return (
    <div className="App">
     {currentUser ? (
       <div className="black" >
      
         <Switch>
         {/* <Route path={`/profile/:username`}>
            <Profile currentUser={currentUser} user={filterUser[0]}/>
          </Route> */}
          {profilePages}
            <Route path='/'>
            <SignedInHome users={users} setCurrentUser={setCurrentUser} currentUser={currentUser} />
            </Route>
          </Switch>
      </div>
     ) :
    //  <div>
    //  <Navbar/>
    //  <UnAuthHome/>
     <Switch>
       <Route exact path="/">
         <UnAuthHome />
       </Route>
       <Route path="/signup">
         <Signup setCurrentUser={setCurrentUser}/>
       </Route>
       <Route path="/login">
         <Login setCurrentUser={setCurrentUser}/>
       </Route>
      
     </Switch>
    //  </div>
     }
     
    </div>
  );
}

export default App;
