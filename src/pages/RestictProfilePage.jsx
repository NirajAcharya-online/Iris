import React from "react";
import {
  User,
  Package,
  Settings,
  ArrowUpRight,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import Button from "../components/ui/Button";
import { useDispatch } from "react-redux";
import { openLogin } from "../store/cardStatus";

const ProfileRestricted = () => {
  const dispatch = useDispatch();
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
      <div className="max-w-md w-full text-center">
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

        <div className="flex flex-col items-center gap-2">
          <Button
            variant="none"
            size="none"
            onClick={() => {
              dispatch(openLogin());
            }}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Log In
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

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
