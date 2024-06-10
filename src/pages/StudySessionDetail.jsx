import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; 
import { BASE_URL } from "./apiEndPoints";
import PaymentForm from "./PaymentForm";

const StudySessionDetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [user, setUser] = useState(null); 

  useEffect(() => {
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
    </div>
  );
};

export default StudySessionDetail;
