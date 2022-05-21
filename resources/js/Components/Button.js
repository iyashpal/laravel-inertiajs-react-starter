import React, { useState, useEffect } from 'react';

export default function Button({ type = 'submit', className = '', processing, children, theme = null, ...attrs }) {

    function setTheme(theme) {
        switch (theme) {

            case 'danger':
                return 'bg-red-600 border-transparent text-white hover:bg-red-500 focus:outline-none focus:border-red-700 focus:ring focus:ring-red-200 active:bg-red-600'

            case 'default':
                return 'bg-white border-gray-300 rounded-md font-semibold text-xs text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:ring focus:ring-blue-200 active:text-gray-800 active:bg-gray-50'

            default:
                return 'bg-gray-800 border-transparent text-white hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring focus:ring-gray-300'
        }
    }

    return (
        <button type={type} disabled={processing} className={`inline-flex items-center px-4 py-2 rounded-md font-semibold text-xs border uppercase tracking-widest disabled:opacity-25 transition ${setTheme(theme)} ${className}`} {...attrs}>
            {children}
        </button>
    );
}
