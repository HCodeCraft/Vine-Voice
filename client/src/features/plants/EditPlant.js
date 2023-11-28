import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Restricted from "../../Restricted";
import Unauthorized from "../../Unauthorized";
import { updatePlantInApi } from "./plantSlice";

const EditPlant = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const apiPlant = useSelector((state) => state.plant.individualPlant);

  const user = useSelector((state) => state.user.loggedInUser);

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

  useEffect(() => setPlant(apiPlant), [apiPlant]);

  useEffect(() => {
    if (typeof plant.sunlight === "string") {
      const initialSelectedOptions = plant.sunlight.split(", ");
      setSelectedSunlightOptions(initialSelectedOptions);
    }
  }, [plant.sunlight]);

  if (!user) {
    return <Unauthorized />;
  }

  if (user.admin !== true) {
    return <Restricted />;
  }

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


  const onSavePlantClicked = (e) => {
    e.preventDefault();

    const plantId = apiPlant.id;
    const updatedPlant = plant;
    dispatch(updatePlantInApi({ plantId, updatedPlant }));

    navigate(`/plants/${plant.id}`);
  };

  return (
    <section className="editBox">
      <h2 className="margB1">Edit {apiPlant.common_name}</h2>
      <img className="img_deg" alt='plant' src={apiPlant.image_url}></img>
      <form className="editForm" onSubmit={onSavePlantClicked}>
        <div className="margB2"></div>
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
        <div className="margB2"></div>
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
        <div className="margB2"></div>
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
        <div className="margB2"></div>
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
        <div className="margB2"></div>
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
        <div className="margB2"></div>
        <label className="editLabel">Water Recommendation:</label>
        <div>
          <input
            type="radio"
            id="frequent"
            name="water_rec"
            value="frequent"
            checked={plant.water_rec === "frequent"}
            onChange={handlePlantChange}
          />
          <label htmlFor="frequent" className="inputText">
            Frequent
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="average"
            name="water_rec"
            value="average"
            checked={plant.water_rec === "average"}
            onChange={handlePlantChange}
          />
          <label htmlFor="average" className="inputText">
            Average
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="minimum"
            name="water_rec"
            value="minimum"
            checked={plant.water_rec === "minimum"}
            onChange={handlePlantChange}
          />
          <label htmlFor="minimum" className="inputText">
            Minimum
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="none"
            name="water_rec"
            value="none"
            checked={plant.water_rec === "none"}
            onChange={handlePlantChange}
          />
          <label htmlFor="none" className="inputText">
            None
          </label>
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="sunlight" className="editLabel">
            Sunlight
          </label>
          <div className="margB1"></div>
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
          <div className="margB1"></div>
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
          <div className="margB1"></div>
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
          <div className="margB1"></div>
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
        <div className="marginB2"></div>
        <label className="editLabel"> Edible</label>
        <input
          name="edible"
          type="checkbox"
          checked={plant.edible}
          onChange={handlePlantChange}
        ></input>
        <div className="marginB2"></div>
        <label className="editLabel">Indoor</label>
        <input
          name="indoor"
          type="checkbox"
          checked={plant.indoor}
          onChange={handlePlantChange}
        ></input>
        <div className="marginB2"></div>
        <label className="editLabel">Medicinal</label>
        <input
          name="medicinal"
          type="checkbox"
          checked={plant.medicinal}
          onChange={handlePlantChange}
        ></input>
        <div className="marginB2"></div>
        <label className="editLabel">Poisionous To Humans</label>
        <input
          name="poisonous_to_humans"
          type="checkbox"
          checked={plant.poisonous_to_humans}
          onChange={handlePlantChange}
        ></input>
        <div className="marginB2"></div>
        <label className="editLabel">Poisonous To Pets</label>
        <input
          name="poisonous_to_pets"
          type="checkbox"
          checked={plant.poisonous_to_pets}
          onChange={handlePlantChange}
        ></input>
        <div className="marginB2"></div>
        <label className="editLabel">Yearly Cycle</label>
        <select
          className="editLabel"
          name="cycle"
          onChange={handlePlantChange}
          value={plant.cycle}
        >
          <option></option>
          <option>Perennial</option>
          <option>Annual</option>
          <option>Biennial</option>
          <option>Biannual</option>
        </select>
        <div className="marginB2"></div>
        <button
          type="submit"
          className="save-btn"
        >
          {" "}
          Save
        </button>
      </form>
      <div className="marginB2"></div>
    </section>
  );
};

export default EditPlant;
