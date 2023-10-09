import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { logoutUser } from "./features/auth/authSlice";
import { resetCredentials } from "./features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState(0); // Initialize with the default tab index
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Update the selected tab based on the current URL
    if (location.pathname === `/users/current`) {
      setSelectedTab(0);
    } else if (location.pathname === "/users/plants") {
      setSelectedTab(1);
    } else if (location.pathname === "/plants/new") {
      setSelectedTab(2);
    } else if (location.pathname === "/plants") {
      setSelectedTab(3);
    }
    // Add more conditions as needed for other routes
  }, [location.pathname]);

  const handleTabClick = (event, value) => {
    setSelectedTab(value);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetCredentials());
    navigate("/");
  };

  return (
    <AppBar
      className="topbar"
      sx={{ textTransform: "none", background: "#81C784" }}
    >
      <Toolbar>
        <Typography variant="h4">Vine Voice</Typography>
        <Tabs indicatorColor="primary" value={selectedTab}>
          <Tab
            sx={{ textTransform: "none" }}
            label="My Profile"
            component={Link}
            to={`/users/current`}
            value={0}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="My Plants"
            component={Link}
            to="/users/plants"
            onClick={handleTabClick}
            value={1}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Add A Plant"
            component={Link}
            to="/plants/new"
            onClick={handleTabClick}
            value={2}
          />
          <Tab
            sx={{ textTransform: "none" }}
            label="Everyone's Plants"
            component={Link}
            to="/plants"
            onClick={handleTabClick}
            value={3}
          />
        </Tabs>
        <Button
          sx={{ textTransform: "none" }}
          variant="contained"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
