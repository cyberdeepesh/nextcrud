import Link from "next/link";

const Navbar = () => {
    return (
        <div>
            <header className="w-full bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo + Primary nav */}
                        <div className="flex items-center">
                            <Link href="/" className="text-2xl font-semibold text-gray-800">MyApp</Link>

                            <nav className="hidden md:flex ml-6 space-x-4">
                                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm">Home</Link>
                                <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm">Dashboard</Link>
                                <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm">About</Link>
                            </nav>
                        </div>

                        {/* Actions: Sign in / Sign up (desktop) + User menu (desktop) + Mobile menu */}
                        <div className="flex items-center space-x-3">
                            {/* Desktop auth buttons */}
                            <div className="hidden md:flex items-center space-x-2">
                                <Link href="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">Sign in</Link>
                                <Link href="/signup" className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700">Sign up</Link>
                            </div>

                            {/* Desktop user dropdown (replace avatar src with real user image when available) */}
                            <details className="hidden md:block relative">
                                <summary className="flex items-center cursor-pointer rounded-full p-1 hover:bg-gray-100">
                                    <img src="/avatar-placeholder.png" alt="User avatar" className="w-8 h-8 rounded-full object-cover" />
                                </summary>
                                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-md shadow-lg py-1 z-10">
                                    <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                                    <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Settings</Link>
                                    <form method="post" action="/logout">
                                        <button type="submit" className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign out</button>
                                    </form>
                                </div>
                            </details>

                            {/* Mobile menu (uses details/summary so no JS required) */}
                            <details className="md:hidden">
                                <summary className="p-2 rounded-md hover:bg-gray-100">
                                    <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </summary>
                                <div className="mt-2 space-y-1 bg-white rounded-md shadow p-2">
                                    <Link href="/" className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50">Home</Link>
                                    <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50">Dashboard</Link>
                                    <Link href="/about" className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50">About</Link>
                                    <div className="border-t my-1" />
                                    <Link href="/login" className="block px-3 py-2 rounded-md text-base text-gray-700 hover:bg-gray-50">Sign in</Link>
                                    <Link href="/signup" className="block px-3 py-2 rounded-md text-base bg-blue-600 text-white text-center hover:bg-blue-700">Sign up</Link>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar;