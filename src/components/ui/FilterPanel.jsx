import React from "react";
import { X } from "lucide-react";
import Button from "../ui/Button";

function FilterPanel({ open, onClose, searchParams, setSearchParams }) {
  const selectedCategories = searchParams.getAll("category");
  const selectedBrand = searchParams.get("brand") || "";
  const selectedSort = searchParams.get("sort") || "";
  const selectedRating = searchParams.get("rating") || "";
  const priceParam = searchParams.get("price") || "";
  const [minPrice, maxPrice] = priceParam.split("-");

  const updateParams = (cb) => {
    const params = new URLSearchParams(searchParams);
    cb(params);
    setSearchParams(params);
  };

  const toggleCategory = (value) => {
    updateParams((params) => {
      const current = params.getAll("category");
      params.delete("category");

      if (current.includes(value)) {
        current
          .filter((c) => c !== value)
          .forEach((c) => params.append("category", c));
      } else {
        [...current, value].forEach((c) => params.append("category", c));
      }
    });
  };

  const setPrice = (min, max) => {
    updateParams((params) => {
      if (!min && !max) params.delete("price");
      else params.set("price", `${min || 0}-${max || 999999}`);
    });
  };

  const setBrand = (value) => {
    updateParams((params) => {
      if (!value) params.delete("brand");
      else params.set("brand", value);
    });
  };

  const setSort = (value) => {
    updateParams((params) => {
      if (!value) params.delete("sort");
      else params.set("sort", value);
    });
  };

  const setRating = (value) => {
    updateParams((params) => {
      if (!value) params.delete("rating");
      else params.set("rating", value);
    });
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
    fixed md:sticky
    top-16 md:top-24
    left-0 z-40
    h-[calc(100vh-4rem)] md:h-[calc(100vh-6rem)]
    w-[85%] max-w-xs bg-white
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
        <div className="p-4 space-y-6 overflow-y-auto h-full">
          <div>
            <p className="font-semibold mb-2">Category</p>
            <div className="space-y-2 text-sm">
              {["Sunglasses", "Frames", "Sports"].map((cat) => (
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
            <p className="font-semibold mb-2">Price</p>
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                defaultValue={minPrice}
                className="w-full border rounded px-2 py-1 text-sm"
                onChange={(e) => setPrice(e.target.value, maxPrice)}
              />
              <input
                type="number"
                placeholder="Max"
                defaultValue={maxPrice}
                className="w-full border rounded px-2 py-1 text-sm"
                onChange={(e) => setPrice(minPrice, e.target.value)}
              />
            </div>
          </div>

          <div>
            <p className="font-semibold mb-2">Brand</p>
            <select
              value={selectedBrand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border rounded px-2 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="UrbanOptics">UrbanOptics</option>
              <option value="LiteWeight">LiteWeight</option>
              <option value="Heritage">Heritage</option>
              <option value="VogueView">VogueView</option>
              <option value="Modernist">Modernist</option>
            </select>
          </div>

          <div>
            <p className="font-semibold mb-2">Rating</p>
            <select
              value={selectedRating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full border rounded px-2 py-2 text-sm"
            >
              <option value="">All</option>
              <option value="4">4★ & up</option>
              <option value="4.5">4.5★ & up</option>
              <option value="4.7">4.7★ & up</option>
            </select>
          </div>

          <div>
            <p className="font-semibold mb-2">Sort</p>
            <select
              value={selectedSort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full border rounded px-2 py-2 text-sm"
            >
              <option value="">Newest</option>
              <option value="low">Price: Low → High</option>
              <option value="high">Price: High → Low</option>
              <option value="rating">Top Rated</option>
            </select>
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
