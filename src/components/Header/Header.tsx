import { Link } from 'react-router-dom';
import signinIcon from '../../assets/icons/user-solid.svg';
import chevronRightIcon from '../../assets/icons/circle-chevron-right-solid.svg';

import './Header.scss';

interface headerOptions {
    handleToggleSideNav: () => void
}

const Header = ({ handleToggleSideNav }: headerOptions) => {
    return (
        <header className="header">
            <div
                className="sideNav"
                onClick={handleToggleSideNav}
            >
                <img className="sideNav__icon" src={chevronRightIcon} alt="Chevron open side navigation "></img>
            </div>
            <Link
                className="flex max-w-xs mx-auto"
                to="/"
            >
                <h1 className="header__brand">Games<span className="header__brandTail">Feed</span></h1>
            </Link>
            <Link
                className="signin"
                to="/login"
            >
                <img className="signin__icon" src={signinIcon} alt="Sign In Icon"></img>
            </Link>
        </header>
    );
};

export default Header;