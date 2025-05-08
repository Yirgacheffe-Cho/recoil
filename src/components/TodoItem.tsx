// components/TodoItem.tsx
import React from 'react';
import { useRecoilState } from 'recoil';
import { todoItemState } from '../recoil/families';
import { useTodos } from '../hooks/useTodos';

interface TodoItemProps {
  id: number;
}

const TodoItem: React.FC<TodoItemProps> = ({ id }) => {
  const [todo] = useRecoilState(todoItemState(id));
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <div className="flex justify-between items-center p-2 border rounded">
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(id)}
          className="w-4 h-4"
        />
        <span className={todo.completed ? 'line-through text-gray-500' : ''}>
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => removeTodo(id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
