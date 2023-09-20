import React from "react";
import { useGetPlantsQuery } from "./plantsSlice";

const AllPlants = () => {
  // const orderedPlantIds = useSelector(selectPlantIds);

  const {
    data: plants,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPlantsQuery();

  let content;
  if (isLoading) {
    content = <p>Loading...</p>; // You can replace this with a loading spinner
  } else if (isSuccess) {
    content = plants.ids.map((plantId) => <p key={plantId}>{plantId}</p>);
  } else if (isError) {
    content = <p>Error: {error.message}</p>;
  }

  return <div>{content}</div>;
};

export default AllPlants;
