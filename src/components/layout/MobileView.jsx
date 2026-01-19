import { Link } from "react-router-dom";

function MobileMenu({ open, onClose }) {
  if (!open) return null;

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
          <Link to="/cart" onClick={onClose}>
            Cart
          </Link>
        </nav>
      </div>
    </div>
  );
}

export default MobileMenu;
