import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  const menuItems = [
    { path: '/calendar', label: '📅 캘린더 관리' },
    { path: '/schedules', label: '📝 일정 리스트' },
    { path: '/notes', label: '🗒️ 노트 관리' },
    { path: '/files', label: '🗃️ 파일 관리' },
    { path: '/projects', label: '📈 프로젝트 관리' },
  ];

  return (
    <div className="w-64 min-w-[250px] h-full bg-gray-900 text-white flex flex-col">
      <div className="p-5 text-2xl font-bold border-b border-gray-700">
        Apps
      </div>
      <div className="flex-1 overflow-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block p-4 text-lg hover:bg-gray-800 transition ${
                isActive ? 'bg-gray-800' : ''
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
