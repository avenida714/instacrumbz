import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAComment, updateAComment } from "../../store/comment";
import { getOnePostById, getPostsOtherUserId } from "../../store/posts";
import { getAllPosts } from "../../store/posts";
import "./EditCommentForm.css";

function EditCommentForm({ post, comment1, commentId, onHide, type }) {
  console.log("**************** let's see the post ID", post.id);

  const history = useHistory();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);

  let id = post.id;

  const [comment, setComment] = useState(comment1);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }

    let editedComment = {
      comment: comment,
      user_id: currUser.id,
      post_id: id,
    };

    console.log("editedComment**********", editedComment);

    const editCom = await dispatch(updateAComment(editedComment, commentId));
    if (editCom) {
      onHide();
      type()
    }

    setComment("");
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  const deleteComment = async (id) => {
    const del = await dispatch(deleteAComment(id));
    if (del) alert("I have successfully eaten the comment for you!!!");
    onHide();
    type()
  };

  useEffect(() => {
    dispatch(getOnePostById(id));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllPosts()).then(() => setIsLoaded(true));
  }, [dispatch]);

  useEffect(() => {
    let errors = [];
    if (comment.length > 2000) {
      errors.push(
        "Don't bite off more than you can chew! Make your comment fewer than 2000 characters, please."
      );
    }

    setValidationErrors(errors);
  }, [comment]);

  return (
    <div className="leave-comment-pc" /* comment text area */>
      <form className="comment-form" onSubmit={handleSubmit}>
        <div>
          <ul>
            {hasSubmitted &&
              validationErrors.map((error) => <li key={error}>{error}</li>)}
          </ul>
        </div>

        <input
          className="comment_input"
          type="text"
          autoFocus
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button className="post-comment">
          {" "}
          <i className="fa-solid fa-pen-to-square"></i>
          Update
        </button>
      </form>

      <button onClick={() => deleteComment(commentId)}>
        <i className="fa-solid fa-trash-can"></i> Delete
      </button>
    </div>
  );
}

export default EditCommentForm;
