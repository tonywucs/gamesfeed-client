import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

interface obj {
    action: boolean,
    getPrefsOnAction: (prefs: any, next: any) => void
}

const PreferenceList = ({ action, getPrefsOnAction }: obj) => {

    const token = sessionStorage.authToken;
    const navigate = useNavigate();
    const [currentPrefs, setCurrentPrefs] = useState<any>(null);
    const [success, setSuccess] = useState(false);

    // Function which creates a hashmap of available preferences
    // sets true for those preferences which are user preferences.
    const getPrefs = async () => {
        const preferences = await axios.get(`${ENDPOINT}/allprefs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        const userPreferences = await axios.get(`${ENDPOINT}/prefs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        let prefObj: any = {};
        const userPrefs = userPreferences.data.preferences.map((pref: any) => {
            return pref.name;
        });

        for (const pref of preferences.data.preferences) {
            if (userPrefs.includes(pref.name)) {
                prefObj[`${pref.name}`] = true;
            } else {
                prefObj[`${pref.name}`] = false;
            }
        }

        setCurrentPrefs(prefObj);
    }

    const setPrefs = async () => {
        const newPrefs = {
            preferences: Object.entries(currentPrefs).filter((pref: any) => pref[1]).map((pref) => pref[0])
        }

        const { data } = await axios.post(`${ENDPOINT}/prefs`, newPrefs, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        setSuccess(true);
    }

    const handleClickOnPref = (pref: string) => {
        const prefObj = {...currentPrefs};
        prefObj[`${pref}`] = currentPrefs[`${pref}`] ? false : true
        setCurrentPrefs(prefObj)
    }

    const handleSubmitPrefs = () => {
        setPrefs();
    }

    useEffect(() => {
        if (!currentPrefs) { getPrefs() }
    }, [])

    if (success) { 
        setTimeout(() => { navigate('/') }, 3000)
        
        return (
            <h1>Preferences Set! Redirecting...</h1>
        )
    }

    if (!currentPrefs) { return (<h1>Loading User Preferences...</h1>) }

    return (
        <div className="flex flex-col justify-center items-center">
            <ul className="grid grid-cols-3 mt-4 gap-2">
                {
                    Object.keys(currentPrefs).map((pref: string, i: number) => {
                        return (
                            <li key={`modal${pref}${i}`} className={`flex justify-center items-center h-20 w-24 border-2 border-slate-300 text-slate-300 rounded-xl font-semibold body-lg active:shadow-md active:shadow-purple-500 hover:bg-slate-900 cursor-pointer ${currentPrefs[`${pref}`] ? "bg-slate-900" : ""}`} 
                                onClick={() => {
                                    handleClickOnPref(pref)
                            }}><span className="text-center">{pref}</span></li>
                        )
                    })
                }
            </ul>

            <div className={`flex justify-center items-center body-md font-semibold w-fit my-4 px-4 py-2 cursor-pointer text-slate-500 hover:shadow-md hover:shadow-purple-900 hover:text-slate-300 bg-slate-900 rounded-lg transition-all`}
                onClick={() => {
                    if (action) {
                        getPrefsOnAction(currentPrefs, { set_prefs: true })
                    } else {
                        handleSubmitPrefs()
                    }
                }}> {action ? "Next" : "Submit"}
            </div>
        </div>

    );
};

export default PreferenceList;