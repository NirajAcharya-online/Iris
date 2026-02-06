import { NavLink, Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="flex min-h-screen">
      <aside className="w-[220px] bg-[#111] text-white p-5">
        <h3 className="text-xl font-bold mb-4">Admin</h3>
        <NavLink to="products" className="block mb-2">
          Products
        </NavLink>
        <NavLink to="orders" className="block mb-2">
          Orders
        </NavLink>
        <NavLink to="users" className="block">
          Users
        </NavLink>
      </aside>

      <main className="flex-1 p-[30px]">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
