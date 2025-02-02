import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


const links = [
  { name: 'Home', href: '/' },
  { name: 'Manage Articles', href: '/manage_articles' },
  { name: 'Curriculum', href: '/curriculum' },
  { name: 'Logout', href: '/logout' },  

];

export default function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    // Fetch user role from local storage or backend
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role) {
      setUserRole(user.role);
    }
  }, []);





  return (
    <nav className="w-full sticky top-0 bg-white z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_OMCDQzBo11aNK4tpTuOWHEZ69uoEMsR72w&s" 
              alt="Logo" 
              className="h-16"
            />
          </motion.div>
          <div className="hidden md:flex space-x-4">
            {links.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.name}
              </motion.a>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? 'Close' : 'Menu'}
            </button>
          </div>
        </div>
        {isOpen && (
          <div className="md:hidden">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}