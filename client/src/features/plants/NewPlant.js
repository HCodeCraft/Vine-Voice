import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import SmallPlantCard from "./SmallPlantCard";
import axios from "axios";
import { addPlantToApi } from "./plantSlice";
import { addEntryToApi } from "../entries/entriesSlice";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../common/CommonButton";
import {
  Container,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import HealthRating from "../../HealthRating";
import Unauthorized from "../../Unauthorized";
import TagsInput from "../../TagsInput";
import { addPlantToUser } from "../users/userSlice";
import { addEntryToPlant } from "./plantSlice";

const NewPlant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchName, setSearchName] = useState("");
  const [resultForm, setResultForm] = useState(false);
  const [apiForm, setApiForm] = useState(false);
  const [entryForm, setEntryForm] = useState(false);
  const [myApiData, setMyApiData] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [activeCard, setActiveCard] = useState(null);
  const [entry, setEntry] = useState({
    nickname: "",
    location: "",
    notes: "",
    plant_id: null,
    health: null,
    open_to_advice: false,
    user_id: null,
    problems: [],
  });
  // took out problems: ""
  const [plant, setPlant] = useState({
    id: null, // not sure if I should have this < but otherwise how could I set it?
    common_name: "",
    scientific_name: "",
    image_url: "",
    med_image_url: "",
    description: "",
    water_rec: "",
    sunlight: [],
    indoor: false,
    cycle: "",
    poisonous_to_humans: false,
    poisonous_to_animals: false,
    edible: false,
    medicinal: false,
  });

  const [tags, setTags] = useState([]);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);



  useEffect(() => {
    console.log("entry.plant_id", entry.plant_id);
    console.log("selectedPlant.id", selectedPlant.id);
  }, [entry.plant_id, selectedPlant.id]);

  if (!loggedInUser) {
    return <Unauthorized />;
  }

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
  /// To Do
  //Add TabsInput to NewEntry area
  // change Entry to formdata

  ////

  const resetEntryAndPlant = () => {
    const defaultValues = {
      entry: {
        nickname: "",
        location: "",
        notes: "",
        plant_id: null,
        health: null,
        open_to_advice: false,
        problems: [],
      },
      plant: {
        id: null,
        common_name: "",
        scientific_name: "",
        image_url: "",
        med_image_url: "",
        description: "",
        water_rec: "",
        sunlight: [],
        indoor: false,
        cycle: "",
        poisonous_to_humans: false,
        poisonous_to_animals: false,
        edible: false,
        medicinal: false,
      },
    };

    setEntry({ ...defaultValues.entry });
    setPlant({ ...defaultValues.plant });
  };

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleSelectedPlant = async (selectedPlant, index) => {
    console.log("SelectedPlant from HSP", selectedPlant);
    setActiveCard(index);

    if (apiForm === false) {
      // If apiform is false
      console.log("apiform was false");

      setEntry({
        ...entry,
        plant_id: selectedPlant.id,
      });

      setPlant((prevPlant) => ({
        ...prevPlant,
        id: selectedPlant.id,
      }));
      setEntryForm(true);
    } else {
      // If apiform is true

      setEntryForm(true);
      try {
        setPlant((prevPlant) => ({
          ...prevPlant,
          image_url: selectedPlant.default_image.thumbnail,
          med_image_url: selectedPlant.default_image.medium_url,
        }));

        const url = `https://perenual.com/api/species/details/${selectedPlant.id}?key=${API_KEY}`;
        const externalResponse = await axios.get(url);
        const apiPlant = externalResponse.data;

        setPlant((prevPlant) => ({
          ...prevPlant,
          common_name: apiPlant.common_name,
          scientific_name: apiPlant.scientific_name[0],
          description: apiPlant.description,
          water_rec: apiPlant.watering,
          sunlight: apiPlant.sunlight[0],
          indoor: apiPlant.indoor,
          cycle: apiPlant.cycle,
          poisonous_to_humans: apiPlant.poisonous_to_humans,
          poisonous_to_animals: apiPlant.poisonous_to_pets,
          edible: apiPlant.edible_leaf,
          medicinal: apiPlant.medicinal,
        }));

        console.log("Plant from in axios thing", plant);
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  const addPlant = (plant) => {
    console.log("plant from addPlant", plant);
    dispatch(addPlantToApi(plant));

    /// NEEDS TO HAVE ENTRY DATA ??
  };

  const addEntry = (entry) => {
    // change to formdata
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
      .then(() => dispatch(addEntryToPlant()))
      .then(() => dispatch(addPlantToUser()));

    // resetEntryAndPlant()
    navigate(`/plants/${entry.plant_id}`);
  };

  const onSearchNameChanged = (e) => {
    setSearchName(e.target.value);
  };

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

  const onSearchClick = async (e) => {
    e.preventDefault();
    setResultForm(true);

    try {
      // First Axios request
      const localResponse = await axios.get(`/search.json?q=${searchName}`);
      console.log("Local API Data:", localResponse.data);
      setMyApiData(localResponse.data);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const speciesListRequest = async () => {
    console.log("SpeciesLisRequest was clicked");
    setResultForm(false);
    setApiForm(true);

    try {
      const url = `https://perenual.com/api/species-list?key=${API_KEY}&q=${searchName}`;
      const externalResponse = await axios.get(url);
      console.log("External API Data:", externalResponse.data.data);
      await setSpeciesList(externalResponse.data.data);

      // Eventually I want only the elements of speciesList that are not in myApiData
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      if (apiForm === false) {
        await addEntry(entry);
      } else {
        const newPlantWithEntry = {
          ...plant,
          entries_attributes: [entry], // Ensure entries_attributes is an array
        };
  
        console.log("newPlantWithEntry", newPlantWithEntry);
  
        const createdPlantWithEntry = await addPlant(newPlantWithEntry);
  
        console.log("createdPlantWithEntry", createdPlantWithEntry);
  
        let newPlantId;
  
        if (createdPlantWithEntry && createdPlantWithEntry.id) {
          newPlantId = createdPlantWithEntry.id;
        } else {
          console.error("Error: Unable to retrieve plant ID");
          return; // or throw an error, depending on your error-handling strategy
        }
  
        const updatedEntry = createdPlantWithEntry.entries.length > 0
          ? { ...createdPlantWithEntry.entries[0], plant_id: newPlantId }
          : null;
  
        console.log("updatedEntry", updatedEntry);
  
        if (updatedEntry) {
          await updateEntry(updatedEntry);
        }
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };
  

  return (
    <Container>
      <section>
        <Typography variant="h4" style={{ marginTop: "3em" }}>
          Search for a Plant
        </Typography>
        <br />
        <form>
          <label htmlFor="commonName">Enter your plant's common name:</label>
          <input
            type="text"
            id="commonName"
            name="commonName"
            value={searchName}
            onChange={onSearchNameChanged}
          />
          <button type="button" onClick={onSearchClick}>
            Search!
          </button>
        </form>
        <br />
        <div className="result">
          <>
            {myApiData.map((db_plant, index) => (
              <SmallPlantCard
                id={db_plant.id}
                key={db_plant.id}
                plant={db_plant}
                commonName={db_plant.common_name}
                sciName={db_plant.scientific_name}
                image_url={db_plant.image_url}
                handleSelectedPlant={handleSelectedPlant}
                activeCard={activeCard}
                selectedPlant={selectedPlant}
                index={index}
              />
            ))}
            {apiForm === false && resultForm === true && (
              <div className="none_btn_box">
                <CommonButton
                  size="small"
                  variant="contained"
                  onClick={() => speciesListRequest()}
                >
                  None of these are my plant my db
                </CommonButton>
              </div>
            )}
          </>

          <br />
          <div className="small-plant-card-container" />
          {apiForm &&
            speciesList.length > 0 &&
            speciesList.map((p_plant, index) => (
              <SmallPlantCard
                className="small-plant-card"
                plant={p_plant}
                commonName={p_plant.common_name}
                sciName={p_plant.scientific_name[0]}
                handleSelectedPlant={handleSelectedPlant}
                selectedPlant={selectedPlant}
                activeCard={activeCard}
                index={index}
                image_url={
                  p_plant.default_image
                    ? p_plant.default_image["thumbnail"] ===
                        "https://perenual.com/storage/image/upgrade_access.jpg" ||
                      p_plant.default_image["small_url"] ===
                        "https://perenual.com/storage/image/upgrade_access.jpg"
                      ? "https://louisville.edu/history/images/noimage.jpg/image"
                      : p_plant.default_image["thumbnail"]
                      ? p_plant.default_image["thumbnail"]
                      : p_plant.default_image["small_url"]
                      ? p_plant.default_image["small_url"]
                      : "https://louisville.edu/history/images/noimage.jpg/image"
                    : null
                }
              />
            ))}
          {apiForm && !resultForm && (
            <div className="noneBtnBox">
              <Link to={`/plants/none`}>
                <CommonButton size="large">
                  None of these are my plant after apidata
                </CommonButton>
              </Link>
            </div>
          )}
        </div>
      </section>
      <br />
      <div className="entry_box">
        {entryForm === true ? (
          <div className="entryBox">
            <Typography variant="h5">Your Plant's Details</Typography>
            <br />
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Nickname"
                name="nickname"
                variant="outlined"
                color="secondary"
                onChange={handleEntryChange}
              />
              <br />
              <TextField
                label="Location"
                name="location"
                variant="outlined"
                color="secondary"
                onChange={handleEntryChange}
              />
              <br />
              <TextField
                label="Notes"
                name="notes"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                onChange={handleEntryChange}
              />
              <br />
              <label htmlFor="picture">
                {" "}
                <Typography variant="h6">Add a Picture</Typography>
              </label>
              <br />
              <div className="health_box">
                <Typography variant="h6">Health Rating</Typography>
                <HealthRating
                  rating={entry.health}
                  changeRating={changeRating}
                />
              </div>
              <br />
              <Typography>Enter problems... press enter to add</Typography>
              <TagsInput
                tags={tags}
                handleTagsChange={handleTagsChange}
                removeTag={removeTag}
              />
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
              <CommonButton onClick={handleSubmit}>Submit</CommonButton>
            </form>
          </div>
        ) : null}
        <br />
        <br />
      </div>
    </Container>
  );
};

export default NewPlant;
