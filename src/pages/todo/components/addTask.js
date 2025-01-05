import React from "react";

const AddTask = ({ task, setTask, handleSubmit }) => {
    return (
        <div className="p-10 flex flex-col items-center">
            <div className="mt-10">
                <form onSubmit={handleSubmit} className="flex gap-2">
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
    );
};

export default AddTask;
