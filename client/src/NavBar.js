import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Button from "@mui/material/Button";
import { clearComments } from "./features/comments/commentSlice";
import { clearPlants } from "./features/plants/plantSlice";
import { clearEntries } from "./features/entries/entrySlice";
import { resetUser, logoutUser } from "./features/users/userSlice";
import { useDispatch, useSelector } from "react-redux";

const TabComponent = React.memo(({ user, selectedTab, handleTabClick }) => (
  <Tabs indicatorColor="primary" value={selectedTab}>
    <Tab
      sx={{ textTransform: "none" }}
      label="My Profile"
      component={Link}
      to={`/users/${user.id}`}
      onClick={(event) => handleTabClick(event, 0)}
    />
    <Tab
      sx={{ textTransform: "none" }}
      label="My Plants"
      component={Link}
      to="/users/plants"
      onClick={(event) => handleTabClick(event, 1)}
    />
    <Tab
      sx={{ textTransform: "none" }}
      label="Add A Plant"
      component={Link}
      to="/plants/new"
      onClick={(event) => handleTabClick(event, 2)}
    />
    <Tab
      sx={{ textTransform: "none" }}
      label="Everyone's Plants"
      component={Link}
      to="/plants"
      onClick={(event) => handleTabClick(event, 3)}
    />
  </Tabs>
));

const NavBar = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.loggedInUser);

  const [selectedTab, setSelectedTab] = useState(1);

  useEffect(() => {
    const routes = {
      [`/users/${user?.id}`]: 0,
      "/users/plants": 1,
      "/plants/new": 2,
      "/plants": 3,
    };

    const defaultTab = routes[location.pathname] ?? 3

    setSelectedTab(defaultTab);
  }, [location.pathname, user]);

  const handleTabClick = (event, value) => {
    setSelectedTab(value);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(resetUser());
    dispatch(clearPlants());
    dispatch(clearEntries());
    dispatch(clearComments());
    navigate("/login");
  };

  if (user === null) {
    // Return a loading indicator or null during the initialization phase
    return (
      <AppBar
        className="topbar"
        sx={{ textTransform: "none", background: "#81C784" }}
      >
        {/* Add your loading indicator content here */}
      </AppBar>
    );
  }

  return (
    <AppBar
      className="topbar"
      sx={{ textTransform: "none", background: "#81C784" }}
    >
      <Toolbar>
        <Typography variant="h4" style={{ marginRight: ".5em" }}>
          Vine Voice
        </Typography>
        {user && (
          <TabComponent
            user={user}
            selectedTab={selectedTab}
            handleTabClick={handleTabClick}
          />
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
