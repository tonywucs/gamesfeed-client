import { useState } from 'react'

interface navOptions {
    toggleSideNav: boolean,
    handleToggleSideNav: () => void
}

const SideNav = ({ toggleSideNav, handleToggleSideNav }: navOptions) => {
    return (
        <>
            {toggleSideNav ?
                <div className="absolute z-20 w-24 h-full bg-slate-700">
                    <h1 className="text-5xl">SIDE NAV</h1>
                    <div className="bg-white w-12 h-12 flex justify-center items-center" onClick={handleToggleSideNav}>X</div>
                </div> : ""
            }
        </>

    );
};

export default SideNav;