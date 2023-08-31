import axios from 'axios';
import { useState, useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user/prefs';

const FilterNav = ({ handleFilterPref }: any) => {

    // Information/Endpoints to add
    // getAllPrefs
    // Add total results for each pref and overall to response object
    // Add preference id to response object to designate color codes
    // How should I fix dynamic type errors for typescript

    const token = sessionStorage.authToken;
    const [userPref, setUserPref] = useState<any[]>([]);

    const getUserPref = async () => {
        const { data } = await axios.get(`${ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setUserPref(data.preferences)
    }

    useEffect(() => {
        if (userPref.length === 0) { getUserPref() }
    }, [])
    
    return (
        <div className="flex gap-x-2">
            {
                userPref.map((pref, i) => {
                    return (
                        <p className={`text-base 
                            ${
                                i % 3 === 0 ? "bg-red-500" :
                                i % 3 === 1 ? "bg-green-500" :
                                i % 3 === 2 ? "bg-blue-500" :
                                ""
                            } rounded-lg px-2 py-0.5 text-white cursor-pointer italic`}
                            onClick={() => {
                                handleFilterPref(pref)
                            }}
                            key={`${pref}${i}`}
                        >{pref}</p>
                    )
                })
            }
        </div>
    );
};

export default FilterNav;