import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import PreferenceList from '../PreferenceList/PreferenceList';
import addUserIcon from '../../assets/icons/user-plus-solid.svg';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user';

// Need toggle preference modal?
const AccountSetup = () => {

    const token = sessionStorage.authToken;
    // const friends = sessionStorage.friends;
    // const preferences = sessionStorage.preferences;
    const friends = false;
    const preferences = true;
    //prob state for both pref and friends
    const [currentFriends, setCurrentFriends] = useState<any>(false);
    const [currentPrefs, setCurrentPrefs] = useState<any>(false);
    const [randomFriends, setRandomFriends] = useState<any>(null);
    const [addFriend, setAddFriend] = useState<any>(null);
    const navigate = useNavigate();

    const getFriends = async () => {
        const { data } = await axios.get(`${ENDPOINT}/friends`, {
            headers: {
                Authorization: `Bearer ${token}`,
                random: true
            }
        })
        setRandomFriends(data.friends)
    }

    const setFriends = async (friends: any) => {
        const { data } = await axios.post(`${ENDPOINT}/friends`, friends, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    const setUserPrefs = async () => {
        const changedPrefs = {
            preferences: sessionStorage.preferences.split(',')
        }

        const { data } = await axios.post(`${ENDPOINT}/prefs`, changedPrefs, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
    }

    const handleSetPrefs = () => {
        setUserPrefs();
    }

    const handleAdd = (friend: string) => {
        
        
    }

    const handleAddFriends = (friend: string) => {
        setFriends(friend);
    }

    useEffect(() => {
        if (!randomFriends) { getFriends() }
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

    if (!currentPrefs) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-full bg-stone-900 text-slate-300 py-4">
                <h1>Let's pick some games</h1>
                <PreferenceList />
            </div>
        )
    }

    if (!currentFriends && randomFriends) {
        console.log(randomFriends)
        return (
            <div className="flex flex-col justify-center items-center w-full h-full">
                <h1>Add someone!</h1>
                <div>

                    {
                        randomFriends.map((friend: any) => {
                            return (
                                <h2 onClick={ () => {
                                    // handleAddFriend(friend.username)
                                }}>{friend.username}</h2>
                            )
                        })
                    }

                </div>
                <div className="flex justify-center items-center body-md font-semibold self-end w-fit my-4 px-4 py-2 hover:shadow-md hover:shadow-purple-900 hover:text-slate-300 bg-slate-900 rounded-lg transition-all"
                    onClick={handleSetPrefs}
                >
                    Submit
                </div>
            </div>
        )
    }

    return (
        <div className="bg-stone-900 w-full h-full">
            <h1>Make something appear</h1>
        </div>
    );
};

export default AccountSetup;