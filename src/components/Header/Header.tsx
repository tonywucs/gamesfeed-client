import { Link } from 'react-router-dom';
import signinIcon from '../../assets/icons/user-solid.svg';
import chevronRightIcon from '../../assets/icons/circle-chevron-right-solid.svg';

import './Header.scss';

interface headerOptions {
    handleToggleSideNav: () => void,
    handleToggleDarkMode: () => void,
    toggleDarkMode: boolean
}

const Header = ({ handleToggleSideNav, handleToggleDarkMode, toggleDarkMode }: headerOptions) => {

    return (
        <header className="header">
            <div
                className="sideNav"
                onClick={handleToggleSideNav}
            >
                <img className={toggleDarkMode ? `sideNav__icon--dark` : `sideNav__icon`} src={chevronRightIcon} alt="Chevron open side navigation "></img>
            </div>
            <Link
                className="flex max-w-xs mx-auto"
                to="/"
            >
                <h1 className="header__brand flex gap-x-1 items-center">Games<span className="header__brandTail p-1.5">Feed</span></h1>
            </Link>
            <div>
                <div className="w-8 h-8 bg-green-500" onClick={handleToggleDarkMode}>{toggleDarkMode ? "Light Mode" : "Dark Mode"}</div>
            </div>
            <Link
                className="signin"
                to="/login"
            >
                <img className={toggleDarkMode ? `sideNav__icon--dark` : `sideNav__icon`} src={signinIcon} alt="Sign In Icon"></img>
            </Link>
        </header>
    );
};

export default Header;