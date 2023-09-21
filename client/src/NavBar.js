import React from 'react'
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const NavBar = () => {

const pages = ['My Profile', 'My Plants', 'Add a Plant', `Everyone's Plants`]

    
  return (
    <AppBar sx={{textTransform: 'none'}}>
      <h1>Vine Voice</h1>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                // onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block', textTransform:'none', fontSize: '1.3rem'}}
              >
                {page}
              </Button>
            ))}
          </Box>

</AppBar>
  )
}
{/* <header className="Header">
<h1>Vine Voice</h1>
<nav>
    <ul>
        {/* <li><Link to="/users/:id">Home</Link></li>  <= Need to get the current user's id*/}
//         <li><Link to="/users/plants">My Plants</Link></li>
//         <li><Link to="/plants/new">Add a Plant</Link></li>
//         <li><Link to="/plants">Everyone's Plants</Link></li>
//     </ul>
// </nav>
// </header> 
export default NavBar