import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/ProtectedRoute";
import "./styles/app.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("cineverse-authenticated") === "true";
  });

  const handleAuthChange = (nextAuthState) => {
    setIsLoggedIn(nextAuthState);

    if (nextAuthState) {
      localStorage.setItem("cineverse-authenticated", "true");
    } else {
      localStorage.removeItem("cineverse-authenticated");
    }
  };

  return (
    <Routes>
      <Route
        path="/auth"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <AuthPage setIsLoggedIn={handleAuthChange} />
          )
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movie/:id"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <MovieDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
