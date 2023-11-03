import React, { useState } from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Dialog,
  DialogContent,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useDispatch } from "react-redux";
import { registerUserInApi } from "./userSlice";
import { useNavigate } from "react-router-dom";

const CreateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
    ref,
  } = useForm();

  // To-Do
  // Get avatar/ image url working
  // redirect to user plants

  const onSubmit = (data) => {
    console.log("data from onSubmit", data);
    if (data.password !== data.password_confirmation) {
      alert("Passwords don't match");
      return;
    } else {
      data.email = data.email.toLowerCase();
      const newUser = new FormData();

      if (data.avatar && data.avatar[0]) {
        newUser.append("user[avatar]", data.avatar[0]);
      }

      newUser.append("user[username]", data.username);
      newUser.append("user[name]", data.name);
      newUser.append("user[password]", data.password);
      newUser.append("user[privacy]", data.privacy);
      newUser.append("user[email]", data.email);
      newUser.append("user[recieve_dev_emails]", data.recieve_dev_emails);
      newUser.append("user[password_confirmation]", data.password_confirmation);

      for (var pair of newUser.entries()) {
        console.log(pair[0] + "," + pair[1]);
      }
      dispatch(registerUserInApi(newUser));
      reset();
      navigate(`/users/plants`);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const paperStyle = {
    padding: 20,
    height: "100vh",
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
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Username"
              placeholder="Enter Username"
              fullWidth
              type="text"
              id="username"
              {...register("username", {
                required: "Username is required",
              })}
            />
            <p className="error_msg">{errors.username?.message}</p>
            <TextField
              label="E-mail"
              placeholder="Enter E-mail"
              fullWidth
              type="text"
              id="email"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email format",
                },
              })}
            />
            <p className="error_msg">{errors.email?.message}</p>
            <TextField
              label="First Name (optional)"
              placeholder="Enter First Name"
              fullWidth
              type="text"
              id="name"
              {...register("name")}
            />
            <br />
            <br />
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
            <TextField
              label="Password confirmation"
              placeholder="Enter Password Again"
              type="password"
              fullWidth
              id="password_confirmation"
              {...register("password_confirmation", {
                required: {
                  value: true,
                  message: "Password confirmation is required",
                },
              })}
            />
            <p className="error_msg">{errors.password_confirmation?.message}</p>
            <label htmlFor="avatar">Add Avatar from image</label>
            <Controller
              name="avatar"
              control={control}
              defaultValue={[]}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    id="avatar"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                    accept=".jpg, .jpeg, .png, .webp"
                  />
                  {errors.avatar && <span>{errors.avatar.message}</span>}
                </>
              )}
            />
            <br />
            <br />
            <Controller
              name="devEmails"
              control={control}
              defaultValue={false} // Initial value of the checkbox
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Recieve Developer Emails
                </label>
              )}
            />{" "}
            <br />
            <br />
            <Controller
              name="privacy"
              control={control}
              defaultValue={false} // Initial value of the checkbox
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Hide Email in Profile
                </label>
              )}
            />
            <br />
            <br />
            <div>
              <Button variant="contained" onClick={handleOpen}>
                Terms of Service
              </Button>
              <Dialog open={open} onClose={handleClose} maxWidth="md">
                <DialogContent>
                  <Typography variant="h4" align="center" gutterBottom>
                    Terms of Service
                  </Typography>
                  <ul className="list">
                    <li>
                      Be considerate, we're all trying to be good plant parents
                    </li>
                    <li>No posting sexual images or graphic violence</li>
                    <li>No hate speech</li>
                  </ul>
                  <Typography variant="h6" color="error" align="center">
                    Violation of these terms will result in the deletion of your
                    account
                  </Typography>
                  <Typography variant="h5" align="center" gutterBottom>
                    Please consult additional sources for edibility and
                    medicinal use information
                  </Typography>
                </DialogContent>
              </Dialog>
            </div>
            <br />
            <Controller
              name="agreeToTerms"
              control={control}
              defaultValue={false}
              rules={{
                required: {
                  value: true,
                  message: "You must agree to the terms and conditions",
                },
              }}
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />I agree to the terms and
                  conditions
                </label>
              )}
            />
            <p className="error_msg">{errors.agreeToTerms?.message}</p>
            <br />
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
