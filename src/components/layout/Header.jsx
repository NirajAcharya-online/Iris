import { Link, NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { CiShoppingCart } from "react-icons/ci";
import { CgProfile } from "react-icons/cg";

function Header({ onMenu }) {
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
            Sunglasses
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive ? "text-blue-400 font-bold " : "text-gray-600"
            }
            to="/cart"
          >
            Cart
          </NavLink>
        </nav>
        <div className="hidden  md:flex gap-10 ">
          <Link to={"/cart"}>
            <CiShoppingCart size={24} />
          </Link>
          <Link>
            <CgProfile size={24} />
          </Link>
        </div>
        <div className="md:hidden flex gap-10">
          <Link to={"/cart"} className="cursor-pointer">
            <CiShoppingCart size={24} />
          </Link>
          <Link to={"/profile"} className="cursor-pointer">
            <CgProfile size={24} />
          </Link>
          <button onClick={onMenu} className="cursor-pointer">
            <FiMenu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
