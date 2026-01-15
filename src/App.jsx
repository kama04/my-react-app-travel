import React, { useContext, useMemo } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useIdleTimer } from "react-idle-timer";

import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import CartPage from "./pages/CartPage.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthContext } from "./contexts/AuthContext.jsx";

export default function App() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // Idle Timer settings (as required):
  // timeout and throttle for optimal performance
  const timeout = 1000 * 60 * 2; // 2 minutes
  const throttle = 500;

  const onIdle = () => {
    if (!user) return;
    logout();
    toast.warning("You have been logged out due to inactivity.");
    navigate("/login");
  };

  const onActive = () => {
    // Can avoid spamming toasts, but show once if needed
  };

  const onAction = () => {
    // Any user action
  };

  useIdleTimer({
    onIdle,
    onActive,
    onAction,
    timeout,
    throttle,
  });

  const defaultRoute = useMemo(() => (user ? "/" : "/login"), [user]);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <CartPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to={defaultRoute} replace />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={2500} newestOnTop />
    </>
  );
}
