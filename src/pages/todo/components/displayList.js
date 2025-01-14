import { useEffect, useState } from "react";
import { deleteTodo, updateTodo } from "/src/utils/todo.util.js";
import { FaRegTrashCan } from "react-icons/fa6";
import useTodoStore from "../../../store/todo.store";
import { Checkbox } from "@/components/ui/checkbox";

export default function DisplayList() {
  const { todos, removeTodo, updateTodo: updateTodoInStore } = useTodoStore();
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {}, [todos]);

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

  const handleToggleComplete = (id, completed) => {
    console.log(
      `Toggling completion for task ID: ${id}, current status: ${completed}`
    );
    updateTodoInStore({ id, completed: !completed });
  };

  return (
    <div className="text-slate-200 items-center mx-10 ">
      <ol className="flex flex-col items-center p-4">
        {Array.isArray(todos) && todos.length > 0 ? (
          todos.map((todo) =>
            todo && todo.id ? (
              <li
                className={`flex justify-between p-1 m-1 w-1/2 border-b ${
                  todo.completed ? "line-through" : ""
                }`}
                key={todo.id}
              >
                <Checkbox
                  className="border-slate-200"
                  checked={todo.completed}
                  onChange={() => {
                    console.log(`Checkbox clicked for task ID: ${todo.id}`);
                    handleToggleComplete(todo.id, todo.completed);
                  }}
                />
                {editingId === todo.id ? (
                  <input
                    className="input bg-black text-slate-200"
                    type="text"
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                    onBlur={() => handleUpdate(todo.id)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleUpdate(todo.id)
                    }
                  />
                ) : (
                  <span onDoubleClick={() => handleEdit(todo.id, todo.task)}>
                    {todo.task}
                  </span>
                )}
                <div className="flex gap-2">
                  <button onClick={() => handleDelete(todo.id)}>
                    <FaRegTrashCan />
                  </button>
                  {/* <button onClick={() => handleEdit(todo.id, todo.task)}>
                    <MdOutlineEdit />
                  </button> */}
                </div>
              </li>
            ) : (
              <li key={Math.random()} className="text-red-500">
                Invalid Todo
              </li>
            )
          )
        ) : (
          <li className="text-slate-300">No todos available</li>
        )}
      </ol>
    </div>
  );
}
