import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmallPlantCard from "./SmallPlantCard";
import axios from "axios";
import CommonButton from "../../common/CommonButton";

const NewPlant = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [resultForm, setResultForm] = useState(false);
  const [apiForm, setApiForm] = useState(false);
  const [myApiData, setMyApiData] = useState([]);
  const [speciesList, setSpeciesList] = useState([]);
  const [entry, setEntry] = useState({
    nickname:"",
    location:"",
    notes:"",
    image:"",
    plant_id:null,
    health: 0,
    problems: [],
    open_to_advice: false,
  })
  const [plant, setPlant] = useState({
    id: null, // not sure if I should have this < but otherwise how could I set it?
    common_name:"",
    scientific_name:"", 
    image_url:"",
    med_image_url:"",
    description:"",
    water_rec:"",
    sunlight: [],
    indoor: false,
    cycle: "",
    poisonous_to_humans: false,
    poisonous_to_animals: false,
    edible: false,
    medicinal: false
  })

  const onSearchNameChanged = (e) => {
    setSearchName(e.target.value);
  };

  const onSearchClick = async (e) => {
    e.preventDefault();
    setResultForm(true);

    try {
      // First Axios request
      const localResponse = await axios.get(
        `http://localhost:3000/search.json?q=${searchName}`
      );
      console.log("Local API Data:", localResponse.data);
      setMyApiData(localResponse.data);

      if (!myApiData && apiForm === true) {
        speciesListRequest();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const speciesListRequest = async () => {
    setResultForm(false)
    console.log("speciesListRequest was triggered");
    const API_KEY = process.env.REACT_APP_API_KEY;
    setApiForm(true);
  
    try {
      const url = `https://perenual.com/api/species-list?key=${API_KEY}&q=${searchName}`;
      const externalResponse = await axios.get(url);
      console.log("External API Data:", externalResponse.data.data);
      await setSpeciesList(externalResponse.data.data);

      // Eventually I want only the elements of speciesList that are not in myApiData
// console.log("speciesList", speciesList)
// const mergedArray = [...myApiData, ...externalResponse.data.data];
// console.log("mergedArray", mergedArray)
// const uniqueArray = mergedArray.filter((value, index, self) => {
//   return self.findIndex(p => p.common_name === value.common_name) === index;
// })
// setSpeciesList(uniqueArray)

// console.log("uniqueArray", uniqueArray)


    } catch (error) {
      console.error("API Error:", error);
    }
  };
  

  return (
    <section>
      <br />
      <h2>Search for a Plant</h2>
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
            {myApiData.map((plant) => (
              <SmallPlantCard
                key={plant.id}
                commonName={plant.common_name}
                sciName={plant.scientific_name}
                image_url={plant.image_url}
              />
            ))}
          </>
        )}
        <br />
        {apiForm &&
          speciesList.length > 0 &&
          speciesList.map((plant) => (
            <SmallPlantCard
              id={plant.id}
              commonName={plant.common_name}
              sciName={plant.scientific_name[0]}
              image_url={ plant.default_image ?
                plant.default_image["thumbnail"]=== 'https://perenual.com/storage/image/upgrade_access.jpg' ||
                plant.default_image["small_url"]=== 'https://perenual.com/storage/image/upgrade_access.jpg'
                  ? 'https://louisville.edu/history/images/noimage.jpg/image'
                  : plant.default_image["thumbnail"]
                  ? plant.default_image["thumbnail"]
                  : plant.default_image["small_url"]
                  ? plant.default_image["small_url"]
                  : 'https://louisville.edu/history/images/noimage.jpg/image' : null
              }
            />
          ))}
      </div>
    </section>
  );
};

export default NewPlant;
