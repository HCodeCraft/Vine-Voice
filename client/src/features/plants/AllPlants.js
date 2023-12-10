import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import PlantCard from "./PlantCard";
import { Typography, Grid, Box } from "@mui/material";
import Unauthorized from "../../Unauthorized";

const AllPlants = () => {
  const plants = useSelector((state) => state.plant.allPlants);
  const memoizedPlants = useMemo(() => plants, [plants]);
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  if (!loggedInUser) {
    return <Unauthorized />;
  }

  if (memoizedPlants) {
    const content = memoizedPlants.map((plant) => (
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
        <Grid
          container
          spacing={0}
          style={{ marginTop: "20px", marginBottom: "20px", padding: 2 }}
        >
          <Box sx={{ width: "100%", maxWidth: "100%" }}>
            <Typography
              variant="h4"
              align="center"
              style={{ marginTop: "1.75em", marginBottom: "1em" }}
            >
              All Plants
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {content}
          </Grid>
        </Grid>
      </>
    );
  }
};

export default AllPlants;
