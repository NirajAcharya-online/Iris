import { useState } from "react";
import {
  UserCircle,
  Package,
  Heart,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import AccountTab from "./AccountTab";
import SecurityTab from "./SecurityTab";
import OrdersTab from "./OrderTab";
import Button from "../ui/Button";

function Profile() {
  const [active, setActive] = useState("account");

  const tabs = [
    { id: "account", label: "Account Details", icon: <UserCircle size={20} /> },
    { id: "orders", label: "Order History", icon: <Package size={20} /> },
    { id: "security", label: "Security", icon: <ShieldCheck size={20} /> },
  ];

  return (
    <div className="min-h-full bg-[#F8F9FB] py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Settings
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your account preferences and track orders.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 flex-shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <Button
                  variant="none"
                  size="none"
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                    active === tab.id
                      ? "bg-white text-indigo-600 shadow-sm ring-1 ring-black/5 font-bold"
                      : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`${active === tab.id ? "text-indigo-600" : "text-gray-400 group-hover:text-gray-900"}`}
                    >
                      {tab.icon}
                    </span>
                    <span className="text-sm">{tab.label}</span>
                  </div>
                  {active === tab.id && <ChevronRight size={16} />}
                </Button>
              ))}
            </nav>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[500px] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/30">
                <h2 className="text-lg font-bold text-gray-800 capitalize">
                  {active.replace("-", " ")}
                </h2>
              </div>

              <div className="p-6">
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {active === "account" && <AccountTab />}
                  {active === "orders" && <OrdersTab />}
                  {active === "security" && <SecurityTab />}
                  {active === "saved" && (
                    <div className="text-center py-20 text-gray-400">
                      <Heart className="mx-auto mb-4 opacity-20" size={48} />
                      <p>You haven't saved any items yet.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Profile;
