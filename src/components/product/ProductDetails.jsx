import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import Button from "../ui/Button";
import { addToCartDb } from "../../firebase/firebaseDB";

const ProductDetails = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeImage, setActiveImage] = useState(0);
  const userDetails = useSelector((state) => state.user.userDetails);
  const handleAddToCart = async () => {
    const response = await addToCartDb(userDetails, product);
    dispatch(addToCart(product));
  };
  const {
    id,
    name,
    brand,
    price,
    rating,
    reviews,
    images,
    colors,
    material,
    shape,
    stock,
    tryOnAvailable,
  } = product;

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <div className="bg-white rounded-xl p-4">
          <img
            src={images[activeImage]}
            alt={name}
            className="w-full h-[400px] object-contain"
          />
        </div>

        <div className="flex gap-3 mt-4">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`border rounded-lg p-2 ${
                activeImage === i ? "border-black" : "border-gray-200"
              }`}
            >
              <img src={img} className="h-16 w-16 object-contain" />
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <p className="text-gray-500">{brand}</p>

        <div className="flex items-center gap-2">
          <div className="flex text-yellow-500">
            <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
          </div>
          <span className="text-sm text-gray-500">
            {rating} ({reviews} reviews)
          </span>
        </div>

        <p className="text-3xl font-black">${price}</p>

        <div>
          <p className="font-semibold mb-2">Colors</p>
          <div className="flex gap-2">
            {colors.map((c) => (
              <span
                key={c}
                className="h-6 w-6 rounded-full border"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>Material: {material}</p>
          <p>Shape: {shape}</p>
          <p>Stock: {stock}</p>
        </div>

        <div className="flex gap-4 pt-4">
          <Button
            onClick={() => {
              handleAddToCart();
            }}
            className="flex-1 bg-black text-white py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800"
          >
            <ShoppingCart size={18} />
            Add To Cart
          </Button>

          {tryOnAvailable && (
            <Button
              onClick={() => navigate(`/product/${id}/tryon`)}
              className="flex-1 border py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-black hover:text-white"
            >
              <Sparkles size={18} />
              Try On
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
