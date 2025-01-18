'use client'

import useAuth from "@/hooks/useAuth";
import { db } from "@/lib/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";

export default function TodoItem({todo}: {
    todo: any
}) {

    const auth = useAuth();

    async function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
        if (!auth) return;
        const todoFirebaseRef = doc(db, "users", auth?.uid, "todos", todo.id);

        const checkboxStatus = e.target.checked;
        await updateDoc(todoFirebaseRef, {"complete": checkboxStatus})
    }

    async function handleTextbox(e: React.FocusEvent<HTMLInputElement>) {
        if (!auth) return;
        const todoFirebaseRef = doc(db, "users", auth?.uid, "todos", todo.id);
        
        const newTodoValue = e.target.value;
        await updateDoc(todoFirebaseRef, {"todo": newTodoValue});
    }
    
    async function handleDelete() {
        if (!auth) return;
        const todoFirebaseRef = doc(db, "users", auth?.uid, "todos", todo.id);
        await deleteDoc(todoFirebaseRef);
    }

    return (
        <div className="flex my-5">
            <input type="checkbox" className="m-2" onChange={handleCheckbox}/>
            <input type="text"
                defaultValue={todo.todo}
                className="flex-grow"
                disabled={todo.completed}
                onBlur={handleTextbox}
            />
            <button type="button" className="m-2" onClick={handleDelete}>x</button>
        </div>
    );
  }
  