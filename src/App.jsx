import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";
import TryOn from "./pages/TryOn";
import Wishlist from "./pages/Wishlist";
import ProtectedCheckout from "./features/Protector/ProtectedCheckout";
import Success from "./pages/Sucess";
import ProtectedSuccess from "./features/Protector/ProtectSucess";
import NotFound from "./pages/NotFoundPage";
import Signup from "./components/authentication/Signup";
import Login from "./components/authentication/Login";
import useAuth from "./hook/AuthStatus";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedItems } from "./store/wishlistSlice";
import { fetchCartItems } from "./store/cartSlice";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopPage from "./pages/ShopPage";
import OrderPage from "./pages/OrderPage";
function App() {
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user));
      dispatch(fetchSavedItems(user));
    }
  }, [user]);
  return (
    <>
      {useAuth()}
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/checkout"
            element={
              <ProtectedCheckout>
                <CheckoutPage />/
              </ProtectedCheckout>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedSuccess>
                <Success />
              </ProtectedSuccess>
            }
          />
          <Route path="/product/:id/tryon" element={<TryOn />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/orders" element={<OrderPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
