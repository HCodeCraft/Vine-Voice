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
    problems: [],
    plant_id: Number(params.plant_id),
    health: null,
    open_to_advice: false,
  });

  const [tags, setTags] = useState([]);

  const handleTagsChange = (e) => {
    if (e.key !== "Enter") return;
    const value = e.target.value;
    if (!value.trim()) return;
    setTags([...tags, value]);
    setEntry({ ...entry, problems: [...entry.problems, value] }); 
    e.target.value = ""; 
  };


  

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  useEffect(() => {
    setEntry({ ...entry, problems: tags });
    console.log("entry.problems", entry.problems)
  }, [tags]);

  // Testing

  //

  const allPlants = useSelector((state) => state.plant.allPlants);

  const plant = allPlants.find((plant) => plant.id === Number(params.plant_id));



  const handleEntryChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setEntry({
      ...entry,
      [name]: newValue,
    });
  };

  const changeRating = (num) => {
    setEntry({ ...entry, health: num });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  const newEntry = new FormData();
  for (const key in entry) {
    if (entry[key] !== null) {
      if (key === 'problems' && Array.isArray(entry[key])) {
        entry[key].forEach((problem) => {
          newEntry.append('entry[problems][]', problem);
        });
      } else {
        newEntry.append(`entry[${key}]`, entry[key]);
      }
    }
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
    <br/>
    <br/>
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
            handleTagsChange={handleTagsChange}
            // handleKeyDown={handleKeyDown}
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
