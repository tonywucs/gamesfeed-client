import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

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
        <section className="h-full">
            <form onSubmit={handleSubmit} className="flex flex-col max-w-xs mx-auto pt-4 px-4">
                <h2 className="flex justify-center mb-4 text-3xl font-bold">
                    {location.pathname === '/signup' ? "Sign Up Form" : "Login Form"}
                </h2>
                <div className="flex flex-col w-full mx-auto">
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        className="h-10 mt-1 pl-2 border-2 border-slate-200 rounded-xl focus:ring-0 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col w-full mx-auto mt-4">
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type={!togglePass ? "password" : "text"}
                        className="h-10 mt-1 pl-2 border-2 border-slate-200 rounded-xl focus:ring-0 focus:outline-none"
                    />
                </div>
                <div className="flex justify-end items-center gap-x-4 mt-2">
                    <p>Select to Reveal Password</p>
                    <div className="w-4 h-4 border-2" onClick={handleReveal}></div>
                </div>
                <button type="submit" className="self-end w-fit my-4 px-4 py-2 bg-green-300 rounded-lg">
                    {location.pathname === '/signup' ? "Sign Up" : "Login"}
                </button>
            </form>
        </section>
    );
};

export default Form;