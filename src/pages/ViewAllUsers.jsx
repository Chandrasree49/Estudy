import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";
import checkAuth from "../component/CheckAuth";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newRoles, setNewRoles] = useState({});

  useEffect(() => {
    const role = checkAuth();
    if (role !== "admin") {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
      localStorage.removeItem("role");

      // Redirect to login page
      window.location.href = "/login";
    }
    const fetchUsers = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/users-all`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term.toLowerCase()) ||
        user.email.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUpdateRole = async (userId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/users/${userId}/update-role`,
        { newRole: newRoles[userId] },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const response = await axios.get(`${BASE_URL}/users-all`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-semibold mb-4 text-center">
        View All Users
      </h1>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={handleSearch}
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Role</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Update Role
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select
                    value={newRoles[user._id] || user.role}
                    onChange={(e) =>
                      setNewRoles({
                        ...newRoles,
                        [user._id]: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-md px-4 py-2"
                  >
                    <option value="">Select Role</option>
                    <option value="user">User</option>
                    <option value="tutor">Tutor</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleUpdateRole(user._id)}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-900 text-white rounded"
                    disabled={!newRoles[user._id]}
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewAllUsers;
