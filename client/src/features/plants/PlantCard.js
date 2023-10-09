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

const PlantCard = ({
  commonName,
  image_url,
  sciName,
  short_description,
  entries,
  id,
}) => {
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
            {short_description}
          </Typography>
          <Typography variant="subtitle2">
            {entries.length > 1
              ? `${entries.length} entries`
              : `${entries.length} entry`}
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
