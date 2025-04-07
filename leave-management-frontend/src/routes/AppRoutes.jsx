import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Dashboard from "../pages/Dashboard";
import ApplyLeave from "../pages/Employee/ApplyLeave";
import LeaveHistory from "../pages/Employee/LeaveHistory";
import ApproveLeave from "../pages/HOD/ApproveLeave";
import Reports from "../pages/HOD/Reports";
import Statistics from "../pages/HOD/Statistics";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/apply-leave"
        element={
          <PrivateRoute>
            <ApplyLeave />
          </PrivateRoute>
        }
      />
      <Route
        path="/leave-history"
        element={
          <PrivateRoute>
            <LeaveHistory />
          </PrivateRoute>
        }
      />
      <Route
        path="/approve-leave"
        element={
          <PrivateRoute>
            <ApproveLeave />
          </PrivateRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <PrivateRoute>
            <Reports />
          </PrivateRoute>
        }
      />
      <Route
        path="/statistics"
        element={
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
