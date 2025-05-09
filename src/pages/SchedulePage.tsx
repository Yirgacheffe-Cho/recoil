// src/pages/SchedulePage.tsx
import { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import ScheduleModal from '../components/ScheduleModal';
import { useSchedules } from '../hooks/useSchedules';

export default function SchedulePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [reload, setReload] = useState(false);
  const { createSchedule } = useSchedules(reload);

  const handleAddSchedule = () => {
    setModalOpen(true);
  };

  const handleReload = () => {
    setReload(!reload); // 🔄 리스트 강제 리로드
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">📋 일정 관리</h1>
      <button onClick={handleAddSchedule} className="btn">
        + 일정 추가하기
      </button>
      <ScheduleList reload={reload} />
      {modalOpen && (
        <ScheduleModal
          onClose={() => setModalOpen(false)}
          onAdd={handleReload}
          createSchedule={createSchedule}
        />
      )}
    </div>
  );
}
