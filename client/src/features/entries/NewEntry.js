import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../common/CommonButton";
import {
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import HealthRating from "../../HealthRating";
import { useParams, useNavigate } from "react-router-dom";
import { addEntryToApi } from "./entriesSlice";
import { addPlantToUser, updateUserPlant } from "../users/userSlice";
import TagsInput from "../../TagsInput";
import { addEntryToPlant } from "../plants/plantSlice";

const NewEntry = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    nickname: "",
    location: "",
    notes: "",
    picture: null,
    problems: [],
    plant_id: Number(params.plant_id),
    health: null,
    user_id: null,
    open_to_advice: false,
  });

  const [tags, setTags] = useState([]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value) {
        setTags([...tags, value]);
        e.target.value = "";
        setEntry({ ...entry, problems: [...entry.problems, value] });
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  useEffect(() => {
    setEntry({ ...entry, problems: tags });
  }, [tags, entry]);

  const allPlants = useSelector((state) => state.plant.allPlants);

  const plant = allPlants.find((plant) => plant.id === Number(params.plant_id));

  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    setEntry({ ...entry, user_id: loggedInUser.id });
  }, [loggedInUser, entry]);

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
        if (key === "problems" && Array.isArray(entry[key])) {
          entry[key].forEach((problem) => {
            newEntry.append("entry[problems][]", problem);
          });
        } else {
          newEntry.append(`entry[${key}]`, entry[key]);
        }
      }
    }

    dispatch(addEntryToApi(newEntry))
      .then((action) => {
        const specificPlant = plant;
        const isPlantInArray = loggedInUser.plants.some(
          (plant) => plant.id === specificPlant.id
        );
// if user has the plant already in their plants array, 
/// we'll just add the entry to the plant
        dispatch(addEntryToPlant());

        if (!isPlantInArray) {
          dispatch(addPlantToUser(specificPlant));
          /// if the plant isn't in the user's array, well add the plant
          // to the user
        } else {
          // if the plant is in the array 
          // we'll update the user's plant by adding the entry
          const newestEntry = action.payload;

          const specificPlantWithEntry = {
            ...specificPlant,
            entries: [...specificPlant.entries, newestEntry],
          };

          dispatch(updateUserPlant(specificPlantWithEntry));
        }
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });

    navigate(`/plants/${entry.plant_id}`);
  };

  const boxStyle = {
    backgroundColor: "#f5f5f5",
    padding: "20px",
    marginTop: "4em",
  };

  return (
    <>
      <Box sx={boxStyle}>
        <Typography variant="h5" style={{ textAlign: "center" }}>
          Adding an Entry for your
        </Typography>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "1em" }}
        >
          {plant.common_name}
        </Typography>
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
            style={{ marginBottom: "1em" }}
            onChange={handleEntryChange}
          />

          <TextField
            label="Location"
            name="location"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: "1em" }}
            onChange={handleEntryChange}
          />

          <TextField
            label="Notes"
            name="notes"
            variant="outlined"
            color="secondary"
            style={{ marginBottom: "1em" }}
            multiline
            rows={10}
            columns={12}
            onChange={handleEntryChange}
          />
          <label htmlFor="picture">
            {" "}
            <Typography variant="h6">Add a Picture</Typography>
          </label>
          <input
            type="file"
            name="picture"
            id="picture"
            className="margB2"
            accept=".jpg, .jpeg, .png, .webp, .wdp"
            onChange={(e) => {
              const selectedFile = e.target.files[0];
              setEntry({
                ...entry,
                picture: selectedFile,
              });
            }}
          />
          <div className="health_box">
            <Typography variant="h6">Health Rating</Typography>
            <HealthRating rating={entry.health} changeRating={changeRating} />
          </div>

          <Typography>Enter problems... press enter to add</Typography>
          <TagsInput
            tags={tags}
            handleKeyDown={handleKeyDown}
            removeTag={removeTag}
          />

          <FormGroup style={{ marginTop: "1em", marginBottom: "1em" }}>
            <FormControlLabel
              required
              control={<Checkbox />}
              label="Open to advice"
              name="open_to_advice"
              onChange={handleEntryChange}
            />
          </FormGroup>
          <CommonButton onClick={handleSubmit}>Submit</CommonButton>
        </form>
      </Box>
    </>
  );
};

export default NewEntry;
