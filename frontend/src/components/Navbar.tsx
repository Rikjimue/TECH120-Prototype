import { Link, useLocation } from 'react-router-dom';
import { Button } from "../components/ui/button";
import { User } from 'lucide-react';

export function Navbar() {
    const location = useLocation();

    const getLinkClass = (path: string) => {
        return location.pathname === path
            ? "border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium";
    };

    return (
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-gray-800">DataBreachChecker</span>
              </div>
              <div className="hidden sm:ml-40 sm:flex sm:space-x-8">
                <Link to="/" className={getLinkClass("/")}>
                  Home
                </Link>
                <Link to="/dashboard" className={getLinkClass("/dashboard")}>
                  Dashboard
                </Link>
                <Link to="/about" className={getLinkClass("/about")}>
                  About
                </Link>
                <Link to="/pricing" className={getLinkClass("/pricing")}>
                  Pricing
                </Link>
                <Link to="/contact" className={getLinkClass("/contact")}>
                  Contact
                </Link>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <Link to="/login">
                <Button variant="outline" className="flex items-center">
                  <User className="mr-2 h-4 w-4" /> Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    )
}
