import React, { useState } from "react";

const SearchBar = ({ initialTasks, filterTasks }) => {
    const [searchName, setSearchName] = useState("");
    const [searchDescription, setSearchDescription] = useState("");

    const handleSearch = () => {
        const searchResults = initialTasks.filter((task) => {
            return (
                task.name.toLowerCase().includes(searchName.toLowerCase()) &&
                task.description
                    .toLowerCase()
                    .includes(searchDescription.toLowerCase())
            );
        });
        console.log(initialTasks);
        filterTasks(searchResults);
    };

    return (
        <div className="search-bar-container">
            <input
                type="text"
                className="search-input name-input"
                placeholder="Search by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />
            <input
                type="text"
                className="search-input description-input"
                placeholder="Search by description"
                value={searchDescription}
                onChange={(e) => setSearchDescription(e.target.value)}
            />
            <button className="search-btn" onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default SearchBar;
