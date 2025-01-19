'use server'

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore"
import { getFirebaseRef } from "./utils/firebaseUtils"
import { Todo } from "@/models/models"
import { auth } from "./nextAuth"

export const addTodoAction = async (todoText:string):Promise<Todo | null> => {
    const session = await auth();
    if (!session) return null;
    const userId = session.user.id;

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
    return getUserTodoAction(todoFirebaseRef.id);
}

export const getUserTodosAction = async (): Promise<Todo[] | null> => {
    const session = await auth();
    if (!session) return null;
    const userId = session.user.id;
    
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

export const getUserTodoAction = async (todoId:string): Promise<Todo | null> => {
    const session = await auth();
    if (!session) return null;
    const userId = session.user.id;
    
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

export const updateTodoStatusAction = async (todoId:string, todoStatus:boolean): Promise<Todo | null> => {
    const session = await auth();
    if (!session) return null;
    const userId = session.user.id;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    await updateDoc(todoFirebaseDocRef, {"completed": todoStatus});
    return getUserTodoAction(todoId);
}

export const updateTodoTextAction = async (todoId:string, todoText:string): Promise<Todo | null> => {
    const session = await auth();
    if (!session) return null;
    const userId = session.user.id;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    await updateDoc(todoFirebaseDocRef, {"todo": todoText});
    return getUserTodoAction(todoId);
}

export const deleteTodoAction = async (todoId:string): Promise<boolean | null> => {
    const session = await auth();
    if (!session) return null;
    const userId = session.user.id;
    
    const firebaseRef:any = await getFirebaseRef();
    if (!firebaseRef) return null;
    
    const db = getFirestore(firebaseRef);
    const todoFirebaseDocRef = doc(db, "users", userId, "todos", todoId)
    await deleteDoc(todoFirebaseDocRef);
    const userToDoIfItExists = await getUserTodoAction(todoId);
    return userToDoIfItExists == null ? true: null;
}