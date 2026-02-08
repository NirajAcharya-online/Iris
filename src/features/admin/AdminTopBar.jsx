import { useSelector } from "react-redux";

function AdminTopbar() {
  const user = useSelector((state) => state.user.userDetails);

  return (
    <div className="h-14 bg-white shadow flex items-center justify-between px-6">
      <h1 className="font-semibold">Eyewear Admin</h1>
      <span className="text-sm">{user?.email}</span>
    </div>
  );
}

export default AdminTopbar;
