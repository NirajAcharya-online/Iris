import React, { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import FilterPanel from "../components/ui/FilterPanel";
import Button from "../components/ui/Button";
import { useSearchParams } from "react-router-dom";

function Shop() {
  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.getAll("category");
  const price = searchParams.get("price");

  const filteredProducts = products.filter((product) => {
    if (category.length && !category.includes(product.category)) return false;

    if (price) {
      const [min, max] = price.split("-").map(Number);
      if (product.price < min || product.price > max) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4 md:hidden">
          <h1 className="text-lg font-bold">Shop</h1>

          <Button
            variant={"outline"}
            onClick={() => setOpenFilter(true)}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            Filters
          </Button>
        </div>

        <div className="flex gap-6">
          <FilterPanel
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />

          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {!filteredProducts.length && (
              <p className="text-center mt-10 text-gray-500">
                No products found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
