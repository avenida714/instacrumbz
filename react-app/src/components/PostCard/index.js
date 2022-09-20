import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiHeartOutline } from "react-icons/ti";
import "./PostCard.css"
import '../../index.css'
// import createComment from "../../store/comment"

//TO-DO: Rudy finish Post Card
const PostCard = ({ post, currUser }) => {

    const dispatch = useDispatch();

    const [ comment, setComment ] = useState('');
    const [ errors, setErrors ] = useState('');

    useEffect(() => {
        let errors = [];
        if (comment.length > 2000) errors.push('Comment should be less than 2000 characters!')
        if (comment === "") errors.push('Please leave a comment!')
        errors = setErrors(errors)
    }, [ comment ]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let newComment = {
            comment: comment,
            user_id: currUser.id,
            post_id: post.id
        };

        // dispatch(createComment(newComment));
        setComment("");

    };

    return (
        <div className="outter-div-pc" /* outter main div container for single post */ >
            <div className="header-pc" >
                <div className="user-icon-pc">
                    <img className="img circle" src={ post.user.profile_img }/>
                </div>
                <div className="header-info">
                    <div>{ post.user.username }</div>
                    <div>{ post.location }</div>
                </div>
            </div>
            <div className="post-card-img-container" /* image display container */ >
                <img className="img" src={ post?.image_url } />
            </div>
            <div>
                <TiHeartOutline className="heart-pc" />
            </div>
            <div className="caption-pc" /* caption container */ >
                <div>{ post.user.username }</div>
                <div>{ post.caption }</div>
            </div>
            <div className="comment-display-pc">
                { post.comments.map((comment) => (
                        <div key={comment.id}> { comment.comment } </div>
                    ))
                }
            </div>
            <div className="leave-comment-pc" /* comment text area */ >
                <>
                </>
            </div>
        </div>
    )
};

export default PostCard;
