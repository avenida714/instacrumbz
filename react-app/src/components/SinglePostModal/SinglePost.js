
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useParams } from "react-router-dom";
import { getOnePostById } from '../../store/posts';
import EditFormModal from '../EditPostModal';

import "./SinglePost.css";

function SinglePost({ post }) {
  const dispatch = useDispatch();


  if (post) {
    return (
      <div className="outer-most-div-dont-style-me">
        <div className="image-container">

          <div className="left-half">
            <div className="post-image">
              <img src={post.image_url} alt="post" className="image" />
            </div>
          </div>


          <div className="right-half">
            <div className="post-location">{post.location}</div>
                <div className="comment-display-pc">
            {post.comments.map((comment) => (
              <div key={comment.id}> {comment.comment} </div>
            ))}
          </div>
          <div>{post.caption}</div>
          <div>{post.user.username}</div>
          </div>

        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default SinglePost;
