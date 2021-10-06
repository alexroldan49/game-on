import React, {useEffect, useState} from "react"
import { Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from "./components/Login";
import { Button } from "@mui/material";
import SignedInHome from "./components/SignedInHome";

function App() {

const [currentUser, setCurrentUser] = useState(null)

 useEffect(()=>{
   fetch("/me")
   .then(r => {
     if(r.ok){
       r.json()
       .then(user => setCurrentUser(user))
     }
   })
 }, []);
 
  
  
  return (
    <div className="App">
     {currentUser ? (
      <SignedInHome setCurrentUser={setCurrentUser} currentUser={currentUser} />
     ) :
     <div>
     <Navbar/>
     <Switch>
       <Route path="/signup">
         <Signup setCurrentUser={setCurrentUser}/>
       </Route>
       <Route path="/login">
         <Login setCurrentUser={setCurrentUser}/>
       </Route>
     </Switch>
     </div>
     }
     
    </div>
  );
}

export default App;
