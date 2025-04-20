import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import { menuItems } from '../constants/menuItems';
import LoginModal from './LoginModal';

const HeaderMobile = ({ activeMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsMenuOpen(false);
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <header className="bg-orange-light h-16 px-4 shadow-md flex justify-between items-center w-full fixed top-0 z-50">
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
              {menuItems.map((item) => (
                <li
                  key={item.name}
                  className={`w-full mb-2 ${
                    activeMenu === item.name && item.name !== '로그인' ? 'text-orange font-bold' : 'text-gray-700'
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
