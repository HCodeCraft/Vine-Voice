import React from "react";
import { useParams } from "react-router-dom";
import { useGetEntriesQuery } from "./entriesSlice";
import { Typography } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { FaSquare } from "react-icons/fa";

const Entry = () => {
  const params = useParams();
  const id = Number(params.id);

  const { data, isLoading, isError } = useGetEntriesQuery();
  const entry = data?.[id - 1];

  // TO-DO
  // If this is user's plant, prepend nickname with "My"
  // Add user's avatars to their comments
  // add Edit button to current user's comments
  // add an add comment button
  // make a delete button and delete handler for all comments if it's user's plant
  // only show username if it's not current user's

  const colorArray = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#008000"];

  if (isLoading) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  if (isError) {
    return <Typography variant="h4">Error loading data.</Typography>;
  }

  if (entry) {
    // Display the entry data when it's available
    return (
      <section align="center" className="section">
        <br />
        <br />
        <Typography align="center" variant="h4">
          {entry.nickname}
        </Typography>
        <Typography>{entry.username}'s</Typography>
        <Typography align="center">Entry from {entry.create_date}</Typography>
        <br />
        <img
          className="entry_pic"
          src="https://i.etsystatic.com/28032647/r/il/fcc31d/3031288866/il_1588xN.3031288866_dy56.jpg"
          alt="Entry"
        />
        <br />
        <Typography>Location: {entry.location}</Typography>
        <br />
        <p>
          <Typography>Health:</Typography>
          {
            <Typography variant="h4">
              <FaSquare color={colorArray[entry.health - 1]} />
            </Typography>
          }
        </p>
        <p>{entry.notes}</p>
        <br />
        <Typography>
          Problems:{" "}
          {entry.problems.length > 0
            ? entry.problems.map((problem) => <p>{problem}</p>)
            : "No Problems :)"}
        </Typography>
        <br />
        <Typography
          sx={{
            border: `1px solid ${entry.open_to_advice ? "green" : "red"}`,
            padding: "4px", // Add padding for better visualization
            display: "inline-block", // To make the border apply to the text only
          }}
        >
          {entry.open_to_advice ? "I'm open to advice!" : "No advice, please"}
        </Typography>
        <br />
        <br />
        <br />
        ONLY IF USER!!!
        <CommonButton>Edit Entry</CommonButton>
        <CommonButton>Delete Entry</CommonButton>
        <br />
        <br />
        <CommonButton>Add Comment</CommonButton>
        <br />
        <br />
        <Typography variant="h5">Comments:</Typography>
        <br />
        {entry.comments.length > 0
          ? entry.comments.map((comment) => (
              <>
                <div className="comment_box">
                  <Typography
                    align="left"
                    sx={{
                      textDecoration: "underline",
                    }}
                  >
                    {comment.username}
                  </Typography>
                  <Typography align="left" variant="subtitle1">
                    {comment.create_date}
                  </Typography>
                  <Typography variant="h6" align="left">
                    {comment.text}
                  </Typography>
                </div>
                <br />
              </>
            ))
          : null}
        <br />
        <br />
      </section>
    );
  }

  // Handle the case where entry is not available
  return <Typography variant="h4">Entry not found.</Typography>;
};

export default Entry;
