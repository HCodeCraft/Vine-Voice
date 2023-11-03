import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../common/CommonButton";
import {
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import HealthRating from "../../HealthRating";
import { useParams, useNavigate } from "react-router-dom";
import { updateEntryInApi } from "./entriesSlice";
import TagsInput from "../../TagsInput";

const EditEntry = () => {
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

  const [tags, setTags] = useState(entry.problems);

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

  // Testing

  //

  /*** To Do
Make a space where the uploaded image will be displayed
Set up the image upload


  /****/

  const apiEntry = useSelector((state) => state.entry.individualEntry);
  console.log("apiEntry", apiEntry);

  const allPlants = useSelector((state) => state.plant.allPlants);

  const plant = allPlants.find((plant) => plant.id === apiEntry.plant_id);

  useEffect(() => {
    setEntry(apiEntry);
    console.log("entry from in UE", entry);
  }, []);

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
    const entryId = entry.id;
    const updatedEntry = new FormData();
    if (entry.picture) {
      updatedEntry.append("entry[picture]", entry.picture);
    }

    updatedEntry.append("entry[nickname]", entry.nickname);
    updatedEntry.append("entry[location]", entry.location);
    updatedEntry.append("entry[notes]", entry.notes);
    updatedEntry.append("entry[health]", entry.health);
    updatedEntry.append("entry[problems]", entry.problems);
    updatedEntry.append("entry[open_to_advice]", entry.open_to_advice);
    updatedEntry.append("entry[plant_id]", entry.plant_id);

    for (var pair of updatedEntry.entries()) {
      console.log(pair[0] + "," + pair[1]);
    }

    dispatch(updateEntryInApi({ entryId, updatedEntry }));
    // what kind of state needs to be updated? IndividualEntry, allEntries, IndividualPlant.entry
    // replacing the stuff

    navigate(`/plants/${plant.id}`);
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
          Edit Your Entry for:
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
            value={entry.nickname}
            onChange={handleEntryChange}
          />
          <br />
          <br />
          <Typography variant="h5">the {plant.common_name}</Typography>
          <Typography variant="h6">from {entry.create_date}</Typography>
          <br />
          <img
            className="entry_pic"
            src={
              entry.picture instanceof File
                ? URL.createObjectURL(entry.picture)
                : entry.picture
            }
            alt="Entry"
          />
          <br />
          <Typography variant="h6">Change Picture:</Typography>
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
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            color="secondary"
            className="classes-field"
            value={entry.location}
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
            value={entry.notes}
            onChange={handleEntryChange}
          />
          <br />
          <br />

          <br />
          <br />
          <div className="health_box">
            <Typography variant="h6">Health Rating</Typography>
            <HealthRating rating={entry.health} changeRating={changeRating} />
          </div>
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
              control={
                <Checkbox
                  checked={entry.open_to_advice}
                  onChange={handleEntryChange}
                  name="open_to_advice"
                />
              }
              label="Open to advice"
            />
          </FormGroup>
          <br />
          <CommonButton onClick={handleSubmit}>Submit</CommonButton>
        </form>
      </Box>
    </>
  );
};

export default EditEntry;
