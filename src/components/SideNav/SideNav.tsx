import { useState } from 'react'

interface navOptions {
    toggle: boolean
}

const SideNav = ({ toggle }: navOptions) => {
    return (
        <div>
            { toggle ? <h1 className="absolute">SIDE NAV</h1> : "" }
        </div>
    );
};

export default SideNav;