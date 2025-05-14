import { selectorFamily } from 'recoil';
import { scheduleAtomFamily } from '../atoms/scheduleAtom';

// 🔥 특정 ID의 일정을 가져오는 Selector
export const scheduleSelector = selectorFamily({
  key: 'scheduleSelector',
  get:
    (id: string) =>
    ({ get }) => {
      const schedule = get(scheduleAtomFamily(id));
      return schedule;
    },
});
