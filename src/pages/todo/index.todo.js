import { getTodos } from "/src/utils/todo.util";
import DisplayList from "./components/displayList";
import AddTask from "./components/addTask";
import { supabase } from "/src/integrations/supabase/client.js";
import { createTodo } from "/src/utils/todo.util.js";
import { useEffect, useState } from "react";
import useTodoStore from "../../store/todo.store";

export default function Todo() {
  const { todos, addTodo, clearTodos, analyzeTodo } = useTodoStore();
  const [task, setTask] = useState("");
  const [user, setUser] = useState(null);

  const fetchTodos = async () => {
    const { data, error } = await getTodos();
    if (error) {
      console.error("Error fetching todos:", error);
    } else {
      clearTodos();
      data.forEach((todo) => {
        if (todo && todo.id && todo.task) {
          addTodo(todo);
        } else {
          console.warn("Invalid todo structure:", todo);
        }
      });
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
    };
    fetchUser();
    fetchTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.trim() === "") return;

    if (!user) {
      console.error("User is not authenticated. Cannot create todo.");
      return;
    }

    try {
      const newTodo = await createTodo(task);
      if (newTodo && newTodo.id && newTodo.task) {
        analyzeTodo(newTodo);
        setTask("");
      } else {
        console.error("Invalid new todo structure:", newTodo);
      }
    } catch (error) {
      console.error("Error creating todo:", error);
    }
  };

  return (
    <div>
      <AddTask task={task} setTask={setTask} handleSubmit={handleSubmit} />
      <DisplayList todos={todos} />
    </div>
  );
}
