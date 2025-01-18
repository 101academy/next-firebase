'use client'

import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import TodoItem from "./todo-item";

export default function TodoList() {

    const [todos, setTodos] = useState<any[]>([]);
    const auth = useAuth();

    useEffect(() => {
        if (!auth) return;

        const todosFirebaseRef = collection(db, 'users', auth?.uid, 'todos')

        const unsubscribe = onSnapshot(todosFirebaseRef, (snapshot) => {
            if (!snapshot.empty) {
                let todos: any[] = [];
                snapshot.forEach(element => {
                    todos.push({...element.data(), id: element.id});
                });
                setTodos(todos);
            }
        })
        return () => unsubscribe()
    }, [auth]);
    
    return (
        <div className="p-8">
            <h1 className="font-bold text-2xl">Todo List</h1>
            {todos.map((todo, index) => (
                <TodoItem key={"todo_" + index} todo={todo} />
            ))}
        </div>
    );
  }
  