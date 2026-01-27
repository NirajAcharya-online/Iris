import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetailsPage";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import TryOn from "./pages/TryOn";
import Cart from "./pages/Cart";
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
function App() {
  const user = useSelector((state) => state.user.userDetails);
  console.log(user);

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
          <Route path="/products" element={<Shop />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/checkout"
            element={
              <ProtectedCheckout>
                <Checkout />
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
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
