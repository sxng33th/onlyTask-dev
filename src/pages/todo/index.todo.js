import { getTodos } from "/src/utils/todo.util";
import DisplayList from "./components/displayList";
import AddTask from "./components/addTask";
import { supabase } from "/src/integrations/supabase/client.js";
import { createTodo } from "/src/utils/todo.util.js";
import { useEffect, useState } from "react";

export default function Todo() {
    const [todos, setTodos] = useState([]);
    const [task, setTask] = useState("");
    const [user, setUser] = useState(null);

    const fetchTodos = async () => {
        const { data, error } = await getTodos();
        if (error) {
            console.error("Error fetching todos:", error);
        } else {
            setTodos(data);
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
        if (task === "") return;

        if (!user) {
            console.error("User is not authenticated. Cannot create todo.");
            return;
        }

        await createTodo(task);
        setTask("");
        fetchTodos();
    };
    return (
        <div>
            <AddTask task={task} setTask={setTask} handleSubmit={handleSubmit} />
            <DisplayList todos={todos} />
        </div>
    );
}
