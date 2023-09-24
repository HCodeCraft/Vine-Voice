import React, { useState } from 'react';
import { useGetSpeciesListQuery, useGetPlantsQuery } from '../api/apiSlice';
import { useNavigate } from 'react-router-dom'

const NewPlant = () => {
  const navigate = useNavigate()

  const [searchName, setSearchName] = useState('');





  const onSearchNameChanged = (e) => setSearchName(e.target.value);

  const onSearchClick = (e) => {
    e.preventDefault()
    // search through my db for plant based on name, if not found search perenuals db - include a not listed listing
  }


  return (
    <section>
      <br/>
      <h2>Add a New Plant</h2>
      <br/>
      <form>
        <label htmlFor="commonName">Enter your plant's common name:</label>
        <input
          type="text"
          id="commonName"
          name="commonName"
          value={searchName}
          onChange={setSearchName}
        />
        <button type="button" onClick={onSearchClick}>
          Search!
        </button>
      </form>
</section>
  );
};

export default NewPlant;

