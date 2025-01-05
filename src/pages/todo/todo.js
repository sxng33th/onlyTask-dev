
import { createTodo } from "/src/utils/todo.util.js";
import { useState } from "react";

export default function Todo() {
    const [task, setTask] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (task === "") return;
        await createTodo(task);
        setTask("");
    };

    return (
        <div>

            <div className="p-10 flex flex-col items-center">
                <div className="mt-10 ">
                    <form action="" onSubmit={handleSubmit} className="flex gap-2">
                        <input
                            type="text"
                            name="task"
                            value={task}
                            id="task"
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Add your task"
                            className="input input-bordered p-3 rounded-full text-center w-full max-w-xs shadow-inner bg-slate-200"
                        />
                        <button
                            type="submit"
                            className="btn btn-primary bg-slate-400 rounded-full p-3 w-20"
                        >
                            Add
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
