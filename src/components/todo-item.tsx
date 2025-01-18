'use client'

import { deleteTodo, updateTodoStatus, updateTodoText } from "@/actions/firebaseActions";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTodo } from "@/contexts/TodoListContext";

export default function TodoItem({todoItem}: {
    todoItem: any
}) {
    const { updateTodoInContext, removeTodoFromContext } = useTodo();

    const {userInfo} = useAuthContext();

    async function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>, todoId:any) {
        if (!userInfo) return;
        const checkboxStatus = e.target.checked;
        const updatedTodoItem = await updateTodoStatus(userInfo.id, todoId, checkboxStatus);
        if (updatedTodoItem) {
            updateTodoInContext(updatedTodoItem);
        }
    }

    async function handleTextbox(e: React.FocusEvent<HTMLInputElement>) {
        if (!userInfo) return;
        const newTodoValue = e.target.value;
        const updatedTodoItem = await updateTodoText(userInfo.id, todoItem.id, newTodoValue);
        if (updatedTodoItem) {
            updateTodoInContext(updatedTodoItem);
        }
    }
    
    async function handleDelete(todoId:string) {
        if (!userInfo) return;
        const todoItemIfStillExists = await deleteTodo(userInfo.id, todoItem.id);
        if (todoItemIfStillExists === null) {
            removeTodoFromContext(todoId);
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
  