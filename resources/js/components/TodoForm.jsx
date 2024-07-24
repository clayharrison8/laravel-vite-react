import React, { useState, useEffect } from "react";
import apiRequest from "../api/apiUtils";
import AddTodo from "./AddTodo";

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [newTaskContent, setNewTaskContent] = useState("");

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await apiRequest("get", "/api/todos");
                setTasks(response);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTodos();
    }, []);

    const handleTaskAdded = (newTask) => {
        setTasks((prevTasks) => [...prevTasks, newTask]);
    };

    const toggleTask = async (taskToToggle) => {
        const updatedTask = {
            ...taskToToggle,
            completed: !taskToToggle.completed,
        };
        try {
            await apiRequest(
                "put",
                `/api/todos/${taskToToggle.id}`,
                updatedTask
            );
            setTasks((prevTasks) =>
                prevTasks.map((task) =>
                    task.id === taskToToggle.id ? updatedTask : task
                )
            );
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async (id) => {
        try {
            await apiRequest("delete", `/api/todos/${id}`);
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const updateTask = async () => {
        if (editingTaskId && newTaskContent) {
            const updatedTask = tasks.find((task) => task.id === editingTaskId);
            const updatedTaskData = { ...updatedTask, task: newTaskContent };
            try {
                await apiRequest(
                    "put",
                    `/api/todos/${editingTaskId}`,
                    updatedTaskData
                );
                setTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === editingTaskId ? updatedTaskData : task
                    )
                );
                setEditingTaskId(null);
                setNewTaskContent("");
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }
    };

    const startEditing = (task) => {
        setEditingTaskId(task.id);
        setNewTaskContent(task.task);
    };

    const handleUpdateTask = () => {
        if (editingTaskId && newTaskContent) {
            updateTask();
            setEditingTaskId(null);
            setNewTaskContent("");
        }
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setNewTaskContent("");
    };

    const sortedTasks = tasks.slice().sort((a, b) => a.completed - b.completed);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <AddTodo onTaskAdded={handleTaskAdded} />
            <ul className="mt-4">
                {sortedTasks.map((t) => (
                    <li key={t.id} className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTask(t)}
                            className="mr-2"
                        />
                        {editingTaskId === t.id ? (
                            <span className="flex-1">
                                <input
                                    type="text"
                                    value={newTaskContent}
                                    onChange={(e) =>
                                        setNewTaskContent(e.target.value)
                                    }
                                    className="border p-2"
                                />
                            </span>
                        ) : (
                            <span
                                className={
                                    t.completed
                                        ? "line-through flex-1"
                                        : "flex-1"
                                }
                            >
                                {t.task}
                            </span>
                        )}
                        {editingTaskId === t.id ? (
                            <>
                                <button
                                    onClick={handleUpdateTask}
                                    className="ml-2 text-green-500"
                                >
                                    Save
                                </button>
                                <button
                                    onClick={cancelEditing}
                                    className="ml-2 text-gray-500"
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => startEditing(t)}
                                    className="ml-2 text-blue-500"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => deleteTask(t.id)}
                                    className="ml-2 text-red-500"
                                >
                                    Delete
                                </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
