// src/commands/DeleteScheduleCommand.ts
import { Command } from './Command';
import { ScheduleItem } from '../atoms/scheduleAtom';
import { useSchedules } from '../hooks/useSchedules';

export class DeleteScheduleCommand implements Command {
  private id: string;
  private backupData: ScheduleItem;
  private schedules: ReturnType<typeof useSchedules>;

  constructor(
    id: string,
    backupData: ScheduleItem,
    schedules: ReturnType<typeof useSchedules>,
  ) {
    this.id = id;
    this.backupData = backupData;
    this.schedules = schedules;
  }

  execute = async () => {
    console.log(`✅ 삭제 실행: ${this.id}`);
    await this.schedules.deleteSchedule(this.id);
  };

  undo = async () => {
    console.log(`⏪ Undo 실행: ${this.id} 복원`);
    await this.schedules.createSchedule(this.backupData);
  };
}
