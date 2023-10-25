import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import PlantCard from './PlantCard';
import Unauthorized from '../../Unauthorized';

const UserPlants = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  // const entries = useSelector((state) => state.entry.allEntries)

  const plants = loggedInUser?.plants;

  if (!loggedInUser){
    return (
      <Unauthorized/>
    )
  }

  if (!plants || plants.length === 0) {
    return (
      <div className='center'>
        <br/>
        <br/>
        <Typography variant="h4" align="center">
          You don't have any plants logged!
        </Typography>
        <br/>
        <Typography variant="h5">
          Feel free to browse Everyone's plants and add an entry for your plant, or add a new plant
        </Typography>
      </div>
    );
  }

  const content = plants.map((plant) => (
    <PlantCard
      key={plant.id}
      commonName={plant.common_name}
      image_url={plant.image_url}
      sciName={plant.scientific_name}
      short_description={plant.short_description}
      entries={loggedInUser.entries.filter((entry) => entry.plant_id === plant.id)}
      id={plant.id}
    />
  ));

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: '100%' }}>
        <Typography variant="h4" align="center">
          My Plants
        </Typography>
      </Box>
      {content}
    </>
  );
};

export default UserPlants;



