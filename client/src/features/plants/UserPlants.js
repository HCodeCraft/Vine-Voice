import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';
import PlantCard from './PlantCard';

const UserPlants = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const plants = loggedInUser?.plants;

  if (!plants || plants.length === 0) {
    return (
      <>
        <Typography variant="h4" align="center">
          You don't have any plants logged!
        </Typography>
        <Typography>
          Feel free to browse Everyone's plants and add a plant, or add a new plant
        </Typography>
      </>
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



