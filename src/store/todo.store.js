import { create } from 'zustand'

const useTodoStore = create((set) => ({
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  removeTodo: (id) => set((state) => ({
    todos: state.todos.filter((todo) => todo.id !== id),
  })),
  updateTodo: (updatedTodo) => set((state) => ({
    todos: state.todos.map((todo) =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ),
  })),
  clearTodos: () => set({ todos: [] }),
}));

export default useTodoStore;
