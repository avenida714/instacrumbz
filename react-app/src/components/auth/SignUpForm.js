import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import "./SignupForm.css"


const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (errors.length > 0) {
      return alert("Cannot Submit");
    }
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, name, email, password));
      if (data) {
        setErrors(data);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
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

  useEffect(() => {
    let errs = [];
    if (!username.length) {
      errs.push("Username is required");
    }
    if (username.length > 30 || username.length <= 5) {
      errs.push("Username must between 6 to 30");
    }
    if (!email.includes("@")) {
      errs.push("Please provide a valid Email");
    }
    if (!name.length) {
      errs.push("Name is required");
    }
    if (name.length > 50 || name.length <= 4) {
      errs.push("Name must between 4 to 50");
    }
    if (!password.length) {
      errs.push("Password is required");
    }
    if (password.length <= 5) {
      errs.push("Password must at least 6 characters");
    }

    setErrors(errs);

  }, [name, email, username]);

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="singup_container" >
      <form className="signup_form_container" onSubmit={onSignUp}>

        <div className="wording">Instacrumbz</div>
        <div className="signup_to_see_wording">Sign up to see your friends' photos and videos.</div>
        <div className="email_div">
          <label></label>
          <input className="signup_input"
            type="text"
            name="email"
            placeholder="email"
            onChange={updateEmail}
            value={email}
          ></input>
        </div>
        <div className="username_div">
          <label></label>
          <input className="signup_input"
            type="text"
            name="name"
            placeholder="full name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
        </div>
        <div className="username_div">
          <label></label>
          <input className="signup_input"
            type="text"
            name="username"
            placeholder="username"
            onChange={updateUsername}
            value={username}
          ></input>
        </div>
        <div className="password_div">
          <label></label>
          <input className="signup_input"
            type="password"
            name="password"
            placeholder="password"
            onChange={updatePassword}
            value={password}
          ></input>
        </div>
        <div className="repeat_password_div">
          <label></label>
          <input className="signup_input"
            type="password"
            name="repeat_password"
            placeholder="repeat password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <div className="word_div">Users of our services may have uploaded your contact details to Instagram</div>
        <div className="By register_word_div">By registering, you agree to our Terms of Service , Privacy Policy and Cookie Policy</div>
        <button className="signup_button" type="submit">register</button>
        <div className="errorssss">
          {hasSubmitted && errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
      </form>

      <div className="register_signup">
        Already have an account? <NavLink className="login_link login-text" to="/login">
          login
        </NavLink>
      </div>
      <div className="signup_footer">© 2022 Instacrumbz from Alec, Rudy, Ray, David</div>
    </div>
  );
};

export default SignUpForm;
