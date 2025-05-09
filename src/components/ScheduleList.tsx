import { useSchedules } from '../hooks/useSchedules';

export default function ScheduleList({ reload }: { reload: boolean }) {
  const { schedules, loading, error } = useSchedules(reload);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="space-y-2">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="p-3 border rounded-md">
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
      ))}
    </div>
  );
}
