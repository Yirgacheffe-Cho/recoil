import { useRecoilValue } from 'recoil';
import { scheduleIdsState } from '../atoms/scheduleAtom';
import ScheduleListItem from './ScheduleListItem';

const ScheduleList = () => {
  const scheduleIds = useRecoilValue(scheduleIdsState);

  return (
    <div className="space-y-2">
      {scheduleIds.map((id) => (
        <ScheduleListItem key={id} id={id} />
      ))}
    </div>
  );
};

export default ScheduleList;
