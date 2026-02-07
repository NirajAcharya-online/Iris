import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import { MdArrowForwardIos } from "react-icons/md";
import { openLogin } from "../../store/cardStatus";
import Logout from "../authentication/Logout";

function Header({ onMenu }) {
  const { userDetails, loading } = useSelector((state) => state.user);

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  if (!loading) {
    return (
      <header className="w-full border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between  ">
          <Link to="/" className="font-bold text-xl text-blue-400  ">
            Iris
          </Link>

          <nav className="hidden md:flex gap-6 font-inter text-xs ">
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-bold " : "text-gray-600"
              }
              to="/products"
            >
              Shop
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-blue-400 font-bold " : "text-gray-600"
              }
              to="/wishlist"
            >
              Wishlist
            </NavLink>
          </nav>
          <div className="hidden md:flex md:items-center gap-10 ">
            {userDetails ? (
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

            {userDetails.role === "user" && (
              <Link to={"/cart"} className="cursor-pointer flex ">
                <CiShoppingCart size={24} />
                Cart
              </Link>
            )}
            <Link to={"/profile"} className="cursor-pointer flex">
              <CgProfile size={24} />
              Profile
            </Link>
          </div>
          <div className="md:hidden flex gap-10">
            {userDetails.role === "user" && (
              <Link to={"/cart"} className="cursor-pointer flex ">
                <CiShoppingCart size={24} />
                Cart
              </Link>
            )}
            <Link to={"/profile"} className="cursor-pointer flex ">
              <CgProfile size={24} />
              Profile
            </Link>
            <button onClick={onMenu} className="cursor-pointer">
              <FiMenu size={24} />
            </button>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
