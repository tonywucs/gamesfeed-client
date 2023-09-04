import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

const PreferenceModal = () => {

    const token = sessionStorage.authToken;
    const [allprefs, setAllPrefs] = useState<any>(null);
    const [userprefs, setUserPrefs] = useState<any>(null);
    const [currentprefs, setCurrentPrefs] = useState<any>({});

    const getUserPrefs = async () => {
        const { data } = await axios.get(`${ENDPOINT}/prefs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        let prefs: any = {}
        data.preferences.forEach((pref: any) => {
            prefs[`${pref.name}`] = true
        })

        setCurrentPrefs(prefs)
        setUserPrefs(data.preferences);
    }

    const getAllPrefs = async () => {
        const { data } = await axios.get(`${ENDPOINT}/allprefs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        setAllPrefs(data.preferences);
    }

    const setPrefs = async () => {
        const changedPrefs = {
            preferences: sessionStorage.preferences.split(',')
        }

        const { data } = await axios.post(`${ENDPOINT}/prefs`, changedPrefs, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    const handleChangePrefs = () => {
        setPrefs()
    }

    const handleSetPrefs = (pref: string) => {
        const sessionPrefs = sessionStorage.preferences.split(',')

        if (!sessionPrefs.includes(pref)) {
            setCurrentPrefs({
                ...currentprefs,
                [pref]: true
            })
            sessionPrefs.push(pref)
            sessionStorage.preferences = sessionPrefs.join(',')
        } else {
            setCurrentPrefs({
                ...currentprefs,
                [pref]: false
            })
            sessionPrefs.splice(sessionPrefs.findIndex((sessionPref: string) => sessionPref === pref), 1)
            sessionStorage.preferences = sessionPrefs.join(',')
        }
        
    }

    useEffect(() => {
        if (!userprefs) { getUserPrefs() }
        if (!allprefs) { getAllPrefs() }
    }, [])

    if (!userprefs) { return (<h1>Loading User Preferences...</h1>) }
    if (!allprefs) { return (<h1>Loading All Preferences...</h1>) }

    console.log(currentprefs)

    return (
        <>
        <section className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mx-auto z-[100] flex flex-col justify-between items-center py-4 h-[25rem] md:h-[27.5rem] w-[25rem] md:w-[27.5rem] bg-slate-500 rounded-xl border-2 border-black">
            <h2 className="tableheader font-bold text-white">Select YOUR Preferences</h2>
            <ul className="grid grid-cols-3 mt-4 gap-2">
            {
                allprefs.map((pref: any, i: number) => {
                    return (
                        <li key={`modal${pref.name}${i}`} className={`flex justify-center items-center h-20 w-24 border-2 border-white text-white rounded-xl font-semibold body-lg hover:bg-slate-200 cursor-pointer ${currentprefs[`${pref.name}`] ? "bg-purple-500" : ""}`} onClick={() => {
                            handleSetPrefs(pref.name)
                        }}><span className="text-center">{pref.name}</span></li>
                    )
                })
            }
            </ul>
            <div className="h-8 w-20 bg-green-500 rounded-xl flex justify-center items-center text-white font-bold cursor-pointer" onClick={handleChangePrefs}>Submit</div>
        </section>
        <div className="absolute w-full h-full z-[80] bg-slate-500/50"></div>
        </>
        
    );
};

export default PreferenceModal;