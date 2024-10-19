import { useEffect, useState } from "react";

const TaskList = ({ initialTasks, editTasks }) => {
    const [tasks, setTasks] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedTask, setEditedTask] = useState({});

    const priorityColors = {
        1: "lightgreen",
        2: "lightyellow",
        3: "lightcoral",
    };

    useEffect(() => {
        const newTasks = initialTasks.sort((a, b) => {
            if (a.completed !== b.completed) {
                return a.completed ? 1 : -1;
            }
            return b.priority - a.priority;
        });

        setTasks(newTasks);
    }, [initialTasks]);

    const toggleCompletion = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        editTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
        setTasks(newTasks);
        editTasks(newTasks);
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditedTask(tasks[index]);
    };

    const saveEdit = (index) => {
        const newTasks = [...tasks];
        newTasks[index] = { ...editedTask };
        setTasks(newTasks);
        editTasks(newTasks);
        setEditingIndex(null);
    };

    const cancelEdit = () => {
        setEditingIndex(null);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedTask((prev) => ({ ...prev, [name]: value }));
    };

    const getPriorityString = (priority) => {
        switch (priority) {
            case 1:
                return "Low";
            case 2:
                return "Medium";
            case 3:
                return "High";
            default:
                return "Unknown";
        }
    };

    return (
        <div className="tasks-container">
            <table className="tasks-table">
                <thead>
                    <tr>
                        <th>Task Title</th>
                        <th>Task Description</th>
                        <th>Task Priority</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, index) => (
                        <tr
                            key={index}
                            className={`task ${
                                task.completed ? "completed" : ""
                            }`}
                            // onClick={() => {
                            //     editingIndex !== index &&
                            //         toggleCompletion(index);
                            // }}
                            style={{
                                backgroundColor: task.completed
                                    ? "grey"
                                    : priorityColors[task.priority],
                            }}
                        >
                            {editingIndex === index ? (
                                <>
                                    <td>
                                        <input
                                            type="text"
                                            name="name"
                                            value={editedTask.name}
                                            onChange={handleInputChange}
                                            className="edit-field"
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="text"
                                            name="description"
                                            value={editedTask.description}
                                            onChange={handleInputChange}
                                            className="edit-field"
                                        />
                                    </td>
                                    <td>
                                        <select
                                            id="taskPriority"
                                            name="priority"
                                            value={editedTask.priority}
                                            onChange={handleInputChange}
                                            required
                                            className="task-select"
                                        >
                                            <option value={1}>Low</option>
                                            <option value={2}>Medium</option>
                                            <option value={3}>High</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button
                                            type="button"
                                            className="save-btn btn"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                saveEdit(index);
                                            }}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="cancel-btn btn"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                cancelEdit();
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td>{getPriorityString(task.priority)}</td>
                                    <td>
                                        <div className="btn-container">
                                            <button
                                                type="button"
                                                className="edit-btn btn"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    startEditing(index);
                                                }}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="delete-btn btn"
                                                onClick={(event) => {
                                                    event.stopPropagation();
                                                    deleteTask(index);
                                                }}
                                            >
                                                Delete
                                            </button>
                                            <button
                                                type="button"
                                                className={
                                                    task.completed
                                                        ? "undo-btn btn"
                                                        : "complete-btn btn"
                                                }
                                                onClick={() => {
                                                    editingIndex !== index &&
                                                        toggleCompletion(index);
                                                }}
                                            >
                                                {task.completed
                                                    ? "Undo"
                                                    : "Complete"}
                                            </button>
                                        </div>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskList;
