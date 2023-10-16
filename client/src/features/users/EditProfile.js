import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import CommonButton from '../../common/CommonButton';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const currentUser = useSelector((state) => state.user.loggedInUser);

  const [user, setUser] = useState({
    username: '',
    name: '',
    image: '',
    email: '',
    receive_dev_emails: false,
    status: '',
  });

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [currentUser]);

  const boxStyle = {
    backgroundColor: '#f5f5f5',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
  };

  const handleUserChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <>
      <br />
      <br />
      <Container maxWidth="md">
        <Box sx={boxStyle}>
          <Typography variant="h5">Edit My User Details</Typography>
          <br/>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Box mb={2}> {/* Add margin bottom */}
              <Button variant="contained" component="label" color="primary">
                Change Profile Picture
                <input type="file" hidden />
              </Button>
            </Box>
            <br/>
            <Box mb={2}> {/* Add margin bottom */}
              <TextField
                label="Username"
                name="username"
                variant="outlined"
                color="secondary"
                fullWidth
                value={user.username}
                onChange={handleUserChange}
              />
            </Box>
            <Box mb={2}> {/* Add margin bottom */}
              <TextField
                label="Name"
                name="name"
                variant="outlined"
                color="secondary"
                fullWidth
                value={user.name}
                onChange={handleUserChange}
              />
            </Box>
            <Box mb={2}> {/* Add margin bottom */}
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
            <Box mb={2}> {/* Add margin bottom */}
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
            <Box mb={2}> {/* Add margin bottom */}
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Receive Dev Emails"
                  name="receive_dev_emails"
                  onChange={handleUserChange}
                />
              </FormGroup>
            </Box>
            <CommonButton onClick={handleSubmit}>Submit</CommonButton>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default EditProfile;


