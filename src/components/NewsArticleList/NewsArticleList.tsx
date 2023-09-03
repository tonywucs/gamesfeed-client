import { useState, useEffect } from 'react';
import axios from 'axios';

import NewsArticleListItem from '../NewsArticleListItem/NewsArticleListItem';
import FilterNav from '../FilterNav/FilterNav';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/news';

import './NewsArticleList.scss';


interface viewMode {
  viewMode: string,
  handleViewChange: (mode: string) => void
}

interface newsarticle {
  id: number,
  pref_id: number,
  preference: string,
  title: string,
  author: string,
  description: string,
  published_at: string,
  source: string,
  url: string,
  url_to_image: string,
  read_time: number
}

const NewsArticleList = ({ viewMode, handleViewChange }: viewMode) => {

  const token = sessionStorage.authToken;
  const [newsArticles, setNewsArticles] = useState<any>({});
  const [filterPref, setFilterPref] = useState<any>({});

  const getNewsArticles = async () => {
    if (token) {
      const { data } = await axios.get(`${ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(data)
      setNewsArticles(data)
    }
  }

  useEffect(() => {
    if (Object.keys(newsArticles).length === 0) { getNewsArticles() }
  }, [])

  const handleFilterPref = (pref: any) => {
    if (!(filterPref[`${pref}`])) {
      setFilterPref({
        ...filterPref,
        [pref]: true
      });
    } else {
      setFilterPref({
        ...filterPref,
        [pref]: false
      });
    }
  }

  if (Object.keys(newsArticles).length === 0) {
    return (<h1>Loading</h1>)
  }

  // Could possibly move some code here out of return statement for readability
  return (
    <>
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
        </div>
        <FilterNav handleFilterPref={handleFilterPref} totalResults={newsArticles.total_results} results={newsArticles.results} />
        <ul className={viewMode != "list" ? `c-newsArticleView--grid` : "c-newsArticleView"}>
          {
            token ?
              newsArticles.articles
                .map((article: newsarticle, i: number) => {
                  return (
                    <NewsArticleListItem
                      key={`${article.title}${i}`}
                      article={article}
                      viewMode={viewMode}
                    />
                  )
                })
              : ""
          }
        </ul>
      </div>
    </>
  );
};

export default NewsArticleList;