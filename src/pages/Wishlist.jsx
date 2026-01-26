import React from "react";
import { Trash2 } from "lucide-react";
import Button from "../components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Wishlist() {
  const savedItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  if (savedItems.length === 0) {
    return (
      <div className="min-h-full bg-gray-50 px-4 py-6">
        <div className="text-center py-20">
          <p className="text-lg font-semibold">Your wishlist is empty</p>
          <p className="text-sm text-gray-500 mt-2">
            Save frames you like and find them here later.
          </p>
          <Button
            variant={"secondary"}
            className="cursor-pointer mt-5"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-full bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {savedItems?.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-3 group"
            >
              <div className="relative">
                <img
                  src={`${item.images[0]}`}
                  alt={`${item.name}_imagess`}
                  className="w-full h-36 object-contain"
                />
              </div>

              <div className="mt-3 space-y-1">
                <h3 className="text-sm font-semibold">{item.name}</h3>
                <p className="text-xs text-gray-500">
                  {item.brand}· {item.category}
                </p>
                <p className="font-bold text-sm">${item.price}</p>
              </div>

              <div className="mt-3 flex gap-2">
                <Button
                  onClick={() => {
                    navigate(`/product/${item.id}`);
                  }}
                  className="cursor-pointer w-full text-xs py-2"
                >
                  View
                </Button>
                <Button
                  onClick={() => {
                    dispatch(toogleWishlist(item));
                  }}
                  variant="danger"
                  className="cursor-pointer px-3"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wishlist;
