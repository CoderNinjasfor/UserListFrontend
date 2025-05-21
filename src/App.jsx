import { useEffect, useState } from "react";
import axios from "axios";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openForm = () => setFormOpen(true);
  const closeForm = () => setFormOpen(false);

  const clearSelectedUser = () => setSelectedUser(null);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>

      <button
        onClick={() => { clearSelectedUser(); openForm(); }}
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
      >
        Add User
      </button>

      <UserList
        users={users}
        fetchUsers={fetchUsers}
        openForm={openForm}
        setSelectedUser={setSelectedUser}
      />

      <UserForm
        open={formOpen}
        handleClose={closeForm}
        onUserAdded={fetchUsers}
        fetchUsers={fetchUsers}
        selectedUser={selectedUser}
        clearSelectedUser={clearSelectedUser}
      />
    </div>
  );
}

export default App;
