import React from "react";
import { products } from "../../data/products";
function Order() {
  const orders = products;
  return (
    <div className="min-h-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
              Order History
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Check the status of recent orders, manage returns, and download
              invoices.
            </p>
          </div>
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all">
            Filter Orders
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Card Top Bar */}
            <div className="bg-gray-50 border-bottom border-gray-200 px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                  Order Placed
                </p>
                <p className="mt-1 font-semibold text-gray-900">Jan 27, 2026</p>
              </div>
              <div>
                <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                  Total Amount
                </p>
                <p className="mt-1 font-semibold text-gray-900">$299.00</p>
              </div>
              <div className="hidden sm:block">
                <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                  Ship To
                </p>
                <p className="mt-1 text-blue-600 font-medium cursor-pointer hover:underline">
                  Rahul Sharma
                </p>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="text-gray-500 uppercase text-[11px] font-bold tracking-wider">
                  Order #
                </p>
                <p className="mt-1 font-medium text-gray-900">ORD-882910</p>
              </div>
            </div>

            {/* Card Body */}
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-100 mr-3">
                  <div className="w-2 h-2 rounded-full bg-green-600"></div>
                </div>
                <p className="text-sm font-bold text-gray-900">
                  Delivered on Jan 25, 2026
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                {/* Product Image Placeholder */}
                <div className="w-full sm:w-32 h-32 bg-gray-100 rounded-xl flex-shrink-0 border border-gray-100">
                  {/* <img src="..." className="object-cover w-full h-full rounded-xl" /> */}
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">
                        Ultra-Bass Noise Cancelling Headphones
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Matte Black | XL Earcups
                      </p>
                    </div>
                    <p className="font-bold text-gray-900">$299.00</p>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-indigo-700 shadow-sm transition-all shadow-indigo-100">
                      Buy it again
                    </button>
                    <button className="bg-white text-gray-700 border border-gray-300 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all">
                      View Product
                    </button>
                    <button className="text-gray-500 hover:text-red-600 text-sm font-medium ml-auto">
                      Need help?
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State (Conditional Rendering) */}
        {orders.length === 0 && (
          <div className="mt-20 text-center py-16 px-4 bg-white border-2 border-dashed border-gray-200 rounded-3xl">
            <div className="text-5xl mb-4">🛍️</div>
            <h2 className="text-xl font-bold text-gray-900">No orders yet</h2>
            <p className="text-gray-500 mt-2 max-w-xs mx-auto">
              When you shop, your orders will appear here for easy tracking.
            </p>
            <button className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-indigo-600 hover:bg-indigo-700">
              Go Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
