import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAComment } from "../../store/comment";
import { getOnePostById } from "../../store/posts";




function EditCommentForm({ post }) {

  const history = useHistory();
  const dispatch = useDispatch();

  const currUser = useSelector((state) => state.session.user);

  let id = post.id;

  const [comment, setComment] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);



  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }

    let newComment = {
      comment: comment,
      user_id: currUser.id,
      post_id: id,
    };

    dispatch(updateAComment(newComment));
    setComment("");
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  useEffect(() => {
    dispatch(getOnePostById(post.id));
  }, [dispatch]);


  useEffect(() => {
    let errors = [];
    if (comment.length > 2000) {
      errors.push("Don't bite off more than you can chew! Make your comment fewer than 2000 characters, please.");
    }

    setValidationErrors(errors);

  }, [comment])



  return (
    <div>EditCommentForm</div>
  )
}

export default EditCommentForm
