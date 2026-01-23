import React from "react";
import TryOnSetup from "../features/TryOn/TryOnSetup";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
function TryOn() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);

  return <TryOnSetup frameImage={product.images[0]} />;
}

export default TryOn;
