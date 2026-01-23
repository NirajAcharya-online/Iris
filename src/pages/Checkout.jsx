import React, { useEffect } from "react";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../store/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const total = useSelector((state) => state.cart.total);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (!cartItems.length) navigate("/cart");
  }, [cartItems]);
  return (
    <div className="min-h-full bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-4">Contact Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="First Name" className="input" />
                <input placeholder="Last Name" className="input" />
                <input placeholder="Email" className="input" />
                <input placeholder="Phone" className="input" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-4">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Street Address" className="input" />
                <input placeholder="City" className="input" />
                <input placeholder="State" className="input" />
                <input placeholder="Zip Code" className="input" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="font-semibold mb-4">Payment Method</h2>

              <div className="space-y-3 text-sm">
                <label className="flex gap-2 items-center">
                  <input type="radio" name="payment" />
                  Credit Card
                </label>

                <label className="flex gap-2 items-center">
                  <input type="radio" name="payment" />
                  Cash On Delivery
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="font-semibold mb-4">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${total.subTotal}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${total.shippingPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>${total.taxAmount}</span>
              </div>

              <hr />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>${total.totalPrice}</span>
              </div>
            </div>

            <Button
              onClick={() => {
                navigate("/success", { state: { fromCheckout: true } });
              }}
              variant={"secondary"}
              className="w-full mt-6"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
