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

const PlantCard = ({ commonName, image_url, sciName, description }) => {
  return (
    <Grid item xs={12} md={4} sm={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia sx={{ height: 140 }} image={image_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {commonName}
          </Typography>
          <Typography variant="subtitle1">{sciName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <CommonButton>Show More</CommonButton>
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
