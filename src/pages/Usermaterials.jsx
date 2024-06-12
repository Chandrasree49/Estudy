import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const Usermaterials = () => {
  const [bookedSessions, setBookedSessions] = useState([]);

  useEffect(() => {
    const fetchBookedSessions = async () => {
      const accessToken = localStorage.getItem("accessToken");

      try {
        const response = await axios.get(`${BASE_URL}/session-materials`, {
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
      <h1 className="text-3xl font-semibold mb-4">Booked Sessions Materials</h1>
      {bookedSessions.map((session) => (
        <div key={session.sessionId} className="border rounded p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">{session.sessionName}</h2>
          <ul>
            <div className="min-h-screen bg-gray-100 p-4">
              {session.materials.length === 0 ? (
                <div className="text-center mt-4">No materials available.</div>
              ) : (
                <div className="overflow-x-auto mt-8">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 border-b">Image</th>
                        <th className="px-4 py-2 border-b">Title</th>
                        <th className="px-4 py-2 border-b">Download Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {session.materials.map((material, index) => (
                        <tr key={index} className="hover:bg-gray-100">
                          <td className="px-4 py-2 border-b text-center">
                            <img
                              src={`${BASE_URL}/uploads/${material.image}`}
                              alt={material.title}
                              className="h-16 w-16 object-cover"
                            />
                          </td>
                          <td className="px-4 py-2 border-b">
                            <a
                              href={material.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {material.title}
                            </a>
                          </td>
                          <td className="px-4 py-2 border-b text-center">
                            <a
                              href={material.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Usermaterials;
