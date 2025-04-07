// import React, { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import AuthContext from "../context/AuthContext";

// const PrivateRoute = ({ children }) => {
//   const { user } = useContext(AuthContext);

//   return user ? children : <Navigate to="/" />;
// };

// export default PrivateRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (!user && !token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
