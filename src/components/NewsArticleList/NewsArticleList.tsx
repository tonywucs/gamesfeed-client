import { useState, useEffect } from 'react';
import axios from 'axios';

import NewsArticleListItem from '../NewsArticleListItem/NewsArticleListItem';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/news';

const NewsArticleList = () => {

  const token = sessionStorage.authToken;
  const [newsArticles, setNewsArticles] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      if (token) {
        const { data } = await axios.get(`${ENDPOINT}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        setNewsArticles(data.articles)
      }
    })()
  }, [])

  return (
    <div>
      {
        token ? newsArticles.map((newsArticle: any, i: number) => {
          return (
            <ul>
              <h2 key={`${newsArticle.preference}${i}`} className="text-5xl">{newsArticle.preference}</h2>
              {
                newsArticle.articles.map((article: any, j: number) => {
                  return (
                    <NewsArticleListItem
                      key={`${article.title}${j}`}
                      article={article}
                      preference={newsArticle.preference}
                    />
                  )
                })
              }
            </ul>
          )
        })
          :
          <h1>Nothing loaded yet</h1>
      }
    </div>
  );
};

export default NewsArticleList;