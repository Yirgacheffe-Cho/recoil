import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { createSchedule, updateSchedule } from '../services/scheduleService';
import { ScheduleItem, RepeatType } from '../atoms/scheduleAtom';

interface ScheduleModalProps {
  isEdit: boolean;
  schedule: ScheduleItem | null;
  onClose: () => void;
  onRefresh: () => void;
}

export default function ScheduleModal({
  isEdit,
  schedule,
  onClose,
  onRefresh,
}: ScheduleModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [category, setCategory] = useState('General');
  const [repeat, setRepeat] = useState<RepeatType>(RepeatType.NONE); // 🔥 Repeat 초기값 설정

  // 🔥 수정 모드일 때 기존 값 로딩
  useEffect(() => {
    if (isEdit && schedule) {
      setTitle(schedule.title);
      setDescription(schedule.description);
      setStartDate(schedule.startDate);
      setDueDate(schedule.dueDate);
      setCategory(schedule.category);
      setRepeat(schedule.repeat ?? RepeatType.NONE);
    }
  }, [isEdit, schedule]);

  const handleSave = async () => {
    const newSchedule: ScheduleItem = {
      id: isEdit && schedule ? schedule.id : Date.now().toString(),
      title,
      description,
      startDate,
      dueDate,
      priority: 'normal',
      category,
      tags: [],
      completed: false,
      repeat: repeat ?? RepeatType.NONE, // 🔥 생성 시 Repeat 값 반영
    };

    if (isEdit && schedule) {
      await updateSchedule(schedule.id, newSchedule);
    } else {
      await createSchedule(newSchedule);
    }

    onRefresh();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl w-1/3 shadow-lg">
        <h2 className="text-2xl font-bold mb-5 text-gray-700">
          {isEdit ? '✏️ 일정 수정' : '📝 일정 생성'}
        </h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        />

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">시작일:</label>
          <DatePicker
            selected={startDate ?? undefined}
            onChange={(date) => setStartDate(date as Date)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-gray-600">마감일:</label>
          <DatePicker
            selected={dueDate ?? undefined}
            onChange={(date) => setDueDate(date as Date)}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        >
          <option value="General">General</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
        </select>

        {/* 🔥 Repeat 옵션 추가 */}
        <select
          value={repeat}
          onChange={(e) => setRepeat(e.target.value as RepeatType)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
        >
          <option value={RepeatType.NONE}>반복 없음</option>
          <option value={RepeatType.DAILY}>매일 반복</option>
          <option value={RepeatType.WEEKLY}>매주 반복</option>
          <option value={RepeatType.MONTHLY}>매월 반복</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            {isEdit ? '수정하기' : '생성하기'}
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
