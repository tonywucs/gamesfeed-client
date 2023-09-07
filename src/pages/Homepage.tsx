import { useState, useEffect } from 'react';
import axios from 'axios';

import NewsArticleGallery from "../components/NewsArticleGallery/NewsArticleGallery";
import '../App.scss';
import PreferenceModal from "../components/PreferenceModal/PreferenceModal";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT_USER = SERVER_URL + '/user';

const Homepage = ({toggleDarkMode, togglePrefModal, handleTogglePrefs}: any) => {

  const token = sessionStorage.authToken;

  const [preferences, setPreferences] = useState(sessionStorage.preferences || ",");
  const [friends, setFriends] = useState(sessionStorage.friends || "");
  const [isLoading, setIsLoading] = useState(true);

  const getFriendsAndPrefs = async () => {
    const prefs = await axios.get(`${ENDPOINT_USER}/prefs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })

    const friends = await axios.get(`${ENDPOINT_USER}/friends`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    if (!(prefs.data.preferences.length === 0)) {
      sessionStorage.preferences = prefs.data.preferences.map((pref: any) => pref.name).join(',');
    }

    if (!(friends.data.friends.length === 0)) {
      sessionStorage.friends = Object.values(friends.data.friends).map((friend: any) => friend.username).join(',')
    }

    setPreferences(prefs.data.preferences.map((pref: any) => pref.name).join(','));
    setFriends(Object.values(friends.data.friends).map((friend: any) => friend.username).join(','));
    setIsLoading(false);
  }

  const handleChangePrefs = (prefs: any) => {
    setPreferences(prefs.join(","));
  }

  const handleChangeFriends = (friendsArr: any) => {
    setFriends(friendsArr.join(','));
  }

  useEffect(() => {
    if (token) {
      getFriendsAndPrefs()
    }
  }, [])

  if (token && !friends && !preferences) {
    return (<h1>Loading...</h1>)
  }

  return (
    <main className={`h-full dark:bg-stone-900`}>
      <NewsArticleGallery handleTogglePrefs={handleTogglePrefs} toggleDarkMode={toggleDarkMode} friends={friends} preferences={preferences} handleChangeFriends={handleChangeFriends} handleChangePrefs={handleChangePrefs}/>
      {togglePrefModal && <PreferenceModal handleTogglePrefs={handleTogglePrefs} handleChangePrefs={handleChangePrefs}/>}
      <div onClick={handleTogglePrefs} className={`fixed top-0 w-full h-full z-[80] bg-slate-500/50 ${togglePrefModal ? "" : "hidden"}`}></div>
    </main>
  );
};

export default Homepage;