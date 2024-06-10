import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const StudySessions = () => {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    fetchStudySessions();
  }, []);

  const fetchStudySessions = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/study-sessions-common`);
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching study sessions:", error);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Study Sessions</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sessions.slice(0, 6).map((session) => (
          <div key={session._id} className="bg-white rounded-md p-6 shadow-md">
            <h2 className="text-xl font-semibold mb-2">
              {session.sessionTitle}
            </h2>
            <p className="text-gray-700 mb-2">{session.sessionDescription}</p>
            <button
              className={`px-4 py-2 rounded-md mr-2 ${
                session.registrationEndDate < Date.now()
                  ? "bg-red-500 text-white"
                  : "bg-blue-500 text-white"
              }`}
            >
              {session.registrationEndDate < Date.now() ? "Closed" : "Ongoing"}
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2">
              Read More
            </button>
          </div>
        ))}
      </div>
      {sessions.length > 6 && (
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">
          See All Sessions
        </button>
      )}
    </div>
  );
};

export default StudySessions;
