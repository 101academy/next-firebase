export interface Todo {
    id: string;
    todo: string;
    completed: boolean;
    timestamp: number;
  }

  export interface UserInfo {
    id: string;
    name: string | null;
    email: string | null;
  }