import NewsArticleListItem from '../NewsArticleListItem/NewsArticleListItem';
import './NewsArticleList.scss';

interface viewMode {
  viewMode: string,
  preferences: any,
  articles: any,
  results: any,
  getRecommended: boolean,
  friends: any
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
  read_time: number,
  friend: string
}

const NewsArticleList = ({ viewMode, results, preferences, articles, getRecommended, friends }: viewMode) => {
  const token = sessionStorage.authToken;
  console.log(token)
  return (
    <>
      {
        viewMode === 'headline' ?
          <div className="flex flex-col gap-y-8 mt-2">
            {
              Object.keys(results).map((result: any, i: number) => {
                return (
                  <div key={`${result}${i}`} className={`flex flex-col shadow-lg shadow-stone-900 dark:shadow-purple-300 p-4 rounded-xl text-stone-900 dark:text-slate-300 ${(!getRecommended && !preferences.includes(result)) && token ? "hidden" : ""} ${(getRecommended && !friends.includes(result)) && token ? "hidden" : ""}`}>
                    <h2 className={`subheader mb-2 font-bold`}>{result}</h2>
                    <ul className={`c-newsArticleView--grid`} id={result}>
                      {
                        !getRecommended ?
                          articles
                            .filter((article: newsarticle) => {
                              return article.preference === result
                            })
                            .filter((_article: newsarticle, i: number) => {
                              return i < 5
                            })
                            .map((article: newsarticle, i: number) => {
                              return (
                                <NewsArticleListItem
                                  key={`${article.title}${i}`}
                                  index={i}
                                  article={article}
                                  viewMode={viewMode}
                                  preferences={preferences}
                                  getRecommended={getRecommended}
                                  friends={friends}
                                />
                              )
                            })
                          :
                          articles
                            .filter((article: newsarticle) => {
                              return article.friend === result
                            })
                            .filter((_article: newsarticle, i: number) => {
                              return i < 5
                            })
                            .map((article: newsarticle, i: number) => {
                              return (
                                <NewsArticleListItem
                                  key={`${article.title}${i}`}
                                  index={i}
                                  article={article}
                                  viewMode={viewMode}
                                  preferences={preferences}
                                  getRecommended={getRecommended}
                                  friends={friends}
                                />
                              )
                            })
                      }
                    </ul>
                  </div>
                )
              })
            }
          </div>
          :
          <div className="p-4 rounded-xl mt-2 shadow-lg shadow-stone-900 dark:shadow-purple-300">
            <h2 className={`subheader mb-2 font-bold`}>{(token && getRecommended) ? "Friend Recommendations" : "Personal Feed"}</h2>
            <ul className={viewMode != "list" ? `c-newsArticleView--grid` : "c-newsArticleView"}>
              {
                articles
                  .map((article: newsarticle, i: number) => {
                    return (
                      <NewsArticleListItem
                        key={`${article.title}${i}`}
                        index={i}
                        article={article}
                        viewMode={viewMode}
                        preferences={preferences}
                        getRecommended={getRecommended}
                        friends={friends}
                      />
                    )
                  })
              }
            </ul>
          </div>
      }
    </>
  );
};

export default NewsArticleList;