import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/ui/Button";
import ShippingSelector from "../components/ui/ShippingSelector";
import { addToCart, clearItem, removeFromCart } from "../store/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const [shippingPrice, setShippingPrice] = React.useState(6.95);

  if (cartItems.length === 0) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Cart is Empty
      </div>
    );
  }

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0,
  );

  const taxAmount = Number((subTotal * 0.08).toFixed(2));
  const totalPrice = Number((subTotal + shippingPrice + taxAmount).toFixed(2));

  return (
    <div className="min-h-full bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm overflow-hidden"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full sm:w-28 h-40 sm:h-28 object-contain rounded-lg"
                />

                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">
                    {item.brand} · {item.category}
                  </p>

                  <div className="flex items-center gap-4 mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden">
                      <Button
                        onClick={() => dispatch(removeFromCart(item))}
                        variant="outline"
                      >
                        -
                      </Button>

                      <span className="px-4">{item.qty}</span>

                      <Button
                        onClick={() => dispatch(addToCart(item))}
                        variant="outline"
                      >
                        +
                      </Button>
                    </div>

                    <Button
                      onClick={() => dispatch(clearItem(item))}
                      variant="danger"
                      className="text-sm"
                    >
                      Remove
                    </Button>
                  </div>
                </div>

                <div className="font-semibold sm:text-right">
                  <div>${item.price}</div>
                  <div className="text-sm text-gray-500">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subTotal.toFixed(2)}</span>
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
