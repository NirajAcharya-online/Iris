import React from "react";
import { useForm } from "react-hook-form";
import { Lock, Trash2 } from "lucide-react";
import Button from "../../components/ui/Button";
import { deleteUserAuth, updateThePassword } from "../../firebase/firebaseAuth";
import { deleteUser } from "../../firebase/firebaseDB";
import { useSelector } from "react-redux";

function SecurityTab() {
  const user = useSelector((state) => state.user.userDetails);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const oldPassword = data.currentPassword;
    const newPassword = data.newPassword;
    const respose = await updateThePassword(oldPassword, newPassword);
    console.log(respose);
  };
  const deleteAccount = async () => {
    console.log("entereed");
    const response = await deleteUserAuth();
    console.log(response);

    if (response.success) {
      await deleteUser(user);
    }
  };

  return (
    <div className="max-h-full space-y-10">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-indigo-600" size={20} />
          <h3 className="font-bold text-gray-900">Security Credentials</h3>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100"
        >
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Current Password
            </label>
            <input
              type="password"
              {...register("currentPassword", { required: "Required" })}
              placeholder="••••••••"
              className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                New Password
              </label>
              <input
                type="password"
                {...register("newPassword", {
                  required: "Required",
                  minLength: { value: 6, message: "Min 6 characters" },
                })}
                placeholder="New password"
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              {errors.newPassword && (
                <span className="text-red-500 text-[10px] ml-1">
                  {errors.newPassword.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Required",
                  validate: (value) =>
                    value === watch("newPassword") || "Passwords do not match",
                })}
                placeholder="Confirm password"
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-[10px] ml-1">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="none"
              size="none"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm"
            >
              Update Password
            </Button>
          </div>
        </form>
      </section>

      <section className="pt-6 border-t border-gray-100">
        <Button
          onClick={() => {
            deleteAccount();
          }}
          variant="none"
          size="none"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors text-sm"
        >
          <Trash2 size={18} />
          Delete Account
        </Button>
      </section>
    </div>
  );
}

export default SecurityTab;
