import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { DevTool } from "@hookform/devtools";
import { fetchUserData, loginUser } from "./userSlice";
import { fetchAllPlants } from "../plants/plantSlice";
import { fetchAllEntries } from "../entries/entriesSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const indUser = useSelector((state) => state.reducer.user.loggedInUser);
  console.log("indUser", indUser)

  const state = useSelector((state) => state.reducer )

  const loggedIn = useSelector((state) => state.reducer.user.loggedIn)
  console.log("loggedIn", loggedIn)

  console.log("state", state)






  const submitForm = async (data) => {
    try {
      const action = await dispatch(loginUser(data));
      if (loginUser.fulfilled.match(action)) {
        dispatch(fetchAllPlants());
        dispatch(fetchAllEntries());
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  
// I think I might need to make this wait until the login finishes
useEffect(() => {
  if (loggedIn === true) {
    dispatch(fetchUserData());
  }
}, [loggedIn, dispatch]);


useEffect(() => {
  if (indUser) {
  navigate(`/users/${indUser.id}`)

}},[indUser])

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <>
    <br/>
    <br/>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={{ backgroundColor: "#FFD600" }}>🌺</Avatar>
            <h2>Sign In</h2>
          </Grid>
          <br />
          <p aria-live="assertive"></p>
          <form onSubmit={handleSubmit(submitForm)} noValidate>
            <TextField
              label="Username"
              placeholder="Enter Username"
              fullWidth
              type="text"
              id="username"
              {...register("username", {
                required: { value: true, message: "Username is required" },
              })}
            />
            <p className="error_msg">{errors.username?.message}</p>

            <TextField
              label="Password"
              placeholder="Enter Password"
              type="password"
              fullWidth
              id="password"
              {...register("password", {
                required: { value: true, message: "Password is required" },
              })}
            />
            <p className="error_msg">{errors.password?.message}</p>

            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              style={btnstyle}
            >
              Sign in
            </Button>
          </form>
          <br />
          <Typography>
            Do you have an account? <Link to={`/users/new`}>Sign Up</Link>
          </Typography>
          <br />
          <br />
        </Paper>
      </Grid>
      <DevTool control={control} />
    </>
  );
};

export default Login;
