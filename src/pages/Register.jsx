import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-spinner-material";
import { BASE_URL } from "./apiEndPoints";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const initialFormData = {
    name: "",
    email: "",
    password: "",
    role: "student", // Default role selection
  };

  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/register`, formData);
      toast.success(response.data);
      setFormData(initialFormData); // Reset the form
    } catch (error) {
      toast.success("Registration failed. Please try again later.");
    }

    setLoading(false);
  };

  return (
    
  );
};

export default Register;
