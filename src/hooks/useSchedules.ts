import { useEffect, useState } from 'react';
import {
  getSchedules,
  createSchedule as create,
} from '../services/scheduleService';
import { ScheduleItem } from '../atoms/scheduleAtom';

export const useSchedules = (reload: boolean) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async () => {
    try {
      setLoading(true);
      const data = await getSchedules();
      setSchedules(data);
    } catch (err) {
      setError('일정 데이터를 불러오는 데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, [reload]);

  // 🔥 createSchedule도 리턴하도록 추가
  return { schedules, loading, error, createSchedule: create };
};
