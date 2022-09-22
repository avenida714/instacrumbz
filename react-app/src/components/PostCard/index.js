import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiHeartOutline } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import "./PostCard.css"
import '../../index.css'
import { createComment } from "../../store/comment"

//TO-DO: Rudy finish Post Card
const PostCard = ({ post, currUser }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [ comment, setComment ] = useState('');
    const [ errors, setErrors ] = useState('');
    const [ isDisabled, setIsDisabled ] = useState(false);

    let id = post.id

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
            post_id: id
        };

        dispatch(createComment(newComment));
        setComment("");

    };

    const usersProfilePage = () => {
        let path = `/profile/${post.owner_id}`;
        history.push(path);
    };

    return (
        <div className="outter-div-pc" /* outter main div container for single post */ >
            <div className="header-pc" >
                <div className="user-icon-pc" onClick={usersProfilePage}>
                    <img alt="post" className="img circle" src={ post.user.profile_img }/>
                </div>
                <div className="header-info-pc">
                    <div>{ post.user.username }</div>
                    <div className="gray">{ post.location }</div>
                </div>
            </div>
            <div className="post-card-img-container padding" /* image display container */ >
                <img className="img" alt="post" src={ post?.image_url } />
            </div>
            <div className="likes padding">
                <TiHeartOutline className="heart-pc" />
                <div className="likes-count">
                    {post?.likes || "0"} likes
                </div>
            </div>
            <div className="caption-pc" /* caption container */ >
                <div className="bold">{ post.user.username }</div>
                <div>{ post.caption }</div>
            </div>
            <div className="comments-header-pc">Comments:</div>
            <div className="comment-display-pc">
                { post.comments.map((comment) => (
                        <div key={comment.id} className="caption-pc">
                        <div className="bold">{ comment.user.username }:</div>
                        <div>{ comment.comment }</div>
                        </div>
                    ))
                }
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
    )
};

export default PostCard;
