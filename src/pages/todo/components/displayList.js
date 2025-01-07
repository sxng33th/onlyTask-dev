import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "/src/utils/todo.util.js";
import { FaRegTrashCan } from "react-icons/fa6";
import { MdOutlineEdit } from "react-icons/md";
import useTodoStore from "../../../store/todo.store";

export default function DisplayList() {
    const { todos, removeTodo, updateTodo: updateTodoInStore } = useTodoStore();
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    useEffect(() => {
    }, [todos]);

    const handleDelete = async (id) => {
        const { success, error } = await deleteTodo(id);
        if (success) {
            removeTodo(id);
        } else {
            console.error("Error deleting todo:", error);
        }
    };

    const handleEdit = (id, text) => {
        setEditingId(id);
        setEditingText(text);
    };

    const handleUpdate = async (id) => {
        const { success, data, error } = await updateTodo(id, editingText);
        if (success) {
            updateTodoInStore({ id, task: editingText });
            setEditingId(null);
        } else {
            console.error("Error updating todo:", error);
        }
    };

    return (
        <div className="text-slate-200 items-center mx-10 ">
            <ol className="flex flex-col items-center p-4">
                {Array.isArray(todos) && todos.length > 0 ? (
                    todos.map((todo) => (
                        todo && todo.id ? (
                            <li className="flex justify-between p-1 w-1/2 border-b " key={todo.id}>
                                {editingId === todo.id ? (
                                    <input
                                        className="input bg-black text-slate-200"
                                        type="text"
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        onBlur={() => handleUpdate(todo.id)}
                                        onKeyDown={(e) => e.key === "Enter" && handleUpdate(todo.id)}
                                    />
                                ) : (
                                    <span>{todo.task}</span>
                                )}
                                <div>
                                    <button onClick={() => handleDelete(todo.id)}>
                                        <FaRegTrashCan />
                                    </button>
                                    <button onClick={() => handleEdit(todo.id, todo.task)}>
                                        <MdOutlineEdit />
                                    </button>
                                </div>
                            </li>
                        ) : (
                            <li key={Math.random()} className="text-red-500">Invalid Todo</li>
                        )
                    ))
                ) : (
                    <li className="text-red-500">No todos available</li>
                )}
            </ol>
        </div>
    );
}
