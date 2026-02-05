import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Lock, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import Button from "../../components/ui/Button";
import { deleteUserAuth, updateThePassword } from "../../firebase/firebaseAuth";
import { deleteUserDb } from "../../firebase/firebaseDB";
import PasswordUpdateCard from "../ui/PasswordUpdateCard";
import AccountDeleteCard from "../ui/AccountDeleteCard";
import notify from "../ui/Notify";
import Logout from "../authentication/Logout";

function SecurityTab() {
  const user = useSelector((state) => state.user.userDetails);
  const [activeView, setActiveView] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onUpdateSubmit = async (data) => {
    const response = await updateThePassword(
      data.currentPassword,
      data.newPassword,
    );
    if (response.success) {
      notify.success("Password Changed Successfully..!");
      setActiveView(null);
      reset();
    } else {
      notify.error("Error", "Unable to Change Password..!");
    }
  };

  const onDeleteSubmit = async (data) => {
    const response = await deleteUserDb(user);
    if (response.success) {
      const secondResponse = await deleteUserAuth(data.deletePassword);
      <Logout />;
      secondResponse.success && notify.success("SucessFully Deleted..!");
    } else {
      console.log(response.message);
      notify.error("Something went Wrong", `${response.message}`);
    }
  };

  const handleClose = () => {
    setActiveView(null);
    reset();
  };

  return (
    <div className="max-h-full space-y-6">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-indigo-600" size={20} />
          <h3 className="font-bold text-gray-900">Security Credentials</h3>
        </div>

        {activeView !== "update" ? (
          <div
            onClick={() => {
              setActiveView("update");
              reset();
            }}
            className="group cursor-pointer bg-white border border-gray-200 p-5 rounded-2xl hover:border-indigo-300 hover:shadow-md transition-all flex justify-between items-center"
          >
            <div>
              <p className="font-semibold text-gray-800">Change Password</p>
              <p className="text-xs text-gray-500">
                Update your login credentials regularly.
              </p>
            </div>
            <div className="bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              Edit
            </div>
          </div>
        ) : (
          <PasswordUpdateCard
            register={register}
            handleSubmit={handleSubmit}
            watch={watch}
            errors={errors}
            reset={reset}
            onUpdate={onUpdateSubmit}
            onClose={handleClose}
          />
        )}
      </section>

      <section className="pt-6 border-t border-gray-100">
        {activeView !== "delete" ? (
          <Button
            type="button"
            onClick={() => {
              setActiveView("delete");
              reset();
            }}
            variant="none"
            size="none"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors text-sm"
          >
            <Trash2 size={18} />
            Delete Account
          </Button>
        ) : (
          <AccountDeleteCard
            register={register}
            handleSubmit={handleSubmit}
            errors={errors}
            onDelete={onDeleteSubmit}
            onClose={handleClose}
          />
        )}
      </section>
    </div>
  );
}

export default SecurityTab;
