// src/commands/UpdateScheduleCommand.ts
import { Command } from './Command';
import { ScheduleItem } from '../atoms/scheduleAtom';
import { useSchedules } from '../hooks/useSchedules';

export class UpdateScheduleCommand implements Command {
  private id: string;
  private updatedData: ScheduleItem;
  private previousData: ScheduleItem;
  private schedules: ReturnType<typeof useSchedules>;

  constructor(
    id: string,
    updatedData: ScheduleItem,
    previousData: ScheduleItem,
    schedules: ReturnType<typeof useSchedules>,
  ) {
    this.id = id;
    this.updatedData = updatedData;
    this.previousData = previousData;
    this.schedules = schedules;
  }

  execute = async () => {
    console.log(`✅ 업데이트 실행: ${this.id}`);
    await this.schedules.updateSchedule(this.id, this.updatedData);
  };

  undo = async () => {
    console.log(`⏪ Undo 실행: ${this.id} 되돌리기`);
    await this.schedules.updateSchedule(this.id, this.previousData);
  };
}
