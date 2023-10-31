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

  const [user, setUser] = useState({
    username: "",
    name: "",
    image: "",
    email: "",
    recieve_dev_emails: false,
    status: "",
    privacy: false,
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
      console.log("currentUser", currentUser);
    }
  }, [currentUser]);

  // Testing
  useEffect(() => {
    console.log("user", user);
  }, [user]);

  /////

  const boxStyle = {
    backgroundColor: "#f5f5f5",
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
  };

  const handleUserChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const updateUser = (editedUserId, editedUser) => {
    dispatch(updateUserInApi(editedUserId, editedUser));
  };

  /// How do I need to change this to accomidate the image upload?

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const updatedUser = user;
  //   updateUser({ userId: currentUser.id, updatedUser });

  //   navigate(`/users/${user.id}`);
  //   // Handle form submission here
  //   // i'll use updateUserInApi and make sure there are extended reducers
  // };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("handleSubmit is running")
    const updatedUser = new FormData();

    if (user.image) {
      updatedUser.append("user[image]", user.image);
    }

    updatedUser.append("user[username]", user.username);
    updatedUser.append("user[name]", user.name);
    updatedUser.append("user[email]", user.email);
    updatedUser.append("user[recieve_dev_emails]", user.recieve_dev_emails);
    updatedUser.append("user[status]", user.status);
    updatedUser.append("user[privacy]", user.privacy);
    console.log("updatedUser in submit", updatedUser);
    for (var pair of updatedUser.entries() ){
      console.log(pair[0] + ',' + pair[1])

      // The slice isn't getting the updatedUser data 
    }
    updateUser({ userId: currentUser.id, updatedUser });

    navigate(`/users/${user.id}`);
    // Handle form submission here
    // i'll use updateUserInApi and make sure there are extended reducers
  };

  return (
    <>
      <br />
      <br />
      <Container maxWidth="md">
        <Box sx={boxStyle}>
          <Typography variant="h5">Edit My User Details</Typography>
          <br />

          <form noValidate autoComplete="off" onSubmit={() => handleSubmit} encType="multipart/form-data">
            <Box mb={2}>
              <label htmlFor="image">Add Avatar from image</label>
              <input
                type="file"
                name="image"
                id="image"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={(e) => {
                  const selectedFile = e.target.files[0];
                  setUser({
                    ...user,
                    image: selectedFile,
                  });
                }}
              />
            </Box>
            <br />
            <TextField
              label="Username"
              name="username"
              variant="outlined"
              color="secondary"
              fullWidth
              value={user.username}
              onChange={handleUserChange}
            />
            <br />
            <br />
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              color="secondary"
              fullWidth
              value={user.name}
              onChange={handleUserChange}
            />
            <br />
            <br />
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
              <label htmlFor="receive_dev_emails">Receive Dev Emails</label>
              <br />
            </Box>
            <CommonButton onClick={handleSubmit}>Submit</CommonButton>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default EditProfile;
