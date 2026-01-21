import React, { useId } from "react";
import { useParams } from "react-router-dom";
import ProductDetails from "../components/product/ProductDetails";
import { products } from "../data/products";
function ProductDetailsPage() {
  const { id } = useParams();
  const product = products.find((product) => Number(id) === product.id);
  if (!product) {
    return (
      <div className="p-10 text-center text-xl font-semibold">
        Product not found
      </div>
    );
  }
  return (
    <div>
      <ProductDetails product={product} />
    </div>
  );
}

export default ProductDetailsPage;
