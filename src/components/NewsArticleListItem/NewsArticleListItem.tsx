import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './NewsArticleListItem.scss';
import ReadMoreIcon from '../../assets/icons/readmore.svg';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user/recommend';

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

    const token = sessionStorage.authToken;
    const [click, setClick] = useState(false);
    const [recClick, setRecClick] = useState(false);
    const [userRecommended, setUserRecommended] = useState(undefined);

    const published = Date.parse(article.published_at);
    const seen = Date.now()
    const daysAgo = Math.floor((seen - published) / 86400000);

    const getRec = async () => {
        const { data } = await axios.get(`${ENDPOINT}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

        setUserRecommended(data);
    }

    const updateRec = async (id: number) => {
        await axios
            .post(`${ENDPOINT}`, { newsarticle_id: id }, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          getRec();
    }

    const handleClick = () => {
        setClick(!click)
    }

    const handleRecClick = (id: number) => {
        setRecClick(!recClick);
        updateRec(id);
    }

    useEffect(() => {
        if (!userRecommended) { getRec() }
    }, [])

    if (!userRecommended) {
        // Add rotating gamepad buttons are loading animation or gradient background
        // During refactor, look for ways to speed up load times, this component may be doing too much at once
        return (<div className="c-newsArticle__card flex justify-center items-center">Loading...</div>)
    }

    return (
        <li className={`c-newsArticle`}>
            <div
                className={`c-newsArticle__card`}
                style={{ backgroundImage: `url('${article.url_to_image}')` }}
            >
                <div className={`c-newsArticle__cardHeader`}>
                    {/* // index % pref_id */}
                    <h4 className={`c-newsArticle__textPill ${index % 3 === 0 ? "bg-red-500" :
                        index % 3 === 1 ? "bg-green-500" :
                            index % 3 === 2 ? "bg-blue-500" :
                                ""
                        }`}>{preference}</h4>
                    <div
                        className={`c-newsArticle__recommend ${ userRecommended.articles.find((art) => article.id === art.id) ? "bg-green-600" : ""}`}
                        onClick={() => {
                            handleRecClick(article.id)
                        }}
                    ></div>
                </div>

                <div className={`c-newsArticle__content`}>
                    {
                        !click ?
                            <div className={`c-newsArticle__sourceRecent`}>
                                <p className={`c-newsArticle__textPill bg-slate-600`}>{article.source}</p>
                                {/* // Instead of days ago I could add read time */}
                                <p className={`c-newsArticle__recent`}>{daysAgo} days ago</p>
                            </div>
                            : ""
                    }

                    <div
                        className={`c-newsArticle__info ${click ? "h-[11.5rem] bg-black/60" : ""}`}
                        onClick={handleClick}
                    >
                        <div className="c-newsArticle__infoHeader">
                            <h3 className={`c-newsArticle__title`}>{article.title}</h3>
                            {
                                click ?
                                    <h3 className={`c-newsArticle__description`}>{article.description}</h3>
                                    : ""
                            }
                        </div>
                        {
                            click ?
                                <div className={`c-newsArticle__reference`}>
                                    <div className="flex flex-col">
                                        <p className={`c-newsArticle__textPill p-0 italic`}>{article.source}</p>
                                        <p className={`c-newsArticle__textPill p-0 italic`}>{article.author}</p>
                                    </div>
                                    <Link
                                        className={`c-newsArticle__readMore`}
                                        to={article.url}
                                        target="_blank"
                                    >
                                        <img className="w-4 h-4" src={ReadMoreIcon} alt="Read More" />
                                        <span className="hidden sm:inline-block">Read More</span></Link>
                                </div>
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