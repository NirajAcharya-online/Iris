import React from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleSaved } from "../../firebase/firebaseDB";
import { toogleSavedLocal } from "../../store/wishlistSlice";

const ProductCard = ({ product }) => {
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlist.some((i) => i.id === product.id);
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.user.userDetails);
  const navigate = useNavigate();
  const handleWishlist = async (e) => {
    e.stopPropagation();
    const response = await toggleSaved(userDetails, product);
    dispatch(toogleSavedLocal(product));
  };
  const {
    id,
    name,
    price,
    description,
    images,
    colors,
    rating = 4.5,
  } = product;

  return (
    <div
      onClick={() => navigate(`/product/${id}`)}
      className="group relative w-full max-w-sm cursor-pointer overflow-hidden rounded-2xl bg-white p-4 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
          New Arrival
        </span>

        <Button
          onClick={(e) => {
            handleWishlist(e);
          }}
          className="rounded-full p-1 bg-white hover:bg-gray-100"
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
            }`}
          />
        </Button>
      </div>

      <div className="relative flex h-48 items-center justify-center">
        <img
          src={images?.[0]}
          alt={name}
          className="h-full w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="mt-4 space-y-1">
        <h3 className="text-lg font-bold text-gray-900">{name}</h3>

        <p className="text-sm font-medium text-gray-500 line-clamp-2">
          {description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-black text-gray-900">${price}</span>

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

        <div className="mt-2 flex items-center gap-1">
          <Rating style={{ maxWidth: 80 }} value={rating} readOnly />
          <span className="ml-2 text-sm font-medium text-gray-500">
            {rating}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
