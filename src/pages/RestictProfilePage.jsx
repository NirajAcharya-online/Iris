import React from "react";
import {
  User,
  Package,
  Settings,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const ProfileRestricted = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
        {/* Icon Header */}
        <div className="mb-8 relative inline-block">
          <div className="w-20 h-20 bg-blue-50 rounded-3xl flex items-center justify-center border border-blue-100 rotate-3">
            <User className="w-10 h-10 text-blue-600" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-lg shadow-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-3">Your Account</h2>
        <p className="text-slate-500 mb-10">
          Log in to view your order history, manage shipping addresses, and
          update your profile settings.
        </p>

        {/* Directional Cue */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-600 text-white font-medium text-sm shadow-lg shadow-blue-100">
            <span>Login via Navigation Bar</span>
            <ArrowUpRight className="w-4 h-4 animate-pulse" />
          </div>
        </div>

        {/* Feature Preview */}
        <div className="mt-12 pt-8 border-t border-slate-50 flex justify-center gap-10 opacity-30">
          <div className="flex flex-col items-center gap-1">
            <Package className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Orders
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <Settings className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">
              Settings
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileRestricted;
