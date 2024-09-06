import { useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableSortLabel,
  Paper,
  Input,
  Typography,
  Button,
  Badge,
} from "@mui/material";

export const UserPager:React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof typeof users[0]>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      id: 4,
      name: "Sarah Lee",
      email: "sarah@example.com",
      role: "User",
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Brown",
      email: "michael@example.com",
      role: "Admin",
      status: "Inactive",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = filteredUsers.sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (column: keyof typeof users[0]) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <Typography variant="h4" component="h1">
          Users
        </Typography>
        <Button href='/cadastroPet' variant="contained" color="primary">
          Add Pet
        </Button>
      </div>
      <TableContainer component={Paper}>
        <div className="p-4">
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={handleSearch}
            fullWidth
          />
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "name"}
                  direction={sortColumn === "name" ? sortDirection : "asc"}
                  onClick={() => handleSort("name")}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "email"}
                  direction={sortColumn === "email" ? sortDirection : "asc"}
                  onClick={() => handleSort("email")}
                >
                  Email
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "role"}
                  direction={sortColumn === "role" ? sortDirection : "asc"}
                  onClick={() => handleSort("role")}
                >
                  Role
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortColumn === "status"}
                  direction={sortColumn === "status" ? sortDirection : "asc"}
                  onClick={() => handleSort("status")}
                >
                  Status
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge badgeContent={user.role} color="primary" />
                </TableCell>
                <TableCell>
                  <Badge badgeContent={user.status} color="secondary" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
