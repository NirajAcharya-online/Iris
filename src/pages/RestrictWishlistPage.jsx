import React from "react";
import { Heart, ShoppingCart, Star, ArrowUpRight, Lock } from "lucide-react";

const WishlistRestricted = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon Header */}
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

        {/* Directional Cue */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-blue-600 transition-colors">
            <span>Sign in to view Wishlist</span>
            <ArrowUpRight className="w-4 h-4" />
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Check the top right of your screen
          </p>
        </div>

        {/* Feature Preview */}
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
