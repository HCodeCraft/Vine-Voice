import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Box, Typography, Grid } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import EntryTable from "../entries/EntryTable";
import { fetchPlantById } from "./plantSlice";
import { deletePlantFromApi } from "./plantSlice";
import { deleteUserPlant } from "../users/userSlice";
import Spinner from "../../Spinner";

const Plant = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const id = Number(params.id);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true)

  const user = useSelector((state) => state.user.loggedInUser);

  const plant = useSelector((state) => state.plant.individualPlant);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timeoutId); 
  }, []);

  const handleDeletePlant = (id) => {
    dispatch(deletePlantFromApi(plant.id));
    dispatch(deleteUserPlant(plant));

    navigate(`/plants`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchPlantById(id));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching plant:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  if (isLoading) {

    return <div className="margT2"><Spinner /></div>

  }

  if (!plant) {
    return <h2 className="margT2">Plant not found!</h2>;
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
      <Box
        sx={{
          width: "100%",
          maxWidth: "100%",
          marginTop: "4.5em",
          marginBottom: "2em",
        }}
      >
        <Typography variant="h4" align="center" style={{ marginTop: "1em" }}>
          {plant.common_name}
        </Typography>
        <Typography variant="h6" align="center">
          {plant.scientific_name}
        </Typography>
      </Box>
      <div className="pos_top margT2">
        <img className="img_deg margT3" alt='plant' src={plant.image_url}></img>
        <div className="text-box margT2">
          <p className="desc">{plant.description}</p>
        </div>
        <Box sx={{ flexGrow: 1, marginBottom: "2em" }}>
          <div className="button_box margT2 margB2">
            <p>Added on {plant.create_date}</p>
          </div>
          <Grid container spacing={1}>
            <Grid container item spacing={3}>
              <FormRow />
            </Grid>
          </Grid>
        </Box>
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
        <Box
          display="flex"
          justifyContent="flex-end"
          style={{ marginBottom: "1em" }}
        >
          <Link to={`/plants/${plant.id}/entries/new`}>
            <CommonButton>Add an Entry</CommonButton>
          </Link>
        </Box>
        <Typography variant="h5" align="center" style={{ marginBottom: "1em" }}>
          Latest {plant.entries.length > 1 ? "Entries" : "Entry"}
        </Typography>
        <EntryTable entries={entriesDesc} comments={plant.comments} />
        <div className="margB2"></div>
      </div>
    </>
  );
};

export default Plant;
