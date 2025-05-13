// components/ScheduleItem.tsx
import React from 'react';
import { useRecoilValue } from 'recoil';
import { scheduleAtomFamily } from '../atoms/scheduleAtom';

const ScheduleListItem = React.memo(({ id }: { id: string }) => {
  const schedule = useRecoilValue(scheduleAtomFamily(id));

  return (
    <div className="p-3 border rounded-md cursor-pointer">
      <h3 className="text-lg font-bold">{schedule.title}</h3>
      <p>{schedule.description}</p>
      <p>
        시작일:{' '}
        {schedule.startDate
          ? new Date(schedule.startDate).toLocaleDateString()
          : 'No Start Date'}
      </p>
      <p>
        마감일:{' '}
        {schedule.dueDate
          ? new Date(schedule.dueDate).toLocaleDateString()
          : 'No Due Date'}
      </p>
      <p>Category: {schedule.category}</p>
    </div>
  );
});

export default ScheduleListItem;
