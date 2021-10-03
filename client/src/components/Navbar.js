import React from "react"
import {Link} from "react-router-dom"

function Navbar(){

    return(
        <div>
            <div>
                <Link to="/" >Home</Link>
            </div>
            <div>
                <Link to="/signup" >Signup</Link>
            </div>
            <div>
                <Link to="/login" >Login</Link>
            </div>
        </div>
    )


}


export default Navbar