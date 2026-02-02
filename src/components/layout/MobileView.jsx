import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { MdArrowForwardIos } from "react-icons/md";
import { openLogin } from "../../store/cardStatus";
import { useDispatch } from "react-redux";
import Logout from "../authentication/Logout";

function MobileMenu({ open, onClose, user }) {
  if (!open) return null;
  const dispatch = useDispatch();
  return (
    <div className="fixed inset-0 bg-black/40 z-50">
      <div className="bg-white rounded-xl w-64 h-full p-6 shadow-gray-300 shadow-2xl ">
        <button
          onClick={onClose}
          className=" cursor-pointer font-sans mb-6 font-bold bg-blue-400 rounded-xl px-4 py-2 shadow-2xl"
        >
          Close
        </button>

        <nav className="flex flex-col gap-4 text-red-600 font-serif ">
          <Link to="/" onClick={onClose}>
            Home
          </Link>
          <Link to="/products" onClick={onClose}>
            Shop
          </Link>
          <Link to="/wishlist" onClick={onClose}>
            Wishlist
          </Link>
          {user ? (
            <Logout />
          ) : (
            <Button
              onClick={() => {
                dispatch(openLogin());
              }}
              variant="outline"
              size="md"
              className="bg-indigo-600 hover:bg-indigo-700 active:scale-95  font-medium py-1 px-3 rounded-lg shadow-lg transition-all duration-200 ease-in-out flex gap-1"
            >
              Login <MdArrowForwardIos size={12} />
            </Button>
          )}
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
