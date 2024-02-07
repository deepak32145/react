import { useEffect, useState } from "react";
import "./App.css";

import "./App.css";
function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestion, setSuggestion] = useState([]);

  useEffect(() => {
    const fetchUsers = () => {
      console.log(searchTerm.trim());
      if (searchTerm.trim() === "") {
        setSuggestion([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => setSuggestion(data))
        .catch((err) => console.log(err));
    };
    fetchUsers();
  }, [searchTerm]);
  return (
    <>
      <div className="user-search-container">
        <div className="user-search-input">
          <div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a user..."
            />
            <ul className="suggestion-list">
              {suggestion?.users?.map((user) => {
                return (
                  <li key={user.email}>
                    <img
                      src={user.image}
                      alt={`${user.firstName} ${user.lastName}`}
                    />
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
