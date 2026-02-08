import React, { useState } from "react";
import { useDeleteUserMutation, useGetAllUsersQuery } from "./adminApi";
import Button from "../../components/ui/Button";

function UsersAdmin() {
  const { data: users, isLoading } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This cannot be undone.",
      )
    ) {
      await deleteUser(id);
    }
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
          <p className="text-sm text-gray-500">
            View and manage registered customers
          </p>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-64"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 text-gray-500 uppercase text-xs font-bold tracking-wider">
              <th className="py-4 px-6 border-b">User Info</th>
              <th className="py-4 px-6 border-b">Joined Date</th>
              <th className="py-4 px-6 border-b">Role</th>
              <th className="py-4 px-6 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredUsers?.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {user.username?.charAt(0) ||
                        user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {user.username || "N/A"}
                      </div>
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "Unknown"}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      user.role === "admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {user.role || "customer"}
                  </span>
                </td>
                <td className="py-4 px-6 text-center">
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(user.id)}
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors mr-2"
                    title="Delete User"
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers?.length === 0 && (
          <div className="text-center py-10 text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
}

export default UsersAdmin;
