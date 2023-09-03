import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import './Form.scss';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

const Form = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const [togglePass, setTogglePass] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            if (location.pathname === '/signup') {
                await axios.post(`${ENDPOINT}${location.pathname}`, {
                    username: e.target.username.value,
                    password: e.target.password.value
                });

                navigate('/');

            } else if (location.pathname === '/login') {
                const { data } = await axios.post(`${ENDPOINT}${location.pathname}`, {
                    username: e.target.username.value,
                    password: e.target.password.value
                });

                sessionStorage.authToken = data.token;

                const prefs = await axios.get(`${ENDPOINT}/prefs`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    }
                })

                const friends = await await axios.get(`${ENDPOINT}/friends`, {
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                    }
                });

                sessionStorage.friends = Object.values(friends.data.friends).map((friend: any) => friend.username).join(' ')
                sessionStorage.preferences = prefs.data.preferences.map((pref: any) => pref.name).join(' ');

                navigate('/');
            }

        } catch (err) {
            console.error(err);
        }
    }

    const handleReveal = () => {
        setTogglePass(!togglePass);
    }

    return (
        <section className="form h-full flex items-center">
            <form onSubmit={handleSubmit} className="flex flex-col w-full px-4">
                <h2 className="flex justify-center mb-4 text-3xl font-bold">
                    {location.pathname === '/signup' ? "Sign Up Form" : "Login Form"}
                </h2>
                <div className="flex flex-col">
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        className="form__field"
                    />
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type={!togglePass ? "password" : "text"}
                        className="form__field"
                    />
                </div>
                <div
                    className="flex justify-end items-center gap-x-4 mt-2"
                    onClick={handleReveal}
                >
                    <p>{!togglePass ? "Show Password" : "Hide Password"}</p>
                    <div className={`w-4 h-4 border-2 ${!togglePass ? "bg-white" : "bg-blue-500"} `} ></div>
                </div>
                <button type="submit" className="self-end w-fit my-4 px-4 py-2 bg-green-500 rounded-lg">
                    {location.pathname === '/signup' ? "Sign Up" : "Login"}
                </button>
            </form>
        </section>
    );
};

export default Form;