import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Box, Typography } from '@mui/material'
import PlantCard from './PlantCard'


const UserPlants = () => {

  const loggedInUser = useSelector((state) => state.reducer.auth.userInfo)
  console.log("loggedInUser", loggedInUser)


  const plants = loggedInUser?.plants


// TO-Do
// Pretty much like UserMovies, have the plantpage pics or have the latest entry pic
// get User.plants


    // Ensure 'plants' is not undefined before rendering
    if (loggedInUser) {
      const content = plants?.map((plant) => (
        <PlantCard
          key={plant.id}
          commonName={plant.common_name}
          image_url={plant.image_url}
          sciName={plant.scientific_name}
          short_description={plant.short_description}
          entries={plant.entries}
          id={plant.id}
        />
      ));
      return (
        <>
          <Box sx={{ width: "100%", maxWidth: "100%" }}>
            <Typography variant="h4" align="center">
              My Plants
            </Typography>
          </Box>
          {content}
        </>
      );
    }

  }



export default UserPlants