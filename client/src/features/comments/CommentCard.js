import React, { useState, useEffect } from "react";
import CommonButton from "../../common/CommonButton";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentInApi } from "./commentSlice";
import { deleteCommentFromApi } from "../comments/commentSlice";

/// want to put the logic for this seperately especially so I can set the review edit form to each one

const CommentCard = ({ comment, setComment }) => {

  const allComments = useSelector((state) => state.comment.allComments)


  const oneComment = allComments.find(allComment => comment.id == allComment.id);
 

  const dispatch = useDispatch();
  const [editForm, setEditForm] = useState(false);
  const [commentText, setCommentText] = useState(comment?.text);

  const user = useSelector((state) => state.user.loggedInUser);

  const commentId = comment.id;


  const handleFormClick = (selectedComment) => {
    setEditForm(true);
    setComment(selectedComment.text);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  const handleEditSubmit = () => {
    const updatedComment = {
      text: commentText,
    };
    dispatch(updateCommentInApi({ commentId, updatedComment }));
    setEditForm(false);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteCommentFromApi(commentId));
  };

  if (!comment) {
    return null; // Return null if comment is undefined
  }

  return oneComment ? (
    <>
      <br />
      <div className="comment_box">
        <br />
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
          {editForm == true ? (
            <>
              <textarea
                className="commentField"
                rows={5}
                cols={70}
                name="reviewtext"
                value={commentText}
                onChange={handleCommentChange}
                type="text"
              />
              <CommonButton onClick={() => handleEditSubmit(comment)}>
                Submit
              </CommonButton>
            </>
          ) : (
         oneComment.text
          )}
        </Typography>
        {user.username === comment.username & editForm == false ? (
          <>
            <br />
            <CommonButton onClick={() => handleFormClick(comment)}>
              Edit
            </CommonButton>{" "}
            <CommonButton onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </CommonButton>
          </>
        ) : null}
        <br />
      </div>
    </>
  ) : null
};

export default CommentCard;
