import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from "react-router-dom";
import { getOnePostById } from '../../store/posts';
import EditFormModal from '../EditPostModal';


function SinglePost({ post }) {

    const dispatch = useDispatch();
    let id = post.id
    
    const postFromState = useSelector(state => state.posts[id] )
    
    
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
                 
            </div>
        )
    } else {
        return null
    }
}

export default SinglePost;
