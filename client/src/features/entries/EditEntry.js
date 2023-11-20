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
import default_plant from "../../pictures/nopic.png";

const EditEntry = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [entry, setEntry] = useState({
    nickname: "",
    location: "",
    notes: "",
    picture: null,
    plant_id: Number(params.plant_id),
    health: null,
    problems: [],
    open_to_advice: false,
  });

  const [tags, setTags] = useState();

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default behavior of adding a line break in the input field.
      const value = e.target.value.trim();
      if (value) {
        setTags([...tags, value]);
        e.target.value = "";
        setEntry({ ...entry, problems: [...entry.problems, value] });
      }
    }
  };

  console.log("entry", entry);

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

  const allPlants = useSelector((state) => state.plant.allPlants);

  const plant = allPlants.find((plant) => plant.id === apiEntry.plant_id);

  useEffect(() => {
    setEntry(apiEntry);
    setTags(apiEntry.problems);
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

    for (const key in entry) {
      if (entry[key] !== null) {
        if (key === "problems" && Array.isArray(entry[key])) {
          entry[key].forEach((problem) => {
            updatedEntry.append("entry[problems][]", problem);
          });
        } else {
          updatedEntry.append(`entry[${key}]`, entry[key]);
        }
      }
    }

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
      <Box sx={boxStyle} style={{ marginBottom: "10px", marginTop: "4em" }}>
        <Typography
          variant="h5"
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          Edit Your Entry for:
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
            className="classes-field"
            value={entry.nickname}
            onChange={handleEntryChange}
          />

          <Typography variant="h5" style={{ marginTop: "1em" }}>
            the {plant.common_name}
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "1em" }}>
            from {entry.create_date}
          </Typography>

          <img
            className="entry_pic"
            src={
              entry.picture instanceof File
                ? URL.createObjectURL(entry.picture)
                : entry.picture || default_plant
            }
            alt="Entry"
          />
          <Typography variant="h6" style={{ marginTop: ".75em" }}>
            Change Picture:
          </Typography>
          <input
            className="file-input"
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
          <TextField
            label="Location"
            name="location"
            variant="outlined"
            color="secondary"
            className="classes-field"
            value={entry.location}
            onChange={handleEntryChange}
          />
          <TextField
            label="Notes"
            name="notes"
            variant="outlined"
            color="secondary"
            style={{ marginTop: "2em", marginBottom: "2em" }}
            multiline
            rows={10}
            columns={12}
            value={entry.notes}
            onChange={handleEntryChange}
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

          <CommonButton onClick={handleSubmit}>Submit</CommonButton>
        </form>
      </Box>
    </>
  );
};

export default EditEntry;
