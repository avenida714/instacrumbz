import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteAPost, getOnePostById, getPostsOtherUserId } from "../../store/posts";
import EditFormModal from "../EditPostModal";
import { createComment, deleteAComment } from "../../store/comment";
import "./SinglePost.css";
import EditCommentModal from "../Comments/EditCommentFormModal";

function SinglePost({ post }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const usersProfilePage = () => {
    let path = `/profile/${post.owner_id}`;
    history.push(path);
  };

  const currUser = useSelector((state) => state.session.user);

  const [comment, setComment] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  let id = post.id;

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



  const type = () => dispatch(getPostsOtherUserId(currUser.id))
  

  const postFromState = useSelector((state) => state.posts[id]);
  const user = useSelector((state) => state.session.user);


  useEffect(() => {
    dispatch(getOnePostById(post.id));
  }, [dispatch]);

  if (postFromState) {
    return (
      <>
        <div className="outer-most-div-dont-style-me">
          <div className="left-half">
            <img src={postFromState.image_url} alt="post" className="img" />
          </div>

          <div className="right-half">
            <div className="right-half-inner">
              <div className="underline">

                <div className="header-sp">

                  <div className="user-icon-pc" onClick={usersProfilePage}>
                    <img
                      alt="post"
                      className="img circle"
                      src={postFromState.user.profile_img}
                    />
                  </div>
                  <div className="header-info">
                    <div>{postFromState.user.username}</div>
                    <div className="gray">{postFromState.location}</div>
                  </div>
                  <div className="elipsis">
                    <EditFormModal post={postFromState} />
                    {/* <div><img src={postFromState.image_url} /></div>
                <div>{postFromState.location}</div>
                <div>Comments Component: </div>
                <div>{postFromState.caption}</div>
                <div>{postFromState.user.username}</div> */}
                  </div>
                </div>
              </div>
              <div className="caption-comments">
                <div className="comment-display-sp">
                  <div className="post-caption">{postFromState.caption}</div>
                  {postFromState.comments.map((comment) => (
                    <div className="comment_line" key={comment.id}>
                      <div className="user-icon-pc" onClick={usersProfilePage}>
                        <img
                          alt="post"
                          className="img circle"
                          src={comment.user.profile_img}
                        />
                      </div>

                      <div className="bold">{comment.user.username}:</div>
                      <div className="comment_content"> {comment.comment}</div>
                      <div className="comment_content">
                        {comment.user.id === currUser.id && (
                          <EditCommentModal
                            post={post}
                            comment1={comment.comment}
                            commentId={comment.id}
                            type={type}
                          />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="leave-comment-pc" /* comment text area */>
                <form className="comment-form" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="comment-area"
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <button className="post-comment" disabled={isDisabled}>
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return null;
  }
}

export default SinglePost;
