import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

function OrdersTab() {
  const navigate = useNavigate();
  const { status, orderList, error } = useSelector((state) => state.order);

  if (status === "loading")
    return (
      <div className="p-8 text-center text-gray-500">Loading orders...</div>
    );
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  if (!orderList || orderList.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-200">
        <p className="text-gray-500">No orders found.</p>
        <Button
          variant="link"
          onClick={() => navigate("/shop")}
          className="mt-2 text-indigo-600 font-semibold"
        >
          Start Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orderList.map((order) => (
        <div
          key={order.id}
          className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-indigo-300 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <div className="bg-gray-50/50 px-5 py-3 border-b border-gray-100 flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                  Order Date
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="hidden sm:block h-8 w-[1px] bg-gray-200" />
              <div className="hidden sm:block">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                  Order ID
                </p>
                <p className="text-sm font-medium text-gray-700">
                  #{order.id.slice(-6).toUpperCase()}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  order.status === "Processing"
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {order.status}
              </span>
            </div>
          </div>

          <div className="p-5 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="flex -space-x-3 overflow-hidden">
                {order.items.slice(0, 3).map((item, idx) => (
                  <img
                    key={idx}
                    className="inline-block h-12 w-12 rounded-lg ring-2 ring-white object-cover bg-gray-100"
                    src={item.images[0]}
                    alt={item.name}
                  />
                ))}
                {order.items.length > 3 && (
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg ring-2 ring-white bg-gray-800 text-white text-xs font-bold">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {order.items.length}{" "}
                  {order.items.length === 1 ? "Item" : "Items"}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[200px]">
                  {order.items.map((i) => i.name).join(", ")}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between w-full sm:w-auto sm:gap-8 border-t sm:border-t-0 pt-4 sm:pt-0">
              <div className="sm:text-right">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold">
                  Total
                </p>
                <p className="text-lg font-bold text-gray-900">
                  ${order.summary?.totalPrice?.toFixed(2)}
                </p>
              </div>
              <button
                onClick={() => navigate(`/account/orders/${order.id}`)}
                className="px-4 py-2 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default OrdersTab;
