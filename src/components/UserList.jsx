import { DataGrid } from "@mui/x-data-grid";
import { IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";

function UserList({ users, fetchUsers, openForm, setSelectedUser }) {
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/users/${id}`);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    openForm();
  }

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "age", headerName: "Age", flex: 0.5 },
    {
      field: "actions",
      headerName: "Actions",
      flex: 0.7,
      renderCell: (params) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row._id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      )
    }
  ];

  // DataGrid needs an `id` field
  const rows = users.map((user) => ({ ...user, id: user._id }));

  return (
    <div style={{ height: 500, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10]}
        disableSelectionOnClick
      />
    </div>
  );
}

export default UserList;
