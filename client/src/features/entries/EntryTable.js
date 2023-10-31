import React from "react";
import { Link } from "react-router-dom";
import { FaSquare } from "react-icons/fa";
import CommonButton from "../../common/CommonButton";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Typography,
} from "@mui/material";


// when I have multiple users I'll want to just show the most recent entry per user

const colorArray = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#008000"];

// this is not shwing the comment count because it's from allPlants

const EntryTable = ({ entries, comments }) => {
  // const entryComments = comments.filter((comment) => comment.entry_id ==entry.id)
  // probably a more concise way of putting the comments in...
console.log("entries fro entrytable", entries)
  return (
    <div style={{ overflowY: "scroll", maxHeight: "300px" }}>
      <TableContainer component={Card} sx={{ backgroundColor: "C9CCD3" }}>
        <Table aria-label="table of entries" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">Pic</TableCell>
              <TableCell align="center">Health</TableCell>
              <TableCell align="center"># Problems</TableCell>
              <TableCell align="center"># Comments</TableCell>
              <TableCell align="center">Link</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center">{row.create_date}</TableCell>
                <TableCell align="center"><Link to={`/users/${row.user_id}`}>{row.username}</Link></TableCell>
                <TableCell align="center">
                  {row.image ? row.image : "No Picture"}
                </TableCell>
                <TableCell align="center">
                  {
                    <Typography variant="h4">
                      <FaSquare color={colorArray[row.health - 1]} />{" "}
                    </Typography>
                  }
                </TableCell>
                <TableCell align="center">
                  {row.problems ? row.problems.length : "0"}
                </TableCell>
                <TableCell align="center">
                  {comments
                    ? comments.filter((comment) => comment.entry_id === row.id)
                        .length
                    : "0"}
                </TableCell>
                <TableCell align="center">
                  <Link to={`entries/${row.user_id}`}>
                    <CommonButton>Show More</CommonButton>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EntryTable;
