import React from "react";
import { useGetPlantsQuery } from "./plantsSlice";



const AllPlants = () => {
  const { data: plants, isLoading, isSuccess, isError, error } = useGetPlantsQuery();

  // Check if data is still loading
  if (isLoading) {
    return <p>Loading...</p>;
  }

  // Check if an error occurred
  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  // Check if data has loaded successfully
  if (isSuccess) {
    // Ensure 'plants' is not undefined before rendering
    if (plants) {
      const content = plants.map((plant) => (
        <p key={plant.id}>{plant.common_name}
        <img className="everyone_image" src={plant.image_url}></img></p>
      ));
      return (
        <div>
          <h2>All Plants</h2>
          {content}
        </div>
      );
    }
    // Handle the case where 'plants' does not have 'ids'
    return <p>No plant data available.</p>;
  }

  // Handle other cases (e.g., initial render)
  return null;
};

export default AllPlants;
