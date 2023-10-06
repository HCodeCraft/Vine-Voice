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
import { userLogin } from "../auth/authActions";
import { DevTool } from "@hookform/devtools";

const Login = () => {
  const navigate = useNavigate();
  // const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const loading = useSelector((state) => state.auth.loading);
  const authError = useSelector((state) => state.auth.error);


  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  // IDK if I want this url still > What about user/:id ?
  // WHERE DOES USERINFO COME FROM?
  // useEffect(() => {
  //   if (userInfo) {
  //     navigate('/member-data')
  //   }
  // }, [navigate, userInfo])

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <>
      <Grid>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={{ backgroundColor: "#FFD600" }}>🌺</Avatar>
            <h2>Sign In</h2>
          </Grid>
          <br/>
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
            <p className='error_msg'>{errors.username?.message}</p>

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
            <p className='error_msg'>{errors.password?.message}</p>

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
          <br/>
          <Typography>
            Do you have an account? <Link to={`/users/new`}>Sign Up</Link>
          </Typography>
          <br />
          <br />
          {/* {error ? <div style={{ fontWeight: 'bold', border: '1px solid red', padding: '5px' }}>
  <Typography variant='h6'>Error Please enter a correct Username and Password</Typography>
</div>
 : null} */}
        </Paper>
      </Grid>
      <DevTool control={control} />
    </>
  );
};

export default Login;
