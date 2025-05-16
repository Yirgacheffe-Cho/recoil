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
    console.log('🔥 [useSchedules] - loadSchedules() 호출됨');
    const data = await getScheduleService();
    console.log('✅ [loadSchedules] - 로딩된 데이터:', data);

    set(
      scheduleIdsState,
      data.map((item) => item.id),
    );
    data.forEach((item) => {
      console.log(`🗂️ [loadSchedules] - 데이터 설정됨: ${item.id}`);
      set(scheduleAtomFamily(item.id), item);
    });
  });

  // ✅ 생성
  const createSchedule = useRecoilCallback(
    ({ set }) =>
      async (newItem: ScheduleItem) => {
        console.log('🔥 [useSchedules] - createSchedule() 호출됨');
        console.log('📌 [createSchedule] - 생성할 데이터:', newItem);

        const createdItem = await createScheduleService(newItem);
        console.log('✅ [createSchedule] - 생성된 데이터:', createdItem);

        if (createdItem) {
          console.log('🗂️ [createSchedule] - Recoil 상태 업데이트');
          set(scheduleIdsState, (prev) => [...prev, createdItem.id]);
          set(scheduleAtomFamily(createdItem.id), createdItem);
        }
      },
  );

  // ✅ 수정
  const updateSchedule = useRecoilCallback(
    ({ set }) =>
      async (id: string, updatedData: ScheduleItem) => {
        console.log('🔥 [useSchedules] - updateSchedule() 호출됨');
        console.log('📌 [updateSchedule] - 수정할 ID:', id);
        console.log('📌 [updateSchedule] - 수정할 데이터:', updatedData);

        const currentData = await updateScheduleService(id, updatedData);
        console.log('✅ [updateSchedule] - 수정된 데이터:', currentData);

        if (currentData) {
          console.log('🗂️ [updateSchedule] - Recoil 상태 업데이트');
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
        console.log('🔥 [useSchedules] - deleteSchedule() 호출됨');
        console.log('📌 [deleteSchedule] - 삭제할 ID:', id);

        const isDeleted = await deleteScheduleService(id);
        console.log('✅ [deleteSchedule] - 삭제 완료:', isDeleted);

        if (isDeleted) {
          console.log('🗂️ [deleteSchedule] - Recoil 상태 리셋');
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
