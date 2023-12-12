import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  Box,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Paper
} from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { Link, useParams, useNavigate } from "react-router-dom";
import { updateUserInApi } from "./userSlice";
import Unauthorized from "../../Unauthorized";
import { fetchUserById, deleteUserFromApi, logoutUser } from "./userSlice";
import default_avatar from "../../pictures/defaultleaf.png";
import { filterOutUserEntries } from "../plants/plantSlice";

const UserProfile = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [statusForm, setStatusForm] = useState(false);
  const [newStatus, setNewStatus] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
  const [user, setUser] = useState({});
  const loggedInUser = useSelector((state) => state.user.loggedInUser);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

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
  }, [loggedInUser, userId, dispatch]);

  useEffect(() => {
    if (user) {
      setStatusForm(false);
    }
  }, [user?.status, user]);


  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };



  const handleStatusFormClick = (e) => {
    setStatusForm(true);
    setNewStatus(user.status);
  };

  const handleStatusEditSubmit = async (e) => {
    e.preventDefault();

    const updatedUser = new FormData();
    updatedUser.append(`user[status]`, newStatus);

    try {
      const response = await dispatch(
        updateUserInApi({ userId: user.id, updatedUser })
      );

      response.error
        ? (() => {
            const errorData = JSON.parse(response.error.message);
            setError(errorData.errors);
          })()
        : setError([]);

      setStatusForm(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteUser = (user) => {
    dispatch(deleteUserFromApi(user));
    dispatch(filterOutUserEntries(user.id));
    dispatch(logoutUser());
    navigate(`/`);
  };

  const paperStyle = {
    padding: 0,
    height: "100vh",
    width: 600,
    margin: "20px auto",
    marginTop: "6em",
  };



  useEffect(() => {
    if (user) {
      setStatusForm(false);
    }
  }, [user?.status, user]);

  if (user.errors) {
    return (
      <>
        <Typography variant="h4" style={{marginTop:'4em'}}>User not found</Typography>
      </>
    );
  }

  return user.username ? (
    <Container>
      <Paper elevation={10} style={paperStyle}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h4"
          style={{ marginTop: "1em", marginBottom: ".5em" }}
        >
          {currentUser ? "My" : `${user.username}'s`} Profile
        </Typography>
        <div>
          <Typography
            variant="h5"
            style={{ marginTop: "1em", marginBottom: "1em" }}
          >
            {currentUser ? `I have` : "They have"}{" "}
            {user.plants?.length > 0 ? user.plants?.length : `no`}{" "}
            {user.plants?.length === 1 ? `plant` : `plants`} logged!
          </Typography>
          {currentUser === true ? (
            statusForm === false ? (
              <>
                <Typography variant="subtitle1" style={{ marginBottom: "1em" }}>
                  My status:
                </Typography>
                <div
                  className="statusBubble"
                  style={{ textAlign: "center", marginBottom: "1em" }}
                >
                  <div className="status-txt">
                    <Typography variant="h7">{user.status}</Typography>
                  </div>
                </div>
                <CommonButton
  onClick={() => handleStatusFormClick()}
  style={{ display: "block", margin: "auto" }}
>
  Edit
</CommonButton>

              </>
            ) : (
              <>
                <Typography variant="h5">Status: </Typography>
                <p>Limit 10-75 characters</p>
                <p>currently: {newStatus?.length}</p>
                <textarea
                  rows={5}
                  cols={20}
                  name="status"
                  value={newStatus}
                  onChange={handleStatusChange}
                  type="text"
                  style={{ width: "100%" }}
                  className="margB1 statusText"
                />
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
          {error ? (
            <div style={{ color: "red", marginTop: "10px" }}>
              {error.map((errorMessage, index) => (
                <p key={index}>{errorMessage}</p>
              ))}
            </div>
          ) : null}

          <img
            src={user.avatar ? user.avatar : default_avatar}
            className="avatarBig" alt='user avatar'
          />
          <Typography
            variant="h5"
            style={{
              textAlign: "center",
              marginTop: "1.75em",
              marginBottom: "1em",
            }}
          >
            {"Username:"} {user.username}{" "}
          </Typography>
          <Typography
            variant="h5"
            style={{ textAlign: "center", marginBottom: "1em" }}
          >
            {"Name:"} {user.name}
          </Typography>
          {user.privacy !== true && user !== loggedInUser ? (
            <a href={`mailto:${user.email}`}>
              <Typography variant="h5" style={{ textAlign: "center" }}>
                Send Email
              </Typography>
            </a>
          ) : null}

          <div className="margB1"></div>
        </div>
        {currentUser === true ? (
          <Link to={`/users/${user.id}/edit`} style={{ textAlign: "center" }}>
            <CommonButton>Edit Info</CommonButton>
          </Link>
        ) : null}{" "}
        {loggedInUser.admin ? (
          <div className="all_btn margB2">
            <Link to={`/users/all`}>
              <CommonButton>All User's Page</CommonButton>
            </Link>
            <Link to={`/plants/add`}>
              <CommonButton style={{marginLeft:".5em"}}>Add a Plant</CommonButton>
            </Link>
          </div>
        ) : null}
        {(currentUser && !user.admin) || (loggedInUser.admin && !user.admin) ? (
          <>
            <CommonButton
              style={{ marginTop: "1.75em" }}
              onClick={() => setOpen(true)}
            >
              Delete Account
            </CommonButton>
            <Dialog
              aria-labelledby="dialog-title"
              aria-describedby="dialog-description"
              open={open}
              onClose={() => setOpen(false)}
            >
              <DialogTitle id="dialog-title">Delete your Account?</DialogTitle>
              <DialogContent>
                <DialogContentText id="dialog-discription">
                  This will be final. It will delete all your entries and photos
                  as well. Are you sure you want to delete the account?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={() => handleDeleteUser(user)}>
                  Delete
                </Button>
                <Button onClick={() => setOpen(false)}>Cancel</Button>
              </DialogActions>
            </Dialog>
          </>
        ) : null}
      </Box>
      </Paper>
    </Container>
  ) : (
    <Unauthorized />
  );
};

export default UserProfile;
