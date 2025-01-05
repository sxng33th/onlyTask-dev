import { useEffect, useState } from "react";
import { getTodos, deleteTodo } from "/src/utils/todo.util.js";
import { FaRegTrashCan } from "react-icons/fa6";

export default function DisplayList({ todos = [] }) {
    const [localTodos, setLocalTodos] = useState(todos);
    const [error, setError] = useState(null);

    const handleDelete = async (id) => {
        const { success, error } = await deleteTodo(id);
        if (error) {
            console.error("Error deleting todo:", error);
        } else {
            setLocalTodos(localTodos.filter((todo) => todo.id !== id));
        }
    };

    useEffect(() => {
        const fetchTodos = async () => {
            const { data, error } = await getTodos();
            if (error) {
                setError(error);
            } else {
                setLocalTodos(data);
            }
        };
        fetchTodos();
    }, []);

    if (error) {
        return <div>Error fetching todos: {error.message}</div>;
    }

    return (
        <div className="text-slate-200  items-center mx-10 ">
            <ol className="flex flex-col items-center  p-4">
                {todos.map((todo) => (
                    <li className="flex justify-between p-1 w-1/2 border-b " key={todo.id}>
                        {todo.task}
                        <button onClick={() => handleDelete(todo.id)}>
                            <FaRegTrashCan />
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}
