import AddTodoComponent from "@/components/add-todo";
import SignOut from "@/components/sign-out";
import TodoList from "@/components/todo-list";
import { TodoProvider } from "@/contexts/TodoListContext";

export default function TodoPage() {

  return (
    <div className="h-screen w-screen p-32 bg-gray-100">
      <div className="shadow-md p-8 gap-8 rounded-lg bg-white m-auto min-w-[500px] w-full lg:w-[50%]">
          <TodoProvider>
            <AddTodoComponent />
            <TodoList />
          </TodoProvider>
      </div>
      <div className="text-center">
          <SignOut />
      </div>
    </div>
  );
}
