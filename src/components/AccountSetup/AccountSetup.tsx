import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PreferenceList from '../PreferenceList/PreferenceList';
import addUserIcon from '../../assets/icons/user-plus-solid.svg';
import './AccountSetup.scss';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

const AccountSetup = () => {

    const token = sessionStorage.authToken;
    const [accSetup, setAccSetup] = useState<any>({
        set_prefs: false,
        set_friends: false,
        isFinished: false
    })
    const [prefs, setPrefs] = useState<any>(false);
    // const [currentFriends, setCurrentFriends] = useState<any>(false);
    const [randomFriends, setRandomFriends] = useState<any>(null);
    const [addFriend, setAddFriend] = useState<any>([]);
    const navigate = useNavigate();

    const updateNewUserStatus = async () => {
        const obj = {
            new_user: false
        }

        await axios.post(`${ENDPOINT}/setup`, obj, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    const getRandFriends = async () => {
        const { data } = await axios.get(`${ENDPOINT}/friends`, {
            headers: {
                Authorization: `Bearer ${token}`,
                random: true
            }
        })

        setRandomFriends(data.friends)
    }

    const updatePrefsAndFriends = async () => {
        const newPrefs = {
            preferences: Object.entries(prefs).filter((pref: any) => pref[1]).map((pref) => pref[0])
        }

        await axios.post(`${ENDPOINT}/prefs`, newPrefs, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })

        for (const friend of addFriend) {
            const obj = {
                username: friend
            }

            await axios.post(`${ENDPOINT}/friends`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        }
        
    }

    const handleAddAction = (friend: string) => {
        const add = [...addFriend];

        if (!add.includes(friend)) {
            add.push(friend);
        } else {
            add.splice(add.findIndex((f) => f === friend), 1)
        }

        setAddFriend(add);
    }
    
    const handleNextAction = (action: any) => {
        const setupObj = {
            ...accSetup,
            ...action
        }

        setAccSetup(setupObj);
    }

    const getPrefsOnAction = (prefs: any, next: any) => {
        handleNextAction(next);
        setPrefs(prefs);
    }

    useEffect(() => {
        if (!randomFriends) { getRandFriends() }
    }, []);

    if (!token) {
        setTimeout(() => {
            navigate('/login')
        }, 3000)

        return (
            <div className="text-slate-300 flex justify-center items-center w-full h-full">
                <h1>Something went wrong, please login again!</h1>
            </div>
        )
    }

    if (accSetup && !accSetup.set_prefs) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full bg-stone-900 text-slate-300 py-4">
                <h1>Let's pick some games</h1>
                <PreferenceList action={true} getPrefsOnAction={getPrefsOnAction} />
            </div>
        )
    }

    if (accSetup && !accSetup.set_friends) {
        return (
            <div className="flex flex-col p-4 md:p-8 items-center w-full h-full bg-stone-900 text-slate-300">
                <h1>Add someone!</h1>
                <div className="flex flex-col items-center mt-4 md:mt-8">
                    <div className="flex gap-x-4">
                        {
                            randomFriends.map((friend: any, i: number) => {
                                return (
                                    <div
                                        key={`add${friend.username}${i}`}
                                        className={`flex flex-col justify-center items-center h-44 w-40 border-2 border-slate-300 text-slate-300 rounded-xl font-semibold body-lg active:shadow-md active:shadow-purple-500 hover:bg-slate-900 cursor-pointer ${addFriend.includes(friend.username) ? "bg-slate-900" : ""}`}
                                        onClick={() => {
                                            handleAddAction(friend.username)
                                        }}>
                                        <img className="friend__icon" src={addUserIcon} alt="Add Friend Icon" />
                                        <h2>{friend.username}</h2>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={`flex justify-center items-center body-md font-semibold w-fit my-4 px-4 py-2 cursor-pointer hover:shadow-md hover:shadow-purple-900 hover:text-slate-300 bg-slate-900 rounded-lg transition-all`}
                        onClick={() => {
                            handleNextAction({ set_friends: true, isFinished: true })
                        }}>
                        Finish
                    </div>
                </div>
            </div>
        )
    }

    if (accSetup && accSetup.isFinished) {

        updatePrefsAndFriends();
        updateNewUserStatus();

        setTimeout(() => {
            navigate('/');
        }, 3000);

        return (
            <div className="flex justify-center items-center w-full h-full bg-stone-900 text-slate-300">
                <h2 className="subheader">Account Setup Complete! Time to read!</h2>
            </div>
        );
    }

    return (
        <>
        </>
    );
};

export default AccountSetup;