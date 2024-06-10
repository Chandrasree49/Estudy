import React, { useState } from "react";

import axios from "axios";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { BASE_URL } from "./apiEndPoints";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentForm = ({ sessionId, email }) => {
  const navigateTo = useNavigate();
  const location = useLocation();
  const pathAfterDomain = location.pathname;
  const [state, setState] = useState({
    number: "",
    expiry: "",
    cvc: "",
    name: "",
    focus: "",
  });

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await axios.post(
        `${BASE_URL}/book-study-session`,
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.status === 201) {
        alert("Session booked successfully!");
        window.location.reload();
      }
    } catch (error) {
      alert("Error booking session: " + error.response.data.message);
      window.location.reload();
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
        <Cards
          number={state.number}
          expiry={state.expiry}
          cvc={state.cvc}
          name={state.name}
          focused={state.focus}
        />
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Card Number</label>
            <input
              type="tel"
              name="number"
              placeholder="Card Number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name on Card</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Expiry Date</label>
            <input
              type="tel"
              name="expiry"
              placeholder="MM/YY"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">CVC</label>
            <input
              type="tel"
              name="cvc"
              placeholder="CVC"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Session ID</label>
            <input
              type="text"
              name="sessionId"
              value={sessionId}
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Book Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
