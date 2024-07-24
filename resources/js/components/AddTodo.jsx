import React, { useState } from "react";
import apiRequest from "../api/apiUtils";

const AddTodo = ({ onTaskAdded }) => {
    const [task, setTask] = useState("");

    const addTask = async () => {
        if (task) {
            try {
                const newTask = await apiRequest("post", "/api/todos", {
                    task,
                    completed: false,
                });
                onTaskAdded(newTask);
                setTask("");
            } catch (error) {
                console.error("Error adding task:", error);
            }
        }
    };

    return (
        <div className="mb-4">
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2"
            />

            <button
                onClick={addTask}
                className="bg-blue-400 p-2 ml-2 disabled:opacity-50 disabled:cursor-not-allowed 
                md:text-lg text-white bg-app-blue px-2 md:px-4 rounded-3xl py-1.5 
                transition-transform duration-500 hover:scale-110 hover:animate-pulse"
            >
                Add Task
            </button>
        </div>
    );
};

export default AddTodo;
