import React from "react";
import { useSelector } from "react-redux";
import Button from "../../components/ui/Button";
import { useNavigate } from "react-router-dom";

function Order() {
  const navigate = useNavigate();
  const { status, orderList, error } = useSelector((state) => state.order);

  if (status === "loading")
    return (
      <div className="text-center py-20 font-sans">Loading your orders...</div>
    );

  if (error)
    return (
      <div className="text-center py-20 text-red-500 font-bold font-sans">
        {error}
      </div>
    );

  return (
    <div className="min-h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Order History
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Check the status of recent orders and manage your purchases.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {orderList && orderList.length > 0 ? (
            orderList.map((order) => (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="bg-gray-50 border-b border-gray-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                      Order Placed
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                      Total Amount
                    </p>
                    <p className="mt-1 font-semibold text-gray-900">
                      ${order.summary?.totalPrice?.toFixed(2)}
                    </p>
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                      Ship To
                    </p>
                    <p className="mt-1 text-blue-600 font-medium cursor-pointer hover:underline">
                      {order.shippingInfo?.firstName}{" "}
                      {order.shippingInfo?.lastName}
                    </p>
                  </div>
                  <div className="text-right flex flex-col items-end">
                    <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                      Status
                    </p>
                    <p
                      className={`mt-1 font-bold ${order.status === "Processing" ? "text-orange-500" : "text-green-600"}`}
                    >
                      {order.status}
                    </p>
                  </div>
                </div>

                <div className="p-6 divide-y divide-gray-100">
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row gap-6 py-6 first:pt-0 last:pb-0"
                    >
                      <div className="w-full sm:w-24 h-24 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-200 overflow-hidden">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-md font-bold text-gray-900">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">
                              Quantity: {item.qty}
                            </p>
                            <p className="text-xs text-gray-400 mt-1 uppercase">
                              Category: {item.category}
                            </p>
                          </div>
                          <p className="font-bold text-gray-900">
                            ${(item.price * item.qty).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    Order ID: {order.orderId}
                  </span>
                  <span className="text-xs font-medium text-gray-600">
                    Method: {order.paymentMethod?.toUpperCase()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="mt-20 text-center py-16 px-4 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
              <div className="text-5xl mb-4">🛍️</div>
              <h2 className="text-xl font-bold text-gray-900">No orders yet</h2>
              <p className="text-gray-500 mt-2 max-w-xs mx-auto">
                When you shop, your orders will appear here for easy tracking.
              </p>
              <Button
                onClick={() => navigate("/shop")}
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Go Shopping
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
