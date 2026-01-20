import React from "react";
import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import Button from "../components/ui/Button";
function Shop() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Shop;
