import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import Unauthorized from "../../Unauthorized";
import Restricted from "../../Restricted";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { fetchAllUsers, deleteUserFromApi } from "./userSlice";
import { fetchAllComments } from "../comments/commentSlice";
import { Link } from "react-router-dom";
import CommonButton from "../../common/CommonButton";
import { filterOutUserEntries } from "../plants/plantSlice";

const AllUsers = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.loggedInUser);

  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const result = await dispatch(fetchAllUsers());
      setUsers(result.payload);
    };

    const fetchComments = async () => {
      const result = await dispatch(fetchAllComments());
      setComments(result.payload);
    };

    fetchUsers();
    fetchComments();
  }, [dispatch]);

  const filteredComments = useMemo(() => {
    return comments.filter((comment) => comment.user_id === user.id);
  }, [comments, user.id]);

  if (!user) {
    return <Unauthorized />;
  }

  if (user.admin !== true) {
    return <Restricted />;
  }


  const handleOpenDialog = (row) => {
    setUserToDelete(row);
    setOpen(true);
  };

  const handleDeleteUser = () => {
    if (userToDelete) {
      dispatch(deleteUserFromApi(userToDelete));
      dispatch(filterOutUserEntries(userToDelete.id));

      setOpen(false);
      setUserToDelete(null);
      const existingUsers = users.filter((user) => user !== userToDelete);
      setUsers(existingUsers);
    }
  };

  return (
    <div
      style={{ overflowY: "scroll", overflowX: "scroll", marginTop: "4.75em" }}
    >
      <TableContainer component={Card} sx={{ backgroundColor: "C9CCD3" }}>
        <Table aria-label="table of entries" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Avatar</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center"># Plants</TableCell>
              <TableCell align="center"># Entries</TableCell>
              <TableCell align="center"># Comments</TableCell>
              <TableCell align="center">Delete User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">
                  <img
                    src={row.avatar_thumbnail}
                    className="tiny_pic"
                    alt="avatar"
                  />
                </TableCell>
                <TableCell align="center">
                  <Link to={`/users/${row.id}`}>
                    <div>
                      {row.admin && (
                        <span style={{ marginRight: "5px" }}>👑</span>
                      )}
                      {row.username}
                    </div>
                  </Link>
                </TableCell>
                <TableCell align="center">
                  <div
                    style={{
                      padding: "3px",
                      border: `2px solid ${
                        row.recieve_dev_emails ? "green" : "red"
                      }`,
                    }}
                  >
                    <a href={`mailto:${row.email}`}>
                      <Typography
                        variant="subtitle1"
                        style={{ textAlign: "center" }}
                      >
                        Send Email
                      </Typography>
                    </a>
                  </div>
                </TableCell>
                <TableCell align="center"> {row.plants.length}</TableCell>
                <TableCell align="center">{row.entries.length}</TableCell>
                <TableCell align="center">
                  {
                   filteredComments.length
                  }
                </TableCell>
                <TableCell align="center">
                  {row.admin !== true ? (
                    <>
                      <CommonButton
                        style={{ marginTop: "1.75em" }}
                        onClick={() => handleOpenDialog(row)}
                      >
                        Delete Account
                      </CommonButton>
                      <Dialog
                        aria-labelledby="dialog-title"
                        aria-describedby="dialog-description"
                        open={open}
                        onClose={() => setOpen(false)}
                      >
                        <DialogTitle id="dialog-title">
                          Delete your Account?
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="dialog-discription">
                            This will be final. It will delete all your entries
                            and photos as well. Are you sure you want to delete
                            the account?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button autoFocus onClick={() => handleDeleteUser()}>
                            Delete
                          </Button>
                          <Button onClick={() => setOpen(false)}>Cancel</Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default AllUsers;
