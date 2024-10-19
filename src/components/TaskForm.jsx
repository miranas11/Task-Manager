"use client";

import { useState, useRef, useEffect } from "react";

export default function TaskForm({ addTask }) {
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [taskPriority, setTaskPriority] = useState(1);
    const [formActive, setFormActive] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const task = {
            name: taskName,
            description: taskDescription,
            priority: taskPriority,
            completed: false,
        };

        addTask(task);

        setTaskName("");
        setTaskDescription("");
        setTaskPriority(1);
        setFormActive(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setFormActive(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <form
            onSubmit={handleSubmit}
            ref={formRef}
            className={`task-form ${formActive ? "active" : ""}`}
        >
            <input
                type="text"
                placeholder="Task Title"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                onFocus={() => setFormActive(true)}
                className="task-input-initial"
            />

            {formActive && (
                <>
                    <div>
                        <textarea
                            id="taskDescription"
                            placeholder="Task Description"
                            value={taskDescription}
                            onChange={(e) => setTaskDescription(e.target.value)}
                            required
                            className="task-textarea"
                        />
                    </div>

                    <div>
                        <label htmlFor="taskPriority" className="task-label">
                            Task Priority
                        </label>
                        <select
                            id="taskPriority"
                            value={taskPriority}
                            onChange={(e) =>
                                setTaskPriority(Number(e.target.value))
                            }
                            required
                            className="task-select"
                        >
                            <option value={1}>Low</option>
                            <option value={2}>Medium</option>
                            <option value={3}>High</option>
                        </select>
                    </div>

                    <div className="task-actions">
                        <button
                            type="button"
                            className="cancel-btn button"
                            onClick={() => setFormActive(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="save-btn button">
                            Add Task
                        </button>
                    </div>
                </>
            )}
        </form>
    );
}
