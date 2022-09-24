import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editUserProfile, loadUserProfile } from "../../store/profile";
import { loadUserRequest } from "../../store/session";
import "./EditProfile.css";

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  let { userId } = useParams();
  userId = Number(userId);
  const profile = useSelector((state) => {
    console.log("STATE");
    console.log(state);
    if (state.profile.profile) {
      return state.profile.profile[0];
    }
    return state.profile;
  });
  console.log("PROFILE");
  console.log(profile);

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [gender, setGender] = useState(profile.gender);
  const [profileImage, setProfileImage] = useState(profile.profile_img);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  console.log(name);
  console.log(bio);

  const updateName = (e) => setName(e.target.value);
  const updateBio = (e) => setBio(e.target.value);
  const updateGender = (e) => setGender(e.target.value);
  const updateProfileImage = (e) => setProfileImage(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadUserProfile(userId)).then(() => {
      console.log("ISLOADED");
      console.log(profile);
      console.log(sessionUser);
      setIsLoaded(true);
    });
  }, [dispatch]);

  // useEffect(() => {
  //   if (profile.name && profile.bio) {
  //     console.log("HERE");
  //     console.log(profile);
  //     setIsLoaded(true);
  //     setName(profile.name);
  //     setBio(profile.bio);
  //     setGender(profile.gender);
  //     setProfileImage(profile.profile_img);
  //   }
  // }, [profile]);
  
  useEffect(() => {
    let errors = [];

    if (
      !profileImage?.includes("jpg") &&
      !profileImage?.includes("jpeg") &&
      !profileImage?.includes("png")
    ) {
      errors.push("Please provide validate url form jpg, jpeg or png");
    }

    setErrors(errors);
  }, [profileImage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert("Cannot Submit");
    }
    setErrors([]);
    let data = {
      name: name,
      bio: bio,
      gender: gender,
      profile_img: profileImage,
    };

    return dispatch(editUserProfile(userId, data)) // updates state.profile.profile
      .then(async (res) => {
        dispatch(loadUserRequest(userId)); // update state.session.user
        setSubmitSuccess(true);
        let path = `/profile/${userId}/`;
        history.push(path);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data) {
          if (data.errors) {
            setErrors(data.errors);
          } else if (data.message) {
            setErrors([data.message]);
          }
        }
      });
  };

  const redirectBack = (e) => {
    e.preventDefault();
    let path = `/profile/${sessionUser.id}`;
    history.push(path);
  };

  if (sessionUser.id !== userId) {
    let path = `/`;
    history.push(path);
  }

  if (isLoaded) {
    return (
      <div>
        <div className="editProfileContainer">
          <div className="profilePreview">
            <img className="profilePicEdit" src={profileImage}></img>
            <div className="profilePreviewName">{name}</div>
            <div className="profilePreviewBio">"{bio}"</div>
          </div>
          <div className="editProfileFormContainer">
            <form className="profileEdit" onSubmit={handleSubmit}>
              <ul>
                <div className="editprofileLabel">Edit Profile:</div>
                {hasSubmitted && errors.map((error, idx) => (
                  <li className="editProfile_li" key={idx}>{error}</li>
                ))}
              </ul>
              <label>
                <span>Name:</span>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={updateName}
                  required
                />
              </label>
              <label>
                <span>Bio:</span>
                <input
                  type="text"
                  placeholder="Bio"
                  value={bio}
                  onChange={updateBio}
                />
              </label>
              <label>
                <span>Gender:</span>
                <input
                  type="text"
                  placeholder="Gender"
                  value={gender}
                  onChange={updateGender}
                />
              </label>
              <label>
                <span>Profile Image:</span>
                <input
                  type="text"
                  placeholder="Profile Image URL"
                  value={profileImage}
                  onChange={updateProfileImage}
                  required
                />
              </label>
              <div className="editProfileButton">
                <button className="backButton" onClick={redirectBack}>
                  Cancel
                </button>
                <button className="editProfileButton" type="submit">
                  Edit Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
};

export default EditProfile;
