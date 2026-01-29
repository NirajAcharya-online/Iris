import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { toogleLogin } from "../../store/cardStatus";

const ProtectedUser = ({ children }) => {
  const cardStatus = useSelector((state) => state.cardStatus.cardStatus);
  const user = useSelector((state) => state.user.userDetails);
  const dispatch = useDispatch();
  if (!user) {
    dispatch(toogleLogin());
  }

  return children;
};

export default ProtectedUser;
