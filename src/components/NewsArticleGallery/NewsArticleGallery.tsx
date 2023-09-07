
import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import prefMenu from '../../assets/icons/sliders-solid.svg';
import listIcon from '../../assets/icons/list-ul-solid.svg';
import gridIcon from '../../assets/icons/table-solid.svg';
import headlineIcon from '../../assets/icons/boxes-stacked-solid.svg';
import friendRecIcon from '../../assets/icons/users-solid.svg';

import NewsArticleList from "../NewsArticleList/NewsArticleList";
import FilterNav from '../FilterNav/FilterNav';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/news';
const ENDPOINT_USER = SERVER_URL + '/user';

import './NewsArticleGallery.scss';


const NewsArticleGallery = ({ handleTogglePrefs, toggleDarkMode }: any) => {

  const token = sessionStorage.authToken;
  // const navigate = useNavigate();
  const [viewMode, setViewMode] = useState(sessionStorage.viewMode || "headline")
  const [newsArticles, setNewsArticles] = useState<any>({});
  const [preferences, setPreferences] = useState(sessionStorage.preferences || ",");
  const [getRecommended, setGetRecommended] = useState(sessionStorage.recommend === 'true' || false);
  const [friends, setFriends] = useState(sessionStorage.friends || "")

  // const getUnregistered = async () => {
  //   const { data } = await axios.get(`${ENDPOINT}/unregistered`, {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       num_of_articles: '30',
  //       sort_by: 'published_at',
  //       sort_type: 'desc',
  //       page_number: 0
  //     }
  //   })
  //   setNewsArticles(data)
  // }

  const getNewsArticles = async () => {
    if (token) {
      const { data } = await axios.get(`${ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          num_of_articles: '30',
          sort_by: 'published_at',
          sort_type: 'desc',
          page_number: 0
        }
      })
      setNewsArticles(data)
    }
  }

  const getRecNews = async () => {
    if (token) {
      const { data } = await axios.get(`${ENDPOINT}/recommend`, {
        headers: {
          Authorization: `Bearer ${token}`,
          num_of_articles: '3',
          sort_by: 'published_at',
          sort_type: 'desc',
          page_number: 0
        }
      })
      setNewsArticles(data)
    }
  }

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
  }

  useEffect(() => {
    if ((Object.keys(newsArticles).length === 0)) {
      getFriendsAndPrefs()
      if (getRecommended) {
        getRecNews()
      } else {
        getNewsArticles()
      }
    }

    // if (!token) {
    //   navigate('/login');
    // }
  }, [])

  console.log(newsArticles)

  if (Object.keys(newsArticles).length === 0) {
    return (<h1>Loading</h1>)
  }

  function handleViewChange(mode: string) {
    sessionStorage.viewMode = mode;
    setViewMode(mode);
  }

  const handleChangePrefs = (prefs: any) => {
    sessionStorage.preferences = prefs.join(',')
    setPreferences(prefs.join(','))
  }

  const handleChangeFriends = (friendsArr: any) => {
    sessionStorage.friends = friendsArr.join(',')
    setFriends(friendsArr.join(','))
  }

  const handleClickRecommend = () => {

    if (!getRecommended) {
      getRecNews()
    } else {
      getNewsArticles()
    }

    sessionStorage.recommend = !getRecommended;
    setGetRecommended(!getRecommended);
  }

  const { total_results, results, ...rest } = newsArticles;

  return (
    <div className={`c-newsArticleGallery text-slate-300`}>
      <div className="flex justify-between gap-x-4 w-full md:w-1/2">
        <div className="flex flex-col items-center gap-y-2">
          <h4 className="font-semibold text-stone-900 dark:text-slate-300">My Feed</h4>
          <div className="flex w-fit gap-x-2">
            <div onClick={() => {
              handleTogglePrefs()
            }} className={`c-newsArticleGallery__icon`}>
              <img className={toggleDarkMode ? `c-newsArticleGallery__iconImg--dark` : `c-newsArticleGallery__iconImg`} src={prefMenu} alt="Set Preferences Icon" />
              <p className="body-sm text-stone-900 dark:text-slate-300">Games</p>
            </div>
            <div onClick={() => {
              handleClickRecommend()
            }} className={`c-newsArticleGallery__icon ${toggleDarkMode ? "hover:shadow-purple-300" : "hover:shadow-stone-900"} ${getRecommended ? "c-newsArticleGallery__icon--clicked" : ""}`}>
              <img className={toggleDarkMode ? `c-newsArticleGallery__iconImg--dark` : `c-newsArticleGallery__iconImg`} src={friendRecIcon} alt="Set Friend Recommended View" />
              <p className="body-sm text-stone-900 dark:text-slate-300">Friends</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <h4 className="font-semibold text-stone-900 dark:text-slate-300">Views</h4>
          <div className="flex w-fit gap-x-2">
            <div onClick={() => {
              handleViewChange("list")
            }} className={`c-newsArticleGallery__icon ${toggleDarkMode ? "hover:shadow-purple-300" : "hover:shadow-stone-900"} ${viewMode === "list" ? "c-newsArticleGallery__icon--clicked" : ""}`}>
              <img className={toggleDarkMode ? `c-newsArticleGallery__iconImg--dark` : `c-newsArticleGallery__iconImg`} src={listIcon} alt="Set List View" />
              <p className="body-sm text-stone-900 dark:text-slate-300">List</p>
            </div>
            <div onClick={() => {
              handleViewChange("grid")
            }} className={`c-newsArticleGallery__icon ${toggleDarkMode ? "hover:shadow-purple-300" : "hover:shadow-stone-900"} ${viewMode === "grid" ? "c-newsArticleGallery__icon--clicked" : ""}`}>
              <img className={toggleDarkMode ? `c-newsArticleGallery__iconImg--dark` : `c-newsArticleGallery__iconImg`} src={gridIcon} alt="Set Grid View" />
              <p className="body-sm text-stone-900 dark:text-slate-300">Grid</p>
            </div>
            <div onClick={() => {
              handleViewChange("headline")
            }} className={`c-newsArticleGallery__icon ${toggleDarkMode ? "hover:shadow-purple-300" : "hover:shadow-stone-900"} ${viewMode === "headline" ? "c-newsArticleGallery__icon--clicked" : ""}`}>
              <img className={toggleDarkMode ? `c-newsArticleGallery__iconImg--dark` : `c-newsArticleGallery__iconImg`} src={headlineIcon} alt="Set Headline View" />
              <p className="body-sm text-stone-900 dark:text-slate-300">Headline</p>
            </div>
          </div>
        </div>
      </div>

      <FilterNav handleChangePrefs={handleChangePrefs} handleChangeFriends={handleChangeFriends} friends={friends} preferences={preferences} totalResults={total_results} results={results} getRecommended={getRecommended} />
      <NewsArticleList viewMode={viewMode} preferences={preferences} articles={rest.articles} results={results} getRecommended={getRecommended} friends={friends} />
    </div>
  );
};

export default NewsArticleGallery;