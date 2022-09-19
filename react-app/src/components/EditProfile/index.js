import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams, useHistory } from "react-router-dom";
import { editUserProfile, loadUserProfile } from "../../store/profile";

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { userId } = useParams();
  userId = Number(userId);
  const sessionUser = useSelector((state) => state.session.user);
  const profile = useSelector((state) => state.session.user);
  console.log("here-------", profile);

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
      profileImage: profileImage,
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


  if (isLoaded) {
    return (
      <div className="editProfileContainer">
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
              onChange={updateName}
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
            />
          </label>
          <div className="editProfileButton">
            <button className="backButton" onClick={history.goBack}>
              Go Back
            </button>
            <button className="editProfileButton" type="submit">
              Edit Profile
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
};

export default EditProfile;
