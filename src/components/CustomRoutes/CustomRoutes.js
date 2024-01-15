import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../pages/Login/Login";
import UserPrivateRoute from "../UserPrivateRoute/UserPrivateRoute";
import Products from "../../pages/Home/Products";
import Pocetna from "../../pages/Pocetna/Pocetna";
import Signup from "../../pages/Signup/Signup";

const CustomRoutes = () => {
  const user = useSelector((state) => state.auth);

  return (
    <>
      <Routes>
        <Route path="/" element={<UserPrivateRoute />}>
          <Route path="/" element={<Products />} />
        </Route>
        <Route path="/pocetna" element={<UserPrivateRoute />}>
          <Route path="/pocetna" element={<Pocetna />} />
        </Route>
        <Route
          path="/register"
          element={user.currentUser ? <Navigate to="/" /> : <Signup />}
        />
        <Route
          path="/login"
          element={user.currentUser ? <Navigate to="/" /> : <Login />}
        />
        <Route path="*" element={<div>ERROR 404 Page not Found</div>} />
      </Routes>
    </>
  );
};

export default CustomRoutes;
