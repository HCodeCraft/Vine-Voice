import React from "react";
import { useParams, Link } from "react-router-dom";
import { useGetPlantsQuery } from "./plantsSlice";
import { Box, Typography, Grid } from "@mui/material";
import CommonButton from "../../common/CommonButton";

const Plant = () => {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useGetPlantsQuery();

  const plant = data?.[id - 1];

  console.log("plant", plant);

  if (isError) {
    return (
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Typography variant="h4" align="center">
          Error loading plant data
        </Typography>
      </Box>
    );
  }

  if (isLoading) {
    return (
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Typography variant="h4" align="center">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!plant) {
    return (
      <section>
        <h2>Plant not found!</h2>
      </section>
    );
  }
  function FormRow() {
    return (
      <React.Fragment>
        <Grid item xs={4}>
          <p>
            {plant.sunlight_emojis}
          </p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.water_emojis}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.in_out_emojis}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.cycle_emojis}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.human_poison_emoji}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.pet_poison_emoji}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.edible_emoji}</p>
        </Grid>
        <Grid item xs={4}>
          <p>{plant.medicinal_emoji}</p>
        </Grid>
      </React.Fragment>
    );
  }

  return (
    <>
    <br/>
    <br/>
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Typography variant="h4" align="center">
          {plant.common_name}
        </Typography>
        <Typography variant="h6" align="center">
          {plant.scientific_name}
        </Typography>
      </Box>
      <br></br>
      <br></br>
      <div className="pos_top">
        <img
          className="img_deg"
          src="https://www.glasshouseworks.com/image/cache/data/images13/Tradescantia_albiflora-max-500.jpg"
        ></img>
        <div className="text-box">
          <p className="desc">{plant.description}</p>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <div>Added on {plant.create_date}</div>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Plant;
