import { NavLink } from "react-router-dom";

function AdminSidebar() {
  const linkClass = "block px-4 py-2 rounded hover:bg-black hover:text-white";

  return (
    <aside className="w-64 bg-white shadow-md p-4">
      <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        <NavLink to="/admin" end className={linkClass}>
          Dashboard
        </NavLink>

        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>

        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>

        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
        <NavLink to="/" className={linkClass}>
          Shop
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
