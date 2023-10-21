import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import EntryTable from "../entries/EntryTable";
import { fetchPlantById } from "./plantSlice";

const Plant = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = Number(params.id);

  // To-Do
  // add medium image Urls to existing plants and use them for the plant page image
  // get plant comments so I can put it in EntryTable


  // const plants = useSelector((state) => state.plant.allPlants);
  // const otherWay = plants[id-1]
  // was this way faster?

  const plant = useSelector((state) => state.plant.individualPlant);




  // how can I get the entry.comments?
// currently getting Plant.entries
// could filter the comments, or get the plant model to have comments somehow

useEffect(()=> {
dispatch(fetchPlantById(id))
console.log("plant", plant)
},[])


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
          <p>{plant.sunlight_emojis}</p>
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
      <br />
      <br />
      <Box sx={{ width: "100%", maxWidth: "100%" }}>
        <Typography variant="h4" align="center">
          {plant.common_name}
        </Typography>
        <Typography variant="h6" align="center">
          {plant.scientific_name}
        </Typography>
      </Box>
      <br />
      <br />
      <div className="pos_top">
        <br />
        <br />
        <img
          className="img_deg"
          src={plant.image_url}
        ></img>
        <div className="text-box">
          <p className="desc">{plant.description}</p>
        </div>
        <Box sx={{ flexGrow: 1 }}>
          <br />
          <br />
          <div className="button_box">
            <p>Added on {plant.create_date}</p>
          </div>
          <br />
          <br />
          <Grid container spacing={1}>
            <Grid container item spacing={3} >
              <FormRow />
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />
        <Box display="flex" justifyContent="flex-end">
  <Link to={`/plants/${plant.id}/entries/new`}>
    <CommonButton>Add an Entry</CommonButton>
  </Link>
</Box>
        <br />
        <Typography variant="h5" align="center">
          Latest {plant.entries.length > 1 ? "Entries" : "Entry"}
        </Typography>
        <br />

        <EntryTable entries={plant.entries} comments={plant.comments}/>

        <br />
        <br />
      </div>
    </>
  );
};

export default Plant;
