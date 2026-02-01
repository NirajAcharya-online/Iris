import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Edit3, X, Save } from "lucide-react";
import { useSelector } from "react-redux";
import Button from "../ui/Button";

function AccountTab() {
  const [isEditing, setIsEditing] = useState(false);
  const userData = useSelector((state) => state.user.userDetails);
  console.log(userData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: userData,
  });

  const getInitials = (name) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "??"
    );
  };

  const onSubmit = (data) => {
    setIsEditing(false);
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl">
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-10 pb-8 border-b border-gray-100">
        <div className="w-20 h-20 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-200 ring-4 ring-white">
          {getInitials(userData.username)}
        </div>

        <div className="text-center sm:text-left flex-1">
          <h3 className="text-xl font-bold text-gray-900">
            {userData.username}
          </h3>
          <p className="text-sm text-gray-500">{userData.email}</p>
        </div>

        {!isEditing && (
          <Button
            variant="none"
            size="none"
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            <Edit3 size={16} />
            Edit Profile
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              UserName
            </label>
            <div className="relative">
              <User
                className={`absolute left-3 top-1/2 -translate-y-1/2 transition-colors ${isEditing ? "text-indigo-500" : "text-gray-400"}`}
                size={18}
              />
              <input
                {...register("name", {
                  required: "Name is required",
                  minLength: { value: 3, message: "Name too short" },
                })}
                disabled={!isEditing}
                className={`w-full pl-10 pr-4 py-3 border rounded-xl outline-none transition-all ${
                  !isEditing
                    ? "bg-gray-50 border-transparent text-gray-500 cursor-not-allowed"
                    : "bg-white border-gray-200 focus:ring-2 focus:ring-indigo-500 text-gray-900 shadow-sm"
                }`}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                disabled
                value={userData.email}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border-transparent rounded-xl text-gray-400 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center justify-end gap-3 pt-4 animate-in fade-in slide-in-from-top-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 text-sm font-bold text-gray-500 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isDirty}
              className="flex items-center gap-2 bg-black text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-gray-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-black/10"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default AccountTab;
