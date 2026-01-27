import React from "react";
import Button from "./Button";

function CheckoutCard({ total }) {
  return (
    <div className="lg:sticky lg:top-10 h-fit   ">
      <div className="bg-gray-900 text-white p-8 rounded-[2rem] shadow-xl shadow-indigo-100/50">
        <h2 className="text-xl font-bold mb-8">Order Summary</h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span className="text-white">${total.subTotal}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Shipping</span>
            <span className="text-white">${total.shippingPrice}</span>
          </div>
          <div className="flex justify-between text-gray-400">
            <span>Tax</span>
            <span className="text-white">${total.taxAmount}</span>
          </div>

          <div className="pt-4 mt-4 border-t border-gray-800 flex justify-between items-end">
            <div>
              <p className="text-gray-400 text-xs uppercase tracking-widest mb-1">
                Total Payable
              </p>
              <span className="text-3xl font-extrabold text-white">
                ${total.totalPrice}
              </span>
            </div>
          </div>
        </div>

        <Button
          type="submit"
          variant={"secondary"}
          className="w-full mt-10 py-4 bg-indigo-500 hover:bg-indigo-400 text-white rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98]"
        >
          Complete Purchase
        </Button>

        <p className="text-center text-[10px] text-gray-500 mt-6 uppercase tracking-widest font-medium">
          🔒 Secure SSL Encrypted Checkout
        </p>
      </div>
    </div>
  );
}

export default CheckoutCard;
