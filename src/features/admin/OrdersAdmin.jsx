import React from "react";
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "./adminApi";

function OrdersAdmin() {
  const { data: orders, isLoading } = useGetAllOrdersQuery();
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  const handleStatusChange = async (orderId, newStatus) => {
    await updateStatus({ id: orderId, status: newStatus });
  };

  if (isLoading)
    return <div className="p-10 text-center">Loading Orders...</div>;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order Management</h1>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {orders?.length} Total Orders
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 border-b">Order ID</th>
              <th className="py-3 px-6 border-b">Customer</th>
              <th className="py-3 px-6 border-b">Total</th>
              <th className="py-3 px-6 border-b text-center">Current Status</th>
              <th className="py-3 px-6 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {orders?.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-6 font-mono text-xs">{order.id}</td>
                <td className="py-3 px-6">
                  <div className="font-semibold text-gray-800">
                    {order.customerName || "Guest"}
                  </div>
                  <div className="text-xs text-gray-400">{order.email}</div>
                </td>
                <td className="py-3 px-6 font-bold text-gray-800">
                  ${order.summary.totalPrice?.toLocaleString() || "0"}
                </td>
                <td className="py-3 px-6 text-center">
                  <StatusBadge status={order.status} />
                </td>
                <td className="py-3 px-6 text-center">
                  <select
                    disabled={isUpdating}
                    value={order.status || "Pending"}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2 outline-none"
                  >
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Processing: "bg-blue-100 text-blue-800",
    Shipped: "bg-purple-100 text-purple-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`${styles[status] || "bg-gray-100"} px-3 py-1 rounded-full text-xs font-bold`}
    >
      {status || "Pending"}
    </span>
  );
}

export default OrdersAdmin;
