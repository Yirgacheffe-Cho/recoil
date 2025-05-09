// hooks/useTodos.ts
import { useRecoilState, useRecoilCallback } from 'recoil';
import { todoListState, Todo } from '../recoil/atoms';
import { todoItemState } from '../recoil/families';
import {
  fetchTodos as fetchAPI,
  createTodo,
  updateTodo,
  deleteTodo,
} from '../services/todoService';

export const useTodos = () => {
  const [todos, setTodos] = useRecoilState(todoListState);

  // 🚀 최초 로딩 시 서버에서 Todo 가져오기
  const fetchTodos = useRecoilCallback(
    ({ set }) =>
      async () => {
        try {
          const data = await fetchAPI(); // 🔄 서비스 호출
          set(todoListState, data);

          // 개별 Todo들도 각각 Family로 저장
          data.forEach((todo: Todo) => {
            set(todoItemState(todo.id), todo);
          });
        } catch (error) {
          console.error('Failed to fetch todos:', error);
        }
      },
    [],
  );

  // ➕ Todo 생성
  const addTodo = useRecoilCallback(
    ({ set }) =>
      async (title: string) => {
        try {
          const newTodo = await createTodo(title); // 🔄 서비스 호출
          set(todoItemState(newTodo.id), newTodo);
          setTodos((prev) => [...prev, newTodo]);
        } catch (error) {
          console.error('Failed to create todo:', error);
        }
      },
    [setTodos],
  );

  // 🔄 Todo 상태 변경
  const toggleTodo = useRecoilCallback(
    ({ set }) =>
      async (id: number) => {
        try {
          const targetTodo = todos.find((todo) => todo.id === id);
          if (targetTodo) {
            await updateTodo(id, !targetTodo.completed); // 🔄 서비스 호출
            set(todoItemState(id), (prev) => ({
              ...prev,
              completed: !prev.completed,
            }));
          }
        } catch (error) {
          console.error('Failed to update todo:', error);
        }
      },
    [todos],
  );

  // ❌ Todo 삭제
  const removeTodo = useRecoilCallback(
    ({ reset }) =>
      async (id: number) => {
        try {
          await deleteTodo(id); // 🔄 서비스 호출
          reset(todoItemState(id));
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        } catch (error) {
          console.error('Failed to delete todo:', error);
        }
      },
    [setTodos],
  );

  // 🔄 반환 객체
  return {
    todos,
    fetchTodos,
    addTodo,
    toggleTodo,
    removeTodo,
  };
};
