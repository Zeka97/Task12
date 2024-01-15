import React from "react";
import Button from "../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../../redux/actions/user.action";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const state = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const Logout = () => {
    localStorage.removeItem("user");
    dispatch(LOGOUT());
    window.location.reload();
  };
  return (
    <div className="py-4 flex justify-between items-center px-12 border-b w-full">
      <Button>Pocetna</Button>
      <img src="./monetizelogo.png" alt="logo" className="h-[20px] w-[140px]" />
      {!state.currentUser ? (
        <Button dark onClick={() => navigate("/login")}>
          Login
        </Button>
      ) : (
        <div className="flex gap-4">
          <div className="flex flex-col">
            <span>Dobrodosao,{state.currentUser.username}</span>
            <span>{state.currentUser.id}</span>
          </div>
          <Button dark onClick={Logout}>
            Log out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
