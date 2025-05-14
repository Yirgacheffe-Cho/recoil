import { selector } from 'recoil';
import { scheduleIdsState, scheduleAtomFamily } from '../atoms/scheduleAtom';

export const calendarEventsSelector = selector({
  key: 'calendarEventsSelector',
  get: ({ get }) => {
    const scheduleIds = get(scheduleIdsState);

    return scheduleIds
      .map((id) => {
        const schedule = get(scheduleAtomFamily(id));
        return {
          id,
          title: schedule.title,
          start: schedule.startDate ? new Date(schedule.startDate) : undefined,
          end: schedule.dueDate ? new Date(schedule.dueDate) : undefined,
          color: schedule.category === 'Work' ? '#4CAF50' : '#FFC107',
        };
      })
      .filter((event) => event.start !== undefined && event.end !== undefined);
  },
});
