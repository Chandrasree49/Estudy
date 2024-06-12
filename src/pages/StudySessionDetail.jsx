import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "./apiEndPoints";
import PaymentForm from "./PaymentForm";
import checkAuth from "../component/CheckAuth";

const StudySessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const role = checkAuth();
    const fetchSession = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/study-sessions/${id}`);
        setSession(response.data);
      } catch (error) {
        console.error("Error fetching study session:", error);
      }
    };

    const fetchUser = () => {
      const role = localStorage.getItem("role");
      setUser(role);
    };

    fetchSession();
    fetchUser();
  }, [id]);

  if (!session) {
    return <div>Loading...</div>;
  }

  const isRegistrationClosed =
    new Date(session.registrationEndDate) < new Date();
  const isUserAdminOrTutor = user && (user === "admin" || user === "tutor");

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold mb-4">{session.sessionTitle}</h1>
        <p className="text-gray-700 mb-4">{session.sessionDescription}</p>

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

        <button
          className={`px-4 py-2 rounded-md ${
            isRegistrationClosed || isUserAdminOrTutor
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={isRegistrationClosed || isUserAdminOrTutor}
          onClick={() => {
            setShowPaymentForm(true);
          }}
        >
          {isRegistrationClosed ? "Registration Closed" : "Book Now"}
        </button>
        {showPaymentForm && (
          <PaymentForm sessionId={id} email={session.tutorEmail} />
        )}
      </div>

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
    </div>
  );
};

export default StudySessionDetail;
