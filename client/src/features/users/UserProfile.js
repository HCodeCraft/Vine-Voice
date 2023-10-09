import React from 'react'
import { useDispatch, useSelector } from "react-redux";
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

const UserProfile = () => {

  const userInfo = useSelector((state) => state.user.userInfo)

console.log("Userinfo from userProfile", userInfo)
  return (
   <Container><Box><br/><Typography variant='h4'>My Profile</Typography></Box><br/><Box>
    <Typography variant='h5'>Username: {userInfo.username}</Typography><br/><Typography variant='h5'>Name: {userInfo.name}</Typography></Box></Container>
  )
}

export default UserProfile