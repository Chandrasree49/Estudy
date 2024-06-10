import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const ViewAllStudySessions = () => {
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState(0);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateSessionData, setUpdateSessionData] = useState({
    sessionTitle: "",
    sessionDescription: "",
    registrationStartDate: "",
    registrationEndDate: "",
    classStartDate: "",
    classEndDate: "",
    sessionDuration: "",
  });

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/study-sessions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // Filter out rejected sessions
        const filteredSessions = response.data.filter(
          (session) => session.status !== "rejected"
        );
        setSessions(filteredSessions);
      } catch (error) {
        console.error("Error fetching study sessions:", error);
      }
    };

    fetchSessions();
  }, []);

  const handleApproveSession = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/approve-session/${selectedSession._id}`,
        {
          isFree,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Refresh study sessions list after approving
      const response = await axios.get(`${BASE_URL}/study-sessions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Filter out rejected sessions
      const filteredSessions = response.data.filter(
        (session) => session.status !== "rejected"
      );
      setSessions(filteredSessions);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error approving session:", error);
    }
  };

  const handleRejectSession = async (id) => {
    console.log(id);
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/reject-session/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Refresh study sessions list after approving
      const response = await axios.get(`${BASE_URL}/study-sessions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Filter out rejected sessions
      const filteredSessions = response.data.filter(
        (session) => session.status !== "rejected"
      );
      setSessions(filteredSessions);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error approving session:", error);
    }
  };

  const handleUpdateSession = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/study-sessions/${updateSessionData._id}`,
        updateSessionData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Close the modal after updating
      setIsUpdateModalOpen(false);
      // Refresh study sessions list after updating
      const response = await axios.get(`${BASE_URL}/study-sessions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Filter out rejected sessions
      const filteredSessions = response.data.filter(
        (session) => session.status !== "rejected"
      );
      setSessions(filteredSessions);
    } catch (error) {
      console.error("Error updating session:", error);
    }
  };

  const handleDeleteSession = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.delete(
        `${BASE_URL}/study-sessions/${updateSessionData._id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    
      const response = await axios.get(`${BASE_URL}/study-sessions`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    
      const filteredSessions = response.data.filter(
        (session) => session.status !== "rejected"
      );
      setSessions(filteredSessions);
      setSelectedSession(null);
    } catch (error) {
      console.error("Error deleting session:", error);
    }
  };

  const openUpdateModal = () => {
    setUpdateSessionData(selectedSession);
    setIsUpdateModalOpen(true);
  };

  const closeModal = () => {
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-semibold mb-4">View All Study Sessions</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3">Name</th>
            <th className="p-3">Date</th>
            <th className="p-3">Description</th>
            <th className="p-3">Registration Start Date</th>
            <th className="p-3">Registration End Date</th>
            <th className="p-3">Class Start Date</th>
            <th className="p-3">Class End Date</th>
            <th className="p-3">Duration</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sessions.map((session) => (
            <tr key={session._id}>
              <td className="p-3">{session.sessionTitle}</td>
              <td className="p-3">{session.classStartDate}</td>
              <td className="p-3">{session.sessionDescription}</td>
              <td className="p-3">{session.registrationStartDate}</td>
              <td className="p-3">{session.registrationEndDate}</td>
              <td className="p-3">{session.classStartDate}</td>
              <td className="p-3">{session.classEndDate}</td>
              <td className="p-3">{session.sessionDuration}</td>
              <td className="p-3">{session.status}</td>
              <td className="p-3">
                {session.status === "approved" && (
                  <>
                    <button
                      className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
                      onClick={() => {
                        setUpdateSessionData(session);
                        setIsUpdateModalOpen(true);
                      }}
                    >
                      Update
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteSession(session._id)}
                    >
                      Delete
                    </button>
                  </>
                )}
                {session.status === "pending" && (
                  <>
                    <button
                      className="px-4 py-2 bg-green-500 text-white rounded mr-2"
                      onClick={() => setSelectedSession(session)}
                    >
                      Approve
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded"
                      onClick={() => handleRejectSession(session._id)}
                    >
                      Reject
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedSession && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Approve Session</h2>
          <label className="block mb-4">
            <input
              type="checkbox"
              checked={isFree}
              onChange={(e) => setIsFree(e.target.checked)}
              className="mr-2"
            />
            Is the session free?
          </label>
          {!isFree && (
            <label className="block mb-4">
              Amount:
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-gray-300 rounded px-2 py-1"
              />
            </label>
          )}
          <button
            onClick={handleApproveSession}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Approve
          </button>
        </div>
      )}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Update Session</h2>

            <input
              type="text"
              value={updateSessionData.sessionTitle}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  sessionTitle: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Session Title"
            />

            <input
              type="text"
              value={updateSessionData.sessionDescription}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  sessionDescription: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Session Description"
            />

            <input
              type="date"
              value={updateSessionData.registrationStartDate}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  registrationStartDate: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Registration Start Date"
            />

            <input
              type="date"
              value={updateSessionData.registrationEndDate}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  registrationEndDate: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Registration End Date"
            />

            <input
              type="date"
              value={updateSessionData.classStartDate}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  classStartDate: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Class Start Date"
            />

            <input
              type="date"
              value={updateSessionData.classEndDate}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  classEndDate: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Class End Date"
            />

            <input
              type="text"
              value={updateSessionData.sessionDuration}
              onChange={(e) =>
                setUpdateSessionData({
                  ...updateSessionData,
                  sessionDuration: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
              placeholder="Session Duration"
            />

            <button
              onClick={handleUpdateSession}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Update Session
            </button>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllStudySessions;
