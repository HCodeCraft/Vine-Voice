import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CommonButton from "../../common/CommonButton";
import { useSelector, useDispatch } from "react-redux";
import { updateUserInApi } from "./userSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const currentUser = useSelector((state) => state.user.loggedInUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = currentUser.id;

  const [user, setUser] = useState({
    username: "",
    name: "",
    avatar: null,
    email: "",
    recieve_dev_emails: false,
    status: "",
    privacy: false,
  });
  const [error, setError] = useState([]);

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      console.log("currentUser", currentUser);
    }
  }, [currentUser]);

  // Testing

  /////

  const boxStyle = {
    backgroundColor: "#f5f5f5",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
    marginTop: "2.7em",
  };

  const handleUserChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const updateUser = async (editedUserId, editedUser) => {
    try {
      const response = await dispatch(
        updateUserInApi(editedUserId, editedUser)
      );
      if (response.payload) {
        console.log("Success:", response.payload);
        setError([]);
        navigate(`/users/${currentUser.id}`);
      } else {
        response.error
          ? (() => {
              const errorData = JSON.parse(response.error.message);
              setError(errorData.errors);
            })()
          : setError([]);

        console.log("Error from updateUser: after parse", error);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = new FormData();
    const initialUser = { ...currentUser };

    for (const key in user) {
      if (user[key] !== null && key !== "plants" && key !== "entries") {
        // Check if the value has changed from the initial user
        if (user[key] !== initialUser[key]) {
          console.log("something was changed");
          updatedUser.append(`user[${key}]`, user[key]);
        }
      }
    }
    updatedUser.append(`user[id]`, user.id);

    updateUser({ userId: userId, updatedUser });
  };

  useEffect(() => {
    console.log("error from UE", error);
  }, [error]);

  return (
    <>
      <Container maxWidth="md" style={{ marginTop: "2em" }}>
        <Box sx={boxStyle}>
          <Typography variant="h5" style={{ marginBottom: "1em" }}>
            Edit My User Details
          </Typography>

          <form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <Box mb={2}>
              <label htmlFor="avatar">Add Image for avatar</label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setUser({
                    ...user,
                    avatar: selectedFile,
                  });
                }}
              />
            </Box>
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              color="secondary"
              fullWidth
              value={user.username}
              onChange={handleUserChange}
              style={{ marginBottom: "2em" }}
            />
            <TextField
              label="Name"
              name="name"
              id="name"
              variant="outlined"
              color="secondary"
              fullWidth
              value={user.name}
              onChange={handleUserChange}
              style={{ marginBottom: "2em" }}
            />
            <Box mb={2}>
              <TextField
                label="Status"
                name="status"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                value={user.status}
                onChange={handleUserChange}
              />
            </Box>
            <Box mb={2}>
              <TextField
                label="Email"
                name="email"
                variant="outlined"
                color="secondary"
                fullWidth
                value={user.email}
                onChange={handleUserChange}
              />
            </Box>
            <input
              id="privacy"
              name="privacy"
              type="checkbox"
              checked={user.privacy}
              onChange={handleUserChange}
            />
            <label htmlFor="privacy">Hide Email on Profile</label>
            <Box mb={2}>
              <input
                id="receive_dev_emails"
                name="recieve_dev_emails"
                type="checkbox"
                checked={user.recieve_dev_emails}
                onChange={handleUserChange}
              />
              <label htmlFor="receive_dev_emails margB1">
                Receive Dev Emails
              </label>
            </Box>
            {error.length > 0 && (
              <div
                style={{ color: "red", fontWeight: "bold", marginTop: "10px" }}
              >
                <p>Validation errors:</p>
                <ul style={{ listStyle: "none", padding: "0" }}>
                  {error.map((errorMessage, index) => (
                    <li key={index}>{errorMessage}</li>
                  ))}
                </ul>
              </div>
            )}
            <CommonButton onClick={handleSubmit}>Submit</CommonButton>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default EditProfile;
