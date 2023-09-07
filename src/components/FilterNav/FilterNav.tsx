import axios from 'axios';
import { useState, useEffect } from 'react';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

const FilterNav = ({ handleChangePrefs, handleChangeFriends, friends, preferences, results, getRecommended }: any) => {

    const token = sessionStorage.authToken;
    const [userPref, setUserPref] = useState<any[]>([]);
    const [userFriends, setUserFriends] = useState<any[]>([]);
    const [multiSelect, setMultiSelect] = useState(false);
    const [multiSelectFriends, setMultiSelectFriends] = useState(false);

    const getUserPref = async () => {
        const { data } = await axios.get(`${ENDPOINT}/prefs`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        setUserPref(data.preferences)
    }

    const getUserFriends = async () => {
        const { data } = await axios.get(`${ENDPOINT}/friends`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        setUserFriends(data.friends)
    }

    useEffect(() => {
        if (token) { getUserPref() }
        if (token) { getUserFriends() }
    }, [preferences])

    const handleClickFilter = (pref: string) => {
        if (multiSelect) {
            if (preferences.includes(pref)) {
                const prefsArr = preferences.split(',')
                prefsArr.splice(prefsArr.findIndex((p: string) => p === pref), 1)
                handleChangePrefs(prefsArr)
            } else {
                const prefsArr = preferences.split(',')
                prefsArr.push(pref)
                handleChangePrefs(prefsArr)
            }
        } else {
            handleChangePrefs([pref])
        }
    }

    const handleFriendFilter = (friend: string) => {
        if (multiSelectFriends) {
            if (friends.includes(friend)) {
                const friendsArr = friends.split(',')
                friendsArr.splice(friendsArr.findIndex((f: string) => f === friend), 1)
                handleChangeFriends(friendsArr)
            } else {
                const friendsArr = friends.split(',')
                friendsArr.push(friend)
                handleChangeFriends(friendsArr)
            }
        } else {
            handleChangeFriends([friend])
        }
    }

    const handleMultiSelect = () => {
        setMultiSelect(!multiSelect)
    }

    const handleMultiSelectFriends = () => {
        setMultiSelectFriends(!multiSelectFriends)
    }

    if ((userPref.length === 0) || (userFriends.length === 0)) {
        return <h1>Loading...</h1>
    }

    let friendsArr: any = []

    if (friends) {
        friendsArr = friends.split(',')
    }

    return (
        <div className="flex flex-col gap-y-2">
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
                            >{pref.name}
                                {
                                    !getRecommended ?
                                        <span className="flex justify-center items-center not-italic ml-2 text-xs w-6 h-6 p-2 rounded-full bg-slate-500">{results[pref.name]}</span>
                                        : ""
                                }
                            </p>
                        )
                    })
                }
            </div>
            {
                getRecommended ?
                    <div className="flex gap-x-2">
                        <div className={`h-8 w-8 cursor-pointer ${multiSelectFriends ? "bg-red-500" : "bg-green-500"}`} onClick={handleMultiSelectFriends}></div>
                        {
                            userFriends.map((friend: any, i: number) => {
                                return (
                                    <p className={`text-base
                            ${friendsArr.includes(friend.username) ? (
                                            friend.id % 3 === 0 ? "bg-red-500" :
                                            friend.id % 3 === 1 ? "bg-green-500" :
                                            friend.id % 3 === 2 ? "bg-blue-500" :
                                                        "")
                                            : "bg-slate-500"
                                        } rounded-lg px-2 py-0.5 text-white cursor-pointer italic flex items-center`}
                                        onClick={() => {
                                            handleFriendFilter(friend.username)
                                        }}
                                        key={`${friend.username}${i}`}
                                    >{friend.username}
                                        <span className="flex justify-center items-center not-italic ml-2 text-xs w-6 h-6 p-2 rounded-full bg-slate-500">{results[friend.username]}</span>
                                    </p>
                                )
                            })
                        }
                    </div>
                    : ""
            }
        </div>
    );
};

export default FilterNav;