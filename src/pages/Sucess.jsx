import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { clearCart } from "../store/cartSlice";

function Success() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-xl shadow-sm text-center max-w-md w-full">
        <CheckCircle size={64} className="mx-auto text-green-500" />
        <h1 className="text-2xl font-bold mt-4">Order Placed!</h1>
        <p className="text-gray-500 mt-2">
          Your order has been successfully completed.
        </p>

        <Link
          to="/products"
          className="inline-block mt-6 bg-black text-white px-6 py-3 rounded-lg"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default Success;
