import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { toogleLogin } from "../../store/cardStatus";
import { firebaseAuth } from "../../firebase/firebaseSetup";
import { onAuthStateChanged } from "firebase/auth";
import useAuth from "../../hook/AuthStatus";

const ProtectedUser = ({ children }) => {
  useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    dispatch(toogleLogin());
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedUser;
