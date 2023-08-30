import { useState, useEffect } from 'react';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/news';

const Homepage = () => {

  const token = sessionStorage.authToken;

  const [newsArticles, setNewsArticles] = useState<any[]>([]);
  const [numOfArticles, setNumOfArticles] = useState(10);

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
    <>
      {
        token ? newsArticles.map((newsArticle: any) => {
          return (
            <>
              <h1 className="text-5xl">{newsArticle.preference}</h1>,
              {
                newsArticle.articles.map((article: any) => {
                  return (
                    <>
                      <h2>{article.title}</h2>
                      <img className="w-1/2 h-1/2 rounded-xl" src={article.url_to_image}></img>
                    </>
                  )
                })
              }
            </>
          )
        })
          :
          <h1>Nothing loaded yet</h1>
      }
    </>
  );
};

export default Homepage;