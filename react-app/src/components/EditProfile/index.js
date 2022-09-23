import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { editUserProfile, loadUserProfile } from "../../store/profile";
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

  const [name, setName] = useState(profile.name);
  const [bio, setBio] = useState(profile.bio);
  const [gender, setGender] = useState(profile.gender);
  const [profileImage, setProfileImage] = useState(profile.profile_img);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateName = (e) => setName(e.target.value);
  const updateBio = (e) => setBio(e.target.value);
  const updateGender = (e) => setGender(e.target.value);
  const updateProfileImage = (e) => setProfileImage(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(loadUserProfile(userId));
  }, [dispatch]);

  useEffect(() => {
    if (profile.id) {
      console.log("HERE");
      setIsLoaded(true);
      setName(profile.name);
      setBio(profile.bio);
      setGender(profile.gender);
      setProfileImage(profile.profile_img);
    }
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      name: name,
      bio: bio,
      gender: gender,
      profile_img: profileImage,
    };

    return dispatch(editUserProfile(userId, data))
      .then(async (res) => {
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

  if (isLoaded) {
    return (
      <div className="editProfileContainer">
        <div className="profilePreview">
          <img className="profilePicEdit" src={profileImage}></img>
          <div className="profilePreviewName">{name}</div>
          <div className="profilePreviewBio">"{bio}"</div>
        </div>
        <div className="editProfileFormContainer">
          <form className="profileEdit" onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <label>
              <span>Name:</span>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={updateName} required
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
                onChange={updateProfileImage} required
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
    );
  } else {
    return <div>Loading... </div>;
  }
};

export default EditProfile;
