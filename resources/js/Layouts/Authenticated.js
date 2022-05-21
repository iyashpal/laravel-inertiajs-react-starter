import NavLink from '@/Components/NavLink'
import { Link } from '@inertiajs/inertia-react'
import React, { useState, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import ApplicationLogo from '@/Components/ApplicationLogo'
import ResponsiveNavLink from '@/Components/ResponsiveNavLink'
import { ViewGridAddIcon, LogoutIcon, MenuIcon, XIcon, BellIcon } from '@heroicons/react/outline'

export default function Authenticated({ auth, header, children }) {

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const [navigation] = useState([
        { label: 'Dashboard', route: 'dashboard', icon: ViewGridAddIcon },
    ])

    return (
        <div className="min-h-full">
            <div className="bg-gray-800 pb-32">
                <nav className="bg-gray-800">
                    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                        <div className="border-b border-gray-700">
                            <div className="flex items-center justify-between h-16 px-4 sm:px-0">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Link href="/">
                                            <ApplicationLogo className="h-10 w-10" />
                                        </Link>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((link, key) => (
                                                <NavLink key={key} href={route(link.route)} active={route().current(link.route)}>
                                                    {link.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        <button type="button" className="bg-gray-800 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">View notifications</span>
                                            <BellIcon className="h-6 w-6" />
                                        </button>
                                        <Menu as="div" className="ml-3 relative">
                                            <div className="inline-flex rounded-md">
                                                <Menu.Button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium focus:outline-none transition ease-in-out duration-150">
                                                    <span className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                                        <span className="sr-only">Open user menu</span>
                                                        <img className="h-8 w-8 rounded-full" src={auth.user.avatar} alt={auth.user.name} />
                                                    </span>
                                                    <ChevronDownIcon className="ml-2 -mr-0.5 h-4 w-4 text-gray-300" aria-hidden="true" />
                                                </Menu.Button>
                                            </div>
                                            <Transition
                                                as={Fragment}
                                                enter="transition ease-out duration-100"
                                                enterFrom="transform opacity-0 scale-95"
                                                enterTo="transform opacity-100 scale-100"
                                                leave="transition ease-in duration-75"
                                                leaveFrom="transform opacity-100 scale-100"
                                                leaveTo="transform opacity-0 scale-95"
                                            >
                                                <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right shadow-lg focus:outline-none">
                                                    <div className='rounded-md ring-1 ring-black ring-opacity-5 py-1 bg-white divide-y divide-gray-100'>
                                                        <div>
                                                            <div class="block px-4 py-2 text-xs text-gray-400"> Manage Account </div>
                                                            <Menu.Item>
                                                                <Link href={route('user.account')} as="button" className={`block w-full px-4 py-2 text-sm text-left leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition`} >
                                                                    Your Account
                                                                </Link>
                                                            </Menu.Item>
                                                        </div>
                                                        <div>
                                                            <Menu.Item>
                                                                <Link href={route('logout')} method="post" as="button" className={`block w-full px-4 py-2 text-sm text-left leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition`} >
                                                                    Log Out
                                                                </Link>
                                                            </Menu.Item>
                                                        </div>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    <button
                                        onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                        type="button" className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
                                    >
                                        <span className="sr-only">Open main menu</span>
                                        {showingNavigationDropdown && <XIcon className="block h-6 w-6" />}
                                        {!showingNavigationDropdown && <MenuIcon className="block h-6 w-6" />}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Mobile menu, show/hide based on menu state. --> */}
                    <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' border-b border-gray-700 md:hidden'} id="mobile-menu">
                        <div className="px-2 py-3 space-y-1 sm:px-3">
                            {navigation.map((link, key) => (
                                <ResponsiveNavLink key={key} href={route(link.route)} active={route().current(link.route)}>
                                    {link.label}
                                </ResponsiveNavLink>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={auth.user.avatar} alt={auth.user.name} />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium leading-none text-white">{auth.user.name}</div>
                                    <div className="text-sm font-medium leading-none text-gray-400">{auth.user.email}</div>
                                </div>
                                <button type="button" className="ml-auto bg-gray-800 flex-shrink-0 p-1 text-gray-400 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon className="h-6 w-6" />
                                </button>
                            </div>
                            <div className="mt-3 px-2 space-y-1">

                                <Link href={route('user.account')} as="button" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700`} >
                                    Your Account
                                </Link>
                                <Link href={route('logout')} method="post" as="button" className={`block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700`} >
                                    Log Out
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
                {header && (
                    <header className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            {header}
                        </div>
                    </header>
                )}

            </div>

            <main className="-mt-32">
                <div className="max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
