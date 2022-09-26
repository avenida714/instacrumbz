import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css";

const SignUpForm = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const user = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert("Cannot Submit");
    }
    if (password === repeatPassword) {
      // console.log("SignUpForm");
      // console.log(profileImage);
      const data = await dispatch(
        signUp(username, name, email, password)
      );
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateName = (e) => {
    setName(e.target.value);
  };
  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  // const updateProfileImage = (e) => {
  //   setProfileImage(e.target.value);
  // };

  // useEffect(() =>{

  //   if(!email.length && !username.length && !password.length && !repeatPassword.length){

  //     setIsDisabled(false);
  //   }else{
  //     setIsDisabled(true)
  //   }

  // },[email,username, password, repeatPassword])

  useEffect(() => {
    let errs = [];

    if (username.length > 30 || username.length <= 5) {
      errs.push("Username : Username must between 6 to 30");
    }
    if (!email.includes("@")) {
      errs.push("Email: Please provide a valid Email");
    }

    if (name.length > 16 || name.length < 1) {
      errs.push("Name: Name must between 1 to 16");
    }

    if (name.includes(".")) {
      errs.push("Name: Name can't be period");
    }

    if (password.length <= 5) {
      errs.push("Password length must be greater than 5");
    }
    if (password !== repeatPassword)
      errs.push("Password and Confirm password does not match");


    setErrors(errs);
  }, [email, username, name, password, repeatPassword]);

  if (user) {
    return <Redirect to={`/`} />;
  }

  return (
    <div className="singup_container">
      <form className="signup_form_container" onSubmit={onSignUp}>
        <div className="wording">Instacrumbz</div>
        <div className="signup_to_see_wording">
          Sign up to see your friends' photos and videos.
        </div>
        <div className="email_div">
          <label></label>
          <input
            className="signup_input"
            type="text"
            name="email"
            placeholder="email"
            onChange={updateEmail}
            required
            value={email}
          ></input>
        </div>
        <div className="username_div">
          <label></label>
          <input
            className="signup_input"
            type="text"
            name="name"
            onChange={updateName}
            value={name}
            required
            placeholder="name"
          ></input>
        </div>
        <div className="username_div">
          <label></label>
          <input
            className="signup_input"
            type="text"
            name="username"
            placeholder="username"
            onChange={updateUsername}
            required
            value={username}
          ></input>
        </div>
        {/* <div className="username_div">
          <label></label>
          <input
            className="signup_input"
            type="text"
            name="Profile Image URL"
            placeholder="Profile Image URL"
            onChange={updateProfileImage}
            required
            value={profileImage}
          ></input>
        </div> */}
        <div className="password_div">
          <label></label>
          <input
            className="signup_input"
            type="password"
            name="password"
            placeholder="password"
            onChange={updatePassword}
            required
            value={password}
          ></input>
        </div>
        <div className="repeat_password_div">
          <label></label>
          <input
            className="signup_input"
            type="password"
            name="repeat_password"
            placeholder="repeat password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="word_div">
          Users of our services may have uploaded your contact details to
          Instagram
        </div>
        <div className="By register_word_div">
          By registering, you agree to our Terms of Service , Privacy Policy and
          Cookie Policy
        </div>
        <button className="signup_button" type="submit">
          register
        </button>
        {/* <div className="errorssss">
          {hasSubmitted &&
            validationErrors.map((error, ind) => <div key={ind}>{error}</div>)}
        </div> */}
        <div className="errorssss">
          {hasSubmitted &&
            errors.map((error, ind) => <div key={ind}>{error}</div>)}
        </div>
      </form>

      <div className="register_signup">
        Already have an account?{" "}
        <NavLink className="login_link login-text" to="/login">
          login
        </NavLink>
      </div>
      {/* <div className="signup_footer">
        © 2022 Instacrumbz from Alec, Rudy, Ray, David
      </div> */}
    </div>
  );
};

export default SignUpForm;
