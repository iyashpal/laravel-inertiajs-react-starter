import React from 'react';
import { Link } from '@inertiajs/inertia-react';

export default function NavLink({ href, active, children }) {

    return (
        <Link
            href={href}
            className={`${active ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'} px-3 py-2 rounded-md text-sm font-medium transition duration-150 ease-in-out`}
        >
            {children}
        </Link>
    );
}
