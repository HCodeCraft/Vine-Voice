import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import CommonButton from "../../common/CommonButton";

const SmallPlantCard = ({ image_url, commonName, sciName, plant, id, handleSelectedPlant, index}) => {


  return (
    <Grid item xs={12} md={4} sm={4}>
      <Card sx={{ maxWidth: 200, height: 430 }}  >
        <CardMedia sx={{ height: 140 }} image={image_url} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {commonName}
          </Typography>

          <Typography variant="subtitle1">{sciName}</Typography>
        </CardContent>

        <div className="btnbox">
          <CommonButton variant="contained" className="result_btn" onClick={() => handleSelectedPlant(plant, index)}>
            This is it!
          </CommonButton>
        </div>
      </Card>
    </Grid>
  );
};

export default SmallPlantCard;
