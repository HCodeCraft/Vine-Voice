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
  DialogActions,
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
  const [formErrors, setFormErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (!data.agreeToTerms) {
        alert("Please agree to the terms before submitting.");
        return;
      }

      if (data.password !== data.password_confirmation) {
        alert("Passwords don't match");
        return;
      }

      data.email = data.email.toLowerCase();
      const newUser = new FormData();

      Object.keys(data).forEach((key) => {
        const value = data[key];
      
        // Exclude 'agreeToTerms' key
        if (key !== 'agreeToTerms' && value !== null && value !== undefined) {
          if (key === 'avatar' && value[0] instanceof File) {
            // Handle file upload separately
            newUser.append(`user[${key}]`, value[0]);
          } else {
            // Append other form fields
            newUser.append(`user[${key}]`, value);
          }
        }
      });

      console.log("FormData entries:");

for (let pair of newUser.entries()) {
  console.log(pair[0] + ', ' + (pair[1] instanceof File ? pair[1].name : pair[1]));
}


      const action = await dispatch(registerUserInApi(newUser));

      if (registerUserInApi.fulfilled.match(action)) {
        setFormErrors([]);
        navigate(`/users/plants`);
      } else if (registerUserInApi.rejected.match(action)) {
        const error = action.error.message;
        const errorList = error.split(",");

        setFormErrors(errorList);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue("agreeToTerms", true);
    setOpen(false);
  };

  const paperStyle = {
    padding: 20,
    height: "100vh",
    width: 400,
    margin: "20px auto",
    marginTop: "6em",
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
          <p aria-live="assertive marginB1"></p>
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
              style={{marginBottom:'1em'}}
              fullWidth
              type="text"
              id="name"
              {...register("name")}
            />
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
            {formErrors.length > 0 ? (
              <div
                style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
              >
                <Typography variant="h6">Validation errors:</Typography>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  {formErrors.map((error) => (
                    <Typography key={error}>
                      <li style={{ marginBottom: "10px" }}>{error}</li>
                    </Typography>
                  ))}
                </ul>
              </div>
            ) : null}
            <p className="error_msg">{errors.password_confirmation?.message}</p>
            <label htmlFor="avatar" >Add Avatar from image</label>
            <div className="margB1"></div>
            <label htmlFor="avatar">Avatar:</label>
      <input
        type="file"
        id="avatar"
        className="margB1"
        onChange={(e) => {
          register("avatar", { value: e.target.files[0], required: "File is required" });
        }}
        accept=".jpg, .jpeg, .png, .webp"
      />
      {errors.avatar && <span>{errors.avatar.message}</span>}
                        <div className="margB1"></div>
            <Controller
              name="recieve_dev_emails"
              control={control}
              defaultValue={false} // Initial value of the checkbox
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Recieve Developer Emails
                </label>
              )}
            />
  <div className="margB1"></div>
            <Controller
              name="privacy"
              className="margB2"
              control={control}
              defaultValue={false} // Initial value of the checkbox
              render={({ field }) => (
                <label>
                  <input type="checkbox" {...field} />
                  Hide Email in Profile
                </label>
              )}
            />
              <div className="margB1"></div>
            <div className="margB1">
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
                <DialogActions>
                  <Button
                    autoFocus
                    onClick={handleClose}
                    sx={{
                      fontSize: "1.5rem",
                      padding: "15px",
                      margin: "10px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Agree
                  </Button>
                  <Button
                    onClick={() => setOpen(false)}
                    sx={{
                      fontSize: "1.5rem",
                      padding: "15px",
                      margin: "10px",
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
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
                <>
                  <input
                    type="checkbox"
                    {...field}
                    style={{ display: "none" }}
                  />
                </>
              )}
            />
            <p className="error_msg margB1">{errors.agreeToTerms?.message}</p>
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              style={btnstyle}
              // onSubmit={handleSubmit(onSubmit)}
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
