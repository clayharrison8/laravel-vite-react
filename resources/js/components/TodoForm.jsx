import React, { useState, useEffect } from "react";
import apiRequest from "../api/apiUtils";
import AddTodo from "./AddTodo";
import TodoItem from "./TodoItem";

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

    const handleTaskUpdated = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === updatedTask.id ? updatedTask : task
            )
        );
    };

    const handleTaskDeleted = (deletedTaskId) => {
        setTasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== deletedTaskId)
        );
    };

    const sortedTasks = tasks.slice().sort((a, b) => a.completed - b.completed);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Todo List</h1>
            <AddTodo onTaskAdded={handleTaskAdded} />
            <ul className="mt-4">
                {sortedTasks.map((task) => (
                    <TodoItem
                        key={task.id}
                        task={task}
                        onTaskUpdated={handleTaskUpdated}
                        onTaskDeleted={handleTaskDeleted}
                        editingTaskId={editingTaskId}
                        setEditingTaskId={setEditingTaskId}
                        newTaskContent={newTaskContent}
                        setNewTaskContent={setNewTaskContent}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
