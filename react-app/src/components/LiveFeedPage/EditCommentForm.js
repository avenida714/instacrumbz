import React from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import LiveFeedPage from '.';




const EditCommentForm = ({post}) => {
    // const {postId} = useParams();
    // console.log("postId from EditPost***********", postId)
    
    const post = useSelector(state => state.post[post.id])
    console.log("post from EditPost***************", post)

    return (
        <LiveFeedPage post={post} formType="Update Post" />
      );
    }

    export default EditCommentForm;