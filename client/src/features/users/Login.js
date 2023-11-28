import React, { useState, useEffect } from "react";
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
import { fetchUserData, loginUser, fetchAllUsers } from "./userSlice";
import { fetchAllPlants } from "../plants/plantSlice";
import { fetchAllEntries } from "../entries/entriesSlice";
import { fetchAllComments } from "../comments/commentSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [formErrors, setFormErrors] = useState([]);

  const loggedIn = useSelector((state) => state.user.loggedIn);

  const submitForm = async (data) => {
    try {
      const action = await dispatch(loginUser(data));
      action.error?.message && setFormErrors(action.error.message);


      if (loginUser.fulfilled.match(action)) {
        setFormErrors([]);
        await dispatch(fetchAllUsers());
        await dispatch(fetchAllPlants());
        await dispatch(fetchAllEntries());
        await dispatch(fetchAllComments());
        navigate(`/users/plants`);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    if (loggedIn === true) {
      dispatch(fetchUserData());
    }
  }, [loggedIn, dispatch]);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
    marginTop: "6em",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <>
      <Grid style={{ marginTop: "2em", marginBottom: "1em" }}>
        <Paper elevation={10} style={paperStyle}>
          <Grid align="center">
            <Avatar sx={{ backgroundColor: "#FFD600" }}>🌺</Avatar>
            <h2>Sign In</h2>
          </Grid>
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
          {formErrors.length > 0 ? (
            <div
              style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
            >
              <p>Validation errors:</p>
              <ul style={{ listStyle: "none", padding: "0" }}>
                <li>{formErrors}</li>
              </ul>
            </div>
          ) : null}
          <Typography style={{ marginBottom: "2em" }}>
            Do you have an account? <Link to={`/users/new`}>Sign Up</Link>
          </Typography>
        </Paper>
      </Grid>
      <DevTool control={control} />
    </>
  );
};

export default Login;
