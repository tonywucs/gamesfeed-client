import { Link } from 'react-router-dom';
import signinIcon from '../../assets/icons/user-solid.svg';
import chevronRightIcon from '../../assets/icons/circle-chevron-right-solid.svg';
import lightModeIcon from '../../assets/icons/sun-solid.svg';
import darkModeIcon from '../../assets/icons/moon-solid.svg';

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
                className="sideNav hidden"
                onClick={handleToggleSideNav}
            >
                <img className={toggleDarkMode ? `sideNav__icon--dark` : `sideNav__icon`} src={chevronRightIcon} alt="Chevron open side navigation "></img>
            </div>
            <div className="absolute left-4">
                <div className={`header__mode hover:font-semibold ${toggleDarkMode ? `header__mode--dark` : ``}`} onClick={handleToggleDarkMode}>
                    <img className={toggleDarkMode ? `sideNav__icon--dark` : `sideNav__icon`} src={toggleDarkMode ? lightModeIcon : darkModeIcon} alt="Light/Dark Toggle" />
                    <p className={`w-full body-sm text-stone-900 dark:text-slate-300 hover:font-semibold text-center`}> {toggleDarkMode ? "Light" : "Dark"}</p>
                </div>
            </div>
            <Link
                className={`flex max-w-xs mx-auto`}
                to="/"
            >
                <h1 className={`header__brand flex gap-x-1 items-center ${toggleDarkMode ? `header__brand--dark` : ``}`}>Games<span className="header__brandTail p-1.5">Feed</span></h1>
            </Link>
            <div className="flex absolute right-0 gap-x-4">
                <Link
                    className={`signin ${toggleDarkMode ? `signin--dark hover:font-semibold` : `hover:font-semibold`}`}
                    to="/login"
                >
                    <img className={toggleDarkMode ? `sideNav__icon--dark` : `sideNav__icon`} src={signinIcon} alt="Sign In Icon"></img>
                    <p className={`w-full body-sm text-stone-900 dark:text-slate-300 text-center`}>Sign In</p>
                </Link>
            </div>
        </header>
    );
};

export default Header;