import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteAPost, getOnePostById } from '../../store/posts';



import EditFormModal from '../EditPostModal';

import "./SinglePost.css";

function SinglePost({ post }) {
  const dispatch = useDispatch();


  if (post) {
    return (
      <div className="outer-most-div-dont-style-me">
        <div className="image-container">


    const history = useHistory()
    const dispatch = useDispatch();
    let id = post.id
    
    const postFromState = useSelector(state => state.posts[id] )
    const user = useSelector(state => state.session.user)
    
    const deletePost = async (id) => {
			const del = await dispatch(deleteAPost(id));
			if (del) alert("Successfully deleted the post, see you later.");
				history.push(`/`);
                history.push(`/profile/${user.id}`);
			
		
	};
    
    useEffect(() => {
        dispatch(getOnePostById(post.id))
    }, [dispatch]);
  
    if (postFromState) {

        return (
            <div>
                <EditFormModal post={postFromState}/>
                <div><img src={postFromState.image_url} /></div>
                <div>{postFromState.location}</div>
                <div>Comments Component: </div>
                <div>{postFromState.caption}</div>
                <div>{postFromState.user.username}</div>
                <button onClick={ () => deletePost(id) }><i className="fa-solid fa-trash-can"></i> Delete</button>

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
