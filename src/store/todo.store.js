import { supabase } from "/src/integrations/supabase/client";
import { create } from "zustand";

const useTodoStore = create((set, get) => ({
  todos: [],

  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),

  updateTodo: (updatedTodo) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      ),
    })),
  clearTodos: () => set({ todos: [] }),

  analyzeTodo: async ({ id, task }) => {
    const { addTodo } = get();
    addTodo({ id, task });

    const {
      data: { session },
    } = await supabase.auth.getSession();
    try {
      const response = await fetch(
        "https://dxaqfehqzkblttmemkng.supabase.co/functions/v1/analyze-tasks",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: task, description: "" }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
}));

export default useTodoStore;
