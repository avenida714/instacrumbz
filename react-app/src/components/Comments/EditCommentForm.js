import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAComment } from "../../store/comment";
import { getOnePostById } from "../../store/posts";




function EditCommentForm({ post, comment1, commentId, onClick}) {

  console.log("**************** let's see the post ID", post.id)

  const history = useHistory();
  const dispatch = useDispatch();


  const currUser = useSelector((state) => state.session.user);

  let id = post.id;

  const [comment, setComment] = useState(comment1);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);




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

    console.log("editedComment**********", editedComment)


    const editCom = await dispatch(updateAComment(editedComment, commentId));
    if(editCom) {
        onClick()
        history.push("/profile/1")
        history.push("/")
    }
 

    setComment("");
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  useEffect(() => {
    dispatch(getOnePostById(id));
  }, [dispatch]);


  useEffect(() => {
    let errors = [];
    if (comment.length > 2000) {
      errors.push("Don't bite off more than you can chew! Make your comment fewer than 2000 characters, please.");
    }

    setValidationErrors(errors);

  }, [comment])



  return (
    <div className="leave-comment-pc" /* comment text area */>
    <form className="comment-form" onSubmit={handleSubmit}>
    <div>
          <ul>
            {hasSubmitted && validationErrors.map(error => (
              <li  key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>

      <input
        type="text"
        className="comment-area"
        placeholder="Add a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="post-comment">
        Edit
      </button>
    </form>

  </div>
  )
}

export default EditCommentForm
