import React, { useState } from "react";
import { Heart, ShoppingCart, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { toogleWishlist } from "../../store/wishlistSlice";
import { addToCart } from "../../store/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const navigate = useNavigate();

  const { id, name, price, description, images, colors, tryOnAvailable } =
    product;

  return (
    <div className="group relative w-full max-w-sm overflow-hidden rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
          New Arrival
        </span>

        <Button
          onClick={() => dispatch(toogleWishlist(product))}
          className=" cursor-pointer rounded-full p-2 transition-colors bg-white hover:bg-gray-100"
        >
          <Heart
            className={`h-6 w-6 transition-colors ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>

      <div className="relative flex h-48 items-center justify-center">
        <img
          src={images?.[0]}
          alt={name}
          className="  h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />

        {tryOnAvailable && (
          <Button
            onClick={() => navigate(`/product/${id}/tryon`)}
            className=" absolute bottom-2 flex items-center gap-2 rounded-full px-4 py-2 bg-black text-sm font-medium text-slate-900 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-slate-900 cursor-pointer"
          >
            <Sparkles size={16} />
            Virtual Try-On
          </Button>
        )}
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>

        <p className="text-sm font-medium text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black text-gray-900">₹{price}</span>

          <div className="flex gap-1">
            {colors?.map((c) => (
              <div
                key={c}
                className="h-3 w-3 rounded-full border border-gray-200"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>
      </div>

      <Button
        onClick={() => dispatch(addToCart(product))}
        className=" cursor-pointer mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 font-semibold text-white transition-all hover:bg-slate-800 active:scale-95"
      >
        <ShoppingCart size={18} />
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
