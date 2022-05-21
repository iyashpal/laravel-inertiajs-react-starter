import React, { useEffect, useRef } from 'react';

export default function Input({ type = 'text', name, value, className, autoComplete, required, isFocused, onChange, disabled = false, ...attrs }) {
    const input = useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <div className="flex flex-col items-start">
            <input
                {...attrs}
                type={type}
                name={name}
                ref={input}
                value={value}
                disabled={disabled}
                required={required}
                autoComplete={autoComplete}
                onChange={(e) => onChange(e)}
                className={`border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
            />
        </div>
    );
}
