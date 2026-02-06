import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetailsPage";
import Profile from "./components/Profile/Profile";
import TryOn from "./pages/TryOn";
import Wishlist from "./pages/Wishlist";
import ProtectedCheckout from "./features/Protector/ProtectedCheckout";
import Success from "./pages/Sucess";
import ProtectedSuccess from "./features/Protector/ProtectSucess";
import NotFound from "./pages/NotFoundPage";
import useAuth from "./hook/AuthStatus";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSavedItems } from "./store/wishlistSlice";
import { fetchCartItems } from "./store/cartSlice";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ShopPage from "./pages/ShopPage";
import OrderPage from "./pages/OrderPage";
import { fetchOrders } from "./store/orderSlice";
import ProtectedUser from "./features/Protector/ProtectedUser";
import { ToastContainer } from "react-toastify";
import AdminRoute from "./features/Protector/AdminGuard";
import AdminLayout from "./features/admin/AdminLayout";
import ProductsAdmin from "./features/admin/ProductAdmin";

function App() {
  useAuth();

  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(fetchCartItems(user));
      dispatch(fetchSavedItems(user));
      dispatch(fetchOrders(user));
    }
  }, [user, dispatch]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* ADMIN ROUTES - Protected by AdminRoute and using AdminLayout */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="products" element={<ProductsAdmin />} />
          {/* Add more admin sub-routes here as needed */}
        </Route>

        {/* USER & PUBLIC ROUTES - Using MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ShopPage />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          <Route
            path="/profile"
            element={
              <ProtectedUser>
                <Profile />
              </ProtectedUser>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedCheckout>
                <CheckoutPage />
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

          <Route
            path="/cart"
            element={
              <ProtectedUser>
                <CartPage />
              </ProtectedUser>
            }
          />

          <Route
            path="/profile/orders/:id"
            element={
              <ProtectedUser>
                <OrderPage />
              </ProtectedUser>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
