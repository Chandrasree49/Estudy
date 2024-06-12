import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";
import { ToastContainer, toast } from "react-toastify";

const CreateStudySession = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    token: "",
  });

  const initialFormData = {
    sessionTitle: "",
    sessionDescription: "",
    registrationStartDate: "",
    registrationEndDate: "",
    classStartDate: "",
    classEndDate: "",
    sessionDuration: "",
    status: "pending",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("name") || "",
      email: localStorage.getItem("email") || "",
      token: localStorage.getItem("token") || "",
    };
    setUser(storedUser);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      const response = await axios.post(
        `${BASE_URL}/study-sessions`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      toast.success("Study session created successfully");
      setFormData(initialFormData);
      console.log(response.data);
    } catch (err) {
      console.error("Error creating study session", err);
      toast.error("Failed to create study session");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold mb-4">Create Study Session</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session Title
          </label>
          <input
            type="text"
            name="sessionTitle"
            value={formData.sessionTitle}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tutor Name
          </label>
          <input
            type="text"
            value={user.name}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tutor Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session Description
          </label>
          <textarea
            name="sessionDescription"
            value={formData.sessionDescription}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Start Date
          </label>
          <input
            type="date"
            name="registrationStartDate"
            value={formData.registrationStartDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration End Date
          </label>
          <input
            type="date"
            name="registrationEndDate"
            value={formData.registrationEndDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class Start Date
          </label>
          <input
            type="date"
            name="classStartDate"
            value={formData.classStartDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Class End Date
          </label>
          <input
            type="date"
            name="classEndDate"
            value={formData.classEndDate}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Session Duration (hours)
          </label>
          <input
            type="number"
            name="sessionDuration"
            value={formData.sessionDuration}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Registration Fee
          </label>
          <input
            type="text"
            value="0"
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <input
            type="text"
            value="pending"
            readOnly
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
          >
            Create Session
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateStudySession;
