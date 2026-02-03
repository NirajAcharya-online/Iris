import React from "react";
import { ShieldCheck, X, AlertCircle } from "lucide-react";
import Button from "./Button";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function PasswordUpdateCard({
  register,
  handleSubmit,
  watch,
  errors,
  reset,
  onUpdate,
  onClose,
}) {
  return (
    <form
      onSubmit={handleSubmit(onUpdate)}
      className="grid gap-4 bg-gray-50 p-6 rounded-2xl border border-indigo-100 animate-in fade-in slide-in-from-top-2 duration-300"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-bold text-indigo-900 flex items-center gap-2">
          <ShieldCheck size={16} /> Update Password
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>

      <div className="space-y-1">
        <label className="block text-[10px] font-bold text-gray-400 uppercase ml-1">
          Current Password
        </label>
        <input
          type="password"
          {...register("currentPassword", {
            required: "Current password is required",
          })}
          placeholder="••••••••"
          className={`w-full bg-white border ${errors.currentPassword ? "border-red-400" : "border-gray-200"} p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
        />
        {errors.currentPassword && (
          <p className="flex items-center gap-1 text-red-500 text-[10px] ml-1">
            <AlertCircle size={10} /> {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-400 uppercase ml-1">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", {
              required: "New password is required",
              pattern: {
                value: passwordRegex,
                message: "Min 8 chars, 1 uppercase, 1 number, 1 special char",
              },
            })}
            className={`w-full bg-white border ${errors.newPassword ? "border-red-400" : "border-gray-200"} p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
          />
          {errors.newPassword && (
            <p className="flex items-center gap-1 text-red-500 text-[10px] ml-1">
              <AlertCircle size={10} /> {errors.newPassword.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <label className="block text-[10px] font-bold text-gray-400 uppercase ml-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (val) =>
                val === watch("newPassword") || "Passwords do not match",
            })}
            className={`w-full bg-white border ${errors.confirmPassword ? "border-red-400" : "border-gray-200"} p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all`}
          />
          {errors.confirmPassword && (
            <p className="flex items-center gap-1 text-red-500 text-[10px] ml-1">
              <AlertCircle size={10} /> {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <Button
        type="submit"
        variant="none"
        size="none"
        className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold mt-2 hover:bg-indigo-700 transition-colors shadow-sm"
      >
        Update Security Credentials
      </Button>
    </form>
  );
}

export default PasswordUpdateCard;
