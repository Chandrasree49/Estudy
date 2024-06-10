import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const ViewTutorSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialLink, setMaterialLink] = useState("");
  const [materialFile, setMaterialFile] = useState(null);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/study-sessions`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSessions(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching study sessions", err);
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  const handleReapproval = async (sessionId) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.put(
        `${BASE_URL}/study-sessions/${sessionId}/send-approval-request`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      
    } catch (err) {
      console.error("Error sending approval request", err);
      alert("Failed to send approval request");
    }
  };

  const openModal = (sessionId) => {
    setCurrentSessionId(sessionId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentSessionId(null);
    setMaterialTitle("");
    setMaterialLink("");
    setMaterialFile(null);
  };

  const handleFileChange = (e) => {
    setMaterialFile(e.target.files[0]);
  };

  const handleMaterialSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", materialTitle);
    formData.append("studySessionId", currentSessionId);
    formData.append("link", materialLink);
    formData.append("file", materialFile);

    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(`${BASE_URL}/upload-materials`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Material uploaded successfully");
      closeModal();
    } catch (err) {
      console.error("Error uploading material", err);
      alert("Failed to upload material");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">My Study Sessions</h2>
      {sessions.length === 0 ? (
        <div>No study sessions found.</div>
      ) : (
        sessions.map((session) => (
          <div
            key={session._id}
            className="mb-6 p-4 border border-gray-300 rounded-md shadow-sm"
          >
            <h3 className="text-xl font-semibold">{session.sessionTitle}</h3>
            <p className="mt-2 text-gray-600">{session.sessionDescription}</p>
            <div className="mt-4">
              <span className="font-medium">Status:</span> {session.status}
              {session.status === "rejected" && (
                <button
                  onClick={() => handleReapproval(session._id)}
                  className="ml-4 py-1 px-3 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
                >
                  Send for Re-Approval
                </button>
              )}
              {session.status === "approved" && (
                <button
                  onClick={() => openModal(session._id)}
                  className="ml-4 py-1 px-3 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
                >
                  Add Materials
                </button>
              )}
            </div>
            <div className="mt-2">
              <span className="font-medium">Registration Period:</span>{" "}
              {new Date(session.registrationStartDate).toLocaleDateString()} -{" "}
              {new Date(session.registrationEndDate).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <span className="font-medium">Class Period:</span>{" "}
              {new Date(session.classStartDate).toLocaleDateString()} -{" "}
              {new Date(session.classEndDate).toLocaleDateString()}
            </div>
            <div className="mt-2">
              <span className="font-medium">Duration:</span>{" "}
              {session.sessionDuration} hours
            </div>
            <div className="mt-4">
              <span className="font-medium">Materials:</span>
              <ul className="list-disc ml-6">
                {session.materials.length > 0 ? (
                  session.materials.map((material) => (
                    <li key={material._id} className="mb-2">
                      <div>
                        <strong>{material.title}</strong>
                        {material.image && (
                          <div className="mt-2">
                            <img
                              src={`${BASE_URL}/uploads/${material.image}`}
                              alt={material.title}
                              className="w-24 h-24 object-cover"
                            />
                          </div>
                        )}
                        {material.link && (
                          <div className="mt-2">
                            <a
                              href={material.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 py-1 px-3 bg-orange-500 text-white font-semibold rounded-md shadow-sm hover:bg-orange-700"
                            >
                              View Material
                            </a>
                          </div>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li>No materials</li>
                )}
              </ul>
            </div>
          </div>
        ))
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Upload Material</h2>
            <form onSubmit={handleMaterialSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={materialTitle}
                  onChange={(e) => setMaterialTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="studySessionId"
                >
                  Study Session ID
                </label>
                <input
                  type="text"
                  id="studySessionId"
                  value={currentSessionId}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="tutorEmail"
                >
                  Tutor Email
                </label>
                <input
                  type="email"
                  id="tutorEmail"
                  value={localStorage.getItem("userEmail")}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="file">
                  Image Upload
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  accept="image/*"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="link">
                  Google Drive Link
                </label>
                <input
                  type="url"
                  id="link"
                  value={materialLink}
                  onChange={(e) => setMaterialLink(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-500 text-white rounded-md shadow-sm hover:bg-gray-700 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700"
                >
                  Upload
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewTutorSession;
