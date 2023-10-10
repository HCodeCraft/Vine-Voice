import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Container,
} from "@mui/material";

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log("Userinfo from userProfile", userInfo);

  return userInfo ? (
    <Container>
      <Box>
        <br />
        <Typography variant='h4'>My Profile</Typography>
      </Box>
      <br />
      <Box>
        <Typography variant='h5'>Username: {userInfo.username}</Typography>
        <br />
        <Typography variant='h5'>Name: {userInfo.name}</Typography>
      </Box>
    </Container>
  ) : (
    <h1>UserInfo not loaded</h1>
  );
}

export default UserProfile;
