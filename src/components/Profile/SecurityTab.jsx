import React from "react";
import { Lock, LogOut, Trash2, ShieldCheck } from "lucide-react";
import Button from "../../components/ui/Button";

function SecurityTab() {
  return (
    <div className=" max-h-full  space-y-10">
      <section>
        <div className="flex items-center gap-2 mb-4">
          <Lock className="text-indigo-600" size={20} />
          <h3 className="font-bold text-gray-900">Security Credentials</h3>
        </div>

        <div className="grid gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
              Current Password
            </label>
            <input
              type="password"
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
                placeholder="New password"
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className="w-full bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="pt-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-colors shadow-sm text-sm">
              Update Password
            </button>
          </div>
        </div>
      </section>

      <section className="pt-6 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => {}}
            variant="none"
            size="none"
            className="flex-1 flex items-center justify-center gap-2 bg-red-50 text-red-600 border border-red-100 px-4 py-3 rounded-xl font-semibold hover:bg-red-100 transition-colors text-sm"
          >
            <Trash2 size={18} />
            Delete Account
          </Button>
        </div>
        <p className="mt-4 text-[11px] text-gray-400 text-center">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </section>
    </div>
  );
}

export default SecurityTab;
