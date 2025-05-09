// services/todoService.ts
import axios from 'axios';

const API_URL = 'http://localhost:5001/todos';

export const fetchTodos = async () => {
  console.log('🔍 Fetching todos from API...');
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (title: string) => {
  const response = await axios.post(API_URL, { title, completed: false });
  return response.data;
};

export const updateTodo = async (id: number, completed: boolean) => {
  await axios.patch(`${API_URL}/${id}`, { completed });
};

export const deleteTodo = async (id: number) => {
  await axios.delete(`${API_URL}/${id}`);
};
