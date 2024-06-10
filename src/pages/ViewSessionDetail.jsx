import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // Assuming you're using react-router for routing
import { BASE_URL } from "./apiEndPoints";

const ViewSessionDetail = () => {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(
          `${BASE_URL}/booked-sessions/${sessionId}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setSession(response.data);
      } catch (error) {
        console.error("Error fetching session details:", error);
      }
    };

    fetchSession();
  }, [sessionId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      await axios.post(
        `${BASE_URL}/add-review`,
        {
          sessionId,
          review,
          rating,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      // Optionally, you can reload the session details after adding the review
      fetchSession();
      // Clear review input fields
      setReview("");
      setRating(0);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2">Session Details</h2>
        <p>
          <strong>Duration:</strong> {session.sessionDuration}
        </p>
        <p>
          <strong>Registration Start Date:</strong>{" "}
          {new Date(session.registrationStartDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Registration End Date:</strong>{" "}
          {new Date(session.registrationEndDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Class Start Date:</strong>{" "}
          {new Date(session.classStartDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Class End Date:</strong>{" "}
          {new Date(session.classEndDate).toLocaleDateString()}
        </p>
        <p>
          <strong>Fee:</strong>{" "}
          {session.isFree ? "Free" : `$${session.registrationFee}`}
        </p>
      </div>
      <h2 className="text-xl font-semibold mb-4">Materials</h2>
      {session.materials && session.materials.length > 0 ? (
        <ul className="list-disc pl-6">
          {session.materials.map((material) => (
            <li key={material._id}>
              <a
                href={material.link}
                className="text-blue-500 hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {material.title}
              </a>
              <button
                className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => handleDownload(material.link)}
              >
                Download
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No materials available</p>
      )}

      <h2 className="text-xl font-semibold mt-8 mb-4">Reviews</h2>

      <h2 className="text-xl font-semibold mt-8 mb-4">Add Review</h2>
      <form onSubmit={handleSubmitReview}>
        <label className="block mb-4">
          Review:
          <textarea
            name="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2"
            required
          ></textarea>
        </label>
        <label className="block mb-4">
          Rating:
          <input
            type="number"
            name="rating"
            value={rating}
            min="1"
            max="5"
            onChange={(e) => setRating(parseInt(e.target.value))}
            className="border border-gray-300 rounded-md px-4 py-2 w-full mt-2"
            required
          />
        </label>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ViewSessionDetail;