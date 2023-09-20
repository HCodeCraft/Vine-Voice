import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {



    
  return (
    <header className="Header">
    <h1>Vine Voice</h1>
    <nav>
        <ul>
            {/* <li><Link to="/users/:id">Home</Link></li>  <= Need to get the current user's id*/}
            <li><Link to="/users/plants">My Plants</Link></li>
            <li><Link to="/plants/new">Add a Plant</Link></li>
            <li><Link to="/plants">Everyone's Plants</Link></li>
        </ul>
    </nav>
</header>
  )
}

export default NavBar