import './App.css';
import {useEffect, useState} from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");

  const getUsers = () => {
    axios.get("http://localhost:3009/users" + window.location.search).then(response => {
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

  const updateUser = (id, name) => {
    axios.put("http://localhost:3009/users", {id, name}).then(response => {
      getUsers();
    });
    setUserName("");
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3009/users/${id}`).then(response => {
      getUsers();
    });
  };

  return (
    <div>
      <div>
        {users.map(u =>
          <div key={u._id}>
            <input defaultValue={u.name} onBlur={(e) => updateUser(u._id, e.currentTarget.value)}/>
            <button onClick={() => deleteUser(u._id)}>X</button>
          </div>
        )}
      </div>
      <div>
        <input value={userName} onChange={onUserNameChange}/>
        <button onClick={addUser}>Add user</button>
      </div>
    </div>
  );
}

export default App;
