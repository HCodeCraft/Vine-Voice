import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import CommonButton from "../../common/CommonButton";
import { FaSquare } from "react-icons/fa";
import { useSelector } from "react-redux";
import { addCommentToApi } from "../comments/commentSlice";
import { useDispatch } from "react-redux";
import { fetchEntryById, deleteEntryFromApi } from "./entriesSlice";
import CommentCard from "../comments/CommentCard";
import { deleteEntryInPlant } from "../plants/plantSlice";
import { deleteUserPlant } from "../users/userSlice";
import default_plant from "../../pictures/nopic.png";

const Entry = () => {
  const params = useParams();
  const navigate = useNavigate();
  const commentBox = useRef(null);
  const entryId = Number(params.id);
  const dispatch = useDispatch();

  const [commentForm, setCommentForm] = useState(false);
  const [comment, setComment] = useState("");
  const [currentUser, setCurrentUser] = useState(false);
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

  useEffect(() => {
    const fetchEntry = async () => {
      const result = await dispatch(fetchEntryById(entryId));
      setEntry(result.payload);
    };

    fetchEntry();
  }, []);

  const entryUsername = useSelector(
    (state) => state.entry.individualEntry?.username
  );

  const indEntryComments = useSelector(
    (state) => state.entry.individualEntry?.comments
  );

  const plant = useSelector((state) => state.plant.individualPlant);

  const user = useSelector((state) => state.user.loggedInUser);

  useEffect(() => {
    if (entryUsername === user.username) {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }, []);

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const handleCommentClick = async () => {
    await setCommentForm((prevCommentForm) => !prevCommentForm);
    scrollToSection(commentBox);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  // // TO-DO
  // // make a delete button and delete handler for all comments if it's user's plant
  // If user's entry s/he can delete everyone's comment and also edit the entry

  const handleDeleteEntry = async (entryId) => {
    try {
        await dispatch(deleteEntryFromApi(entryId));
        await dispatch(deleteEntryInPlant(entryId));

        console.log("user", user);
        console.log("user.plants", user.plants);
        console.log("plant", plant);
        console.log("plant.entries", plant.entries)

        const userPlant = user.plants.find((p) => p.id === plant.id);
        console.log("userPlant", userPlant);
        console.log("userPlant.entries", userPlant.entries);

        if (userPlant && ( userPlant.entries.length === 1)) {
            console.log("Deleting userPlant", userPlant);
            dispatch(deleteUserPlant({ id: userPlant.id }));

            navigate(`/users/plants`);
        } else {
            console.log("Not deleting userPlant. Entries:", userPlant?.entries);
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
};


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
        setComment(""); // Clear the comment input
        setCommentForm(false);

        return updatedEntry; // Close the comment form
      } else {
        console.log("error", resultAction.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const colorArray = ["#FF0000", "#FFA500", "#FFFF00", "#00FF00", "#008000"];

  return entry ? (
    <section className="section" align="center">
      <Typography variant="h4" align="center" style={{ marginTop: "3em" }}>
        {"An Entry for "}
        {entry.nickname}
      </Typography>

      <Typography variant="h5">
        {currentUser ? "My" : `${entry.username}'s`} {plant.common_name}
      </Typography>
      <Typography align="center">from {entry.create_date}</Typography>
      <br />
      <img
        className="entry_pic"
        src={entry.picture ? entry.picture : default_plant}
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
        {entry.problems && entry.problems.length > 0
          ? entry.problems.map((problem, index) => <p key={index}>{problem}</p>)
          : "No Problems :)"}
      </Typography>
      <br />
      <br />
      <br />
      {currentUser ? (
        <>
          <Link to={`edit`}>
            <CommonButton>Edit Entry</CommonButton>
          </Link>

          <CommonButton
            style={{ marginLeft: "10px" }}
            onClick={() => handleDeleteEntry(entryId)}
          >
            Delete Entry
          </CommonButton>
          <br />
        </>
      ) : null}
      <br />
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
      <Typography variant="h5">Comments:</Typography>
      <br />
      {commentForm === false ? (
        <>
          {" "}
          <CommonButton onClick={handleCommentClick}>
            Add a Comment
          </CommonButton>{" "}
          <br />
        </>
      ) : null}
      {indEntryComments && indEntryComments.length > 0 ? (
        indEntryComments.map((comment, index) => (
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
            rows={10}
            cols={50}
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
  ) : null;
};

export default Entry;
