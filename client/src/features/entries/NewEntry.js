import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../common/CommonButton";
import {
  Container,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import HealthRating from "../../HealthRating";
import { useParams, useNavigate } from "react-router-dom";
import { addEntryToApi } from "./entriesSlice";
import { addPlantToUser } from "../users/userSlice";
import { addEntryToPlant } from "../plants/plantSlice";

// I have a feeling i'll need to update plant state so it will have the entry, using useSelector
// and useEffect probably

// Maybe have a reminder of what kind of plant you're making an entry about

const NewEntry = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    nickname: "",
    location: "",
    notes: "",
    image: "",
    plant_id: Number(params.plant_id),
    health: null,
    problems: [],
    open_to_advice: false,
  });

  // Testing

  //

  const handleEntryChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setEntry({
      ...entry,
      [e.target.name]: value,
    });
  };

  const changeRating = (num) => {
    setEntry({ ...entry, health: num });
  };


  const handleSubmit =  (e) => {
    e.preventDefault();

   dispatch(addEntryToApi(entry))
   .then(() => dispatch(addEntryToPlant()))
   .then(() => dispatch(addPlantToUser()))
   // Make an asyncthunk in users that would go into state and get the right plant
   // and add it to user's plants on fulfilled

    // have plants loaded in, find the plant the entry is on, then dispatch something to 
    // push that to the loggedInUser's plants array
    navigate(`/plants/${entry.plant_id}`);
  };

  const boxStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
  };

  return (
    <>
      <br />
      <br />
      <Box sx={boxStyle}>
        <Typography variant="h5">Your Plant's Details</Typography>
        <br />

        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Nickname"
            name="nickname"
            variant="outlined"
            color="secondary"
            className="classes-field"
            onChange={handleEntryChange}
          />
          <br />
          <br />
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            color="secondary"
            className="classes-field"
            onChange={handleEntryChange}
          />
          <br />
          <br />
          <TextField
            label="Notes"
            name="notes"
            variant="outlined"
            color="secondary"
            className="classes-field"
            multiline
            rows={10}
            columns={12}
            onChange={handleEntryChange}
          />
          <br />
          <br />
          <Button variant="contained" component="label" color="primary">
            {" "}
            Upload a picture
            <input type="file" hidden />
            {/* need to add an onchange to this */}
          </Button>
          <br />
          <br />
          <div className="health_box">
            <Typography variant="h6">Health Rating</Typography>
            <HealthRating rating={entry.health} changeRating={changeRating} />
          </div>
          <br />
          <TextField
            label="Problems (seperate with a ',')"
            name="problems"
            variant="outlined"
            color="secondary"
            className="classes-field"
            onChange={handleEntryChange}
          />
          <br />
          <br />
          <FormGroup>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Open to advice"
              name="open_to_advice"
              onChange={handleEntryChange}
            />
          </FormGroup>
          <br />
          <CommonButton onClick={handleSubmit}>Submit</CommonButton>
        </form>
      </Box>
    </>
  );
};

export default NewEntry;
