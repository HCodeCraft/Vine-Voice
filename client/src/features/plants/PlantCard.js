import React from "react";
import {
  Grid,
  Card,
  Typography,
  Box,
  CardContent,
  CardMedia,
} from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PlantCard = ({
  commonName,
  image_url,
  sciName,
  short_description,
  id,
}) => {
  const plants = useSelector((state) => state.plant.allPlants);

  // still showing an entry after it's been deleted (from deleting a user)

  const plant = plants.find((plant) => plant.id === id);


  // getting the entries from allPlants



  return (
    <Grid item xs={12} sm={6} md={2} lg={2}>
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia sx={{ height: 200 }} image={image_url} />
        <CardContent
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {commonName}
          </Typography>
          <Typography variant="subtitle1">{sciName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {short_description}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              flexGrow: 1,
              alignItems: "center",
            }}
          >
            <div>
              <Typography variant="subtitle2">
                {plant?.entries?.length > 0
                  ? `${plant.entries.length} ${
                      plant.entries.length > 1 ? "entries" : "entry"
                    }`
                  : "no entries yet"}
              </Typography>
            </div>
            <br />
            <div>
              <Link to={`/plants/${id}`}>
                <CommonButton>Show More</CommonButton>
              </Link>
            </div>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PlantCard;
