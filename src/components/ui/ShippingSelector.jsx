import React, { useState } from "react";

const shippingOptions = [
  {
    id: "std",
    label: "Standard Shipping",
    price: 6.95,
    time: "5–10 Business Days",
  },
  {
    id: "exp",
    label: "Expedited Shipping",
    price: 13.95,
    time: "2–3 Business Days",
  },
  {
    id: "ovn",
    label: "Overnight / Next Day",
    price: 34.95,
    time: "1 Business Day",
  },
  {
    id: "int",
    label: "International Shipping",
    price: 22.95,
    time: "10–21 Business Days",
  },
];

function ShippingSelector({ onSelect }) {
  const [selectedId, setSelectedId] = useState("std");

  const handleSelection = (option) => {
    setSelectedId(option.id);
    onSelect(option.price); 
  };

  return (
    <div className="w-full space-y-3 mt-2">
      {shippingOptions.map((option) => (
        <label
          key={option.id}
          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-all ${
            selectedId === option.id
              ? "border-black bg-gray-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <input
              type="radio"
              name="shipping"
              checked={selectedId === option.id}
              onChange={() => handleSelection(option)}
              className="w-4 h-4 accent-black"
            />
            <div>
              <p className="font-medium text-gray-900 text-xs">
                {option.label}
              </p>
              <p className="text-[10px] text-gray-500">{option.time}</p>
            </div>
          </div>
          <span className="font-semibold text-xs">${option.price}</span>
        </label>
      ))}
    </div>
  );
}

export default ShippingSelector;
