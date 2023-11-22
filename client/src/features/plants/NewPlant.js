import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import SmallPlantCard from "./SmallPlantCard";
import axios from "axios";
import { addPlantToApi } from "./plantSlice";
import {
  addEntryToApi,
  addEntryToAllAndIndState,
} from "../entries/entriesSlice";
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
import Spinner from "../../Spinner";
import { addPlantToUser } from "../users/userSlice";
import { addEntryToPlant } from "./plantSlice";

const NewPlant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const pageEndRef = useRef(null);
  const [searchName, setSearchName] = useState("");
  const [searchBar, setSearchBar] = useState(true);
  const [showSpinner, setShowSpinner] = useState(false);
  const [resultForm, setResultForm] = useState(false);
  const [apiForm, setApiForm] = useState(false);
  const [entryForm, setEntryForm] = useState(false);
  const [myApiData, setMyApiData] = useState([]);
  const [noResultButton, setNoResultButton] = useState(false);
  const [triggerTimeout, setTriggerTimeout] = useState(false);
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
    entries: [],
  });

  const [tags, setTags] = useState([]);

  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const allPlants = useSelector((state) => state.plant.allPlants);
  const indEntry = useSelector((state) => state.entry.individualEntry);
  // how do I set the entry in NewEntry? addEntryToApi(newEntry)


  //// Testing
useEffect(()=> {
console.log("SelectedPlant", selectedPlant)
}, [selectedPlant])

  ////

  useEffect(() => {
    console.log("myApiData.length", myApiData?.length);
    const timer = setTimeout(() => {
      if (myApiData.length === 0) {
        setShowSpinner(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [myApiData]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (myApiData.length === 0 && availPlants.length === 0 && apiForm) {
        setNoResultButton(true);
        setShowSpinner(false);
      }
    }, 3000);

    // Clear the timeout if the component unmounts or the dependency changes
    return () => clearTimeout(timeoutId);
  }, [myApiData, speciesList]);

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

  useEffect(() => {
    console.log("showSpinner", showSpinner);
  }, [showSpinner]);

  const removeTag = (index) => {
    setTags(tags.filter((el, i) => i !== index));
  };

  const resetPage = () => {
    setSearchName("");
    setSearchBar(true);
    setShowSpinner(false);
    setResultForm(false);
    setApiForm(false);
    setEntryForm(false);
    setMyApiData([]);
    setNoResultButton(false);
    setTriggerTimeout(false);
    setSpeciesList([]);
    setSelectedPlant("");
    setActiveCard(null);

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

        pageEndRef.current &&
          pageEndRef.current.scrollIntoView({ behavior: "smooth" });
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  const addPlant = (plant) => {
    dispatch(addPlantToApi(plant))
      .then((action) => {
        // Log the data from the action
        console.log("Data after addPlantToApi dispatch:", action.payload);

        const entry = action.payload.plant.entries[0];
        dispatch(addEntryToAllAndIndState(entry));
        dispatch(addPlantToUser());
      })
      .catch((error) => {
        // Handle error if needed
        console.error("Error adding plant:", error);
      });
  };

  const addEntry = (entry) => {
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
    setSearchBar(false);

    try {
      // First Axios request
      const localResponse = await axios.get(`/search.json?q=${searchName}`);
      console.log("Local API Data:", localResponse.data);
      setMyApiData(localResponse.data);
      setTriggerTimeout(true);
    } catch (error) {
      console.log("There was an error with onSearchClick", error);
    }
  };

  useEffect(() => {
    let timeoutId;

    if (triggerTimeout && myApiData.length === 0) {
      timeoutId = setTimeout(() => {
        speciesListRequest();
        setTriggerTimeout(false);
      }, 3000);
    }

    // Clear the timeout if the component unmounts or myApiData changes
    return () => clearTimeout(timeoutId);
  }, [myApiData, triggerTimeout]);

  // maybe do something similar for the duration of the spinner
  // for between when SpeciesListRequest is clicked and speciesList.length ==0
  //

  const speciesListRequest = async () => {
    console.log("SpeciesListRequest was clicked");
    setResultForm(false);
    setApiForm(true);
    /// just added
    setShowSpinner(true);
    ///////

    try {
      const url = `https://perenual.com/api/species-list?key=${API_KEY}&q=${searchName}`;
      const externalResponse = await axios.get(url);
      console.log("External API Data:", externalResponse.data.data);
      await setSpeciesList(externalResponse.data.data);

      // just added
      speciesList.length > 0
        ? setShowSpinner(false)
        : setTimeout(() => setShowSpinner(true), 3000);
      //// just added

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
        const newPlant = {
          ...plant,
          entries_attributes: [entry], // Ensure entries_attributes is an array
        };

        const createdPlantWithEntry = await addPlant({ newPlant });

        // add Entry to plant?
        /// how would I get the id of the created plant???

        navigate(`/users/plants`);
      }
    } catch (error) {
      console.error("Submission Error:", error);
    }
  };

  const availPlants = speciesList.filter((p_plant) => 
  p_plant.default_image &&
  p_plant.default_image["thumbnail"] !== "https://perenual.com/storage/image/upgrade_access.jpg" &&
  p_plant.default_image["thumbnail"] !== null &&
  p_plant.default_image["small_url"] !== "https://perenual.com/storage/image/upgrade_access.jpg" &&
  p_plant.default_image["small_url"] !== null
);



  /// need to change the plants both 0 to my_api_plants and availPlants
  /// when no results still showing spinner

  return (
    <Container style={{marginBottom:'2em'}}>
      <section>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {" "}
          {searchBar ? (
            <>
              <Typography variant="h4" style={{ marginTop: "3em", marginBottom: "1em" }}>
                Search for a Plant
              </Typography>
              <form>
                <label htmlFor="commonName" className="editLabel">
                  Enter your plant's common name:
                </label>
                <input
                  type="text"
                  id="commonName"
                  className="inputText"
                  name="commonName"
                  value={searchName}
                  onChange={onSearchNameChanged}
                />
                <button
                  type="button"
                  className="search-btn"
                  onClick={onSearchClick}
                >
                  Search!
                </button>
              </form>
            </>
          ) : (
            <>
              <Typography variant="h4" style={{ marginTop: "3em", marginBottom:"1em" }}>
                You Searched for:
              </Typography>
              <div className="search-txt">
                <form>
                  <Typography variant="h4" style={{ marginRight: ".5em" }}>
                    {searchName}
                  </Typography>
                  <button
                    type="button"
                    className="search-btn"
                    onClick={resetPage}
                  >
                    Try again?
                  </button>
                </form>
              </div>
            </>
          )}
<div className="margB1"></div>
          {showSpinner === true && resultForm && myApiData.length === 0 ? (
            <Spinner />
          ) : null}
          {showSpinner === true &&
          !resultForm &&
          apiForm &&
          availPlants.length === 0 ? (
            <Spinner />
          ) : null}
          {/* 
          changed it from speciesList to availPlants 
          
          Maybe have a timeout on the spinner, maybe has a useEffect if show
        spinner is true after 3 seconds set it to false*/}
          {noResultButton ? (
            <div className="editBox">
              <Typography
                variant="h4"
                style={{ marginBottom: ".75em", marginTop: ".75em" }}
              >
                {" "}
                No Results, please try again or
              </Typography>
              <Link to={`/plants/none`}>
                <CommonButton size="large" style={{ fontSize: "1.5em" }}>
                  Request a new Plant
                </CommonButton>
              </Link>
              <Typography variant="h4" style={{ marginTop: ".75em" }}>
                {" "}
                in the database
              </Typography>
            </div>
          ) : null}
        </div>
        <div className="result">
          <>
            {apiForm === false
              ? myApiData.map((db_plant, index) => (
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
                ))
              : null}
            {apiForm === false &&
              resultForm === true &&
              myApiData.length > 0 && (
                <div className="none_btn_box">
                  {/* After my Db data */}
                  <CommonButton
                    size="small"
                    variant="contained"
                    onClick={() => speciesListRequest()}
                  >
                    None of these are my plant
                  </CommonButton>
                </div>
              )}
          </>
          <div className="small-plant-card-container" />
          {apiForm && speciesList && availPlants.length > 0 && (
            <>
            {/* const availPlants = speciesList.filter((p_plant) => p_plantdefault_image["thumbnail"] !== "https://perenual.com/storage/image/upgrade_access.jpg" )
            filter out the plants with p_plant.default_image["thumbnail"] ===
            "https://perenual.com/storage/image/upgrade_access.jpg"
            */}{
        
              availPlants.map((p_plant, index) => (
                <SmallPlantCard
                  key={p_plant.id}
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
              <div className="noneBtnBox">
                <Link to={`/plants/none`}>
                  {/* After api Data */}
                  <CommonButton size="large">
                    None of these are my plant
                  </CommonButton>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
  
      <div className="entry_box">
        {entryForm === true ? (
          <div className="entryBox">
            <Typography variant="h5" style={{marginBottom: '1em'}}>Your Plant's Details</Typography>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                label="Nickname"
                name="nickname"
                variant="outlined"
                color="secondary"
                onChange={handleEntryChange}
                style={{marginBottom:'1em'}}
              />
              <TextField
                label="Location"
                name="location"
                variant="outlined"
                color="secondary"
                onChange={handleEntryChange}
                style={{marginBottom:'1em'}}
              />
              <TextField
                label="Notes"
                name="notes"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                onChange={handleEntryChange}
                style={{marginBottom:'2em'}}
              />
              <div className="health_box margB1">
                <Typography variant="h6">Health Rating</Typography>
                <HealthRating
                  rating={entry.health}
                  changeRating={changeRating}
                />
              </div>
              <Typography>Enter problems... press enter to add</Typography>
              <TagsInput
                tags={tags}
                handleTagsChange={handleTagsChange}
                removeTag={removeTag}
              />
              <FormGroup className="margT1">
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
            <div ref={pageEndRef}></div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

export default NewPlant;
