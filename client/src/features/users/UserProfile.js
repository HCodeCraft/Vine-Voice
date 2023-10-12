import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Box, Container } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { Link } from "react-router-dom";
import { updateUserInApi, fetchUserById, updateUser } from "./userSlice";

const UserProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.reducer.user.individualUser);
  const [statusForm, setStatusForm] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  const handleStatusChange = (e) => {
    setNewStatus(e.target.value);
  };

  const handleStatusFormClick = (e) => {
    setStatusForm(true);
    setNewStatus(user.status);
  };

  const handleStatusEditSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      user: {
        status: newStatus,
      },
    };

    try {
      await dispatch(updateUserInApi({ userId: user.id, updatedUser }));
    } catch (error) {}
  };

  useEffect(() => {
    setStatusForm(false);
  }, [user.status]);

  return user ? (
    <Container>
      <Box>
        <br />
        <Typography variant="h4">My Profile</Typography>
      </Box>
      <br />
      <Box>
        <br />
        <Typography variant="h5">
          I have {user.plants?.length} plants logged!
        </Typography>
        <br />
        {statusForm === false ? (
          <>
            <Typography variant="h5">My status: "{user.status}"</Typography>
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
        )}
        <br />
        <br />
        <br />
        <Typography variant="h5">{user.username}</Typography>
        <br />
        <Typography variant="h5">{user.name}</Typography>
        <br />
      </Box>
    </Container>
  ) : (
    <h1>UserInfo not loaded</h1>
  );
};

export default UserProfile;
