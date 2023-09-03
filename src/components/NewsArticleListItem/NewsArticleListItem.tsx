import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import './NewsArticleListItem.scss';
import ReadMoreIcon from '../../assets/icons/readmore.svg';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;
const ENDPOINT = SERVER_URL + '/user/recommend';

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

interface article {
    article: newsarticle,
    viewMode: string
};

const NewsArticleListItem = ({ article, viewMode }: article) => {

    const token = sessionStorage.authToken;
    const [click, setClick] = useState(false);
    const [recClick, setRecClick] = useState(false);
    const [userRecommended, setUserRecommended] = useState<any>([]);
    const [isHovered, setIsHovered] = useState(false);

    const getRec = async () => {
        const { data } = await axios.get(`${ENDPOINT}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        setUserRecommended(data.articles);
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

    const handleHoverEnter = () => {
        setIsHovered(true)
    }

    const handleHoverLeave = () => {
        setIsHovered(false)
    }

    useEffect(() => {
        if (userRecommended.length === 0) { getRec() }
    }, [])

    if (userRecommended.length === 0) {
        return (<div className="c-newsArticle border-2 flex justify-center items-center">Loading...</div>)
    }

    return (
        <li className={`c-newsArticle ${(viewMode === "headline") ? "col-span-2 xl:col-span-3" : ""}`} style={{ backgroundImage: `url('${article.url_to_image}')` }}>
            <div className="c-newsArticle__overlay" onClick={handleClick}></div>
            <div className="c-newsArticle__card">
                <div className="c-newsArticle__cardHeader">
                    <h4 className={`c-newsArticle__textPill self-start ${article.pref_id % 3 === 0 ? "bg-red-500" :
                        article.pref_id % 3 === 1 ? "bg-green-500" :
                        article.pref_id % 3 === 2 ? "bg-blue-500" :
                                ""
                        }`}>{article.preference}</h4>
                    <div
                        className={`c-newsArticle__recommend ${userRecommended.find((recArt: any) => article.id === recArt.id) ? "bg-green-600" : ""}`}
                        onClick={() => { handleRecClick(article.id) }}
                    ></div>
                </div>
                <div className={`c-newsArticle__sourceRecent ${click || isHovered ? "hidden" : ""}`}>
                    <p className={`c-newsArticle__textPill bg-slate-600`}>{article.source}</p>
                    <p className={`c-newsArticle__textPill bg-slate-600`}>{article.read_time}m read time</p>
                </div>
            </div>

            <div className={`c-newsArticle__body hover:c-newsArticle__body--clicked ${click ? "c-newsArticle__body--clicked" : ""}`} onClick={handleClick} onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave}>
                <div className="c-newsArticle__info">
                    <h3 className={`c-newsArticle__title`}>{article.title}</h3>
                    <h3 className={viewMode != "list" ? `c-newsArticle__description--grid` : "c-newsArticle__description"}>{article.description}</h3>
                </div>
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
            </div>
        </li>
    );
};

export default NewsArticleListItem;