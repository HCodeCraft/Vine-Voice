import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Container } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { Link, useParams } from "react-router-dom";
import { updateUserInApi } from "./userSlice";
import Unauthorized from "../../Unauthorized";
import { fetchUserById } from "./userSlice";
import default_avatar from "../../pictures/defaultleaf.png";

const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [statusForm, setStatusForm] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.user.loggedInUser);

  const userId = Number(params.id);

  useEffect(() => {
    if (userId === loggedInUser.id) {
      setCurrentUser(true);
      setUser(loggedInUser);
    } else {
      dispatch(fetchUserById(userId)).then((response) => {
        setUser(response.payload);
        setCurrentUser(false);
      });
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (user) {
      setStatusForm(false);
    }
  }, [user?.status]);


  //// Testing
useEffect(()=> {
  console.log("newStatus", newStatus)
},[newStatus])

  ///////

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  useEffect(()=> {
    console.log("user.status", user.status)
  },[user.status])

  const handleStatusFormClick = (e) => {
    console.log("handleStatusFormClick was clicked")
    setStatusForm(true);
    setNewStatus(user.status);
  };

  const handleStatusEditSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = new FormData();
    // need to add the formdata !!!!
        updatedUser.append(`user[status]`, newStatus);


    for (var pair of updatedUser.entries() ){
      console.log(pair[0] + ',' + pair[1])
    }

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

  if (user.errors) {
    return (
      <>
        <Typography variant="h4">User not found</Typography>
      </>
    );
  }

  return user.username ? (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h4" style={{ marginTop: "2.5em" }}>
          {currentUser ? "My" : `${user.username}'s`} Profile
        </Typography>
        <br />
        <div>
          <br />
          <Typography variant="h5">
            {currentUser ? `I have` : "They have"}{" "}
            {user.plants?.length > 0 ? user.plants.length : `no`}{" "}
            {user.plants?.length === 1 ? `plant` : `plants`} logged!
          </Typography>
          <br />
          {currentUser === true ? (
            statusForm === false ? (
              <>
                <Typography variant="subtitle1">My status:</Typography>
                <br />
                <div className="statusBubble" style={{ textAlign: "center" }}>
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
                  style={{ width: "100%" }}
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
              <div className="statusBubble" style={{ textAlign: "center" }}>
                <Typography variant="h6" sx={{ align: "center" }}>
                  {user.status}
                </Typography>
              </div>{" "}
            </>
          )}
          <br />
          <br />
          <br />
          <img
            src={user.avatar ? user.avatar : default_avatar}
            className="avatarBig"
            style={{ display: "block", margin: "0 auto" }}
          />
          <Typography
            variant="h5"
            style={{ textAlign: "center", marginTop: "1.75em" }}
          >
            {"Username:"} {user.username}{" "}
          </Typography>
          <br />
          <Typography variant="h5" style={{ textAlign: "center" }}>
            {"Name:"} {user.name}
          </Typography>
          <br />
          {user.privacy !== true ? (
            <a href={`mailto:${user.email}`}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Send Email
              </Typography>
            </a>
          ) : null}

          <br />
        </div>
        {currentUser == true ? (
          <Link to={`/users/${user.id}/edit`} style={{ textAlign: "center" }}>
            <CommonButton>Edit Info</CommonButton>
          </Link>
        ) : null}

        {loggedInUser.admin || currentUser ? (
          <CommonButton style={{ marginTop: "1.75em" }}>
            Delete User
          </CommonButton>
        ) : null}
      </Box>
    </Container>
  ) : (
    <Unauthorized />
  );
};

export default UserProfile;
