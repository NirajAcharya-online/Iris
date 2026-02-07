import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { openLogin } from "../../store/cardStatus";

const AdminGuard = ({ children }) => {
  const { userDetails, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading && !userDetails) {
      dispatch(openLogin());
    }
  }, [loading, userDetails, dispatch]);

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-10">
        <div className="w-full max-w-md">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-red-600">
              Verifying Permissions
            </span>
            <span className="text-xs text-red-400 font-medium">
              Checking Admin Access...
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-red-100">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-red-400 via-red-600 to-red-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    return <Navigate to="/" replace />;
  }

  if (userDetails.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminGuard;
