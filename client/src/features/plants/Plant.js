import React, { useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import EntryTable from "../entries/EntryTable";
import { fetchPlantById } from "./plantSlice";
import { deletePlantFromApi } from "./plantSlice";

const Plant = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = Number(params.id);
  const navigate = useNavigate();

  // To-Do
  // add medium image Urls to existing plants and use them for the plant page image
  // add edit and delete buttons for the admin

  const user = useSelector((state) => state.user.loggedInUser);

  const plant = useSelector((state) => state.plant.individualPlant);

  console.log("plant (individualPlant)", plant)

  // plant is getting plants from individualPlant

  const allPlants = useSelector((state) => state.plant.allPlants);

  const handleDeletePlant = (id) => {
    dispatch(deletePlantFromApi(plant.id));
    // ? Change user plant state ?

    navigate(`/plants`);
  };

  useEffect(() => {
    dispatch(fetchPlantById(id));
  }, []);

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

  const entriesDesc = plant.entries.slice().sort((a, b) => b.id - a.id);

  return (
    <>
      <br />
      <br />
      <Box sx={{ width: "100%", maxWidth: "100%", marginTop: "2.5em" }}>
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
        <img className="img_deg" src={plant.image_url}></img>
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
            <Grid container item spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </Box>
        <br />
        <br />{" "}
        {user.admin === true ? (
          <Box display="flex" justifyContent="flex-start">
            <Link to={`/plants/${plant.id}/edit`}>
              <CommonButton>Edit Plant</CommonButton>
            </Link>
            <CommonButton
              style={{ marginLeft: "10px" }}
              onClick={() => handleDeletePlant(plant.id)}
            >
              Delete Plant
            </CommonButton>
          </Box>
        ) : null}
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
        <EntryTable entries={entriesDesc} comments={plant.comments} />
        <br />
        <br />
      </div>
    </>
  );
};

export default Plant;
