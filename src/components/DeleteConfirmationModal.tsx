import React from 'react';
import { useSchedules } from '../hooks/useSchedules';

interface DeleteConfirmationModalProps {
  id: string;
  title: string;
  onClose: () => void;
}

const DeleteConfirmationModal = ({
  id,
  title,
  onClose,
}: DeleteConfirmationModalProps) => {
  const { deleteSchedule } = useSchedules();

  const handleDelete = async () => {
    await deleteSchedule(id);
    onClose(); // 🔄 모달 닫기
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">삭제 확인</h2>
        <p className="mb-5 text-gray-600">
          정말로 "{title}" 일정을 삭제하시겠습니까?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            삭제하기
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
          >
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
