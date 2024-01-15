import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const UserPrivateRoute = () => {
  const user = useSelector((state) => state.auth);

  return !user.currentUser ? <Navigate to="/login" /> : <Outlet />;
};

export default UserPrivateRoute;
