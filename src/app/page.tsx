import Link from "next/link";

export default function RootPage() {
  return (
    <div className="text-center p-32">
      <h1>Welcome to TODO App</h1>
      <Link className="text-blue-700" href="todo-app">Get Started</Link>
    </div>
  );
}
