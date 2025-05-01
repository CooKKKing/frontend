import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MyPageMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: '내 게시글', path: '/mypage' },
    { name: '도전과제', path: '/mypage/challenges' },
    { name: '칭호', path: '/mypage/titles' },
    { name: '프로필 수정', path: '/mypage/profile-edit' },
    { name: '북마크 리스트', path: '/mypage/' },
    { name: '비밀번호 변경', path: '/mypage/change-password' },
    { name: '회원탈퇴', path: '/mypage/withdrawal' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 px-4">마이페이지</h2>
      <div className="border border-gray-200 rounded-lg">
        <nav>
          <ul className="divide-y divide-gray-200">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block w-full px-4 py-3 transition-colors ${
                    currentPath === item.path
                      ? 'bg-orange-light text-orange font-bold'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MyPageMenu; 