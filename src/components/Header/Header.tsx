import { Link } from 'react-router-dom';

interface headerOptions {
    handleToggleSideNav: () => void
}

const Header = ({ handleToggleSideNav }: headerOptions) => {
    return (
        <header className="flex h-24 bg-red-100 items-center">
            <div
                className="absolute w-12 h-12 border-2 border-black rounded-lg ml-4"
                onClick={handleToggleSideNav}
            ></div>
            <Link
                className="flex max-w-xs mx-auto"
                to="/"
            >
                <h1 className="text-3xl">GamesFeed</h1>
            </Link>
            <Link
                className="absolute right-0 w-12 h-12 border-2 border-black rounded-lg mr-4"
                to="/signup"
            ></Link>
        </header>
    );
};

export default Header;