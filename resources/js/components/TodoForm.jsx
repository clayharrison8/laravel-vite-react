// resources/js/components/TodoApp.jsx
import React, { useState } from 'react';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState('');

    const addTask = () => {
        if (task) {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
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
        <div className="">
            <h1 className="">Todo List</h1>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className=""
            />
            <button onClick={addTask} className="">
                Add Task
            </button>
            <ul className="">
                {tasks.map((t, i) => (
                    <li key={i} className="">
                        <input
                            type="checkbox"
                            checked={t.completed}
                            onChange={() => toggleTask(i)}
                            className="mr-2"
                        />
                        <span className={t.completed ? 'line-through' : ''}>{t.text}</span>
                        <button onClick={() => removeTask(i)} className="">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoApp;
