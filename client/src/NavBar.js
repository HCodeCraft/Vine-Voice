import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { resetUser, logoutUser } from "./features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    // Define routes and their corresponding tab indexes
    const routes = {
      [`/users/${user?.id}`]: 0,
      "/users/plants": 1,
      "/plants/new": 2,
      "/plants": 3,
    };
    setSelectedTab(routes[location.pathname] || 0);
  }, [location.pathname, user]);

  const handleTabClick = (event, value) => {
    setSelectedTab(value);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetUser());
    navigate("/login");
  };

  return (
    <AppBar className="topbar" sx={{ textTransform: "none", background: "#81C784" }}>
      <Toolbar>
        <Typography variant="h4">Vine Voice</Typography>
        {user && (
          <Tabs indicatorColor="primary" value={selectedTab}>
            <Tab
              sx={{ textTransform: "none" }}
              label="My Profile"
              component={Link}
              to={`/users/${user.id}`}
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
        )}
        {user && (
          <Typography mr={3} ml={3}>
            {user.username}
          </Typography>
        )}
        {user && (
          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;