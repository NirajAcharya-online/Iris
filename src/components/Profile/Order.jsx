import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const OrderDetailsPage = () => {
  const { id } = useParams();

  const { status, orderList } = useSelector((state) => state.order);
  const order = orderList?.find((o) => o.id === id || o.orderId === id);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (status === "loading" || !order) {
    return (
      <div className="p-10 text-center font-sans text-[#6b7280]">
        Loading Invoice...
      </div>
    );
  }

  return (
    <div className="min-h-full bg-[#f3f4f6] py-10 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#ffffff] shadow-2xl rounded-none border border-[#e5e7eb] p-10">
          <div className="flex justify-between items-start border-b-2 border-[#f3f4f6] pb-8 mb-8">
            <div>
              <h1 className="text-4xl font-black text-[#111827] uppercase tracking-tighter">
                Invoice
              </h1>
              <p className="text-[#6b7280] mt-1 font-medium">
                Order ID: #{order.orderId}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[#9ca3af] text-xs font-bold uppercase tracking-widest">
                Date Issued
              </p>
              <p className="text-[#111827] font-bold">
                {formatDate(order.createdAt)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 mb-10">
            <div>
              <h3 className="text-[#9ca3af] text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                Billed To
              </h3>
              <p className="font-bold text-[#111827] text-lg">
                {order.shippingInfo.firstName} {order.shippingInfo.lastName}
              </p>
              <p className="text-[#4b5563] text-sm leading-relaxed">
                {order.shippingInfo.address}
                <br />
                {order.shippingInfo.city}, {order.shippingInfo.zip}
                <br />
                {order.shippingInfo.email}
              </p>
            </div>
            <div>
              <h3 className="text-[#9ca3af] text-[10px] font-black uppercase tracking-[0.2em] mb-3">
                Payment Method
              </h3>
              <p className="font-bold text-[#111827] uppercase">
                {order.paymentMethod}
              </p>
              <p className="text-[#4b5563] text-sm mt-1 italic">
                Status: {order.status}
              </p>
            </div>
          </div>

          <table className="w-full mb-10">
            <thead>
              <tr className="border-b border-[#e5e7eb] text-left">
                <th className="py-4 text-[#9ca3af] text-[10px] font-black uppercase tracking-widest">
                  Description
                </th>
                <th className="py-4 text-[#9ca3af] text-[10px] font-black uppercase tracking-widest text-center">
                  Qty
                </th>
                <th className="py-4 text-[#9ca3af] text-[10px] font-black uppercase tracking-widest text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f3f4f6]">
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td className="py-5">
                    <p className="font-bold text-[#111827]">{item.name}</p>
                    <p className="text-[#9ca3af] text-xs">
                      {item.brand} • {item.material}
                    </p>
                  </td>
                  <td className="py-5 text-center text-[#4b5563] font-medium">
                    {item.qty}
                  </td>
                  <td className="py-5 text-right font-bold text-[#111827]">
                    ${item.price.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end border-t-2 border-[#111827] pt-6">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-[#4b5563] text-sm">
                <span>Subtotal</span>
                <span className="font-bold">
                  ${order.summary.subTotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-[#4b5563] text-sm">
                <span>Shipping</span>
                <span className="font-bold text-[#059669]">
                  {order.summary.shippingPrice === 0
                    ? "FREE"
                    : `$${order.summary.shippingPrice}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-[#f3f4f6]">
                <span className="text-[#111827] font-black uppercase text-xs">
                  Total Amount
                </span>
                <span className="text-3xl font-black text-[#111827]">
                  ${order.summary.totalPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
