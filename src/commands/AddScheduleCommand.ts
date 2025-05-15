// src/commands/AddScheduleCommand.ts
import { Command } from './Command';
import { ScheduleItem } from '../atoms/scheduleAtom';
import { useSchedules } from '../hooks/useSchedules';

export class AddScheduleCommand implements Command {
  private schedule: ScheduleItem;
  private schedules: ReturnType<typeof useSchedules>;

  constructor(
    schedule: ScheduleItem,
    schedules: ReturnType<typeof useSchedules>,
  ) {
    this.schedule = schedule;
    this.schedules = schedules;
  }

  execute = async () => {
    console.log(`✅ 생성 실행: ${this.schedule.title}`);
    await this.schedules.createSchedule(this.schedule);
  };

  undo = async () => {
    console.log(`⏪ Undo 실행: ${this.schedule.title} 삭제`);
    await this.schedules.deleteSchedule(this.schedule.id);
  };
}
