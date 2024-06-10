import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "./apiEndPoints";

const BookedSession = () => {
  const [bookedSessions, setBookedSessions] = useState([]);

  useEffect(() => {
    const fetchBookedSessions = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/booked-sessions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setBookedSessions(response.data);
      } catch (error) {
        console.error("Error fetching booked sessions:", error);
      }
    };

    fetchBookedSessions();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">Booked Sessions</h1>
      {bookedSessions.length === 0 ? (
        <p>No booked sessions found</p>
      ) : (
        <ul>
          {bookedSessions.map((session) => (
            <li key={session._id} className="mb-4">
              <h2 className="text-xl font-semibold mb-2">
                {session.sessionTitle}
              </h2>
              <p className="text-gray-700 mb-2">{session.sessionDescription}</p>
              <Link
                to={`/view-session/${session._id}`}
                className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2"
              >
                View Detail
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookedSession;
