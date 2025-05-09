import { useSchedules } from '../hooks/useSchedules';

export default function ScheduleList({ reload }: { reload: boolean }) {
  const { schedules, loading, error } = useSchedules(reload);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {schedules.map((schedule) => (
        <div
          key={schedule.id}
          className="p-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {schedule.title}
          </h3>
          <p className="text-gray-600 mb-2">{schedule.description}</p>
          <p className="text-sm text-gray-500">
            📅 시작일:{' '}
            {schedule.startDate
              ? new Date(schedule.startDate).toLocaleDateString()
              : '없음'}
          </p>
          <p className="text-sm text-gray-500">
            ⏰ 마감일:{' '}
            {schedule.dueDate
              ? new Date(schedule.dueDate).toLocaleDateString()
              : '없음'}
          </p>
          <span className="inline-block mt-2 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
            {schedule.category}
          </span>
        </div>
      ))}
    </div>
  );
}
