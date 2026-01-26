import { useDispatch } from "react-redux";
import Button from "../../components/ui/Button";
import { logout } from "../../firebase/firebaseAuth";
import { clearUser } from "../../store/userSlice";

function Logout() {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const respose = await logout();
      dispatch(clearUser());
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  return (
    <Button
      variant="none"
      size="none"
      onClick={handleLogout}
      className="px-6 py-2 rounded-xl bg-white border border-gray-200 text-slate-700 font-semibold hover:bg-gray-50 hover:text-red-600 transition-all active:scale-95 shadow-sm text-sm"
    >
      Logout
    </Button>
  );
}

export default Logout;
