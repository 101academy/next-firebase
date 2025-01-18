'use client'

import { addTodo } from "@/actions/firebaseActions";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTodo } from "@/contexts/TodoListContext";
import { useState } from "react";

export default function AddTodoComponent() {

    const {userInfo} = useAuthContext();
    const [loading, setLoading] = useState<boolean>(false);
    const { addTodoToContext } = useTodo();

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let todoText = event.currentTarget.new_todo.value;

        setLoading(true);
        await addTodo(userInfo.id, todoText).then((newTodoItem) => {
            setLoading(false);
            if (newTodoItem) {
                addTodoToContext(newTodoItem);
                (document.getElementById('tb_todo') as HTMLInputElement).value = '';
                (document.getElementById('tb_todo') as HTMLInputElement).focus();
            }
        });
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
  