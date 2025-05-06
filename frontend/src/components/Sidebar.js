import { 
    LayoutDashboard, 
    FileText, 
    Headphones, 
    Settings, 
    LogOut, 
    Code, 
    X 
  } from 'lucide-react';
import Logo from './Logo';
  
  const Sidebar = ({ isMobileMenuOpen, closeMobileMenu }) => {
    const navItems = [
      { name: 'DASHBOARD', icon: <LayoutDashboard size={20} />, active: true },
      { name: 'ARTICLES', icon: <FileText size={20} /> },
      { name: 'PODCASTS', icon: <Headphones size={20} /> },
      { name: 'SETTINGS', icon: <Settings size={20} /> },
    ];
  
    return (
      <>
        {/* Overlay for mobile menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
            onClick={closeMobileMenu}
          />
        )}
  
        {/* Sidebar */}
        <div 
          className={`w-64 bg-secondary text-white fixed inset-y-0 left-0 z-20 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {/* Close button for mobile */}
          <div className="lg:hidden absolute right-4 top-4">
            <button 
              onClick={closeMobileMenu}
              className="text-white hover:text-gray-200"
            >
              <X size={24} />
            </button>
          </div>
  
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b border-secondary-dark">
            <div className="text-3xl font-bold tracking-wider">
              <div className="flex items-center">
                <Logo/>
              </div>
            </div>
          </div>
  
          {/* Navigation */}
          <nav className="mt-8">
            <ul>
              {navItems.map((item) => (
                <li key={item.name}>
                  <a
                    href="#"
                    className={`flex items-center px-6 py-4 hover:bg-econdary-dark transition-colors ${
                      item.active ? 'border-l-4 border-secondary' : ''
                    }`}
                  >
                    <span className="mr-4">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
  
          {/* Logged in as */}
          <div className="absolute bottom-20 w-full px-6">
            <div className="flex items-center">
              <div className="flex items-center">
                <span className="text-sm">LOGGED IN AS</span>
                <Code size={16} className="ml-2 text-secondary" />
              </div>
            </div>
          </div>
  
          {/* Logout */}
          <div className="absolute bottom-6 w-full px-6">
            <button className="flex items-center justify-center w-full px-4 py-2 bg-primary  rounded-3xl hover:bg-opacity-75 transition-colors">
              <LogOut size={18} className="mr-2" />
              <span>LOGOUT</span>
            </button>
          </div>
        </div>
      </>
    );
  };
  
  export default Sidebar;