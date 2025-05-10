import { atomFamily } from 'recoil';

export enum RepeatType {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
}

export type ScheduleItem = {
  id: string;
  title: string;
  description: string;
  startDate: Date | null;
  dueDate: Date | null;
  priority: 'low' | 'normal' | 'high';
  category: string;
  tags: string[];
  completed: boolean;
  repeat: RepeatType; // 🔥 반복 타입 추가
};

export const scheduleItemState = atomFamily<ScheduleItem, string>({
  key: 'scheduleItemState',
  default: (id: string) => ({
    id,
    title: '',
    description: '',
    startDate: null,
    dueDate: null,
    priority: 'normal',
    category: 'General',
    tags: [],
    completed: false,
    repeat: RepeatType.NONE,
  }),
});
