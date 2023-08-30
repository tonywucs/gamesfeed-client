import { Link } from 'react-router-dom';

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
    preference: string
};

const NewsArticleListItem = ({ article, preference }: article) => {
    console.log(JSON.stringify(article, null, 2));

    const published = Date.parse(article.published_at);
    const seen = Date.now()
    const daysAgo = Math.floor((seen - published) / 86400000);

    return (
        <li className="my-2">
            <div
                className="relative flex flex-col h-[75vw] max-h-[30rem] border-2 border-black rounded-xl mx-4 bg-center bg-cover"
                style={{ backgroundImage: `url('${article.url_to_image}')` }}
            >
                <div className="flex justify-between m-2 h-8 z-10">
                    <h4 className="flex justify-center items-center font-bold w-fit px-2 py-1 bg-red-600 rounded-xl">{preference}</h4>
                    <div className="w-8 h-8 border-2 border-green-500 rounded-xl"></div>
                </div>

                <div className="absolute bottom-6 z-10 m-2">
                    <div className="flex items-center justify-between h-8">
                        <div className="flex items-center gap-x-1">
                            <p className="flex justify-center items-center font-bold w-fit px-2 py-1 bg-yellow-600 rounded-xl">{article.source}</p>
                            <p className="hidden justify-center items-center font-bold w-fit px-2 py-1 bg-blue-600 rounded-xl md:flex">{article.author}</p>
                        </div>
                        <p className="flex justify-center items-center font-bold w-fit px-2 py-1 bg-gray-600 rounded-xl">{daysAgo} days ago...</p>
                    </div>

                    <h3 className="text-white text-2xl font-bold mt-2 line-clamp-2">{article.title}</h3>
                </div>

                <div className="absolute top-0 w-full h-full bg-black opacity-25"></div>
            </div>

            {/* <p>{article.description}</p> */}

            {/* <Link to={article.url} target="_blank">
                <img src={article.url_to_image} alt={article.title} />
            </Link> */}
        </li>
    );
};

export default NewsArticleListItem;