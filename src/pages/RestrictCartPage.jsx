import React from "react";
import { ShoppingCart, Lock, ArrowRight, UserPlus } from "lucide-react";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import { openLogin } from "../store/cardStatus";

const RestrictCart = () => {
  const dispatch = useDispatch();
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-blue-50 p-6 rounded-xl">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        <div className="h-2 bg-blue-600 w-full" />

        <div className="p-8 text-center">
          <div className="relative inline-block mb-6">
            <div className="bg-blue-100 p-4 rounded-full">
              <ShoppingCart className="w-12 h-12 text-blue-600" />
            </div>
            <div className="absolute -top-1 -right-1 bg-white p-1 rounded-full shadow-sm">
              <Lock className="w-5 h-5 text-blue-500" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Your cart is waiting
          </h2>
          <p className="text-gray-500 mb-8">
            Please log in to your account to add items, view your saved
            selections, and proceed to checkout.
          </p>

          <div className="space-y-4">
            <Button
              variant="none"
              size="none"
              onClick={() => {
                dispatch(openLogin());
              }}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Log In to Access Cart
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 border-t border-gray-100">
          <p className="text-xs text-center text-gray-400">
            Secure checkout powered by your store's encryption.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestrictCart;
