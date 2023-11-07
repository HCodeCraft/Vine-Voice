import React, { useState, useEffect } from "react";
import CommonButton from "../../common/CommonButton";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentInApi } from "./commentSlice";
import { deleteCommentFromApi } from "../comments/commentSlice";
import { Link } from 'react-router-dom'
import default_avatar  from "../../pictures/defaultleaf.png"

/// want to put the logic for this seperately especially so I can set the review edit form to each one

const CommentCard = ({ comment, setComment }) => {

    const indEntryComments = useSelector((state) => state.entry.individualEntry.comments)


  const oneComment = indEntryComments.find(indComment => comment.id == indComment.id);


 

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
    return null; 
  }

  return oneComment ? (
    <>
      <br />
      <div className="comment_box">
        <div className='flex-comment-box'>
            <div className="comment-avatar-box">
                <img className="avatar" src={comment.avatar_thumbnail ? comment.avatar_thumbnail : default_avatar }/>
            </div>
            <div className='comment-text-box'>
        <Link to={`/users/${comment.user_id}`}>
        <Typography
          align="left"
  
          sx={{
            textDecoration: "underline",
            verticalAlign: 'top',
          
          }}
        >
          {comment.username} 
        </Typography>
        </Link>
        <Typography align="left" sx={{ verticalAlign: 'top'}} variant="subtitle1">
          {comment.create_date}
        </Typography>
        <div className='btn-box'>
        <Typography variant="h6" align="left">
          {editForm == true ? (
            <>
              <textarea
                className="commentField"
                rows={5}
                cols={30}
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
        </div>
        <br />
        </div>
        </div>
      </div>
    </>
  ) : null
};

export default CommentCard;
