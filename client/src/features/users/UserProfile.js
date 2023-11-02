import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Container } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { Link, useParams } from "react-router-dom";
import { updateUserInApi } from "./userSlice";
import Unauthorized from "../../Unauthorized";
import { fetchUserById } from "./userSlice";
import ProfileImage from "../../ProfileImage";

const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [statusForm, setStatusForm] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const individualUser = useSelector((state) => state.user.individualUser);

 
  // fetch user by id on login with useEffect
  // change JSX so that this page has dynamic content
  // can make it use user if user matches the params, otherwise, fetchUserById

  const userId = Number(params.id);

  console.log("user", user)


  useEffect(() => {
    if (userId === loggedInUser.id) {
      setCurrentUser(true);
      setUser(loggedInUser);
    } else {
      console.log("params id when user isn't logged in", userId);
      dispatch(fetchUserById(userId)).then((response) => {
        setUser(response.payload); // Update user with the fetched data
        setCurrentUser(false);
      });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (user) {
      setStatusForm(false);
    }
  }, [user?.status]);

  // Make Username profile Title Stylized like the plan
  // add status bubble div
  // add email if it's present

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleStatusFormClick = (e) => {
    setStatusForm(true);
    setNewStatus(user.status);
  };

  const handleStatusEditSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = new FormData()

    try {
      await dispatch(updateUserInApi({ userId: user.id, updatedUser }));
      setStatusForm(false);
    } catch (error) {}
  };

  useEffect(() => {
    if (user) {
      setStatusForm(false);
    }
  }, [user?.status]);

  // used to be [user, params.id]

  if (user.errors) {
    return (
      <>
        <Typography variant="h4">User not found</Typography>
      </>
    );
  }

  return user.username ? (
    <Container>
      <Box>
        <br />
        <br />
        <Typography variant="h4">
          {currentUser ? "My" : `${user.username}'s`} Profile
        </Typography>
      </Box>
      <br />
      <div>
        <br />
        <Typography variant="h5">
          {currentUser ? `I have` : "They have"}{" "}
          {user.plants?.length > 0 ? user.plants.length : `no`}{" "}
          {user.plants?.length === 1 ? `plant` : `plants`} logged!
        </Typography>
        <br />{" "}
        {currentUser === true ? (
          statusForm === false ? (
            <>
              {user.image ? <ProfileImage /> : null}
              <Typography variant="subtitle1">My status:</Typography>
              <br />
              <div className="statusBubble">
                <div className="status-txt">
                  <Typography variant="h7">{user.status}</Typography>
                </div>
              </div>
              <br />
              <br />
              <CommonButton onClick={() => handleStatusFormClick()}>
                Edit
              </CommonButton>
            </>
          ) : (
            <>
              <Typography variant="h5">Status: </Typography>
              <textarea
                rows={5}
                cols={20}
                name="status"
                value={newStatus}
                onChange={handleStatusChange}
                type="text"
              />
              <br />
              <CommonButton onClick={handleStatusEditSubmit}>
                Set Status
              </CommonButton>
            </>
          )
        ) : (
          <>
            <Typography variant="subtitle1">Their status:</Typography>
            <div className="statusBubble">
              <Typography variant="h6" align={"center"}>
                {user.status}
              </Typography>
            </div>{" "}
          </>
        )}
        <br />
        <br />
        <br />
        <img src={user.avatar} className="avatarBig"/>
        <Typography variant="h5">
          {"Username:"} {user.username}{" "}
        </Typography>
        <br />
        <Typography variant="h5">
          {" "}
          {"Name:"} {user.name}
        </Typography>
        <br />
        {user.privacy !== true ? (
          <Typography variant="h5">{user.email}</Typography>
        ) : null}
        <br />
      </div>
      {currentUser == true ? (
        <Link to={`/users/${user.id}/edit`}>
          <CommonButton>Edit Info</CommonButton>
        </Link>
      ) : null}

      {loggedInUser.admin || currentUser ? (
        <>
          <CommonButton style={{ marginLeft: "3px" }}>Delete User</CommonButton>
        </>
      ) : null}
    </Container>
  ) : (
    <Unauthorized />
  );
};

export default UserProfile;
