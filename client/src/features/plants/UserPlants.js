import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import PlantCard from "./PlantCard";
import Unauthorized from "../../Unauthorized";
import dirthand from "../../pictures/dirthand.jpg";

const UserPlants = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  // const entries = useSelector((state) => state.entry.allEntries)

  const plants = loggedInUser?.plants;

  if (!loggedInUser) {
    return <Unauthorized />;
  }

  if (!plants || plants.length === 0) {
    return (
      <div className="center">
        <Typography
          variant="h4"
          align="center"
          style={{ marginTop: "1.75em", marginBottom: "1em" }}
        >
          You don't have any plants logged!
        </Typography>
        <img src={dirthand} className="rosepic" />
        <Typography variant="h5" style={{ marginTop: "1.75em" }}>
          Feel free to browse Everyone's plants and add an entry for your plant,
          or add a new plant
        </Typography>
      </div>
    );
  }

  const content = plants?.map((plant) => {
    if (!plant) {
      return null; // Skip rendering if plant is undefined
    }

    return (
      <PlantCard
        key={plant.id}
        commonName={plant.common_name}
        image_url={plant.image_url}
        sciName={plant.scientific_name}
        short_description={plant.short_description}
        entries={loggedInUser.entries.filter(
          (entry) => entry.plant_id === plant.id
        )}
        id={plant.id}
      />
    );
  });

  return (
    <>
      <Grid container spacing={0} style={{ marginTop: "20px" }}>
        <Box sx={{ width: "100%", maxWidth: "100%" }}>
          <Typography
            variant="h4"
            align="center"
            style={{ marginTop: "1.75em", marginBottom:'1em' }}
          >
            My Plants
          </Typography>
        </Box>
        <Grid container spacing={2}>
          {content}
        </Grid>
      </Grid>
    </>
  );
};

export default UserPlants;
