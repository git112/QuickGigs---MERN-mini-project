import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiBriefcase, FiUser, FiPlus } from 'react-icons/fi';
import Button from '../ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Explore Gigs', path: '/gigs' },
    { name: 'How It Works', path: '/how-it-works' },
  ];
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="relative flex items-center justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 bg-gradient-to-r from-primary-600 to-accent-600 rounded-lg flex items-center justify-center text-white font-bold">
                    FX
                  </div>
                  <span className="text-xl font-bold text-gray-900">QuickGigs</span>
                </div>
              </Link>
            </div>
            
            {/* Mobile menu button */}
            <div className="ml-4 flex items-center md:hidden">
              <button 
                type="button" 
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none"
                onClick={toggleMenu}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? <FiX className="block h-6 w-6" /> : <FiMenu className="block h-6 w-6" />}
              </button>
            </div>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'text-primary-700 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Desktop action buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Link to="/gigs/post">
              <Button 
                variant="primary" 
                size="md"
                icon={<FiPlus />}
              >
                Post a Gig
              </Button>
            </Link>
            <Link to="/freelancer">
              <Button 
                variant="outline" 
                size="md"
                icon={<FiBriefcase />}
              >
                Find Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="pt-2 pb-3 space-y-1 px-4">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(item.path)
                  ? 'text-primary-700 bg-primary-50'
                  : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/gigs/post" onClick={() => setIsOpen(false)}>
              <Button 
                variant="primary" 
                size="md"
                fullWidth
                icon={<FiPlus />}
              >
                Post a Gig
              </Button>
            </Link>
            <Link to="/freelancer" onClick={() => setIsOpen(false)}>
              <Button 
                variant="outline" 
                size="md"
                fullWidth
                icon={<FiBriefcase />}
              >
                Find Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;