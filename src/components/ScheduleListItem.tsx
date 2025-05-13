import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { scheduleAtomFamily } from '../atoms/scheduleAtom';
import {
  modalState,
  ModalState,
  selectedItemState,
} from '../atoms/controlAtom'; // 🔥 한 파일에서만 import

const ScheduleListItem = React.memo(({ id }: { id: string }) => {
  const schedule = useRecoilValue(scheduleAtomFamily(id));
  const setModal = useSetRecoilState(modalState);
  const setSelectedItemState = useSetRecoilState(selectedItemState);

  const handleClick = () => {
    setModal(ModalState.EDIT); // 🔥 클릭 시 상태를 EDIT로 변경
    setSelectedItemState(schedule);
  };

  return (
    <div className="p-3 border rounded-md cursor-pointer" onClick={handleClick}>
      <h3 className="text-lg font-bold">{schedule.title}</h3>
      <p>{schedule.description}</p>
      <p>
        시작일:{' '}
        {schedule.startDate
          ? new Date(schedule.startDate).toLocaleDateString()
          : 'No Start Date'}
      </p>
      <p>
        마감일:{' '}
        {schedule.dueDate
          ? new Date(schedule.dueDate).toLocaleDateString()
          : 'No Due Date'}
      </p>
      <p>Category: {schedule.category}</p>
    </div>
  );
});

export default ScheduleListItem;
