import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAPost, deleteAPost, getOnePostById, updateAPost } from '../../store/posts';
import "./PostForm.css"
import { deleteAComment } from '../../store/comment';
import { loadUserProfile } from '../../store/profile';



const PostForm = ({ post, formType, onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector(state => state.session.user)

  const [image_url, setImage_url] = useState(post.image_url || "")
  const [caption, setCaption] = useState(post.caption || "")
  const [location, setLocation] = useState(post.location || "")
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(true);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }
    if (!user) return alert("Please log in/sign up before become a host!")

    post = {
      ...post,
      image_url,
      caption,
      location,
    };

    // console.log("*************post: ", post)

    if (formType === "Create Post") {
      const newPost = await dispatch(createAPost(post))

      // if (newPost) {
      //   dispatch(getOnePostById(post.id))
      //   // dispatch(loadUserProfile(user.id))
      // }
      onClick()
      history.push(`/profile/${user.id}`);

    } else {
      const editdata = await dispatch(updateAPost(post))

      // if (editdata) dispatch(getOnePostById(post.id))
      onClick()

    }


    setImage_url('');
    setCaption('');
    setLocation('');
    setValidationErrors([]);
    setHasSubmitted(false);
  };

  // let id = post.id
  // console.log("id", id)
  // const postFromState = useSelector(state => state.posts[id])

  // const handleDelete = async (e) => {

  //   const del = await dispatch(deleteAPost(post.id))

  //   if (del) setShowModal(false)
  //     history.push(`/profile/${user.id}`);

  //   }

  //   useEffect(() => {
  //     dispatch(deleteAPost(postFromState.id))
  // }, [dispatch]);

  const deletePost = async (id) => {
    const del = await dispatch(deleteAPost(id));
    if (del) alert("Successfully deleted the post, see you later.");
    history.push(`/profile/${user.id}`);
  };



  useEffect(() => {
    let errors = [];
    if (!image_url.length) {
      errors.push("Image's url is required");
    }
    if (!caption.length) {
      errors.push("Caption is required");
    }
    if (!location.length) {
      errors.push("Location is required");
    }

    setValidationErrors(errors);

  }, [image_url, caption, location])


  return (
    <div>
      <form className="Form_container" onSubmit={handleSubmit}>
        <div>
          <ul className="Form_errors">
            {hasSubmitted && validationErrors.map(error => (
              <li className='Form_list_error' key={error}>
                {error}
              </li>
            ))}
          </ul>
        </div>

        <div className='Container'>
          <label >
            image_url:
            <input
              type="text"
              autoFocus
              placeholder="image_url..."
              value={image_url}
              onChange={e => setImage_url(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            caption:
            <textarea className='PostForm_textarea'
              type="text"
              placeholder="caption..."
              value={caption}
              onChange={e => setCaption(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            location:
            <input
              type="text"
              placeholder="location..."
              value={location}
              onChange={e => setLocation(e.target.value)}
            />
          </label>
        </div>
        <input type="submit" value={formType} />
      </form>
      {(formType === "Update Post") && ( <button onClick={() => deletePost(post.id)}>
                  <i className="fa-solid fa-trash-can"></i> Delete</button> )}
    </div>
  )
}

        export default PostForm;
