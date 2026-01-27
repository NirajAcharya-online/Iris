import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CheckoutCard from "../../components/ui/CheckoutCard";
import { placeOrderDb } from "../../firebase/firebaseDB";

function Checkout() {
  const total = useSelector((state) => state.cart.total);
  const user = useSelector((state) => state.user.userDetails);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      payment: "credit-card",
    },
  });

  useEffect(() => {
    if (!cartItems.length) navigate("/cart");
  }, [cartItems, navigate]);

  const onSubmit = async (data) => {
    await placeOrderDb(user, {
      shippingInfo: data,
      total,
      cartItems,
      paymentMethod: data.payment,
    });
    navigate("/success", { state: { fromCheckout: true } });
  };

  const inputStyle =
    "w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm bg-gray-50 focus:bg-white";
  const labelStyle =
    "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1";
  const errorStyle = "text-red-500 text-xs mt-1 ml-1";

  return (
    <div className="min-h-full bg-[#fcfcfd] py-12 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Checkout
          </h1>
          <p className="text-gray-500 mt-2">
            Complete your details to finalize the order.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          <div className="lg:col-span-2 space-y-8">
            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  1
                </div>
                <h2 className="text-xl font-bold">Contact Information</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelStyle}>First Name</label>
                  <input
                    {...register("firstName", { required: "Required" })}
                    placeholder="Enter first name"
                    className={inputStyle}
                  />
                  {errors.firstName && (
                    <p className={errorStyle}>{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <label className={labelStyle}>Last Name</label>
                  <input
                    {...register("lastName", { required: "Required" })}
                    placeholder="Enter last name"
                    className={inputStyle}
                  />
                  {errors.lastName && (
                    <p className={errorStyle}>{errors.lastName.message}</p>
                  )}
                </div>
                <div className="md:col-span-2">
                  <label className={labelStyle}>Email Address</label>
                  <input
                    {...register("email", {
                      required: "Required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Invalid email",
                      },
                    })}
                    placeholder="you@example.com"
                    className={inputStyle}
                  />
                  {errors.email && (
                    <p className={errorStyle}>{errors.email.message}</p>
                  )}
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  2
                </div>
                <h2 className="text-xl font-bold">Shipping Address</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelStyle}>Street Address</label>
                  <input
                    {...register("address", { required: "Required" })}
                    placeholder="123 Modern Ave"
                    className={inputStyle}
                  />
                </div>
                <div>
                  <label className={labelStyle}>City</label>
                  <input
                    {...register("city", { required: "Required" })}
                    placeholder="City"
                    className={inputStyle}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={labelStyle}>State</label>
                    <input
                      {...register("state", { required: "Required" })}
                      placeholder="State"
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <label className={labelStyle}>Zip</label>
                    <input
                      {...register("zip", { required: "Required" })}
                      placeholder="Zip"
                      className={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                  3
                </div>
                <h2 className="text-xl font-bold">Payment Method</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="relative flex items-center p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/30">
                  <input
                    {...register("payment")}
                    type="radio"
                    value="credit-card"
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="ml-3 font-semibold text-gray-700">
                    Credit Card
                  </span>
                </label>
                <label className="relative flex items-center p-4 border rounded-2xl cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-indigo-600 has-[:checked]:bg-indigo-50/30">
                  <input
                    {...register("payment")}
                    type="radio"
                    value="cod"
                    className="w-4 h-4 text-indigo-600"
                  />
                  <span className="ml-3 font-semibold text-gray-700">
                    Cash On Delivery
                  </span>
                </label>
              </div>
            </section>
          </div>

          <CheckoutCard total={total} />
        </form>
      </div>
    </div>
  );
}

export default Checkout;
