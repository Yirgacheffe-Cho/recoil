// App.tsx
import React, { Suspense, useState } from 'react';
import { RecoilRoot } from 'recoil';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

const FilteredTodoList = React.lazy(
  () => import('./components/FilteredTodoList'),
);
const TodoModal = React.lazy(() => import('./components/TodoModal'));

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <RecoilRoot>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
        <h1 className="text-3xl font-bold mb-5">Recoil Todo List</h1>

        {/* 🔥 모달 열기 버튼 */}
        <button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 mb-5 rounded hover:bg-green-600"
        >
          + Add Todo
        </button>

        <ErrorBoundary fallback={<div>Something went wrong...</div>}>
          {/* 🔥 Suspense로 Lazy 로딩 */}
          <Suspense fallback={<div>Loading Modal...</div>}>
            {isModalOpen && (
              <TodoModal
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
              />
            )}
          </Suspense>

          <Suspense fallback={<div>Loading Todos...</div>}>
            <FilteredTodoList />
          </Suspense>
        </ErrorBoundary>
      </div>
    </RecoilRoot>
  );
};

export default App;
