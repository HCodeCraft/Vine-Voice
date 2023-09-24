import React from "react";
import { useGetPlantsQuery } from "./plantsSlice";
import CommonButton from "../../common/CommonButton";
import PlantCard from "./PlantCard";
import { Typography, Grid, Box } from "@mui/material";

const AllPlants = () => {
  const {
    data: plants,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPlantsQuery();

  // Check if data is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Check if an error occurred
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Check if data has loaded successfully
  if (isSuccess) {
    // Ensure 'plants' is not undefined before rendering
    if (plants) {
      console.log("plants", plants)
      const content = plants.map((plant) => (
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
        <Box sx={{ width: '100%', maxWidth: '100%' }}>
            <Typography variant="h4" align="center">
              All Plants
            </Typography>
            </Box>
            {content}
         
        </>
      );
    }
    // Handle the case where 'plants' does not have 'ids'
    return <p>No plant data available.</p>;
  }

  // Handle other cases (e.g., initial render)
  return null;
};

export default AllPlants;
