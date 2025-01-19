'use client'

import { useTodo } from "@/contexts/TodoListContext";
import { useState } from "react";
import { useRouter } from 'next/navigation';

export default function AddTodoComponent() {

    const [loading, setLoading] = useState<boolean>(false);
    const { addTodo } = useTodo();
    const router = useRouter();
    
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let todoText = event.currentTarget.new_todo.value;

        setLoading(true);
        if (await addTodo(todoText)) {
            (document.getElementById('tb_todo') as HTMLInputElement).value = '';
            (document.getElementById('tb_todo') as HTMLInputElement).focus();
            setLoading(false);
        } else {
            console.error('Unable to perform action');
            router.push('/todo-app'); 
        }
    }

    return (
        <div className=" w-[50%] m-auto">
            <form onSubmit={handleSubmit} className="flex flex-col p-4 gap-8 bg-blue-100 rounded-2xl">
                <h1 className="text-center font-bold text-2xl">Add Todo</h1>
                <input type="text" id="tb_todo" name="new_todo" placeholder="Todo" required className="bg-blue-100 text-center border-none"  />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 m-auto w-[50%]">Add</button>
                {loading && <div>Loading...</div>}
            </form>
        </div>
    );
  }
  