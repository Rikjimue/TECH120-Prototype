import { Link, useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { User } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';

export function Navbar() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "text-black dark:text-white font-medium px-3 py-2 rounded transition-colors duration-200"
            : "text-gray-700 dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 font-medium px-3 py-2 rounded transition-colors duration-200";
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-transparent dark:bg-gray-900/80 backdrop-filter backdrop-blur-md border-b border-gray-300 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img src="/src/assets/images/logo.png" alt="Logo" className="h-12 w-auto" />
                    <span className="ml-2 text-black dark:text-white font-bold text-xl">DataBreachChecker</span>
                </Link>

                {/* Centered Links for Desktop */}
                <div className="hidden md:flex md:space-x-6 items-center">
                    <Link to="/" className={getLinkClass("/")}>Home</Link>
                    <Link to="/dashboard" className={getLinkClass("/dashboard")}>Dashboard</Link>
                    <Link to="/about" className={getLinkClass("/about")}>About</Link>
                    <Link to="/pricing" className={getLinkClass("/pricing")}>Pricing</Link>
                    <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>
                </div>

                {/* Dark Mode Toggle and Login Button */}
                <div className="hidden md:flex items-center space-x-4">
                    <DarkModeToggle />
                    <Link to="/login">
                        <Button className="text-white dark:text-gray-300 hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 flex items-center transition-colors duration-200">
                            <User className="mr-2 h-4 w-4" /> Login
                        </Button>
                    </Link>
                </div>

                {/* Hamburger Menu Button */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 dark:text-gray-300 focus:outline-none">
                        {isMobileMenuOpen ? (
                            <span className="text-xl">✕</span> // Close icon
                        ) : (
                            <span className="text-xl">☰</span> // Menu icon
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-white dark:bg-gray-800 bg-opacity-90 z-40 p-4 md:hidden">
                    <div className="flex justify-end">
                        <button onClick={() => setIsMobileMenuOpen(false)} className="text-black dark:text-white text-2xl">✕</button>
                    </div>
                    <ul className="mt-4 space-y-4 text-center text-black dark:text-white font-semibold">
                        <li>
                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded px-3 py-2 block">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded px-3 py-2 block">
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded px-3 py-2 block">
                                About
                            </Link>
                        </li>
                        <li>
                            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded px-3 py-2 block">
                                Pricing
                            </Link>
                        </li>
                        <li>
                            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 rounded px-3 py-2 block">
                                Contact
                            </Link>
                        </li>
                        <li className="mt-6">
                            <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block">
                                <Button className="text-black dark:text-gray-800 hover:bg-blue-200 dark:hover:bg-gray-700 hover:bg-opacity-30 dark:hover:bg-opacity-30 flex items-center w-full justify-center transition-colors duration-200">
                                    <User className="text-black mr-2 h-4 w-4" /> Login
                                </Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
