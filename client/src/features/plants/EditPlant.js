import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { updatePlantInApi } from "./plantSlice";

const EditPlant = () => {
  const { plantId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiPlant = useSelector((state) => state.plant.individualPlant);
  console.log("apiPlant", apiPlant)


  // To Do
  // make a change handler for sunlight so multiple options are added to array
  // also get it so the original sunlight options are shown, maybe a textbox? So can standardize
  // add the editPlant function code
  // add the redirect to the plantpage
  // test if everything is working
  // figure out which state needs to change

  const [plant, setPlant] = useState({
    common_name: "",
    scientific_name: "",
    image_url: "",
    med_image_url: "",
    cycle: "",
    description: "",
    sunlight: "",
    edible: false,
    indoor: false,
    medicinal: false,
    poisonous_to_humans: false,
    poisonous_to_pets: false,
    water_rec: "",
  });
  const [selectedSunlightOptions, setSelectedSunlightOptions] = useState([]);

  // I want water rec to be a dropdown with the options

  useEffect(() => setPlant(apiPlant), []);


useEffect(() => {
  if (typeof plant.sunlight === 'string') {
    const initialSelectedOptions = plant.sunlight.split(", ");
    setSelectedSunlightOptions(initialSelectedOptions);
  }
}, [plant.sunlight]);


  const handlePlantChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setPlant({
      ...plant,
      [e.target.name]: value,
    });
  };

  const handleSunlightOptionChange = (e) => {
  const option = e.target.name;
  const updatedOptions = [...selectedSunlightOptions];


  if (e.target.checked) {
    updatedOptions.push(option);
  } else {
    const index = updatedOptions.indexOf(option);
    if (index !== -1) {
      updatedOptions.splice(index, 1);
    }
  }

  setPlant({
    ...plant,
    sunlight: updatedOptions.join(", "),
  });
};

  // const canSave = [common_name, scientific_name, image_url].every(Boolean) && !isLoading;

  const onSavePlantClicked = (e) => {
    e.preventDefault();
    const plantId = apiPlant.id
    const updatedPlant = plant
    dispatch(updatePlantInApi({plantId, updatedPlant}));


    // navigate(`/plants/${plant.id}`);
  };


  return (
    <section className="editBox">
      <h2>Edit {apiPlant.common_name}</h2>
      <img className="img_deg" src={apiPlant.image_url}></img>
      <form className="editForm" onSubmit={onSavePlantClicked}>
        <br />
        <br />
        <label htmlFor="common_name" className="editLabel">
          Common Name:
        </label>
        <textarea
          className="inputText"
          type="text"
          id="common_name"
          name="common_name"
          value={plant.common_name}
          onChange={handlePlantChange}
          rows={1}
          cols={60}
        />
        <br />
        <br />
        <label className="editLabel" htmlFor="scientific_name">
          Scientific Name:
        </label>
        <textarea
          className="inputText"
          type="text"
          id="scientific_name"
          name="scientific_name"
          value={plant.scientific_name}
          onChange={handlePlantChange}
          rows={1}
          cols={60}
        />
        <br />
        <br />
        <label className="editLabel" htmlFor="image_url">
          Image Url:
        </label>
        <textarea
          className="inputText editInput"
          id="image_url"
          name="image_url"
          value={plant.image_url}
          onChange={handlePlantChange}
          rows={2}
          cols={67}
        />
        <br />
        <br />
        <label className="editLabel" htmlFor="medImageUrl">
          Medium Image Url:
        </label>
        <textarea
          className="inputText"
          id="med_image_url"
          name="med_image_url"
          value={plant.med_image_url}
          onChange={handlePlantChange}
          rows={2}
          cols={58}
        />
        <br />
        <br />
        <label className="editLabel" htmlFor="description">
          Description:
        </label>
        <textarea
          className="inputText"
          id="description"
          name="description"
          value={plant.description}
          onChange={handlePlantChange}
          rows={5}
          cols={66}
        />
        <br />
        <br />
        <div>
          <label htmlFor="sunlight" className="editLabel">
            Sunlight
          </label>
          <br />
          <input
            type="checkbox"
            id="full_shade"
            name="full_shade"
            onChange={handleSunlightOptionChange}
            checked={selectedSunlightOptions.includes("full_shade")}
          />
          <label htmlFor="full_shade" className="inputText">
            Full Shade
          </label>
          <br />
          <input
            type="checkbox"
            id="part_shade"
            name="part_shade"
            value="part_shade"
            onChange={handleSunlightOptionChange}
            checked={selectedSunlightOptions.includes("part_shade")}
          />
          <label htmlFor="part_shade" className="inputText">
            Part Shade
          </label>
          <br />
          <input
            type="checkbox"
            id="sun-part_shade"
            name="sun-part_shade"
            value="sun-part_shade"
            onChange={handleSunlightOptionChange}
            checked={selectedSunlightOptions.includes("sun-part_shade")}
          />
          <label htmlFor="sun-part_shade" className="inputText">
            Sun-Part Shade
          </label>
          <br />
          <input
            type="checkbox"
            id="full_sun"
            name="full_sun"
            value="full_sun"
            onChange={handleSunlightOptionChange}
            checked={selectedSunlightOptions.includes("full_sun")}
          />
          <label htmlFor="full_sun" className="inputText">
            Full Sun
          </label>
        </div>
        <br />
        <br />
        <label className="editLabel"> Edible</label>
        <input
        name="edible"
          type="checkbox"
          checked={plant.edible}
          onChange={handlePlantChange}
        ></input>
        <br />
        <br />
        <label className="editLabel">Indoor</label>
        <input
        name="indoor"
          type="checkbox"
          checked={plant.indoor}
          onChange={handlePlantChange}
        ></input>
        <br />
        <br />
        <label className="editLabel">Medicinal</label>
        <input
        name="medicinal"
          type="checkbox"
          checked={plant.medicinal}
          onChange={handlePlantChange}
        ></input>
        <br />
        <br />
        <label className="editLabel">Poisionous To Humans</label>
        <input
        name="poisonous_to_humans"
          type="checkbox"
          checked={plant.poisonous_to_humans}
          onChange={handlePlantChange}
        ></input>
        <br />
        <br />
        <label className="editLabel">Poisonous To Pets</label>
        <input
        name="poisonous_to_pets"
          type="checkbox"
          checked={plant.poisonous_to_pets}
          onChange={handlePlantChange}
        ></input>
        <br />
        <br />
        <label className="editLabel">Yearly Cycle</label>
        <select className="editLabel" name="cycle" onChange={handlePlantChange} value={plant.cycle}>
          <option></option>
          <option >Perennial</option>
          <option >Annual</option>
          <option >Biennial</option>
          <option >Biannual</option>
        </select>
        <br />
        <br />
        <button
          type="submit"
          // disabled={!canSave}
        > Save
</button>
      </form>
      <br />
      <br />
    </section>
  );
};

export default EditPlant;
