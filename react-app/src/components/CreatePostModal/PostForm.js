import React from 'react';
import { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createAPost, getOnePostById, updateAPost } from '../../store/posts';
import "./PostForm.css"



const PostForm = ({ post, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(state => state.session.user)

    const [image_url, setImage_url] = useState(post.image_url || "")
    const [caption, setCaption] = useState(post.caption || "")
    const [location, setLocation] = useState(post.location || "")
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [showModal, setShowModal] = useState(true);


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

      console.log("*************post: ", post)

      if (formType === "Create Post") {
        const newPost = await dispatch(createAPost(post))

        if (newPost) history.push(`/profile/${user.id}`);

      } else {
        const editdata = await dispatch(updateAPost(post))
        //  history.push(`/profile/${user.id}`);
        if (editdata) dispatch(getOnePostById(post.id))
        history.push(`/profile/${user.id}`);

      }

      setImage_url('');
      setCaption('');
      setLocation('');
      setValidationErrors([]);
      setHasSubmitted(false);


    };


    useEffect(() => {
  //     dispatch(updateAPost(post)).then(() =>
  //     dispatch(getOnePostById(post.id)))
  //     .then(() => setIsLoaded(true));
  }, [ dispatch, post, image_url, caption, location ]);


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
                  placeholder="image_url..."
                  value={image_url}
                  onChange={e => setImage_url(e.target.value)}
                />
              </label>
            </div>

            <div>
              <label>
                caption:
                <textarea
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
            <input className="Create_spot_button" type="submit" value={formType} />
         </form>
    </div>

    )
}

export default PostForm;