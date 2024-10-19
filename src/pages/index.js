import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import tasksArray from "../inititalTasks.js";
import SearchBar from "@/components/SearchBar";

export const getServerSideProps = async () => {
    const initialTasks = tasksArray;

    return {
        props: {
            initialTasks,
        },
    };
};

function Home({ initialTasks }) {
    const [tasks, setTasks] = useState([]);

    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

        if (!savedTasks || savedTasks.length === 0) {
            savedTasks = initialTasks;
        }

        setTasks(savedTasks);
        setFilteredTasks(savedTasks);
    }, []);

    const editTasks = (newTasks) => {
        setTasks(newTasks);
        setFilteredTasks(newTasks);
        localStorage.setItem("tasks", JSON.stringify(newTasks));
    };

    const addTask = (task) => {
        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, { ...task, completed: false }];
            localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            setFilteredTasks(updatedTasks);
            return updatedTasks;
        });
    };

    return (
        <div className="task-input-container">
            <TaskForm addTask={addTask} />
            <SearchBar
                initialTasks={initialTasks}
                filterTasks={(filteredTasks) => {
                    // console.log(filteredTasks);
                    setFilteredTasks(filteredTasks);
                }}
            ></SearchBar>
            <TaskList initialTasks={filteredTasks} editTasks={editTasks} />
        </div>
    );
}

export default Home;
