import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const ShopMenu = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: '밥풀 상점', path: '/shop' },
    { name: '밥풀 내역', path: '/shop/history' },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 px-4">상점</h2>
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

export default ShopMenu; 