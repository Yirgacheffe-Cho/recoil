import { useState } from 'react';
import ScheduleList from '../components/ScheduleList';
import ScheduleModal from '../components/ScheduleModal';
import { ScheduleItem } from '../atoms/scheduleAtom';

export default function SchedulePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleItem | null>(
    null,
  );
  const [reload, setReload] = useState(false);

  const handleAdd = () => {
    setIsEdit(false);
    setSelectedSchedule(null);
    setModalOpen(true);
  };

  const handleEdit = (schedule: ScheduleItem) => {
    console.log('Edit clicked for schedule:', schedule); // 🔍 디버깅용 로그
    setIsEdit(true); // 수정 모드로 전환
    setSelectedSchedule(schedule); // 🔥 여기서 schedule을 사용함
    setModalOpen(true); // 모달 열기
  };

  const handleRefresh = () => {
    setReload(!reload);
  };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">📋 일정 관리</h1>
      <button onClick={handleAdd} className="btn mb-4">
        + 일정 추가하기
      </button>
      <ScheduleList reload={reload} onEdit={handleEdit} />
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
