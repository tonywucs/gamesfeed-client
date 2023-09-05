import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import checkIcon from '../../assets/icons/square-check-solid.svg';

import './Form.scss';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

const Form = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [togglePass, setTogglePass] = useState(false);
    const [complete, setComplete] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            if (location.pathname === '/signup') {
                await axios.post(`${ENDPOINT}${location.pathname}`, {
                    username: e.target.username.value.trim(),
                    password: e.target.password.value.trim()
                });

                setComplete(true);

                setTimeout(() => {
                    setComplete(false);
                    navigate('/login')
                }, 3000);

            } else if (location.pathname === '/login') {
                const { data } = await axios.post(`${ENDPOINT}${location.pathname}`, {
                    username: e.target.username.value.trim(),
                    password: e.target.password.value.trim()
                });

                sessionStorage.authToken = data.token;
                sessionStorage.recommend = false;

                const isNewUser = await axios.get(`${ENDPOINT}`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    }
                })
                
                if (isNewUser.data.new_user) {
                    navigate('/setup')
                } else {
                    navigate('/');
                }
            }
        } catch (err) {
            console.error(err);
        }
    }

    const handleReveal = () => {
        setTogglePass(!togglePass);
    }

    const handleSignUpLink = () => {
        navigate('/signup')
    }

    if (complete) {
        return (
            <div className="flex flex-col justify-center text-white p-4 items-center w-full h-full bg-stone-900">
                <h1 className="font-semibold flex justify-center items-center">Sign Up Complete!<span><img className="form__redirect" src={checkIcon} alt="Check mark" /></span></h1>
                <h3 className="font-semibold flex justify-center items-center text-center">Congratulations! You're one step closer to saving a few clicks for your news! Redirecting back to the Login screen soon.</h3>
            </div>
        )
    }

    return (
        <section className="form__wrapper">
            <form onSubmit={handleSubmit} className="form">
                <h2 className="form__title">
                    {location.pathname === '/signup' ? "Sign Up Form" : "Login Form"}
                </h2>
                <div className="flex flex-col">
                    <label className="miniheader" htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        className="form__field"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label className="miniheader" htmlFor="password">Password</label>
                    <input
                        name="password"
                        type={!togglePass ? "password" : "text"}
                        className="form__field"
                    />
                </div>
                <div
                    className={`flex items-center mt-2 ${location.pathname === '/login' ? "justify-between" : "justify-end"}`}
                >
                    {
                        location.pathname === '/login' ?
                            <div className="flex gap-x-2 items-center">
                                <p className="">Don't have an account?</p>
                                <span onClick={handleSignUpLink} className="form__signupLink">Sign Up!</span>
                            </div>
                            : ""
                    }
                    <div className="flex gap-x-2 items-center" onClick={handleReveal}>
                        <p className="body-sm">Show/Hide Password</p>
                        <div className={`form__showPass ${!togglePass ? "bg-stone-400" : "bg-purple-900"} `} ></div>
                    </div>
                </div>
                <button type="submit" className="form__submitBtn">
                    {location.pathname === '/signup' ? "Sign Up" : "Login"}
                </button>
            </form>
        </section>
    );
};

export default Form;