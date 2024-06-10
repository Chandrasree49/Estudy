import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const ViewAllUsers = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [newRoles, setNewRoles] = useState({}); // State to store the selected new role for each user

  useEffect(() => {
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
        { newRole: newRoles[userId] }, // Send the selected new role to the backend
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Refresh the user list after updating the role
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
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">View All Users</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
      />
      <table className="min-w-full divide-y divide-gray-200">
        {/* Table headers */}
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              {/* Display user details */}
              <td className="px-6 py-4 whitespace-no-wrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-no-wrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-no-wrap">
                {/* Dropdown menu to select new role */}
                <select
                  value={newRoles[user._id] || user.role} // Set dropdown value to user's role or selected new role
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
              <td className="px-6 py-4 whitespace-no-wrap">
                {/* Button to update user role */}
                <button
                  onClick={() => handleUpdateRole(user._id)}
                  className="text-indigo-600 hover:text-indigo-900"
                  disabled={!newRoles[user._id]} // Disable button if newRole is not selected
                >
                  Update Role
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllUsers;
