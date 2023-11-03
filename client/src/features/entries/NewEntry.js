import React, { useState, useEffect } from "react";
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
import TagsInput from "../../TagsInput";

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
    picture: "",
    plant_id: Number(params.plant_id),
    health: null,
    problems: [],
    open_to_advice: false,
  });

  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    e.target.value = "";

    setEntry({ ...entry, problems: [...entry.problems, ...tags] });
  };
  

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  useEffect(() => {
    setEntry({ ...entry, problems: tags });
  }, [tags]);

  // Testing

  //

  const allPlants = useSelector((state) => state.plant.allPlants);

  const plant = allPlants.find((plant) => plant.id === Number(params.plant_id));

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

  const handleSubmit = (e) => {
    e.preventDefault();
  


    const newEntry = new FormData()

    if (entry.picture) {
      newEntry.append("entry[picture]", entry.picture);
    }

    newEntry.append("entry[nickname]", entry.nickname);
    newEntry.append("entry[location]", entry.location);
    newEntry.append("entry[notes]", entry.notes);
    newEntry.append("entry[health]", entry.health);
    newEntry.append("entry[problems]", entry.problems);
    newEntry.append("entry[open_to_advice]", entry.open_to_advice);
    newEntry.append("entry[plant_id]", entry.plant_id)

    for (var pair of newEntry.entries() ){
      console.log(pair[0] + ',' + pair[1])

      // The slice isn't getting the updatedUser data 
    }
    dispatch(addEntryToApi(newEntry))
      .then(() => dispatch(addEntryToPlant()))
      .then(() => dispatch(addPlantToUser()));

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
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Adding an Entry for your
        </Typography>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          {plant.common_name}
        </Typography>
        <br />

        <form
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
          className="editBox"
        >
          <TextField
            label="Nickname"
            name="nickname"
            variant="outlined"
            color="secondary"
            className="classes-field"
            onChange={handleEntryChange}
          />
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
          <label htmlFor="picture">
            {" "}
            <Typography variant="h6">Add Picture</Typography>
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            accept=".jpg, .jpeg, .png, .webp, .wdp"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setEntry({
                ...entry,
                picture: selectedFile,
              });
            }}
          />
          <br />
          <br />
          <div className="health_box">
            <Typography variant="h6">Health Rating</Typography>
            <HealthRating rating={entry.health} changeRating={changeRating} />
          </div>
          <br />
          <br />
          <Typography>Enter problems... press enter to add</Typography>
          <TagsInput
            tags={tags}
            handleKeyDown={handleKeyDown}
            removeTag={removeTag}
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
