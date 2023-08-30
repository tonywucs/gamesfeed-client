
interface headerOptions {
    handleToggleSideNav: () => void
}

const Header = ({ handleToggleSideNav }: headerOptions) => {
    return (
        <header className="flex h-12">
            <div className="w-12 h-12 border-2"></div>
            <h1 className="text-5xl">GamesFeed</h1>
        </header>
    );
};

export default Header;