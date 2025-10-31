import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Headphones, 
  LogOut, 
  X 
} from 'lucide-react';
import Logo from './Logo';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/Config';

const Sidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
  const navigate = useNavigate();

  const navItems = [
    { name: 'DASHBOARD', link: '/dashboard', icon: <LayoutDashboard size={20} />, active: true },
    { name: 'ARTICLES', link: '/articles', icon: <FileText size={20} /> },
    { name: 'PODCASTS', link: '/podcastlist', icon: <Headphones size={20} /> },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
      if (isMobileMenuOpen) {
        closeMobileMenu();
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Failed to logout. Please try again.');
    }
  };

  return (
    <>
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-40
        w-64 bg-white shadow-lg
        transform transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0
      `}>
        {/* Close button for mobile */}
        <div className="lg:hidden absolute top-4 right-4">
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-md hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link to="/dashboard" onClick={closeMobileMenu}>
            <div className="flex items-center justify-center">
              <Logo />
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.link}
                  onClick={closeMobileMenu}
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg
                    transition-colors duration-200
                    ${item.active 
                      ? 'bg-primary text-white' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full
              text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <LogOut size={20} />
            <span className="font-medium">LOGOUT</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;