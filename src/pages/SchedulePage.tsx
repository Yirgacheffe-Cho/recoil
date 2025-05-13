import { useState, useEffect } from 'react';
import ScheduleList from '../components/ScheduleList';
import ScheduleModal from '../components/ScheduleModal';
import { ScheduleItem } from '../atoms/scheduleAtom';
import { useSchedules } from '../hooks/useSchedules';

export default function SchedulePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  );
  const [reload, setReload] = useState(false);

  // ✅ Recoil을 통해 일정 로딩
  const { loadSchedules } = useSchedules();

  // ✅ 페이지 로딩 시 일정 불러오기
  useEffect(() => {
    loadSchedules();
  }, [reload]);

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedSchedule(null);
    setModalOpen(true);
  };

  const handleRefresh = () => {
    setReload(!reload); // 다시 로딩 트리거
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">📋 일정 관리</h1>
      <button onClick={handleAdd} className="btn mb-4">
        + 일정 추가하기
      </button>
      <ScheduleList />
      {modalOpen && (
        <ScheduleModal
          isEdit={isEdit}
          schedule={selectedSchedule ?? undefined}
          onClose={() => setModalOpen(false)}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
}
