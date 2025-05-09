// src/components/ScheduleModal.tsx
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ScheduleModal({
  onClose,
  onAdd,
  createSchedule,
}: {
  onClose: () => void;
  onAdd: () => void;
  createSchedule: (schedule: any) => Promise<any>;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [category, setCategory] = useState('General');

  const handleSave = async () => {
    const newSchedule = {
      id: Date.now().toString(),
      title,
      description,
      startDate,
      dueDate,
      priority: 'normal',
      category,
      tags: [],
      completed: false,
    };

    const result = await createSchedule(newSchedule);
    if (result) {
      onAdd();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-5 rounded-md w-1/3">
        <h2 className="text-xl mb-4">일정 생성</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="input mb-2 w-full"
        />

        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
          className="input mb-2 w-full"
        />

        <div className="mb-2">
          <label>시작일:</label>
          <DatePicker
            selected={startDate ?? undefined}
            onChange={(date) => setStartDate(date as Date)}
            className="input w-full"
            placeholderText="시작일"
          />
        </div>

        <div className="mb-2">
          <label>마감일:</label>
          <DatePicker
            selected={dueDate ?? undefined}
            onChange={(date) => setDueDate(date as Date)}
            className="input w-full"
            placeholderText="마감일"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input w-full"
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={handleSave} className="btn">
            저장하기
          </button>
          <button onClick={onClose} className="btn">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}
