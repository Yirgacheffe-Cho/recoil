// recoil/selectors.ts
import { selector } from 'recoil';
import { fetchTodos } from '../services/todoService';
import { Todo } from './atoms';

export const todoListSelector = selector<Todo[]>({
  key: 'todoListSelector',
  get: async () => {
    try {
      const todos = await fetchTodos();  // 🔥 Service 함수 사용
      return todos;
    } catch (error) {
      console.error("Failed to fetch todos", error);
      return [];
    }
  },
});
