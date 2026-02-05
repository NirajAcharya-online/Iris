import React, { useState, useEffect } from "react";
import ProductCard from "../../components/product/ProductCard";
import FilterPanel from "../../components/ui/FilterPanel";
import Button from "../../components/ui/Button";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../../components/ui/SearchBar";
import { useGetProductsQuery } from "../../data/fetchProducts";

const ITEMS_PER_PAGE = 8;

function Shop() {
  const { data: products = [], isLoading } = useGetProductsQuery();

  const [openFilter, setOpenFilter] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchItem, setSearchItem] = useState("");
  const [page, setPage] = useState(1);

  const category = searchParams.getAll("category");
  const price = searchParams.get("price");
  const brand = searchParams.get("brand");
  const rating = searchParams.get("rating");
  const sort = searchParams.get("sort");

  let filteredProducts = [...products];

  if (searchItem.trim()) {
    filteredProducts = filteredProducts.filter((product) =>
      [product.name, product.brand, product.category]
        .join(" ")
        .toLowerCase()
        .includes(searchItem.toLowerCase()),
    );
  }

  if (category.length) {
    filteredProducts = filteredProducts.filter((product) =>
      category.includes(product.category),
    );
  }

  if (price) {
    const [min, max] = price.split("-").map(Number);
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= min && product.price <= max,
    );
  }

  if (brand) {
    filteredProducts = filteredProducts.filter(
      (product) => product.brand === brand,
    );
  }

  if (rating) {
    filteredProducts = filteredProducts.filter(
      (product) => product.rating >= Number(rating),
    );
  }

  if (sort) {
    if (sort === "low")
      filteredProducts = [...filteredProducts].sort(
        (a, b) => a.price - b.price,
      );

    if (sort === "high")
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.price - a.price,
      );

    if (sort === "rating")
      filteredProducts = [...filteredProducts].sort(
        (a, b) => b.rating - a.rating,
      );
  }

  useEffect(() => {
    setPage(1);
  }, [searchItem, category.join(), price, brand, rating, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    start,
    start + ITEMS_PER_PAGE,
  );

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium text-lg animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 py-6">
        <div className="flex justify-center">
          <SearchBar setSearchItem={setSearchItem} />
        </div>

        <div className="flex items-center justify-between mb-4 md:hidden">
          <h1 className="text-lg font-bold">Shop</h1>

          <Button
            variant="outline"
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
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {!paginatedProducts.length && (
              <p className="text-center mt-10 text-gray-500">
                No products found
              </p>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-10">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                >
                  Prev
                </Button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1 rounded ${
                      page === i + 1 ? "bg-black text-white" : "border bg-white"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
