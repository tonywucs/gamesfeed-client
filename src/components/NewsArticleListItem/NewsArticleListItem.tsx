import { Link } from 'react-router-dom';
import { useState } from 'react';

import './NewsArticleListItem.scss';

interface articleObj {
    id: number,
    title: string,
    author: string,
    source: string,
    description: string,
    url: string,
    url_to_image: string,
    published_at: string
};

interface article {
    article: articleObj,
    preference: string,
    index: number
};

const NewsArticleListItem = ({ article, preference, index }: article) => {

    const [click, setClick] = useState(false);
    const [recClick, setRecClick] = useState(false);

    const published = Date.parse(article.published_at);
    const seen = Date.now()
    const daysAgo = Math.floor((seen - published) / 86400000);

    const handleClick = () => {
        setClick(!click)
    }

    const handleRecClick = () => {
        setRecClick(!recClick);
    }

    return (
        <li className={`c-newsArticle`}>
            <div
                className={`c-newsArticle__card`}
                style={{ backgroundImage: `url('${article.url_to_image}')` }}
            >
                <div className={`c-newsArticle__header`}>
                    <h4 className={`c-newsArticle__textPill ${
                                index % 3 === 0 ? "bg-red-500" :
                                index % 3 === 1 ? "bg-green-500" :
                                index % 3 === 2 ? "bg-blue-500" :
                                ""
                            }`}>{preference}</h4>
                    <div
                        className={`c-newsArticle__recommend ${recClick ? "bg-green-600" : ""}`}
                        onClick={handleRecClick}
                    ></div>
                </div>

                <div className={`c-newsArticle__content`}>
                    {
                        !click ?
                            <div className={`c-newsArticle__sourceRecent`}>
                                <p className={`c-newsArticle__textPill bg-slate-600`}>{article.source}</p>
                                <p className={`c-newsArticle__recent`}>{daysAgo} days ago</p>
                            </div>
                            : ""
                    }

                    <div
                        className={`c-newsArticle__info ${click ? "h-[11.5rem] bg-black/50" : ""}`}
                        onClick={handleClick}
                    >
                        <h3 className={`c-newsArticle__title`}>{article.title}</h3>
                        {
                            click ?
                                <>
                                    <div className={`c-newsArticle__reference`}>
                                        <p className={`c-newsArticle__textPill p-0 italic`}>{article.source}</p>
                                        <span>-</span>
                                        <p className={`c-newsArticle__textPill p-0 italic`}>{article.author}</p>
                                    </div>
                                    <h3 className={`c-newsArticle__description`}>{article.description}</h3>
                                    <Link
                                        className={`c-newsArticle__readMore`}
                                        to={article.url}
                                        target="_blank"
                                    >Read More</Link>
                                </>
                                : ""
                        }
                    </div>
                </div>

                <Link
                    className={`c-newsArticle__overlay`}
                    to={article.url}
                    target="_blank"
                ></Link>
            </div>
        </li>
    );
};

export default NewsArticleListItem;