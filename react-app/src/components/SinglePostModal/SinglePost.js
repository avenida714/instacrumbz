import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useHistory, useParams } from "react-router-dom";
import { createComment } from "../../store/comment";
import { getOnePostById } from "../../store/posts";
import EditFormModal from "../EditPostModal";

import "./SinglePost.css";

function SinglePost({ post }) {
  const dispatch = useDispatch();

  const history = useHistory();

  const usersProfilePage = () => {
    let path = `/profile/${post.owner_id}`;
    history.push(path);
  };

  const currUser = useSelector(state => state.session.user);


  const [ comment, setComment ] = useState('');
  const [ isDisabled, setIsDisabled ] = useState(false);


  let id = post.id


  const handleSubmit = (e) => {
    e.preventDefault();

    let newComment = {
        comment: comment,
        user_id: currUser.id,
        post_id: id
    };

    dispatch(createComment(newComment));
    setComment("");

};


  if (post) {
    return (
      <div className="outer-most-div-dont-style-me">


        <div className="left-half">
          <img src={post.image_url} alt="post" className="img" />
        </div>



        <div className="right-half">


          <div className="right-half-inner">
            <div className="underline">
              <div className="header-pc">
                <div className="user-icon-pc" onClick={usersProfilePage}>
                  <img
                    alt="post"
                    className="img circle"
                    src={post.user.profile_img}
                  />
                </div>
                <div className="header-info">
                  <div>{post.user.username}</div>
                  <div className="gray">{post.location}</div>
                </div>
              </div>
            </div>
            <div className="caption-comments">

            <div className="comment-display-pc">
            <div>{post.caption}</div>
              {post.comments.map((comment) => (
                <div key={comment.id}> {comment.comment} </div>
              ))}
            </div>
            </div>
            <div className="leave-comment-pc" /* comment text area */ >
                <form className="comment-form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className="comment-area"
                        placeholder="Add a comment..."
                        value={ comment }
                        onChange = {(e) => setComment(e.target.value)}
                    />
                    <button className="post-comment" disabled={ isDisabled }>Post</button>
                </form>
            </div>
          </div>
        </div>


      </div>
    );
  } else {
    return null;
  }
}

export default SinglePost;
