import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";

const LoginPage = () => {
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name == "user") {
      setUser(e.target.value);
    } else {
      setPwd(e.target.value);
    }
  };

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = await login({ user, pwd }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPwd("");
      // navigate('/welcome')
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  const content = isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#FFD600" }}>🌺</Avatar>
          <h2>Sign In</h2>
        </Grid>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <TextField
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
          value={user}
          onChange={(e) => handleChange(e)}
          name="user"
          ref={userRef}
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
          Do you have an account?<Link href="">Sign up</Link>
        </Typography>
      </Paper>
    </Grid>
  );

  return content;
};

export default LoginPage;
