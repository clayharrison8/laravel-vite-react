// resources/js/components/TodoApp.jsx
import React, { useState } from "react";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    const addTask = () => {
        if (task) {
            axios
                .post("/api/todos", { task, completed: false })
                .then((response) => {
                    setTasks([...tasks, response.data]);
                    setTask("");
                })
                .catch((error) => {
                    console.error("There was an error adding the task!", error);
                });
        }
    };

    const toggleTask = (index) => {
        const newTasks = tasks.map((t, i) =>
            i === index ? { ...t, completed: !t.completed } : t
        );
        setTasks(newTasks);
    };

    const removeTask = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="border p-2"
            />
            <button
                onClick={addTask}
                className="bg-blue-500 text-white p-2 ml-2"
            >
                Add Task
            </button>
            <ul className="mt-4">
                {tasks.map((t, i) => (
                    <li key={i} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTask(i)}
                            className="mr-2"
                        />
                        <span className={t.completed ? "line-through" : ""}>
                            {t.text}
                        </span>
                        <button
                            onClick={() => removeTask(i)}
                            className="ml-2 text-red-500"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
