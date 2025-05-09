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
      <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">📝 일정 생성</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">시작일:</label>
          <DatePicker
            selected={startDate ?? undefined}
            onChange={(date) => setStartDate(date as Date)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholderText="시작일"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">마감일:</label>
          <DatePicker
            selected={dueDate ?? undefined}
            onChange={(date) => setDueDate(date as Date)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholderText="마감일"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            저장하기
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
}
