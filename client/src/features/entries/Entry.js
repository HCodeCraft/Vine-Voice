import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetEntryQuery } from "./entriesSlice";
import { Typography } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { FaSquare } from "react-icons/fa";
import { useSelector } from "react-redux";

const Entry = () => {
  const params = useParams();
  const entryId = Number(params.id);
  const plantId = Number(params.plant_id);

  const [commentForm, setCommentForm] = useState(false);
  const [comment, setComment] = useState({
    text:""
  })

  const entries = useSelector((state) => state.entry.allEntries);

  const entry = entries[entryId - 1];

  const handleCommentClick = () => {
  console.log("handlecomment click was triggered!")
    setCommentForm((prevCommentForm) => !prevCommentForm);
  };
  

  console.log("commentForm", commentForm)

  const handleCommentChange = (e) => {
    setComment(e.target.value)
  }

  // // TO-DO
  // // If this is user's plant, prepend nickname with "My"
  // // Add user's avatars to their comments
  // // add Edit button to current user's comments
  // // add an add comment button
  // // make a delete button and delete handler for all comments if it's user's plant
  // // only show username if it's not current user's

  const handleCommentSubmit = () => {
    e.preventDefault()

  }

  const colorArray = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#008000"];

  return (
    <section className="section" align="center">
      <br />
      <br />
      <Typography variant="h4" align="center">
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
      <div>
        <Typography>Health:</Typography>
        <Typography variant="h4">
          <FaSquare color={colorArray[entry.health - 1]} />
        </Typography>
      </div>
      <p>{entry.notes}</p>
      <br />
      <Typography>
        Problems:{" "}
        {entry.problems.length > 0
          ? entry.problems.map((problem, index) => <p key={index}>{problem}</p>)
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
      {/* Include conditional UI for user */}
      {/* {user && (
        <>
          <CommonButton>Edit Entry</CommonButton>
          <CommonButton>Delete Entry</CommonButton>
          <br />
          <br />
          <CommonButton>Add Comment</CommonButton>
        </>
      )} */}
      <br />
      <br />
      <Typography variant="h5">Comments:</Typography>
      {commentForm == false ? <CommonButton onClick={handleCommentClick}>Add a Comment</CommonButton> : null}
      
      {entry.comments.length > 0 ? (
        entry.comments.map((comment, index) => (
          <div className="comment_box" key={index}>
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
        ))
      ) : (
        <>
          <br />
          <br />
          <Typography>No comments yet.</Typography>
        </>
      )}
      {commentForm === true ? (
              <>
                <br />
                <br />
                <textarea
                  rows={5}
                  cols={20}
                  name="text"
                  value={comment.text}
                  onChange={handleCommentChange}
                  type="text"
                  className="cBox"
                />
                <br />
                <br />{" "}
                <CommonButton onClick={handleCommentSubmit}>Submit</CommonButton>
              </>
            ) : null}
      <br />
      <br />
      <br/>
      <br/>
    </section>
  );
};

export default Entry;
