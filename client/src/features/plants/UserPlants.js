import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import PlantCard from "./PlantCard";
import Unauthorized from "../../Unauthorized";
import dirthand from "../../pictures/dirthand.jpg";

const UserPlants = () => {
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const plants = loggedInUser?.plants;
  const memoizedPlants = useMemo(() => plants, [plants]);

  if (!loggedInUser) {
    return <Unauthorized />;
  }

  if (!memoizedPlants || memoizedPlants.length === 0) {
    return (
      <div className="center">
        <Typography
          variant="h4"
          align="center"
          style={{ marginTop: "1.75em", marginBottom: "1em" }}
        >
          You don't have any plants logged!
        </Typography>
        <img src={dirthand} className="rosepic" alt='a persons hands holding dirt' />
        <Typography variant="h5" style={{ marginTop: "1.75em" }}>
          Feel free to browse Everyone's plants and add an entry for your plant,
          or add a new plant
        </Typography>
      </div>
    );
  }

  const content = memoizedPlants?.map((plant) => {
    if (!plant) {
      return null; 
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
    <Grid
item  xs={12} sm={6} md={4} lg={3}
      spacing={0}
      style={{ marginTop: "20px", marginBottom: "20px" }}
    >
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Typography
          variant="h4"
          align="center"
          style={{ marginTop: "1.75em", marginBottom: "1em" }}
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
}


export default UserPlants;
