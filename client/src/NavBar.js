import React, { useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState('')

  const handleTabClick = (event, value) => {
    setSelectedTab(value)
  }
  return (
    <AppBar className="topbar" sx={{ textTransform: "none", background: "#81C784" }}>
      <Toolbar>
        <Typography>
          Vine Voice
        </Typography>
        <Tabs
         indicatorColor="primary" value={selectedTab}
        >
          <Tab
            sx={{ textTransform: "none" }}
            label="My Profile"
            component={Link}
            to={"/users/${id}"} value={0}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="My Plants"
            component={Link}
            to="/users/plants" onClick={handleTabClick} value={1} 
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Add A Plant"
            component={Link}
            to="/plants/new" onClick={handleTabClick} value={2}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Everyone's Plants"
            component={Link}
            to="/plants" onClick={handleTabClick} value={3}
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
