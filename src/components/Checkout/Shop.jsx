import React, { useState, useMemo } from "react";
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

  // Logic remains identical as requested
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
    if (sort === "low") filteredProducts.sort((a, b) => a.price - b.price);
    if (sort === "high") filteredProducts.sort((a, b) => b.price - a.price);
    if (sort === "rating") filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  useMemo(() => {
    setPage(1);
  }, [searchItem, category.join(), price, brand, rating, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + ITEMS_PER_PAGE,
  );

  if (isLoading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header - Sticky on mobile for better UX */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 md:relative md:bg-transparent md:border-none">
        <div className="max-w-7xl mx-auto flex justify-center">
          <SearchBar setSearchItem={setSearchItem} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Mobile Header and Filter Trigger */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h1 className="text-xl font-extrabold tracking-tight text-gray-900">
            Shop
          </h1>
          <Button
            variant="outline"
            onClick={() => setOpenFilter(true)}
            className="flex items-center gap-2 border-gray-300 px-4 py-2 rounded-full text-sm font-medium bg-white shadow-sm active:scale-95 transition-transform"
          >
            <span>Filters</span>
            <span className="bg-black text-white rounded-full w-5 h-5 text-[10px] flex items-center justify-center">
              {category.length + (price ? 1 : 0) + (brand ? 1 : 0)}
            </span>
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Desktop Sidebar / Mobile Drawer */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <FilterPanel
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </aside>

          {/* Mobile Overlay Filter Panel */}
          <div className="md:hidden">
            <FilterPanel
              open={openFilter}
              onClose={() => setOpenFilter(false)}
              searchParams={searchParams}
              setSearchParams={setSearchParams}
            />
          </div>

          <div className="flex-1">
            {/* Responsive Grid: 2 columns on small mobile, 3 on tablets, 4 on desktops */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3 gap-y-6 md:gap-6">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {!paginatedProducts.length && (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-lg text-gray-500 font-medium">
                  No products found
                </p>
                <p className="text-sm text-gray-400">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}

            {/* Pagination - Scrollable on very small screens */}
            {totalPages > 1 && (
              <div className="flex flex-wrap items-center justify-center gap-2 mt-12 mb-8">
                <Button
                  variant="outline"
                  disabled={page === 1}
                  onClick={() => setPage((p) => p - 1)}
                  className="px-4 py-2 text-sm disabled:opacity-50"
                >
                  Prev
                </Button>

                <div className="flex items-center gap-1 overflow-x-auto max-w-[200px] sm:max-w-none">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`min-w-[36px] h-9 rounded-md text-sm font-medium transition-colors ${
                        page === i + 1
                          ? "bg-black text-white shadow-md"
                          : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <Button
                  variant="outline"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="px-4 py-2 text-sm disabled:opacity-50"
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
