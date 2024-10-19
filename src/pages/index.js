import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

export async function getServerSideProps() {
    const initTasks = [
        {
            name: "FirstTask",
            description: "first task",
            priority: 3,
            completed: false,
        },
        {
            name: "SecondTask",
            description: "second task",
            priority: 1,
            completed: true,
        },
        {
            name: "ThirdTask",
            description: "third task",
            priority: 2,
            completed: false,
        },
    ];

    return {
        props: {
            initialServerTasks: initTasks,
        },
    };
}

function Home({ initialServerTasks }) {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const localTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        console.log(localTasks);
        const tasksToUse = localTasks.length ? localTasks : initialServerTasks;
        setTasks(tasksToUse);
    }, [initialServerTasks]);

    const editTasks = (newTasks) => {
        setTasks(newTasks);
    };

    const addTask = (task) => {
        setTasks((prevTasks) => [...prevTasks, { ...task, completed: false }]);
        console.log("Task Added: ", task);
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        <div className="task-input-container">
            <TaskForm addTask={addTask} />
            <TaskList initialTasks={tasks} editTasks={editTasks} />
        </div>
    );
}

export default Home;
