import React, { useEffect } from "react";
import { fetchAllPlants } from "./plantSlice";
import { useSelector, useDispatch } from "react-redux";
import CommonButton from "../../common/CommonButton";
import PlantCard from "./PlantCard";
import { Typography, Grid, Box } from "@mui/material";

const AllPlants = () => {


  const plants = useSelector((state) => state.plant.allPlants)



  useEffect(()=> {
    console.log("useEffect Ran")
fetchAllPlants()
  },[plants])


  // Select the relevant data from the Redux store
  // const { data, isLoading, isError, isSuccess, error } = useSelector(
  //   (state) => state.plantSlice.allPlants // Replace 'plants' with the correct slice name from your Redux store
  // );



  // // Check if data is still loading
  // if (isLoading) {
  //   return <p>Loading...</p>;
  // }

  // // Check if an error occurred
  // if (isError) {
  //   return <p>Error: {error.message}</p>;
  // }

  // // Check if data has loaded successfully
  // if (isSuccess) {
  //   // Ensure 'data' is not undefined before rendering
    if (plants) {
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
          <Box sx={{ width: "100%", maxWidth: "100%" }}>
            <Typography variant="h4" align="center">
              All Plants
            </Typography>
          </Box>
          {content}
        </>
      );
    }
  }

export default AllPlants;

