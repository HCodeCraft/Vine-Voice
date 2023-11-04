import React from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  Container,
  CardActionArea,
  CardContent,
  CardMedia,
  Button,
} from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

const PlantCard = ({
  commonName,
  image_url,
  sciName,
  short_description,
  id,
}) => {

  const plants = useSelector((state) => state.plant.allPlants)


  const plant = plants.find((plant) => plant.id === id)

  // const PlantEntries = plant.entries
  // plant is coming from allPlants 

// doesn't work to get entries from indPlant because there's only one plant that's indplant
// while multiple plants are shown on allPlants page
// I am getting the id, so I could fetch Plant by id but that would be a lot of fetches
 
  return (
    <Grid item xs={12} sm={6} md={2} lg={2} >
      <Card sx={{ maxWidth: 345, height: 600}}>
        <CardMedia sx={{ height: 200 }} image={image_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {commonName}
          </Typography>
          <Typography variant="subtitle1">{sciName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {short_description}
          </Typography>
          <Typography variant="subtitle2">
            {plant?.entries?.length > 1
              ? `${plant.entries?.length} entries`
              : `${plant.entries?.length} entry`}
          </Typography>
          <Link to={`/plants/${id}`}>
            <CommonButton>Show More</CommonButton>
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PlantCard;

// <Grid item xs={3}>
//   <Card>
//     <Box>
//       <Typography variant="h5">{commonName}</Typography>
//       <Typography variant="subtitle1">{sciName}</Typography>
//     </Box>
//     <img className="img" src={image_url}></img>
//   </Card>
// </Grid>
