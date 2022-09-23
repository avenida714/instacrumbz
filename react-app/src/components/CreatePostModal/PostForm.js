import React from "react";
import { useState, useEffect } from "react";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {createAPost, deleteAPost, getOnePostById, updateAPost} from "../../store/posts";
import "./PostForm.css";
import { deleteAComment } from "../../store/comment";
import { loadUserProfile } from "../../store/profile";

const PostForm = ({ post, formType, onClick }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.session.user);

  const [image_url, setImage_url] = useState(post.image_url || "");
  const [caption, setCaption] = useState(post.caption || "");
  const [location, setLocation] = useState(post.location || "");
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [validationImage, setValidationImage] = useState(false);
  // const [showModal, setShowModal] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch(image_url);
  //     if (response.ok) {
  //       setValidationImage(true)
  //     }

  // })()}, [image_url])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (validationErrors.length > 0) {
      return alert("Cannot Submit");
    }
    if (!user) return alert("Please log in/sign up before become a host!");

    post = {
      ...post,
      image_url,
      caption,
      location,
    };

    if (formType === "Create Post") {
      const newPost = await dispatch(createAPost(post));

      if (newPost) {
        dispatch(getOnePostById(newPost.id));
        // dispatch(loadUserProfile(user.id))
      }
      onClick();
      history.push(`/profile/${user.id}`);
    } else {
      const editdata = await dispatch(updateAPost(post));

      // if (editdata) dispatch(getOnePostById(post.id))
      onClick();
    }

    setImage_url("");
    setCaption("");
    setLocation("");
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
    if (
      !image_url?.includes("jpg") &&
      !image_url?.includes("jpeg") &&
      !image_url?.includes("png")
    ) {
      errors.push("Please use jpg, jpeg or png");
    }

    setValidationErrors(errors);
  }, [image_url, caption, location]);

  return (
    <div className='Container'>
      <div className='new-post'>New Post</div>
      <form className="Form_container" onSubmit={handleSubmit}>
        <div>
          <ul className="Form_errors">
            {hasSubmitted &&
              validationErrors.map((error) => (
                <li className="Form_list_error" key={error}>
                  {error}
                </li>
              ))}
          </ul>
        </div>

        <div className="image_url">
          <label className="label_input">
            Image_url:
            <input
              className="PostForm_input"
              type="text"
              autoFocus
              placeholder="Image_url... .jpg / .jpeg / .png"
              value={image_url}
              onChange={(e) => setImage_url(e.target.value)}
            />
          </label>
        </div>

        <div className="caption_div">
          <label className="caption">
            Caption:
            <textarea
              className="PostForm_textarea"
              type="text"
              placeholder="Caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label className="label_Location">
            Location:
            <input
              className="location"
              type="text"
              placeholder="Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
        </div>
        <input className="PostForm_button" type="submit" value={formType} />
      </form>
      <div className="Button_div">
        {formType === "Update Post" && (
          <button className="delete_Btn" onClick={() => deletePost(post.id)}>
            <i className="fa-solid fa-trash-can"></i> Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default PostForm;
