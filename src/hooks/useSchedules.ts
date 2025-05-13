// hooks/useSchedules.ts
import { useRecoilCallback } from 'recoil';
import {
  getSchedules,
  createSchedule as create,
} from '../services/scheduleService';
import { scheduleAtomFamily, scheduleIdsState } from '../atoms/scheduleAtom';

export const useSchedules = () => {
  const loadSchedules = useRecoilCallback(({ set }) => async () => {
    const data = await getSchedules();
    set(
      scheduleIdsState,
      data.map((item) => item.id),
    );
    data.forEach((item) => {
      set(scheduleAtomFamily(item.id), item);
    });
  });

  return { loadSchedules, createSchedule: create };
};
