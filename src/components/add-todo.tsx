'use client'

import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";

export default function AddTodoComponent() {

    const auth = useAuth();
    const [loading, setLoading] = useState<boolean>(false);

    async function addTodo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let todoText = event.currentTarget.new_todo.value;
        let todoObj = {
            "todo": todoText,
            "timestamp": new Date().getTime(),
            "completed": false
        }

        const todosFirebaseRef = collection(db, "users", auth?.uid, "todos")
        setLoading(true)

        try {
            const docRef = await addDoc(todosFirebaseRef, todoObj)
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

        (document.getElementById('tb_todo') as HTMLInputElement).value = '';
        (document.getElementById('tb_todo') as HTMLInputElement).focus();
    }

    return (
        <div className=" w-[50%] m-auto">
            <form onSubmit={addTodo} className="flex flex-col p-4 gap-8 bg-blue-100 rounded-2xl">
                <h1 className="text-center font-bold text-2xl">Add Todo</h1>
                <input type="text" id="tb_todo" name="new_todo" placeholder="Todo" required className="bg-blue-100 text-center border-none"  />
                <button type="submit" className="bg-blue-500 text-white rounded-md p-2 m-auto w-[50%]">Add</button>
                <p>{loading && <div>Loading...</div>}</p>
            </form>
        </div>
    );
  }
  