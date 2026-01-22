import React from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";

function FilterPanel({ open, onClose, searchParams, setSearchParams }) {
  const selectedCategories = searchParams.getAll("category");

  const toggleCategory = (value) => {
    const params = new URLSearchParams(searchParams);
    const current = params.getAll("category");

    params.delete("category");

    if (current.includes(value)) {
      current
        .filter((c) => c !== value)
        .forEach((c) => params.append("category", c));
    } else {
      [...current, value].forEach((c) => params.append("category", c));
    }

    setSearchParams(params);
  };

  const setPrice = (min, max) => {
    const params = new URLSearchParams(searchParams);

    if (!min && !max) {
      params.delete("price");
    } else {
      params.set("price", `${min || 0}-${max || 999999}`);
    }

    setSearchParams(params);
  };

  const clearFilters = () => setSearchParams({});

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`
        fixed md:static top-0 left-0 z-50 h-full w-[85%] max-w-xs bg-white
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:w-64 md:border-r
      `}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-bold text-lg">Filters</h2>
          <button onClick={onClose} className="md:hidden">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 space-y-6 overflow-y-auto h-full pb-32">
          <div>
            <p className="font-semibold mb-2">Category</p>
            <div className="space-y-2 text-sm">
              {["Sunglasses", "Eyeglasses", "Sports"].map((cat) => (
                <label key={cat} className="flex gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => toggleCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Price Range</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                className="w-full border rounded px-2 py-1 text-sm"
                onBlur={(e) =>
                  setPrice(
                    e.target.value,
                    searchParams.get("price")?.split("-")[1],
                  )
                }
              />
              <input
                type="number"
                placeholder="Max"
                className="w-full border rounded px-2 py-1 text-sm"
                onBlur={(e) =>
                  setPrice(
                    searchParams.get("price")?.split("-")[0],
                    e.target.value,
                  )
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Button className="w-full" onClick={onClose}>
              Apply Filters
            </Button>
            <Button variant="outline" className="w-full" onClick={clearFilters}>
              Reset
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterPanel;
