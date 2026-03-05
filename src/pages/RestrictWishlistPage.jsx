import React from "react";
import {
  Heart,
  ShoppingCart,
  Star,
  ArrowUpRight,
  Lock,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import { openLogin } from "../store/cardStatus";

const WishlistRestricted = () => {
  const dispatch = useDispatch();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8 relative inline-block">
          <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center border border-pink-100">
            <Heart className="w-10 h-10 text-pink-500 fill-pink-50" />
          </div>
          <div className="absolute top-0 right-0 bg-white p-1.5 rounded-full shadow-sm border border-slate-100">
            <Lock className="w-4 h-4 text-slate-400" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Save Your Favorites
        </h2>
        <p className="text-slate-500 mb-10">
          Don't lose your favorite finds! Log in to save items to your wishlist
          and sync them across all your devices.
        </p>

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="none"
            size="none"
            onClick={() => {
              dispatch(openLogin());
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Log In to Access Wishlist
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-50 flex justify-center gap-10 opacity-30">
          <div className="flex flex-col items-center gap-1">
            <ShoppingCart className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Save
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Star className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Track
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistRestricted;
