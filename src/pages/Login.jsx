import React, { useState, useContext } from "react";

import axios from "axios";
import { BASE_URL } from "./apiEndPoints";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

const Login = () => {
  const navigateTo = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const gitProvider = new GithubAuthProvider();
  const firebaseConfig = {
    apiKey: "AIzaSyD0We0u9C9tLyMijgiigjCZv-y0dhZ6Fio",
    authDomain: "assignment-11-c1edb.firebaseapp.com",
    projectId: "assignment-11-c1edb",
    storageBucket: "assignment-11-c1edb.appspot.com",
    messagingSenderId: "548904369252",
    appId: "1:548904369252:web:ac93a26b616f4b32f83371",
  };
  const app = initializeApp(firebaseConfig);

  const auth = getAuth(app);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGoogleLogin = async () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log("User signed in successfully:", result);
        localStorage.setItem("accessToken", result.user.accessToken);
        localStorage.setItem("name", result.user.displayName);
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("role", "user");

        toast.success("Logged in Successfully");
        window.location.href = "/dashboard";
      })
      .catch((error) => {
       
        console.error("Error signing in:", error);
        
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/login`, formData);
      const { accessToken, user } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("name", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);

      toast.success("Logged in Successfully");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <ToastContainer></ToastContainer>
      <div className="bg-white p-8 rounded shadow-md w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              className="w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-400"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none"
            type="button"
            onClick={handleGoogleLogin}
            style={{ marginLeft: "15px" }}
            disabled={loading}
          >
            { "Google Login"}
          </button>

          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 focus:outline-none"
            type="button"
            onClick={handleGoogleLogin}
            style={{ marginLeft: "15px" }}
            disabled={loading}
          >
            {"Github Login"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
