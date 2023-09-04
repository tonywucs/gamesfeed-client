
import { useState, useEffect } from 'react';
import axios from 'axios';

import NewsArticleList from "../NewsArticleList/NewsArticleList";
import FilterNav from '../FilterNav/FilterNav';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/news';

import './NewsArticleGallery.scss';


const NewsArticleGallery = () => {

  const token = sessionStorage.authToken;
  const [viewMode, setViewMode] = useState(sessionStorage.viewMode || "headline")
  const [newsArticles, setNewsArticles] = useState<any>({});
  const [preferences, setPreferences] = useState(sessionStorage.preferences);
  const [getRecommended, setGetRecommended] = useState(sessionStorage.recommend === 'true' || false);
  const [friends, setFriends] = useState(sessionStorage.friends)


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

  useEffect(() => {
    if (Object.keys(newsArticles).length === 0) { 
      if (getRecommended) {
        getRecNews()
      } else {
        getNewsArticles() 
      }
    }

  }, [])

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

  const { total_results, results, ...rest} = newsArticles;

  return (
    <div className={`c-newsArticleGallery`}>
      <div>
        <span onClick={() => {
          handleViewChange("list")
        }} className="px-4 h-8 rounded-lg bg-black text-white cursor-pointer">List</span>
        <span onClick={() => {
          handleViewChange("grid")
        }} className="px-4 h-8 rounded-lg bg-black text-white cursor-pointer">Grid</span>
        <span onClick={() => {
          handleViewChange("headline")
        }} className="px-4 h-8 rounded-lg bg-black text-white cursor-pointer">Headline</span>
        <span onClick={() => {
          handleClickRecommend()
        }} className="px-4 h-8 rounded-lg bg-black text-white cursor-pointer">See Friend Recommendations</span>
      </div>
      <FilterNav handleChangePrefs={handleChangePrefs} handleChangeFriends={handleChangeFriends} friends={friends} preferences={preferences} totalResults={total_results} results={results} getRecommended={getRecommended}/>
      <NewsArticleList viewMode={viewMode} preferences={preferences} articles={rest.articles} results={results} getRecommended={getRecommended} friends={friends}/>
    </div>
  );
};

export default NewsArticleGallery;