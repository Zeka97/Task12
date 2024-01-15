import React from "react";

import { useSelector } from "react-redux";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  const user = useSelector((state) => state.auth);

  console.log(user);

  return (
    <div className="h-screen">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
