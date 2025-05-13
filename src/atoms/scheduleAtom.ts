import { atomFamily } from 'recoil';

import { atom } from 'recoil';

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

export const scheduleAtomFamily = atomFamily<ScheduleItem, string>({
  key: 'scheduleAtomFamily',
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

export const scheduleIdsState = atom<string[]>({
  key: 'scheduleIdsState',
  default: [],
});
