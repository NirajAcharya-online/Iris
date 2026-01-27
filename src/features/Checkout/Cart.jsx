import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/ui/Button";
import ShippingSelector from "../../components/ui/ShippingSelector";
import {
  addToCart,
  clearItem,
  fetchCartItems,
  removeFromCart,
  updateTotal,
} from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import {
  addToCartDb,
  clearItemFromCartDb,
  removeFromCartDb,
} from "../../firebase/firebaseDB";

function Cart() {
  const { status, error, items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  const naviagte = useNavigate();
  const [shippingPrice, setShippingPrice] = useState(6.95);
  useEffect(() => {
    if (status === "idle" && user) {
      dispatch(fetchCartItems(user));
    }
  }, [user, dispatch]);

  const subTotal = items.reduce((acc, item) => acc + item.price * item.qty, 0);

  const taxAmount = Number((subTotal * 0.08).toFixed(2));
  const totalPrice = Number((subTotal + shippingPrice + taxAmount).toFixed(2));

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Loading your cart...
      </div>
    );
  }

  if (status === "failed") {
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;
  }
  if (items.length !== 0) {
    return (
      <div className="min-h-full bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => (
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
                          onClick={() => {
                            dispatch(removeFromCart(item));
                            removeFromCartDb(user, item);
                          }}
                          variant="outline"
                        >
                          -
                        </Button>

                        <span className="px-4">{item.qty}</span>

                        <Button
                          onClick={() => {
                            dispatch(addToCart(item));
                            addToCartDb(user, item);
                          }}
                          variant="outline"
                        >
                          +
                        </Button>
                      </div>

                      <Button
                        onClick={() => {
                          dispatch(clearItem(item));
                          clearItemFromCartDb(user, item);
                        }}
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

              <Button
                onClick={() => {
                  dispatch(
                    updateTotal({
                      subTotal,
                      totalPrice,
                      taxAmount,
                      shippingPrice,
                    }),
                  );
                  naviagte("/checkout");
                }}
                variant={"secondary"}
                className=" w-full mt-6 cursor-pointer"
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cart;
