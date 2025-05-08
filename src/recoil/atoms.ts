// recoil/atoms.ts
import { atom } from 'recoil';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});
