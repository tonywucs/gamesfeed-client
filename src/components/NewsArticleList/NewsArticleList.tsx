import NewsArticleListItem from '../NewsArticleListItem/NewsArticleListItem';
import './NewsArticleList.scss';

interface viewMode {
  viewMode: string,
  preferences: any,
  articles: any,
  results: any
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

const NewsArticleList = ({ viewMode, results, preferences, articles }: viewMode) => {

  return (
    <>
      {
        viewMode === 'headline' ?
          Object.keys(results).map((result: any, i: number) => {
            return (
              <div key={`${result}${i}`} className={`mt-8 ${!preferences.includes(result) ? "hidden" : ""}`}>
                <h2 className={`subheader mb-2 text-white font-bold`}>{result}</h2>
                <ul className={`c-newsArticleView--grid`} id={result}>
                  {
                    articles
                      .filter((article: newsarticle) => {
                        return article.preference === result
                      })
                      .filter((article: newsarticle, i: number) => {
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
            <h2 className={`subheader mb-2 text-white font-bold`}>Personal Feed</h2>
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