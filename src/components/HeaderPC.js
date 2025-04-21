import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import { menuItems } from '../constants/menuItems';
import LoginModal from './LoginModal';

const HeaderPC = ({ activeMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <aside
        className={`bg-white h-screen flex flex-col justify-between items-center py-4 transition-all shadow-menu duration-300 ${
          isExpanded ? 'w-[200px]' : 'w-[80px]'
        }`}
      >
        {/* 로고 - 메뉴 토글용 */}
        <div
          className="cursor-pointer border border-black flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <img src={logo} alt="Logo" className="h-20 w-20" />
        </div>

        {/* 메뉴 리스트 */}
        <nav>
          <ul className="w-full h-full gap-[40px] text-gray-700 flex flex-col items-center justify-center">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className={`flex items-center transition-all duration-200 ${
                  isExpanded ? 'w-[150px]' : 'w-fit'
                } ${
                  activeMenu === item.name && item.name !== '로그인' 
                    ? 'bg-orange-light border-l-orange border-l-[5px] font-bold' 
                    : ''
                }`}
              >
                {item.name === '로그인' ? (
                  <a
                    href="#"
                    onClick={handleLoginClick}
                    className="flex items-center w-full"
                  >
                    <span className="w-fit h-fit text-[28px] py-[8px] px-[10px]">{item.icon}</span>
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-opacity duration-400 ${
                        isExpanded ? 'opacity-100 block' : 'opacity-0 hidden'
                      }`}
                    >
                      {item.name}
                    </span>
                  </a>
                ) : (
                  <Link 
                    to={item.path} 
                    className="flex items-center w-full"
                  >
                    <span className="w-fit h-fit text-[28px] py-[8px] px-[10px]">{item.icon}</span>
                    <span
                      className={`whitespace-nowrap overflow-hidden transition-opacity duration-400 ${
                        isExpanded ? 'opacity-100 block' : 'opacity-0 hidden'
                      }`}
                    >
                      {item.name}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer (접혔을 때 숨김) */}
        <footer
          className={`min-h-20 h-20 text-sm text-gray-500 transition-opacity duration-300 ${
            isExpanded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Test Footer<br />
          개인정보 처리방침<br />
          이용약관<br />
          CopyRight © 2025
        </footer>
      </aside>

      {/* 로그인 모달 */}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </>
  );
};

export default HeaderPC;
