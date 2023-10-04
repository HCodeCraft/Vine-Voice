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

const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name == "user") {
      setUser(e.target.value);
    } else {
      setPwd(e.target.value);
    }
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#FFD600" }}>🌺</Avatar>
          <h2>Sign In</h2>
        </Grid>
        <p aria-live="assertive"></p>
        <TextField
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
          value={user}
          onChange={(e) => handleChange(e)}
          name="user"
        />
        <br />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
          value={pwd}
          onChange={(e) => handleChange(e)}
          name="pwd"
        />
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          style={btnstyle}
          onSubmit={handleSubmit}
        >
          Sign in
        </Button>
        <Typography>
          Do you have an account? <Link to={`/users/new`}>Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
