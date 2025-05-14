import React from 'react';
import { useLocation } from 'react-router-dom';

const TopBar = () => {
  // 📌 현재 경로를 추적하기 위해 useLocation 사용
  const location = useLocation();

  // 🔍 현재 위치에 따라 타이틀을 설정
  const getTitle = () => {
    switch (location.pathname) {
      case '/calendar':
        return '📅 캘린더 관리';
      case '/schedules':
        return '📝 일정 리스트';
      case '/notes':
        return '🗒️ 노트 관리';
      case '/files':
        return '🗃️ 파일 관리';
      case '/projects':
        return '📈 프로젝트 관리';
      default:
        return '📌 Dashboard';
    }
  };

  return (
    <div className="h-14 min-h-[60px] bg-gray-800 text-white flex items-center justify-between px-5">
      <div className="text-lg font-bold">{getTitle()}</div>
      <div className="flex items-center gap-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded">
          새 일정 추가
        </button>
        <div className="bg-gray-700 px-4 py-2 rounded-full">👤 Admin</div>
      </div>
    </div>
  );
};

export default TopBar;
