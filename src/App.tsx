// src/App.tsx
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/schedules" />} />
          <Route path="/schedules" element={<SchedulePage />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
}
