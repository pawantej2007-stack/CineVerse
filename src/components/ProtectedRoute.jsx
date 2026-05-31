import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}

export default ProtectedRoute;
