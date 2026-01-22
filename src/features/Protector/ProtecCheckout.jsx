import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedCheckout({ children }) {
  const cartItems = useSelector((state) => state.cart.items);

  if (!cartItems.length) {
    return <Navigate to="/cart" replace />;
  }

  return children;
}

export default ProtectedCheckout;
