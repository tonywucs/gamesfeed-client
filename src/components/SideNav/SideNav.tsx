import { useState } from 'react'

interface navOptions {
    toggleSideNav: boolean,
    handleToggleSideNav: () => void
}

const SideNav = ({ toggleSideNav, handleToggleSideNav }: navOptions) => {
    return (
        <>
            {toggleSideNav ?
                <div className="fixed z-[60] w-1/2 max-w-xs h-full bg-black opacity-80 text-white">
                    <h1 className="text-5xl">YOUR NAME</h1>
                    <div className="bg-white w-12 h-12 flex justify-center items-center" onClick={handleToggleSideNav}>X</div>
                    <h3>Home</h3>
                    <h3>Your Recommends</h3>
                    <h3>Friend Recommends</h3>
                    <h3>Filter By</h3>
                    <h3>Sort By</h3>
                    <h3>Friends List</h3>
                    <h3>Preferences</h3>
                    <h3>Logout</h3>
                </div> : ""
            }
        </>

    );
};

export default SideNav;