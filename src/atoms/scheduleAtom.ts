import { atomFamily } from 'recoil';

export type ScheduleItem = {
  id: string; // 일정 ID
  title: string; // 제목
  description: string; // 설명
  startDate: Date | null;
  dueDate: Date | null; // 마감일
  priority: 'low' | 'normal' | 'high'; // 우선순위
  repeat: boolean; // 반복 여부
  category: string; // 카테고리
  tags: string[]; // 태그
  completed: boolean; // 완료 여부
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
    repeat: false,
    category: 'General',
    tags: [],
    completed: false,
  }),
});
