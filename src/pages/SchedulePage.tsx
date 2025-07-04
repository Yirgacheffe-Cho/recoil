import { useState, useEffect, Suspense } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ScheduleList from '../components/ScheduleList';
import ScheduleModal from '../components/ScheduleModal';
import { useSchedules } from '../hooks/useSchedules';
import { useUndoRedo } from '../hooks/useUndoRedo';
import {
  modalState,
  ModalState,
  selectedItemState,
} from '../atoms/controlAtom';
import { Loading } from '../components/Loading';

export default function SchedulePage() {
  const [reload, setReload] = useState(false);

  const setModal = useSetRecoilState(modalState);
  useUndoRedo();
  const modal = useRecoilValue(modalState);
  const selectedSchedule = useRecoilValue(selectedItemState);
  const setSelectedItemState = useSetRecoilState(selectedItemState);

  // ✅ Recoil을 통해 일정 로딩
  const { loadSchedules } = useSchedules();

  // ✅ 페이지 로딩 시 일정 불러오기
  useEffect(() => {
    loadSchedules();
  }, [reload]);

  const handleRefresh = () => {
    // setReload(!reload); // 다시 로딩 트리거
  };
  const onClose = () => {
    setModal(ModalState.NONE);
    setSelectedItemState(null);
  };

  return (
    <Suspense fallback={<Loading />}>
      <div className="p-5">
        <ScheduleList />
        {modal !== ModalState.NONE && (
          <ScheduleModal
            isEdit={modal === ModalState.EDIT}
            schedule={selectedSchedule}
            onClose={onClose}
            onRefresh={handleRefresh}
          />
        )}
      </div>
    </Suspense>
  );
}
