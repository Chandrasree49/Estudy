import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./apiEndPoints";

const Tutors = () => {
  const [tutors, setTutors] = useState([]);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.get(`${BASE_URL}/tutors`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setTutors(response.data);
      } catch (error) {
        console.error("Error fetching tutors:", error);
      }
    };

    fetchTutors();
  }, []);

  return (
    <>
      <h3>Tutor List:</h3>
      <div className="container mx-auto mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor) => (
          <div
            key={tutor._id}
            className="bg-white shadow-lg rounded-lg p-6 mb-4"
          >
            <h2 className="text-xl font-semibold mb-2">{tutor.name}</h2>
            <p className="text-gray-700 mb-2">{tutor.email}</p>
           
          </div>
        ))}
      </div>
    </>
  );
};

export default Tutors;
