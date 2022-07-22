import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");

  const getUsers = () => {
    axios.get("http://localhost:3009/users").then(response => {
      setUsers(response.data);
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

  const onUserNameChange = (e) => {
    setUserName(e.currentTarget.value);
  };

  const addUser = () => {
    axios.post("http://localhost:3009/users", {name: userName}).then(response => {
      getUsers();
    });
    setUserName("");
  };

  return (
    <div>
      <div>{users.map(u => <p key={u.id}>{u.name}</p>)}</div>
      <div>
        <input value={userName} onChange={onUserNameChange}/>
        <button onClick={addUser}>Add user</button>
      </div>
    </div>
  );
}

export default App;
