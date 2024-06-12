import React from "react";
import logo from "../assets/estudy.png";

const Nav = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("accessToken");

  let navOptions;
  let authOption;
  if (token && token.length > 4) {
    authOption = (
      <>
        <a
          className="btn bg-red-500 text-white hover:bg-red-700"
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("name");
            localStorage.removeItem("email");
            localStorage.removeItem("role");
            window.location.href = "/login";
          }}
        >
          Logout
        </a>
      </>
    );
  } else {
    authOption = (
      <>
        <a
          href="/login"
          className="btn bg-green-500 text-white hover:bg-green-700"
        >
          Login
        </a>
        <a
          href="/register"
          className="btn bg-orange-500 text-white hover:bg-orange-700"
        >
          Register
        </a>
      </>
    );
  }

  if (role === "admin") {
    navOptions = (
      <>
        <li>
          <a href="/admin/dashboard">Dashboard</a>
        </li>
        <li>
          <a href="/admin/users">Manage Users</a>
        </li>
        <li>
          <a href="/admin/settings">Settings</a>
        </li>
      </>
    );
  } else if (role === "tutor") {
    navOptions = (
      <>
        <li>
          <a href="/CreateStudySession">Create study Session</a>
        </li>
        <li>
          <a href="/ViewTutorSession">View Session</a>
        </li>
        <li>
          <a href="/ViewTutorMaterials">Tutor Materials</a>
        </li>

        <li>
          <a href="/ViewTutorMaterials">Upload Materials</a>
        </li>

        <li>
          <a href="/Allnotes">View Notes</a>
        </li>
      </>
    );
  } else if (role === "user" || role === "student") {
    navOptions = (
      <>
        <li>
          <a href="/booked-sessions">View Booked Session</a>
        </li>
        <li>
          <a href="/notes">Notes</a>
        </li>
        <li>
          <a href="/notes">Manage Notes</a>
        </li>
        <li>
          <a href="/notes">Tutor Study Materials</a>
        </li>
      </>
    );
  }
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navOptions}
            </ul>
          </div>
          <img src={logo} height="50px" width="50px"></img>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
        <div className="navbar-end">{authOption}</div>
      </div>
    </div>
  );
};

export default Nav;
