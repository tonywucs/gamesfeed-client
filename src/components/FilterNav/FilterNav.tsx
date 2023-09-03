import axios from 'axios';
import { useState, useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user/prefs';

const FilterNav = ({ handleChangePrefs, totalResults, preferences, results }: any) => {

    const token = sessionStorage.authToken;
    const [userPref, setUserPref] = useState<any[]>([]);
    const [multiSelect, setMultiSelect] = useState(false);

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

    const handleClickFilter = (pref: string) => {
        if (multiSelect) {
            if (preferences.includes(pref)) {
                const prefsArr = preferences.split(' ')
                prefsArr.splice(prefsArr.findIndex((p: string) => p === pref), 1)
                handleChangePrefs(prefsArr)
            } else {
                const prefsArr = preferences.split(' ')
                prefsArr.push(pref)
                handleChangePrefs(prefsArr)
            }
        } else {
            handleChangePrefs([pref])
        }
    }

    const handleMultiSelect = () => {
        setMultiSelect(!multiSelect)
    }

    if (userPref.length === 0) {
        return <h1>Loading...</h1>
    }

    return (
        <div className="flex gap-x-2">
            <div className={`h-8 w-8 cursor-pointer ${multiSelect ? "bg-red-500" : "bg-green-500"}`} onClick={handleMultiSelect}></div>
            {
                userPref.map((pref, i) => {
                    return (
                        <p className={`text-base
                            ${preferences.includes(pref.name) ? (
                                pref.id % 3 === 0 ? "bg-red-500" :
                                    pref.id % 3 === 1 ? "bg-green-500" :
                                        pref.id % 3 === 2 ? "bg-blue-500" :
                                            "")
                                : "bg-slate-500"
                            } rounded-lg px-2 py-0.5 text-white cursor-pointer italic flex items-center`}
                            onClick={() => {
                                handleClickFilter(pref.name)
                            }}
                            key={`${pref.name}${i}`}
                        >{pref.name}<span className="flex justify-center items-center not-italic ml-2 text-xs w-6 h-6 p-2 rounded-full bg-slate-500">{results[pref.name]}</span></p>
                    )
                })
            }
        </div>
    );
};

export default FilterNav;