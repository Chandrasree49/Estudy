import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const Usermaterials = () => {
  const [bookedSessions, setBookedSessions] = useState([]);

  useEffect(() => {
    const fetchBookedSessions = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const studentEmail = localStorage.getItem("email");
        const response = await axios.get(`${BASE_URL}/session-materials`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBookedSessions(response);
      } catch (error) {
        console.error("Error fetching booked sessions:", error);
      }
    };

    fetchBookedSessions();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Booked Sessions</h1>
      {bookedSessions.map((session) => (
        <div key={session.sessionId} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">{session.sessionName}</h2>
          <ul>
            {session.materials.map((material, index) => (
              <li key={index}>
                <a
                  href={material.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {material.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Usermaterials;
