import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Container, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";
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
  const [error, setError] = useState(null)
  const userError = useSelector((state)=> state.user.error)
  const [open, setOpen] = useState(false)

  const userId = Number(params.id);


  console.log("currentUser", currentUser)
  console.log("user.admin", user.admin)
  console.log("loggedInUser.admin", loggedInUser.admin)
  

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
  console.log("loggedInuser.error", userError)
},[newStatus, loggedInUser])
// Access error from the useSelector state? 
  ///////

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  useEffect(()=> {
    console.log("user.status", user.status)
  },[user.status])

  const handleStatusFormClick = (e) => {
    console.log("handleStatusFormClick was clicked");
    setStatusForm(true);
    setNewStatus(user.status);
  };
  
  const handleStatusEditSubmit = async (e) => {
    e.preventDefault();
  
    const updatedUser = new FormData();
    updatedUser.append(`user[status]`, newStatus);
  
    try {
      const response = await dispatch(updateUserInApi({ userId: user.id, updatedUser }));
      console.log("response.error", response.error);
  
      response.error
        ? (() => {
            const errorData = JSON.parse(response.error.message);
            setError(errorData.errors);
          })()
        : setError([]);
  
      setStatusForm(false);
    } catch (error) {
      console.log("Caught an error:", error.message);
      setError(error.message);
    }
  };

  const handleDeleteUser = (user) => {
    console.log("user from HDU", user)
    dispatch(deleteUserFromApi(user))
    dispatch(filterOutUserEntries(user.id))
  dispatch(logoutUser())
    navigate(`/`)

  }
  
  
  
  useEffect(()=> {
console.log("error", error)
  },[error])


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
                <p>Limit 10-75 characters</p>
                <p>currently: {newStatus.length}</p>
                <textarea
                  rows={5}
                  cols={20}
                  name="status"
                  value={newStatus}
                  onChange={handleStatusChange}
                  type="text"
                  style={{ width: "100%" }}
                />
                <ul>
                </ul>
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
 {error ? (
  <div style={{ color: 'red', marginTop: '10px' }}>
    {error.map((errorMessage, index) => (
      <p key={index}>{errorMessage}</p>
    ))}
  </div>
) : null}


          <img
            src={user.avatar ? user.avatar : default_avatar}
            className="avatarBig"
            style={{ display: "block", marginTop: "1.75em" }}
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
          {user.privacy  !== true && user !== loggedInUser ? (
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
        ) : null} {loggedInUser.admin ? <div className='all_btn'><Link to={`/users/all`}><CommonButton>All User's Page</CommonButton></Link></div> : null}
{( (currentUser && !user.admin) || loggedInUser.admin && !user.admin ) ? (

  <>
    <CommonButton style={{ marginTop: "1.75em" }} onClick={() => setOpen(true)}>
      Delete Account
    </CommonButton>
    <Dialog
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle id='dialog-title'>Delete your Account?</DialogTitle>
      <DialogContent>
        <DialogContentText id='dialog-discription'>
          This will be final. It will delete all your entries and photos as well. Are you sure you want to delete the account?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleDeleteUser(user)}>Delete</Button>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
      </DialogActions>
    </Dialog>
  </>
) : null}

      </Box>
    </Container>
  ) : (
    <Unauthorized />
  );
};



export default UserProfile;
