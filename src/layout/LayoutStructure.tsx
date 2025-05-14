import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './SideBar';
import CalendarPage from '../pages/CalendarPage';
import SchedulePage from '../pages/SchedulePage';
import { RecoilRoot } from 'recoil';
const LayoutStructure = () => {
  return (
    <RecoilRoot>
      <Router>
        <div className="flex h-screen">
          {/* 📌 사이드바 */}
          <Sidebar />

          {/* 📌 메인 콘텐츠 영역 */}
          <div className="flex-1 flex flex-col">
            {/* 📌 상단바 */}
            <TopBar />

            {/* 📌 페이지 전환 영역 */}
            <div className="flex-1 bg-gray-100 overflow-hidden">
              <Routes>
                <Route path="/" element={<Navigate to="/calendar" />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/schedules" element={<SchedulePage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </RecoilRoot>
  );
};

export default LayoutStructure;
