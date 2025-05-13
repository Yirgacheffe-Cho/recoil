import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { scheduleAtomFamily } from '../atoms/scheduleAtom';
import {
  modalState,
  ModalState,
  selectedItemState,
} from '../atoms/controlAtom';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ScheduleListItem = React.memo(({ id }: { id: string }) => {
  const schedule = useRecoilValue(scheduleAtomFamily(id));
  const setModal = useSetRecoilState(modalState);
  const setSelectedItemState = useSetRecoilState(selectedItemState);

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleClick = () => {
    setModal(ModalState.EDIT);
    setSelectedItemState(schedule);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleteModalOpen(true);
  };

  return (
    <>
      <div
        className="p-4 border rounded-lg shadow-md cursor-pointer bg-white hover:shadow-lg transition duration-300 ease-in-out"
        onClick={handleClick}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800">
            {schedule.title}
          </h3>
          <button
            className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition duration-300"
            onClick={handleDeleteClick}
          >
            🗑️
          </button>
        </div>
        <p className="text-gray-600 mb-2">{schedule.description}</p>
        <div className="text-sm text-gray-500 space-y-1">
          <p>
            📅 <strong>시작일:</strong>{' '}
            {schedule.startDate
              ? new Date(schedule.startDate).toLocaleDateString()
              : 'No Start Date'}
          </p>
          <p>
            ⏳ <strong>마감일:</strong>{' '}
            {schedule.dueDate
              ? new Date(schedule.dueDate).toLocaleDateString()
              : 'No Due Date'}
          </p>
          <p>
            🏷️ <strong>Category:</strong> {schedule.category}
          </p>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          id={id}
          title={schedule.title}
          onClose={() => setDeleteModalOpen(false)}
        />
      )}
    </>
  );
});

export default ScheduleListItem;
