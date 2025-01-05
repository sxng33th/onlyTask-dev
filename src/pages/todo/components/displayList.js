import { useEffect, useState } from "react";
import {getTodos} from "/src/utils/todo.util.js";

export default function DisplayList() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodos = async () => {
            const { data, error } = await getTodos();
            if (error) {
                setError(error);
            } else {
                setTodos(data);
            }
        };
        fetchTodos();
    }, []);
    
    return (
        <div className="text-slate-200 text-center">
            <>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.task}</li>
                ))}
            </>
        </div>
    );
}
