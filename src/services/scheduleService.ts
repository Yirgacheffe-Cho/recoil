// src/services/scheduleService.ts
import axios from 'axios';
import { ScheduleItem } from '../atoms/scheduleAtom';

const API_URL = 'http://localhost:5001/schedules';

export const getSchedules = async (): Promise<ScheduleItem[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch schedules:', error);
    return [];
  }
};

export const createSchedule = async (
  schedule: ScheduleItem,
): Promise<ScheduleItem | null> => {
  try {
    const response = await axios.post(API_URL, schedule);
    return response.data;
  } catch (error) {
    console.error('Failed to create schedule:', error);
    return null;
  }
};

export const updateSchedule = async (
  id: string,
  schedule: ScheduleItem,
): Promise<ScheduleItem | null> => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, schedule);
    return response.data;
  } catch (error) {
    console.error('Failed to update schedule:', error);
    return null;
  }
};

export const deleteSchedule = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Failed to delete schedule:', error);
    return false;
  }
};
