import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/product/ProductCard";

function Cart() {
  const products = useSelector((state) => state.cart.items);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 justify-items-center max-w-6xl mx-auto">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Cart;
