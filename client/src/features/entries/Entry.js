import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { FaSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addCommentToApi } from "../comments/commentSlice";
import { useDispatch } from "react-redux";
import { fetchEntryById } from "./entriesSlice";
import CommentCard from "../comments/CommentCard";

const Entry = () => {
  const params = useParams();
  const commentBox = useRef(null);
  const entryId = Number(params.id);
  const dispatch = useDispatch();



  const [commentForm, setCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const [entry, setEntry] = useState({
    nickname: "",
    location: "",
    notes: "",
    image: "",
    user_id: "",
    plant_id: "",
    health: null,
    problems: [],
    open_to_advice: false,
    comments: [],
  });

  const indEntry = useSelector((state) => state.entry.individualEntry);
  console.log("indEntry", indEntry)
  const allComments = useSelector((state) => state.comment.allComments);
  console.log("allComments from entry", allComments)


  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  // need to add boolean if the curretly logged in user is the author of the entry
  // s/he can delete everyone's comment and also edit the entry

  // if a person made the comment, they can delete it

  useEffect(() => {
    const fetchEntry = async () => {
      const result = await dispatch(fetchEntryById(entryId));
      setEntry(result.payload); // Assuming the entry data is in payload
    };

    fetchEntry();
  }, []);

  // fetch the individual entry? then use that for the useSelector

  const handleCommentClick = async () => {
    await setCommentForm((prevCommentForm) => !prevCommentForm);
    scrollToSection(commentBox);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // // TO-DO
  // // If this is user's plant, prepend nickname with "My"
  // // Add user's avatars to their comments
  // // make a delete button and delete handler for all comments if it's user's plant
  // // only show username if it's not current user's

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
  
    const newComment = {
      text: comment,
      entry_id: entryId,
    };
  
    try {
      const resultAction = await dispatch(addCommentToApi(newComment, entryId));
  
      if (addCommentToApi.fulfilled.match(resultAction)) {
        const updatedEntry = resultAction.payload;
          // Update the entry with the new comment
        setComment("");  // Clear the comment input
        setCommentForm(false);

        return updatedEntry  // Close the comment form
      } else {
        console.log("error", resultAction.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  

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
        {entry.problems?.length > 0
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

        </>
      )} */}
      <br />
      <Typography variant="h5">Comments:</Typography>
      <br />
      {commentForm == false ? (
        <>
          {" "}
          <CommonButton onClick={handleCommentClick}>
            Add a Comment
          </CommonButton>{" "}
          <br />
        </>
      ) : null}
      {indEntry.comments?.length > 0 ? (
        indEntry.comments.map((comment, index) => (
          <div key={index}>
            <CommentCard
              key={index}
              setComment={setComment}
              comment={comment}
              handleCommentChange={handleCommentChange}
            />
            <br />
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
        <div ref={commentBox} className="commentBox">
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
          <br />
        </div>
      ) : null}

      <br />
      <br />
      <br />
      <br />
    </section>
  );
};

export default Entry;
