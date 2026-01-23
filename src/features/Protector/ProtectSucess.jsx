import { Navigate, useLocation } from "react-router-dom";

function ProtectedSuccess({ children }) {
  const location = useLocation();

  if (!location.state?.fromCheckout) {
    return <Navigate to="/cart" replace />;
  }

  return children;
}
export default ProtectedSuccess