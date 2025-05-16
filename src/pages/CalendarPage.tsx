import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useRecoilValue, useSetRecoilState, useRecoilCallback } from 'recoil';
import { calendarEventsSelector } from '../selectors/calendarSelectors';
import {
  modalState,
  ModalState,
  selectedItemState,
} from '../atoms/controlAtom';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { scheduleSelector } from '../selectors/scheduleSelectors';

const CalendarPage = () => {
  const events = useRecoilValue(calendarEventsSelector);
  useUndoRedo(); // 🔥 간단하게 호출만 하면 된다!
  const setModal = useSetRecoilState(modalState);
  const setSelectedItemState = useSetRecoilState(selectedItemState);

  // 📌이벤트 클릭 시 호출되는 함수
  // Recoil의 selector에 접근하기 위해 useRecoilCallback 사용
  // selector는 React Hook이기 때문에 이벤트 핸들러에서 직접 접근할 수 없음
  const handleEventClick = useRecoilCallback(
    ({ snapshot }) =>
      async (info: any) => {
        // 🔥 scheduleSelector를 통해 클릭된 이벤트의 ID로 원본 데이터 Fetch
        const schedule = await snapshot.getPromise(
          scheduleSelector(info.event.id),
        );

        if (schedule) {
          // ✅ Recoil 상태 업데이트: 모달을 열고 선택된 데이터를 설정
          setSelectedItemState(schedule);
          setModal(ModalState.EDIT);
        }
      },
    [],
  );

  return (
    <div className="p-5">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth,dayGridWeek,dayGridDay',
        }}
        eventClick={handleEventClick}
        height="100%" // 🔥 화면 높이에 딱 맞추기
        contentHeight="auto" // 🔥 오버플로우 없게 설정
      />
    </div>
  );
};

export default CalendarPage;
