import { atom } from 'recoil';
import { ScheduleItem } from '../atoms/scheduleAtom';
export enum ModalState {
  NONE = 'none',
  CREATE = 'create',
  EDIT = 'edit',
}
export const modalState = atom<ModalState>({
  key: 'modalState',
  default: ModalState.NONE,
});

export const selectedItemState = atom<ScheduleItem | null>({
  key: 'selectedItemState',
  default: null,
});
