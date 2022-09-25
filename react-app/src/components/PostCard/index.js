import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiHeartFullOutline, TiHeartOutline } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import "./PostCard.css";
import "../../index.css";
import { createComment, getPostComment } from "../../store/comment";
import { getAllPosts, getOnePostById, likeAPost } from "../../store/posts";
import EditCommentModal from "../Comments/EditCommentFormModal";

//TO-DO: Rudy finish Post Card
const PostCard = ({ post, currUser }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const sessionUser = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState("");
  const [isLikedByUser, setIsLikedByUser] = useState(false);

  let id = post.id;

  const type = () => dispatch(getAllPosts());

  useEffect(() => {
    // console.log("POST LIKE CHANGED", post.id);
    // console.log(post.likes);
    post.likes.forEach((userIdWhoLiked) => {
      if (sessionUser.id === userIdWhoLiked) {
        setIsLikedByUser(true);
        return;
      }
    });
  }, [post.likes]);

  useEffect(() => {
    let errors = [];
    if (comment.length > 255)
      errors.push("Comment should be 1 to 255 characters!");
    if (!comment) errors.push("At least one character is needed!");
    setErrors(errors);
  }, [comment]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let newComment = {
      comment: comment,
      user_id: currUser.id,
      post_id: id,
    };

    dispatch(createComment(newComment));

    setComment("");
  };

  const usersProfilePage = () => {
    let path = `/profile/${post.owner_id}`;
    history.push(path);
  };

  useEffect(() => {
    dispatch(getPostComment(post.id));
  }, [dispatch]);

  const likePost = (post) => {
    console.log(post);
    dispatch(likeAPost(post));
    // dispatch(getAllPosts());
    // await dispatch(getOnePostById(post.id));
    setIsLikedByUser(!isLikedByUser);
    const index = post.likes.indexOf(sessionUser.id);
    if (!isLikedByUser) {
      post.likes.push(sessionUser.id);
    } else {
      post.likes.splice(index, 1);
    }
  };

  return (
    <div
      className="outter-div-pc" /* outter main div container for single post */
    >
      <div className="header-pc">
        <div className="user-icon-pc" onClick={usersProfilePage}>
          <img alt="post" className="img circle" src={post.user.profile_img} />
        </div>
        <div className="header-info-pc">
          <div>{post.user.username}</div>
          <div className="gray">{post.location}</div>
        </div>
      </div>
      <div
        className="post-card-img-container padding" /* image display container */
      >
        <img className="img" alt="post" src={post?.image_url} />
      </div>
      <div className="likes padding">
        {isLikedByUser ? (
          <TiHeartFullOutline
            className="heart-pc-fill"
            onClick={() => {
              likePost(post);
            }}
          />
        ) : (
          <TiHeartOutline
            className="heart-pc"
            onClick={() => {
              likePost(post);
            }}
          />
        )}
        <div className="likes-count"> {post?.likes.length || "0"} likes </div>
      </div>
      <div className="caption-pc" /* caption container */>
        <div className="bold">{post.user.username}</div>
        <div>{post.caption}</div>
      </div>
      <div className="comments-header-pc">Comments:</div>
      <div className="comment-display-pc">
        {post.comments.map((comment) => (
          <div key={comment.id} className="caption-pc">
            <div
              className="bold cursor"
              onClick={() => {
                history.push(`/profile/${comment.user.id}`);
              }}
            >
              {comment.user.username}:
            </div>
            <div>{comment.comment}</div>
            {comment.user.id === currUser.id && (
              <EditCommentModal
                type={type}
                post={post}
                comment1={comment.comment}
                commentId={comment.id}
              />
            )}
          </div>
        ))}
      </div>
      <div className="leave-comment-pc" /* comment text area */>
        <form className="comment-form" onSubmit={handleSubmit}>
          {/* <ul className="errors-pc">
                { errorsList }
            </ul> */}
          <input
            type="text"
            value={comment}
            className="comment-area"
            placeholder="Add a comment..."
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="post-comment"
            disabled={errors.length > 0}
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostCard;
