'use client'

import TodoItem from "./todo-item";
import { useTodo } from "@/contexts/TodoListContext";

export default function TodoList() {

    const { todos } = useTodo();
    
    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl">Todo List</h1>
            {todos && todos.length > 0 ? 
                todos.map((todo) => (
                    <TodoItem key={todo.id} todoItem={todo} />
                ))
                :
                <div>No TODOs!</div>
            }
        </div>
    );
  }
  