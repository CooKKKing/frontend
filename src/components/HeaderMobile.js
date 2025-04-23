import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png'
import { mobileMenuItems } from '../constants/menuItems';
import LoginModal from './LoginModal';

const HeaderMobile = ({ activeMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    const dropdownMenus = mobileMenuItems.filter(item => item.isDropdown);
    
    const isAnyDropdownActive = dropdownMenus.some(menu => 
      menu.subMenus.some(subItem => currentPath === subItem.path)
    );

    if (!isAnyDropdownActive) {
      setOpenDropdown(null);
    } else {
      const activeDropdown = dropdownMenus.find(menu => 
        menu.subMenus.some(subItem => currentPath === subItem.path)
      );
      if (activeDropdown) {
        setOpenDropdown(activeDropdown.name);
      }
    }
  }, [location]);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  const handleDropdownClick = (itemName) => {
    setOpenDropdown(openDropdown === itemName ? null : itemName);
  };

  const isSubMenuActive = (path) => {
    return location.pathname === path;
  };

  const isMenuActive = (item) => {
    if (item.isDropdown && item.subMenus) {
      return item.subMenus.some(subItem => location.pathname === subItem.path);
    }
    return activeMenu === item.name;
  };

  return (
    <>
      <header className="bg-white h-16 px-4 shadow-md flex justify-between items-center w-full fixed top-0 z-50">
        {/* 로고 */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <span className="ml-2 text-orange font-bold text-lg">COOKING</span>
        </Link>

        {/* 햄버거 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-gray-700 focus:outline-none"
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <nav className="absolute top-16 left-0 w-full bg-white shadow-lg z-40">
            <ul className="flex flex-col items-start p-4">
              {mobileMenuItems.map((item) => (
                <li
                  key={item.name}
                  className={`w-full mb-2 ${
                    isMenuActive(item) && item.name !== '로그인' ? 'text-orange font-bold' : 'text-gray-700'
                  }`}
                >
                  {item.name === '로그인' ? (
                    <a
                      href="#"
                      onClick={handleLoginClick}
                      className="flex items-center py-2"
                    >
                      <span className="text-[24px] mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </a>
                  ) : item.isDropdown ? (
                    <div className="w-full">
                      <button
                        onClick={() => handleDropdownClick(item.name)}
                        className="flex items-center justify-between w-full py-2"
                      >
                        <div className="flex items-center">
                          <span className="text-[24px] mr-3">{item.icon}</span>
                          <span>{item.name}</span>
                        </div>
                        <span className={`transform transition-transform duration-300 ${openDropdown === item.name ? 'rotate-180' : ''}`}>
                          {item.arrowIcon}
                        </span>
                      </button>
                      {openDropdown === item.name && (
                        <ul className="pl-9 mt-2 bg-orange-light text-[15px]">
                          {item.subMenus.map((subItem) => (
                            <li key={subItem.name} className="">
                              <Link
                                to={subItem.path}
                                className={`block py-2 hover:text-black ${
                                  isSubMenuActive(subItem.path) ? 'text-black font-bold' : 'text-gray-600'
                                }`}
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link 
                      to={item.path}
                      className="flex items-center py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-[24px] mr-3">{item.icon}</span>
                      <span>{item.name}</span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      {/* 로그인 모달 */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default HeaderMobile;
