'use client'

import { addTodoAction, deleteTodoAction, getUserTodosAction, updateTodoStatusAction, updateTodoTextAction } from '@/actions/firebaseActions';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {Todo} from '@/models/models';
import { useSession } from 'next-auth/react';

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: string) => Promise<boolean>;
  updateTodoStatus: (id:string, status:boolean) => Promise<boolean>;
  updateTodoText: (td:string, text:string) => Promise<boolean>;
  deleteTodo: (id: string) => Promise<boolean>;
}

interface TodoProviderProps {
  children: ReactNode;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const { data: session } = useSession()
  const userInfo = {
      "id": session?.user?.id ? session?.user?.id : "",
      "name": session?.user?.name ? session?.user?.name : "",
      "email": session?.user?.email ? session?.user?.email : "",
  }
  

  useEffect(() => {
    if (!userInfo) return;
    getUserTodosAction().then((todoList) => {
      if (todoList) {
        setTodos(todoList);
      }
    });
    
  }, []);

  const addTodo = async (todo: string):Promise<boolean> => {
    const newTodoItem = await addTodoAction(todo);
    if (newTodoItem) {
      setTodos([...todos, newTodoItem]);
      return true;
    }
    return false;
  };

  const updateTodoStatus = async (id:string, status:boolean):Promise<boolean> => {
    const updatedTodoItem = await updateTodoStatusAction(id, status);
    if (updatedTodoItem) {
      setTodos(
        todos.map((todo) =>
          todo.id === updatedTodoItem.id ? updatedTodoItem : todo
        )
      );
      return true;
    }
    return false;
  };

  const updateTodoText = async (id:string, text:string):Promise<boolean> => {
    const updatedTodoItem = await updateTodoTextAction(id, text);
    if (updatedTodoItem) {
      setTodos(
        todos.map((todo) =>
          todo.id === updatedTodoItem.id ? updatedTodoItem : todo
        )
      );
      return true;
    }
    return false;
  };

  const deleteTodo = async (id: string):Promise<boolean> => {
    const deletionStatus = await deleteTodoAction(id);
    if (deletionStatus) {
      setTodos(todos.filter((todo) => todo.id != id));
      return true;
    }
    return false;
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodoStatus, updateTodoText, deleteTodo }}>
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