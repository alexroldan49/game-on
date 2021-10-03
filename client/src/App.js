import React, {useEffect, useState} from "react"
import { Switch, Route } from "react-router-dom"
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from "./components/Login";

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
   function logout(){
     fetch("/logout", { method: "DELETE"}).then(r=>{
       if (r.ok){
         setCurrentUser(null)
       }
     })
   }
  
  
  return (
    <div className="App">
     {currentUser ? (
       <div>
         <h1>Welcome {currentUser.username} </h1>
         <button onClick={logout}>Log Out</button>
       </div>
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
