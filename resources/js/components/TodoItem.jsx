import React, { useState } from "react";
import apiRequest from "../api/apiUtils";

const TodoItem = ({
    task,
    onTaskUpdated,
    onTaskDeleted,
    setEditingTaskId,
    newTaskContent,
    setNewTaskContent,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleTask = async () => {
        const updatedTask = { ...task, completed: !task.completed };
        try {
            await apiRequest("put", `/api/todos/${task.id}`, updatedTask);
            onTaskUpdated(updatedTask);
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    const deleteTask = async () => {
        try {
            await apiRequest("delete", `/api/todos/${task.id}`);
            onTaskDeleted(task.id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const startEditing = () => {
        setEditingTaskId(task.id);
        setNewTaskContent(task.task);
        setIsEditing(true);
    };

    const handleUpdateTask = async () => {
        if (newTaskContent) {
            const updatedTask = { ...task, task: newTaskContent };
            try {
                await apiRequest("put", `/api/todos/${task.id}`, updatedTask);
                onTaskUpdated(updatedTask);
                setEditingTaskId(null);
                setNewTaskContent("");
                setIsEditing(false);
            } catch (error) {
                console.error("Error updating task:", error);
            }
        }
    };

    const cancelEditing = () => {
        setEditingTaskId(null);
        setNewTaskContent("");
        setIsEditing(false);
    };

    return (
        <li className="flex items-center mb-2">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={toggleTask}
                className="mr-2"
            />
            {isEditing ? (
                <span className="flex-1">
                    <input
                        type="text"
                        value={newTaskContent}
                        onChange={(e) => setNewTaskContent(e.target.value)}
                        className="border p-2"
                    />
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
                </span>
            ) : (
                <>
                    <span
                        className={
                            task.completed ? "line-through flex-1" : "flex-1"
                        }
                    >
                        {task.task}
                    </span>
                    <button
                        onClick={startEditing}
                        className="ml-2 text-blue-500"
                    >
                        Edit
                    </button>
                    <button onClick={deleteTask} className="ml-2 text-red-500">
                        Delete
                    </button>
                </>
            )}
        </li>
    );
};

export default TodoItem;
