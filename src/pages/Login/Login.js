import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/user.action";
import { login } from "../../api";
import { useMutation } from "react-query";

import { isExpired, decodeToken } from "react-jwt";

const Login = () => {
  const [user, setUser] = useState({ username: null, password: null });
  const dispatch = useDispatch();

  const { mutate } = useMutation((params) => login(params));

  const onSubmit = (e) => {
    e.preventDefault();
    mutate(
      { username: user.username, password: user.password },
      {
        onSuccess: (data) => {
          const decodedToken = decodeToken(data.jwt);
          console.log(decodedToken);
          dispatch(userLogin(decodedToken));
          localStorage.setItem(
            "user",
            JSON.stringify({
              currentUser: data.jwt,
              isLogged: true,
            })
          );
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const handleUsernameChange = (username) => {
    setUser((prevState) => {
      return {
        ...prevState,
        username: username,
      };
    });
  };

  const handlePasswordChange = (password) => {
    setUser((prevState) => {
      return {
        ...prevState,
        password: password,
      };
    });
  };

  return (
    <div className="flex justify-center items-center h-full">
      <form
        className="flex flex-col border rounded-[8px] px-[60px] py-[60px] gap-[32px]"
        onSubmit={onSubmit}
      >
        <div className="flex flex-col gap-[8px] w-[377px]">
          <h3 className="font-bold">Log In</h3>
          <span className="text-gray">
            Type your username and password to log in.
          </span>
        </div>
        <div className="flex flex-col ml-[8px] gap-[16px]">
          <Input
            label={"Username"}
            name={"username"}
            onChange={handleUsernameChange}
          />
          <Input
            label={"Password"}
            type={"password"}
            name={"password"}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit" dark>
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
