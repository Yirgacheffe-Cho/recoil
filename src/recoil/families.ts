// recoil/families.ts
import { atomFamily } from 'recoil';
import { Todo } from './atoms';

export const todoItemState = atomFamily<Todo, number>({
  key: 'todoItemState',
  default: (id: number) => ({
    id,
    title: '',
    completed: false,
  }),
});
