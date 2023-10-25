import React, { useEffect } from "react";
import { fetchAllPlants } from "./plantSlice";
import { useSelector, useDispatch } from "react-redux";
import CommonButton from "../../common/CommonButton";
import PlantCard from "./PlantCard";
import { Typography, Grid, Box } from "@mui/material";
import Unauthorized from "../../Unauthorized";

const AllPlants = () => {


  const plants = useSelector((state) => state.plant.allPlants)
  const entries = useSelector((state) => state.entry.allEntries)

  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  console.log("plants", plants)



  if (!loggedInUser){
    return (
      <Unauthorized/>
    )
  }





    if (plants) {
      const content = plants.map((plant) => (
        <PlantCard
          key={plant.id}
          commonName={plant.common_name}
          image_url={plant.image_url}
          sciName={plant.scientific_name}
          short_description={plant.short_description}
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

