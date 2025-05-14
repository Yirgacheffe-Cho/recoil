import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SchedulePage from './pages/SchedulePage';
import { RecoilRoot } from 'recoil';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Loading } from './components/Loading';

export default function App() {
  return (
    <RecoilRoot>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Router>
            <Routes>
              <Route path="/" element={<Navigate to="/schedules" />} />
              <Route path="/schedules" element={<SchedulePage />} />
            </Routes>
          </Router>
        </Suspense>
      </ErrorBoundary>
    </RecoilRoot>
  );
}
