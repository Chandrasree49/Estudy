import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
      
      setReview("");
      setRating(0);
      alert("Review addedd successfully");
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
      <div className="max-w-2xl mx-auto mt-8">
        {session.ratings.map((rating, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              {rating.studentEmail}
            </h2>
            <p className="text-gray-600 mb-4">{rating.review}</p>
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl font-bold mr-2">
                {rating.rating}
              </span>
              <div className="flex">
                {Array.from({ length: rating.rating }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.839-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.175 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
                {Array.from({ length: 5 - rating.rating }, (_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.539 1.118l-3.357-2.44a1 1 0 00-1.175 0l-3.357 2.44c-.784.57-1.839-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.175 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

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
