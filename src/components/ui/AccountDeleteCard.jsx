import React from "react";
import { X, AlertCircle } from "lucide-react";
import Button from "./Button";

function AccountDeleteCard({
  register,
  handleSubmit,
  errors,
  onDelete,
  onClose,
}) {
  return (
    <div className="bg-red-50 border border-red-200 p-6 rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-red-800 font-bold">Confirm Account Deletion</h4>
          <p className="text-red-600 text-xs mt-1 leading-relaxed">
            Enter your password to permanently remove your account and all
            associated data.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="text-red-400 hover:text-red-600"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit(onDelete)} className="space-y-4">
        <div className="space-y-1">
          <input
            type="password"
            {...register("deletePassword", {
              required: "Password required for verification",
            })}
            placeholder="Enter your password"
            className={`w-full bg-white border ${errors.deletePassword ? "border-red-400" : "border-red-200"} p-3 rounded-xl focus:ring-2 focus:ring-red-500 outline-none transition-all`}
          />
          {errors.deletePassword && (
            <p className="flex items-center gap-1 text-red-500 text-[10px] ml-1">
              <AlertCircle size={10} /> {errors.deletePassword.message}
            </p>
          )}
        </div>
        <Button
          type="submit"
          variant="none"
          size="none"
          className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition-all shadow-md"
        >
          Permanently Delete Account
        </Button>
      </form>
    </div>
  );
}

export default AccountDeleteCard;
