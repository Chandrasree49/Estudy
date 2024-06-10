import React, { useContext } from "react";

import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  console.log(children);
  const storedAccessTokens = localStorage.getItem("accessToken");
  if (storedAccessTokens) {
    return children;
  } else {
    return <Navigate to="/Login"></Navigate>;
  }
};

export default ProtectedRoute;
