import React, { useState } from 'react'
import {
  Container,
  Typography,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox, Box
} from "@mui/material";
import TextField from "@mui/material/TextField";
import CommonButton from "../../common/CommonButton";

const EditProfile = () => {

  const [user, setUser] = useState({
    username:"",
    name: "",
    image:"",
    email:"",
    receive_dev_emails: false,
    status:""
  })

  const boxStyle = {
    backgroundColor: "#f5f5f5", 
    padding: "20px",
  }



  const handleUserChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setUser({
      ...user,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

  }


  return (
<>
  <br />
  <br />
  <Box sx={boxStyle}>
    <Typography variant="h5">Edit My User Details</Typography>
    <br />
    <br/>
      <br/>

    <form noValidate autoComplete="off" onSubmit={handleSubmit}>
    <Button variant="contained" component="label" color="primary">
        {" "}
        Change Profile Picture
        <input type="file" hidden />
        {/* need to add an onchange to this */}
      </Button>
      <br/>
      <br/>
  
      <TextField
        label="Username"
        name="username"
        variant="outlined"
        color="secondary"
        className="classes-field"
        onChange={handleUserChange}
      />
      <br />
      <br />
      <TextField
        label="Name"
        name="name"
        variant="outlined"
        color="secondary"
        className="classes-field"
        onChange={handleUserChange}
      />
      <br />
      <br />
      <TextField
        label="Status"
        name="status"
        variant="outlined"
        color="secondary"
        className="classes-field"
        multiline
        rows={2}
        onChange={handleUserChange}
      />
      <br />
      <br />
      <TextField
        label="Email"
        name="email"
        variant="outlined"
        color="secondary"
        className="classes-field"
        onChange={handleUserChange}
      />
      <br />
      <br />
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label="Receive Dev Emails"
          name="receive_dev_emails"
          onChange={handleUserChange}
        />
      </FormGroup>
      <br />
      <CommonButton onClick={handleSubmit}>Submit</CommonButton>
    </form>
  </Box>
</>

  )
}

export default EditProfile