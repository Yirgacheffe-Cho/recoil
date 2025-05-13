import { useRecoilValue } from 'recoil';
import { scheduleIdsState } from '../atoms/scheduleAtom';
import ScheduleListItem from './ScheduleListItem';

const ScheduleList = () => {
  const scheduleIds = useRecoilValue(scheduleIdsState);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {scheduleIds.map((id) => (
        <ScheduleListItem key={id} id={id} />
      ))}
    </div>
  );
};

export default ScheduleList;
