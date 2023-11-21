import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@mui/material";

const LoginForm = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 280,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };

  return (
    <Grid>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar sx={{ backgroundColor: "#FFD600" }}>🌺</Avatar>
          <h2>Sign In</h2>
        </Grid>
        <TextField
          label="Username"
          placeholder="Enter Username"
          fullWidth
          required
          value={username}
          onChange={(e) => handleChange(e)}
          name="username"
          style={{ marginBottom: "1em" }}
        />
        <TextField
          label="Password"
          placeholder="Enter Password"
          type="password"
          fullWidth
          required
          value={password}
          onChange={(e) => handleChange(e)}
          name="password"
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
};

export default LoginForm;
