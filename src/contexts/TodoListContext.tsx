'use client'
import { getUserTodos } from '@/actions/firebaseActions';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {Todo} from '@/models/models';
import { useAuthContext } from './AuthContext';

interface TodoContextType {
  todos: Todo[];
  addTodoToContext: (todo: Todo) => void;
  updateTodoInContext: (todo: Todo) => void;
  removeTodoFromContext: (id: string) => void;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const {userInfo} = useAuthContext();

  useEffect(() => {
    if (!userInfo) return;
    getUserTodos(userInfo.id).then((todoList) => {
      if (todoList) {
        setTodos(todoList);
      }
    });
    
  }, []);

  const addTodoToContext = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodoInContext = (updatedTodo: Todo) => {
    setTodos(
      todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      )
    );
  };

  const removeTodoFromContext = (id: string) => {
    setTodos(todos.filter((todo) => todo.id != id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodoToContext, updateTodoInContext, removeTodoFromContext }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};