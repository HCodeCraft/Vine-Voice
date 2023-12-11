import React from "react";
import CommonButton from "./common/CommonButton";
import { Typography, Grid, Paper, useMediaQuery, useTheme } from "@mui/material";
import PlantPhone from "./pictures/plantphone.jpg";
import { Link } from 'react-router-dom'



const Welcome = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const paperStyle = {
    padding: "20px",
    width: isMobile ? "80%" : "600px", 
    margin: "0 auto", 
  };

  return (
    <div style={{ textAlign: "center", marginTop: ".25em", marginBottom:"1em" }}>
      <Grid container justifyContent="center">
        <Paper elevation={10} style={paperStyle}>
          <Typography variant="h2" >
            Welcome to Vine Voice!
          </Typography>
          <img src={PlantPhone} className='welcome_pic' alt="Plant Phone"></img>
          <Typography variant='h6' style={{marginTop: ".5em"}}>Where you can learn more about the fascinating realm of plants, log and track the health of your botanical friends and share insights and connect with other plant enthusiasts by viewing and commenting on their green companions. </Typography>
          <div className='welcome_box'>
         <Link to={`/users/new`}><CommonButton>Sign Up</CommonButton></Link>  <Link to={`/login`}><CommonButton>Log In</CommonButton></Link>  
         </div>
        </Paper>
      </Grid>
    </div>
  );
};

export default Welcome;
