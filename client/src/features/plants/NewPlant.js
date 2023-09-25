import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SmallPlantCard from "./SmallPlantCard";
import axios from "axios";

const NewPlant = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
  const [resultForm, setResultForm] = useState(false);
  const [apiForm, setApiForm] = useState(false);
  const [myApiData, setMyApiData] = useState([])

  const onSearchNameChanged = (e) => setSearchName(e.target.value);

  const onSearchClick = (e) => {
    e.preventDefault();
    setResultForm(true);
// Do fetch to my backend search with the searchName in the url params
 axios.get(`http://localhost:3000/search.json?q=${searchName}`)
 .then((response) => {
  console.log("data", response.data)
  setMyApiData(response.data)
 })
 .catch((error) => {
  console.error("error", error)
 })
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
          myApiData.map((plant) => (
            <SmallPlantCard
              commonName={plant.common_name}
              sciName={plant.scientific_name}
              image_url={plant.image_url}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default NewPlant;

