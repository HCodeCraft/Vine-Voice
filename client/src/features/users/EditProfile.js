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
  const error = useSelector((state) => state.user.error)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    name: "",
    avatar: null,
    email: "",
    recieve_dev_emails: false,
    status: "",
    privacy: false,
  });
  const [validationErrors, setValidationErrors] = useState([]);


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
      const response = await dispatch(updateUserInApi(editedUserId, editedUser));
      // Check if the request was successful
      if (response.payload) {
        // Request was successful, you can handle success as needed
        console.log("response.error", response.error)
   
      } else if (response.error) {
        // Request had errors, set the validation errors in the state
        console.log("response.error", response.error)
      }
    } catch (error) {
      // Handle any unexpected errors here
      console.error("Error updating user:", error);
    }
  };
  



  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedUser = new FormData();

    for (const key in user) {
      if (user[key] !== null && key !== 'plants' && key !== 'entries') {
        updatedUser.append(`user[${key}]`, user[key]);
      }
    }
    

    for (var pair of updatedUser.entries() ){
      console.log(pair[0] + ',' + pair[1])
    }
    updateUser({ userId: currentUser.id, updatedUser });

    navigate(`/users/${user.id}`);

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
              id='name'
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
        {validationErrors.length > 0 && (
  <div>
    <p>Validation errors:</p>
    <ul>
      {error.map((error, index) => (
        <li key={index}>{error}</li>
      ))}
    </ul>
  </div>
)}
      </Container>
    </>
  );
};

export default EditProfile;
