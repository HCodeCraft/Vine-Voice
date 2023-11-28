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
import { deleteUserPlant, updateUserPlant } from "../users/userSlice";
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
    create_date: null,
  });

  useEffect(() => {
    const fetchEntry = async () => {
      const result = await dispatch(fetchEntryById(entryId));
      setEntry(result.payload);
    };

    fetchEntry();
  }, []);

  const entryUsername = useSelector(
    (state) => state.entry.individualEntry?.user?.username
  );

  const indEntryComments = useSelector(
    (state) => state.entry.individualEntry?.comments
  );

  const plant = useSelector((state) => state.plant.individualPlant);

  const user = useSelector((state) => state.user.loggedInUser);

  const myEntries = plant.entries.filter((e) => e.user_id === user.id);

  useEffect(() => {
    if (entryUsername === user.username) {
      setCurrentUser(true);
    } else {
      setCurrentUser(false);
    }
  }, [entryUsername]);

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



  const handleDeleteEntry = async (entryId) => {
    try {
      await dispatch(deleteEntryInPlant(entryId));
      await dispatch(deleteEntryFromApi(entryId));

      const userPlant = user.plants.find((p) => p.id === plant.id);

      if (userPlant && myEntries?.length === 1) {
        dispatch(deleteUserPlant({ id: userPlant.id }));

        navigate(`/users/plants`);
      } else {
        const newPlantEntries = plant.entries.filter(
          (entry) => entry.id !== entryId
        );
        const plantWithoutEntry = { ...plant, entries: [newPlantEntries] };
        dispatch(updateUserPlant(plantWithoutEntry));

        navigate(`/users/plants`);
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

        setComment("");
        setCommentForm(false);

        return updatedEntry;
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
        {currentUser ? "My" : `${entry.user?.username}'s`} {plant.common_name}
      </Typography>
      <Typography align="center" style={{ marginBottom: "1em" }}>
        from {entry.create_date}
      </Typography>
      <img
        className="entry_pic"
        src={entry.picture ? entry.picture : default_plant}
        alt="Entry"
      />

      <Typography style={{ marginBottom: "1em" }}>
        Location: {entry.location}
      </Typography>
      <div>
        <Typography>Health:</Typography>
        <Typography variant="h4">
          <FaSquare color={colorArray[entry.health - 1]} />
        </Typography>
      </div>
      <p className="margB1">{entry.notes}</p>
      <Typography style={{ marginBottom: "3em" }}>
        Problems:{" "}
        {entry.problems && entry.problems.length > 0
          ? entry.problems.map((problem, index) => <p key={index}>{problem}</p>)
          : "No Problems :)"}
      </Typography>
      {currentUser ? (
        <div className="margB1">
          <Link to={`edit`}>
            <CommonButton>Edit Entry</CommonButton>
          </Link>

          <CommonButton
            style={{ marginLeft: "10px" }}
            onClick={() => handleDeleteEntry(entryId)}
          >
            Delete Entry
          </CommonButton>
        </div>
      ) : null}
      <Typography
        sx={{
          border: `1px solid ${entry.open_to_advice ? "green" : "red"}`,
          padding: "4px", // Add padding for better visualization
          display: "inline-block",
          marginTop: "2em", // To make the border apply to the text only
        }}
      >
        {entry.open_to_advice ? "I'm open to advice!" : "No advice, please"}
      </Typography>

      <Typography
        variant="h5"
        style={{ marginTop: "2em", marginBottom: "1em" }}
      >
        Comments:
      </Typography>
      {commentForm === false ? (
        <div className="btn-margin-bottom">
          {" "}
          <CommonButton onClick={handleCommentClick}>
            Add a Comment
          </CommonButton>{" "}
        </div>
      ) : null}
      {indEntryComments && indEntryComments.length > 0 ? (
        indEntryComments.map((comment, index) => (
          <div key={index} className="margB1">
            <CommentCard
              key={index}
              setComment={setComment}
              comment={comment}
              handleCommentChange={handleCommentChange}
            />
          </div>
        ))
      ) : (
        <>
          <Typography style={{ marginTop: "2em" }}>No comments yet.</Typography>
        </>
      )}

      {commentForm === true ? (
        <div ref={commentBox} className="commentBox">
          <textarea
            rows={10}
            cols={50}
            name="text"
            value={comment.text}
            onChange={handleCommentChange}
            type="text"
            className="cBox margB1"
          />
          <CommonButton
            style={{ marginTop: "1em", marginBottom: "1em" }}
            onClick={handleCommentSubmit}
          >
            Submit
          </CommonButton>
        </div>
      ) : null}
    </section>
  ) : null;
};

export default Entry;
