// components/FilteredTodoList.tsx
import React, { useState, startTransition,useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';
import TodoItem from './TodoItem';

const FilteredTodoList: React.FC = () => {
  const { todos ,fetchTodos} = useTodos();
  const [filter, setFilter] = useState<'all' | 'completed' | 'uncompleted'>('all');

  const handleFilterChange = (value: 'all' | 'completed' | 'uncompleted') => {
    startTransition(() => {
      setFilter(value);
    });
  };
  useEffect(() => {
    if (todos.length === 0) {
      fetchTodos();
    }
  }, [todos]);
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'all') return true;
    if (filter === 'completed') return todo.completed;
    if (filter === 'uncompleted') return !todo.completed;
    return true;
  });

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => handleFilterChange('all')} className="px-3 py-1 bg-gray-300 rounded">
          All
        </button>
        <button onClick={() => handleFilterChange('completed')} className="px-3 py-1 bg-gray-300 rounded">
          Completed
        </button>
        <button onClick={() => handleFilterChange('uncompleted')} className="px-3 py-1 bg-gray-300 rounded">
          Uncompleted
        </button>
      </div>

      <div className="grid gap-3">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
          />
        ))}
      </div>
    </div>
  );
};

export default FilteredTodoList;
