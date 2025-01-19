'use server'

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore"
import { getFirebaseRef } from "./utils/firebaseUtils"
import { Todo } from "@/models/models"
import { auth } from "./nextAuth"

export const addTodo = async (userId:string, todoText:string):Promise<Todo | null> => {
    if (!(await auth())) return null;

    let todoObj = {
        "todo": todoText,
        "timestamp": new Date().getTime(),
        "completed": false
    }

    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todosFirebaseCollectionRef = collection(db, "users", userId, "todos")
    const todoFirebaseRef = await addDoc(todosFirebaseCollectionRef, todoObj)
    return getUserTodo(userId, todoFirebaseRef.id);
}

export const getUserTodos = async (userId: string): Promise<Todo[] | null> => {
    if (!(await auth())) return null;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;

    const db = getFirestore(firebaseRef);
    const userTodos = await getDocs(collection(db, "users", userId, "todos"))

    const userTodosList:Todo[] = [];
    userTodos.forEach((doc) => {
        const todoData = doc.data();
        userTodosList.push({ 
            "id": doc.id, 
            "completed": todoData.completed,
            "timestamp": todoData.timestamp,
            "todo": todoData.todo
        });
    });

    return userTodosList;
}

export const getUserTodo = async (userId:string, todoId:string): Promise<Todo | null> => {
    if (!(await auth())) return null;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;

    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    const todo = await getDoc(todoFirebaseDocRef);

    if (todo.exists()) {
        const todoData = todo.data();
        return { 
            "id": todo.id, 
            "completed": todoData.completed,
            "timestamp": todoData.timestamp,
            "todo": todoData.todo
        };
      } else {
        return null;
      }
}

export const updateTodoStatus = async (userId:string, todoId:string, todoStatus:boolean): Promise<Todo | null> => {
    if (!(await auth())) return null;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    await updateDoc(todoFirebaseDocRef, {"completed": todoStatus});
    return getUserTodo(userId, todoId);
}

export const updateTodoText = async (userId:string, todoId:string, todoText:string): Promise<Todo | null> => {
    if (!(await auth())) return null;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    await updateDoc(todoFirebaseDocRef, {"todo": todoText});
    return getUserTodo(userId, todoId);
}

export const deleteTodo = async (userId:string, todoId:string): Promise<boolean | null> => {
    if (!(await auth())) return null;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    await deleteDoc(todoFirebaseDocRef);
    const userToDoIfItExists = await getUserTodo(userId, todoId);
    return userToDoIfItExists == null ? true: null;
}