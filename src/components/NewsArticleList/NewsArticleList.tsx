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

const NewsArticleList = ({ viewMode, handleViewChange }: viewMode) => {

  const token = sessionStorage.authToken;
  const [newsArticles, setNewsArticles] = useState<any>([]);
  const [filterPref, setFilterPref] = useState({});

  const getNewsArticles = async () => {
    if (token) {
      const { data } = await axios.get(`${ENDPOINT}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      setNewsArticles(data.articles)
    }
  }

  useEffect(() => {
    if (newsArticles.length === 0) { getNewsArticles() }
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

  const totalResults = newsArticles.map((article) => {
    return article.results
  })

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
        <FilterNav handleFilterPref={handleFilterPref} totalResults={totalResults} />
        {
          token ?
            newsArticles
              .filter((newsArticle) => {
                if (Object.keys(filterPref).length === 0) {
                  return true
                } else {
                  return filterPref[`${newsArticle.preference}`]
                }
              })
              .map((newsArticle: any, i: number) => {
                console.log(viewMode != "list");
                return (
                  <ul key={`list${newsArticle.preference}${i}`} className={viewMode != "list" ? `c-newsArticleView--grid` : "c-newsArticleView"}>
                    {
                      newsArticle.articles.map((article: any, j: number) => {
                        return (
                          <NewsArticleListItem
                            key={`${article.title}${j}`}
                            index={i}
                            articleIndex={j}
                            article={article}
                            preference={newsArticle.preference}
                            viewMode={viewMode}
                          />
                        )
                      })
                    }
                  </ul>
                )
              })
            :
            ""
        }
      </div>
    </>
  );
};

export default NewsArticleList;