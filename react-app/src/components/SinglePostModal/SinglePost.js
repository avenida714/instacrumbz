import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from "react-router-dom";
import { deleteAPost, getOnePostById } from '../../store/posts';
import EditFormModal from '../EditPostModal';
import { createComment } from "../../store/comment";
import "./SinglePost.css";

function SinglePost({ post }) {

    const history = useHistory()
    const dispatch = useDispatch();

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
            <>
            <div>
                <EditFormModal post={postFromState}/>
                {/* <div><img src={postFromState.image_url} /></div>
                <div>{postFromState.location}</div>
                <div>Comments Component: </div>
                <div>{postFromState.caption}</div>
                <div>{postFromState.user.username}</div> */}
                
            </div>

            <div className="outer-most-div-dont-style-me">


        <div className="left-half">
          <img src={postFromState.image_url} alt="post" className="img" />
        </div>



        <div className="right-half">


          <div className="right-half-inner">
            <div className="underline">
              <div className="header-pc">
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
              </div>
            </div>
            <div className="caption-comments">

            <div className="comment-display-pc">
            <div>{postFromState.caption}</div>
              {postFromState.comments.map((comment) => (
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
                <button onClick={ () => deletePost(id) }><i className="fa-solid fa-trash-can"></i> Delete</button>
            </div>
          </div>
        </div>


      </div>

        </>    
        )
    } else {
        return null
    }
}

export default SinglePost;
