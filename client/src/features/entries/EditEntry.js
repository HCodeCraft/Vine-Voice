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
import { updateEntryInApi } from "./entrySlice";
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
  const [formErrors, setFormErrors] = useState([]);
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
}



  const removeTag = (index) => {
    setTags((prevTags) => {
      const updatedTags = prevTags.filter((el, i) => i !== index);
      setEntry((prevEntry) => ({ ...prevEntry, problems: updatedTags }));
      return updatedTags;
    });
  };

  useEffect(() => {
    setEntry({ ...entry, problems: tags });
  }, [tags, entry]);

  const apiEntry = useSelector((state) => state.entry.individualEntry);

  const allPlants = useSelector((state) => state.plant.allPlants);

  const plant = allPlants.find((plant) => plant.id === apiEntry.plant_id);

  useEffect(() => {
    const updatedEntry = { ...apiEntry };

    delete updatedEntry.picture;

    setEntry(updatedEntry);

    setTags(apiEntry.problems);
  }, [apiEntry]);

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

    const excludedFields = [
      "create_date",
      "username",
      "user",
      "comments",
      "plant",
    ];

    for (const key in entry) {
      if (!excludedFields.includes(key)) {
        if (key === "problems") {
          if (Array.isArray(entry[key]) && entry[key].length > 0) {
            entry[key].forEach((problem) => {
              updatedEntry.append("entry[problems][]", problem);
            });
          } else {
            updatedEntry.append("entry[problems][]", []);
          }
        } else if (entry[key] !== null) {
          updatedEntry.append(`entry[${key}]`, entry[key]);
        }
      }
    }

    dispatch(updateEntryInApi({ entryId, updatedEntry })).then((action) => {
      if (updateEntryInApi.fulfilled.match(action)) {
        navigate(`/plants/${plant.id}/entries/${entryId}`);
      } else if (updateEntryInApi.rejected.match(action)) {
        const error = action.error.message;
        const errorObject = JSON.parse(error);
        const errors = errorObject.errors;
        setFormErrors(errors);
      }
    });
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
            the {plant?.common_name}
          </Typography>
          <Typography variant="h6" style={{ marginBottom: "1em" }}>
            from {entry.create_date}
          </Typography>

          <img
            className="entry_pic"
            src={
              entry.picture instanceof File
                ? URL.createObjectURL(entry.picture)
                : apiEntry.picture || default_plant
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
            style={{ marginTop: "2em" }}
            multiline
            rows={10}
            columns={12}
            value={entry.notes}
            onChange={handleEntryChange}
          />
          <p className="margB2">
            Your notes are currently {entry.notes.length} characters (20
            required)
          </p>

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
          {formErrors.length > 0 ? (
            <div className="errorDiv">
              <Typography variant="h6">Validation errors:</Typography>
              <ul className="errorUl">
                {formErrors.map((error) => (
                  <Typography key={error}>
                    <li style={{ marginBottom: "10px" }}>{error}</li>
                  </Typography>
                ))}
              </ul>
            </div>
          ) : null}

          <CommonButton onClick={handleSubmit}>Submit</CommonButton>
        </form>
      </Box>
    </>
  );
};

export default EditEntry;
