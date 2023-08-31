import { useState } from 'react'

interface navOptions {
    toggleSideNav: boolean,
    handleToggleSideNav: () => void
}

const SideNav = ({ toggleSideNav, handleToggleSideNav }: navOptions) => {
    return (
        <>
            {toggleSideNav ?
                <div className="absolute z-[60] w-1/2 max-w-xs h-full bg-black opacity-80">
                    <h1 className="text-5xl">SIDE NAV</h1>
                    <div className="bg-white w-12 h-12 flex justify-center items-center" onClick={handleToggleSideNav}>X</div>
                </div> : ""
            }
        </>

    );
};

export default SideNav;