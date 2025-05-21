import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, Modal, Box } from "@mui/material";

// Use your backend API URL from the environment
const API_URL = import.meta.env.VITE_API_URL;

function UserForm({ open, handleClose, onUserAdded, fetchUsers, selectedUser, clearSelectedUser }) {
  const [user, setUser] = useState({ name: "", email: "", age: "" });

  // if selectedUser changes, update the form
  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser);
    } else {
      setUser({ name: "", email: "", age: "" });
    }
  }, [selectedUser]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  //const handleSubmit = async (e) => {
  //  e.preventDefault();

  //   if (selectedUser) {
  //     // Edit mode
  //     await axios.put(`http://localhost:5000/api/users/${selectedUser._id}`, user);
  //     console.log("User updated successfully!");
  //     fetchUsers();
  //   } else {
  //     // Add mode
  //     await axios.post("http://localhost:5000/api/users", user);
  //     console.log("User added successfully!");
  //     if (onUserAdded) onUserAdded();
  //   }

  //   setUser({ name: "", email: "", age: "" });
  //   handleClose();
  //   if (clearSelectedUser) clearSelectedUser();
  // };

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (selectedUser) {
        // Edit mode
        await axios.put(`${API_URL}/api/users/${selectedUser._id}`, user);
        console.log("User updated successfully!");
        fetchUsers();
      } else {
        // Add mode
        await axios.post(`${API_URL}/api/users`, user);
        console.log("User added successfully!");
        if (onUserAdded) onUserAdded();
      }

      setUser({ name: "", email: "", age: "" });
      handleClose();
      if (clearSelectedUser) clearSelectedUser();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };



  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4
        }}
      >
        <h2 className="text-xl font-bold mb-4">{selectedUser ? "Edit User" : "Add User"}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextField label="Name" name="name" value={user.name} onChange={handleChange} />
          <TextField label="Email" name="email" value={user.email} onChange={handleChange} />
          <TextField label="Age" name="age" value={user.age} onChange={handleChange} />
          <Button type="submit" variant="contained" color={selectedUser ? "primary" : "success"}>
            {selectedUser ? "Update" : "Submit"}
          </Button>
        </form>
      </Box>
    </Modal>
  );
}

export default UserForm;
