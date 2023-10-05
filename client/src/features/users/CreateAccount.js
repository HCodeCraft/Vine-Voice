import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  Dialog,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { DevTool } from '@hookform/devtools'

const CreateAccount = () => {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control, // Get the control object from useForm
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 400,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <>
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#4CAF50" }}>🌼</Avatar>
          <h2>Sign Up</h2>
        </Grid>
        <p aria-live="assertive"></p>
        <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
          type="text"
          id="username"
          {...register("username")}
        />
        <TextField
          label="E-mail"
          placeholder="Enter E-mail"
          fullWidth
          required
          type="text"
          id="email"
          {...register("email")}
        />
        <br />
        <TextField
          label="First Name (optional)"
          placeholder="Enter First Name"
          fullWidth
          type="text"
          id="first_name"
          {...register("first_name")}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
          id="password"
          {...register("password")}
        />
        <TextField
          label="Password confirmation"
          placeholder="Enter Password Confirmation"
          type="password"
          fullWidth
          required
          id="password_confirmation"
          {...register("password_confirmation")}
        />
   
        {/* NOT SURE HOW THIS WOULD WORK WITH REACT HOOK FORM <FormControlLabel
          control={<Checkbox checked={devEmails} onChange={handleChange} />}
          label="Recieve Developer Emails"
        /> */}
        <div>
          {/* <Button variant="contained" onClick={handleOpen}>
            Open Modal
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            title="Scrollable Modal Example"
          >
            {<p>Here is the terms of service</p>}
            <div style={{ height: "300px", overflowY: "auto" }}>
              {/* Scrollable content */}
            {/* </div>  */}
          {/* </Dialog> */}
        </div>
        <Button
          type="submit"
          color="primary"
          fullWidth
          variant="contained"
          style={btnstyle}
          onSubmit={handleSubmit}
        >
          Sign Up
        </Button>
</form>
      </Paper>
    </Grid>
<DevTool control={control} />
    </>
  );
};

export default CreateAccount;
