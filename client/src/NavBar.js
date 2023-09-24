import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

const NavBar = () => {
  return (
    <AppBar className="topbar" sx={{ textTransform: "none", background: "#81C784" }}>
      <Toolbar>
        <Typography>
          Vine Voice
        </Typography>
        <Tabs
          indicatorColor="primary"
        >
          <Tab
            sx={{ textTransform: "none" }}
            label="My Profile"
            component={Link}
            to={"/users/${id}"}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="My Plants"
            component={Link}
            to="/users/plants" 
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Add A Plant"
            component={Link}
            to="/plants/new" 
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Everyone's Plants"
            component={Link}
            to="/plants" 
          />
        </Tabs>
        <Button sx={{ textTransform: "none" }} variant="contained" >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
