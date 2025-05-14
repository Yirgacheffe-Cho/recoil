import { useRecoilCallback } from 'recoil';
import {
  scheduleAtomFamily,
  scheduleIdsState,
  ScheduleItem,
} from '../atoms/scheduleAtom';
import {
  getScheduleService,
  createScheduleService,
  updateScheduleService,
  deleteScheduleService,
} from '../services/scheduleService';
export const useSchedules = () => {
  // ✅ 초기 로딩
  const loadSchedules = useRecoilCallback(({ set }) => async () => {
    const data = await getScheduleService();
    set(
      scheduleIdsState,
      data.map((item) => item.id),
    );
    data.forEach((item) => {
      set(scheduleAtomFamily(item.id), item);
    });
  });

  // ✅ 생성
  const createSchedule = useRecoilCallback(
    ({ set }) =>
      async (newItem: ScheduleItem) => {
        const createdItem = await createScheduleService(newItem);
        if (createdItem) {
          set(scheduleIdsState, (prev) => [...prev, createdItem.id]);
          set(scheduleAtomFamily(createdItem.id), createdItem);
        }
      },
  );

  // ✅ 수정
  const updateSchedule = useRecoilCallback(
    ({ set }) =>
      async (id: string, updatedData: ScheduleItem) => {
        const currentData = await updateScheduleService(id, updatedData);
        if (currentData) {
          set(scheduleAtomFamily(id), (prev) => ({
            ...prev,
            ...updatedData,
          }));
        }
      },
  );

  // ✅ 삭제
  const deleteSchedule = useRecoilCallback(
    ({ reset, set }) =>
      async (id: string) => {
        const isDeleted = await deleteScheduleService(id);
        if (isDeleted) {
          reset(scheduleAtomFamily(id));
          set(scheduleIdsState, (prev) =>
            prev.filter((itemId) => itemId !== id),
          );
        }
      },
  );

  return {
    loadSchedules,
    createSchedule,
    updateSchedule,
    deleteSchedule,
  };
};
