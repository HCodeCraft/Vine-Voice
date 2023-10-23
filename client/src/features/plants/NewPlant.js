import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmallPlantCard from "./SmallPlantCard";
import axios from "axios";
import { addPlantToApi } from "./plantSlice";
import { addEntryToApi } from "../entries/entriesSlice";
import { useDispatch, useSelector } from "react-redux";
import CommonButton from "../../common/CommonButton";
import {
  Container,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import HealthRating from "../../HealthRating";
import Unauthorized from "../../Unauthorized";

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
    image: "",
    plant_id: null,
    health: null,
    problems: [],
    open_to_advice: false,
  });
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

  const loggedInUser = useSelector((state) => state.user.loggedInUser);



  if (!loggedInUser){
    return (
      <Unauthorized/>
    )
  }

  const API_KEY = process.env.REACT_APP_API_KEY;

  const handleSelectedPlant = async (selectedPlant, index) => {
    setActiveCard(index);

    if (apiForm === false) {
      setPlant((prevPlant) => ({
        ...prevPlant,
        id: selectedPlant.id,
      }));
      setEntryForm(true);
    } else {
      setEntryForm(true);
      try {
        setPlant((prevPlant) => ({
          ...prevPlant,
          image_url: selectedPlant.default_image["thumbnail"],
          med_image_url: selectedPlant.default_image["medium_url"],
        }));

        const url = `https://perenual.com/api/species/details/${selectedPlant.id}?key=${API_KEY}`;
        const externalResponse = await axios.get(url);
        const apiPlant = externalResponse.data;

        await setPlant((prevPlant) => ({
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
    dispatch(addPlantToApi(plant));
  };

  const addEntry = (entry) => {
    dispatch(addEntryToApi(entry));
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

      if (myApiData.length === 0) {
        setApiForm(true);
        speciesListRequest();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const speciesListRequest = async () => {
    setResultForm(false);
    setApiForm(true);

    try {
      const url = `https://perenual.com/api/species-list?key=${API_KEY}&q=${searchName}`;
      const externalResponse = await axios.get(url);
      console.log("External API Data:", externalResponse.data.data);
      await setSpeciesList(externalResponse.data.data);

      // Eventually I want only the elements of speciesList that are not in myApiData

      // I want to have the entry form pop up after the user clicks "This is my plant~"
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    /// this will submit only the entry with the chosen plant id if the plant was in myApiData
    /// or this will submit the new api plant with my plant api attributes and the entry at the same time
    // if apiform == false, then we'll just add an enry (to the plant, using the id) otherwise, well add
    // both the plant and the entry at the same time

    if (apiForm == false) {
      // add entry with the plant id
      addEntry(entry);
    } else {
      // being sure to add the entry also as a combined post

      const newPlantWithEntry = {
        ...plant,
        entry,
      };

      addPlant(newPlantWithEntry);
    }

    // will I need to reload plant and user state or will redux to dit for me? 

  };

  useEffect(() => {
    console.log("plant from in UE", plant);
  }, [plant]);

  return (
    <Container>
      <section>
        <br />
        <Typography variant="h4">Search for a Plant</Typography>
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
          {resultForm && myApiData.length > 0 && (
            <>
              <div className="none_btn_box">
                <CommonButton
                  size="small"
                  variant="contained"
                  onClick={() => speciesListRequest()}
                >
                  None of these are my plant
                </CommonButton>
              </div>
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
            </>
          )}
          <br />
          {apiForm &&
            speciesList.length > 0 &&
            speciesList.map((p_plant, index) => (
              <SmallPlantCard
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
        </div>
      </section>
      <br />
      <div className="entry_box">
        {entryForm === true ? (
          <>
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
              <Button variant="contained" component="label" color="primary">
                {" "}
                Upload a picture
                <input type="file" hidden />
              </Button>
              <br />
              <div className="health_box">
                <Typography variant="h6">Health Rating</Typography>
                <HealthRating
                  rating={entry.health}
                  changeRating={changeRating}
                />
              </div>
              <br />
              <TextField
                label="Problems (separate with a ',')"
                name="problems"
                variant="outlined"
                color="secondary"
                onChange={handleEntryChange}
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
          </>
        ) : null}
        <br />
        <br />
      </div>
    </Container>
  );
};

export default NewPlant;
