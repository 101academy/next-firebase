'use client'

import { deleteTodo, updateTodoStatus, updateTodoText } from "@/actions/firebaseActions";
import { useTodo } from "@/contexts/TodoListContext";
import { UserInfo } from "@/models/models";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function TodoItem({todoItem}: {
    todoItem: any
}) {
    const { updateTodoInContext, removeTodoFromContext } = useTodo();

    const { data: session } = useSession()
    const userInfo:UserInfo | null = !session?.user ?  null : {
        "id": session?.user?.id ? session?.user?.id : "",
        "name": session?.user?.name ? session?.user?.name : "",
        "email": session?.user?.email ? session?.user?.email : "",
    }
    const router = useRouter();

    async function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>, todoId:any) {
        if (!userInfo) return;
        const checkboxStatus = e.target.checked;
        const updatedTodoItem = await updateTodoStatus(userInfo.id, todoId, checkboxStatus);
        if (updatedTodoItem) {
            updateTodoInContext(updatedTodoItem);
        } else {
            console.error('Unable to perform action');
            router.push('/todo-app'); 
        }
    }

    async function handleTextbox(e: React.FocusEvent<HTMLInputElement>) {
        if (!userInfo) return;
        const newTodoValue = e.target.value;
        const updatedTodoItem = await updateTodoText(userInfo.id, todoItem.id, newTodoValue);
        if (updatedTodoItem) {
            updateTodoInContext(updatedTodoItem);
        } else {
            console.error('Unable to perform action');
            router.push('/todo-app'); 
        }
    }
    
    async function handleDelete(todoId:string) {
        if (!userInfo) return;
        const reponse = await deleteTodo(userInfo.id, todoItem.id);
        if (reponse) {
            removeTodoFromContext(todoId);
        } else {
            console.error('Unable to perform action');
            router.push('/todo-app'); 
        }
    }

    return (
        <>
        { todoItem && 
            <div className={todoItem.completed? 'todo-complete' : 'todo-incomplete'}>
                <input type="checkbox" 
                    className="m-2" 
                    checked={todoItem.completed} 
                    onChange={(e) => {handleCheckbox(e, todoItem.id)}}
                    />
                <input type="text"
                    defaultValue={todoItem.todo}
                    className="flex-grow"
                    disabled={todoItem.completed}
                    onBlur={handleTextbox}
                />
                <button type="button" className="m-2" onClick={() => handleDelete(todoItem.id)}>x</button>
            </div>
        }
        </>
    );
  }
  