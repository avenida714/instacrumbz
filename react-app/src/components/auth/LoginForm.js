import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useHistory } from "react-router-dom";
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import screen0 from '../../Image/screen0.png'
import screen2 from '../../Image/screen2.png'
import screen3 from '../../Image/screen3.png'
import screen4 from '../../Image/screen4.png'
import "./LoginForm.css"

const LoginForm = () => {
    const history = useHistory()
    const listImage = [screen2, screen3, screen4]

    const [errors, setErrors] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState(listImage[0]);
    const [second, setSeconds] = useState(0);
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        setImage(listImage[second])
    }, [listImage, second])

    useEffect(() => {
        const interval = setInterval(() => {

            setSeconds(seconds => seconds === listImage.length - 1 ? 0 : seconds + 1);

        }, 5000);
        return () => clearInterval(interval);
    }, []);


    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(email, password));
        if (data) {
            setErrors(data);
        } else {
            history.push("/")
        }

    
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    };

    const updatePassword = (e) => {
        setPassword(e.target.value);
    };

    if (user) {
        return <Redirect to='/' />;
    }

    return (
        <div>

            <form onSubmit={onLogin}>
                <div className='login_error'>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className='outter_container'>
                    <div className='phone_container'>
                        <img className='Home_image' src={screen0} />
                        <img className='splash_image' src={image} />
                    </div>

                    <div className='login_container'>

                        <div className='login_second_container'>
                            <h1 className='Instacrumbz_logo'>Instacrumbz</h1>
                            <div>
                                <label htmlFor='email'></label>
                                <input className='login_input'
                                    name='email'
                                    type='text'
                                    placeholder='username or email address'
                                    value={email}
                                    onChange={updateEmail}
                                />
                            </div>
                            <div>
                                <label htmlFor='password'></label>
                                <input className='login_input'
                                    name='password'
                                    type='password'
                                    placeholder='password'
                                    value={password}
                                    onChange={updatePassword}
                                />

                            </div>
                            <button className='login_button' type='submit'>login</button>
                        </div>
                        <div className='register'>
                            Don't have an account? <NavLink className='login_link' to='/sign-up'> register </NavLink>
                        </div>
                    </div>
                </div>
                
                <footer className='login_footer'>© 2022 Instacrumbz from Alec, Rudy, Ray, David</footer>

            </form>
        </div>
    );
};

export default LoginForm;
