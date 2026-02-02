import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { toogleLogin } from "../../store/cardStatus";

const ProtectedUser = ({ children }) => {
  const { userDetails, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-white px-10">
        <div className="w-full max-w-md">
          <div className="mb-3 flex justify-between items-center">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
              Authenticating
            </span>
            <span className="text-xs text-indigo-400 font-medium">
              Please wait...
            </span>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-indigo-100">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-indigo-400 via-indigo-600 to-indigo-400"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!userDetails) {
    dispatch(toogleLogin());
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUser;
