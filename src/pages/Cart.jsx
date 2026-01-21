import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button";
import ShippingSelector from "../components/ui/ShippingSelector";
import { addToCart, clearItem, removeFromCart } from "../store/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(6.95);
  useEffect(() => {
    let total = 0;
    cartItems.map((item) => {
      total += item.price * item.qty;
    });
    setSubTotal(total);
    total = total + shippingPrice;
    let tax = total * 0.08;
    tax = Number(tax.toFixed(2));
    total = Number(total.toFixed(2));
    setTaxAmount(tax);
    setTotalPrice((total + tax).toFixed(2));
  }, [cartItems, shippingPrice]);
  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Cart is Empty
      </div>
    );
  }
  return (
    <div className="min-h-full bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-6 bg-white p-5 rounded-xl shadow-sm"
              >
                <img
                  src={item.images[0]}
                  alt={`${item.name}_image`}
                  className="w-28 h-28 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{`${item.brand} . ${item.category}`}</p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <Button
                        onClick={() => {
                          dispatch(removeFromCart(item));
                        }}
                        variant={"outline"}
                        className="cursor-pointer"
                      >
                        -
                      </Button>
                      <span className="px-4">{item.qty}</span>
                      <Button
                        onClick={() => {
                          dispatch(addToCart(item));
                        }}
                        variant={"outline"}
                        className="cursor-pointer"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => {
                        dispatch(clearItem(item));
                      }}
                      variant={"danger"}
                      className=" cursor-pointer text-sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="font-semibold">${item.price}</div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subTotal}</span>
              </div>
              <div className="flex justify-between">
                <ShippingSelector onSelect={setShippingPrice} />
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${taxAmount}</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${totalPrice}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-black text-white py-3 rounded-lg hover:opacity-90">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
