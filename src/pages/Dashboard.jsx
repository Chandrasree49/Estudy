import React, { useEffect, useState } from "react";
import checkAuth from "../component/CheckAuth";

const Dashboard = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const role = checkAuth(); 
    setRole(role);
  }, []);

  const getWelcomeMessage = () => {
    switch (role) {
      case "admin":
        return "Welcome, Admin!";
      case "tutor":
        return "Welcome, Tutor!";
      case "student":
      case "user":
        return "Welcome!";
      default:
        return "Welcome to the Dashboard!";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-4 text-blue-600">
          {getWelcomeMessage()}
        </h1>
        <p className="text-gray-700 text-center">
          This is your personalized dashboard. Here you can find all the
          necessary information and updates based on your role.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
