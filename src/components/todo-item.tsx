'use client'

import { useTodo } from "@/contexts/TodoListContext";

export default function TodoItem({todoItem}: {
    todoItem: any
}) {
    const { updateTodoStatus, updateTodoText, deleteTodo } = useTodo();

    async function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>, todoId:any) {
        const checkboxStatus = e.target.checked;
        const isUpdateSuccessful = await updateTodoStatus(todoId, checkboxStatus);
        if (!isUpdateSuccessful) {
            console.error('Unable to perform action');
        }
    }

    async function handleTextbox(e: React.FocusEvent<HTMLInputElement>) {
        const newTodoText = e.target.value;
        const isUpdateSuccessful = await updateTodoText(todoItem.id, newTodoText);
        if (!isUpdateSuccessful) {
            console.error('Unable to perform action');
        }
    }
    
    async function handleDelete(todoId:string) {
        const isDeletionSuccessful = await deleteTodo(todoItem.id);
        if (!isDeletionSuccessful) {
            console.error('Unable to perform action');
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
  