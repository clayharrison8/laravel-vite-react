import React, { useState, useEffect } from "react";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get("/api/todos");
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTodos();
    }, []);

    const addTask = () => {
        if (task) {
            axios
                .post("/api/todos", { task, completed: false })
                .then((response) => {
                    setTasks([...tasks, response.data]);
                    setTask("");
                })
                .catch((error) => {
                    console.error("There was an error adding the task:", error);
                });
        }
    };

    const toggleTask = (taskToToggle) => {
        const updatedTask = {
            ...taskToToggle,
            completed: !taskToToggle.completed,
        };

        axios
            .put(`/api/todos/${taskToToggle.id}`, updatedTask)
            .then(() => {
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskToToggle.id ? updatedTask : task
                    )
                );
            })
            .catch((error) => {
                console.error("There was an error updating the task:", error);
            });
    };

    const deleteTask = (id) => {
        axios.delete(`/api/todos/${id}`).then(() => {
            setTasks(tasks.filter((t) => t.id !== id));
        });
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
                            onChange={() => toggleTask(t)}
                            className="mr-2"
                        />
                        <span className={t.completed ? "line-through" : ""}>
                            {t.task}
                        </span>
                        <button
                            onClick={() => deleteTask(t.id)}
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
