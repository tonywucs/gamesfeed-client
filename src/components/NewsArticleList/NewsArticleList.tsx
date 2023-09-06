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
  return (
    <>
      {
        viewMode === 'headline' ?
          Object.keys(results).map((result: any, i: number) => {
            return (
              <div key={`${result}${i}`} className={`mt-8 ${!getRecommended && !preferences.includes(result) ? "hidden" : ""} ${getRecommended && !friends.includes(result) ? "hidden" : ""}`}>
                <h2 className={`subheader mb-2 text-white font-bold`}>{result}</h2>
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
          :
          <>
            <h2 className={`subheader mb-2 text-white font-bold`}>{getRecommended ? "Friend Recommendations" : "Personal Feed"}</h2>
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
          </>
      }
    </>
  );
};

export default NewsArticleList;