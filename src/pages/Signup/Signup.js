import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../redux/actions/user.action";
import { login, signup } from "../../api";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [user, setUser] = useState({
    username: null,
    password: null,
    repeatPassword: null,
    subscribeToNewsLetter: false,
    gender: null,
    status: null,
    yearOfBirth: null,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { mutate } = useMutation((params) => signup(params));

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.repeatPassword)
      alert("Password doesnt match repeat password");
    else {
      console.log(user);
      mutate(user, {
        onSuccess: (data) => {
          alert("succesfully registered");
          return navigate("/login");
        },
        onError: (error) => {
          console.log(error);
          setError(error.response?.data?.message);
        },
      });
    }
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
  const handleRepeatPasswordChange = (password) => {
    setUser((prevState) => {
      return {
        ...prevState,
        repeatPassword: password,
      };
    });
  };
  const handleSubscribeChange = (value) => {
    setUser((prevState) => {
      return {
        ...prevState,
        subscribeToNewsLetter: !prevState.subscribeToNewsLetter,
      };
    });
  };

  const handleBirthChange = (value) => {
    setUser((prevState) => {
      return {
        ...prevState,
        yearOfBirth: parseInt(value),
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
          <h3 className="font-bold">Registration</h3>
          <span className="text-gray">
            Fill all necessary data to make an account!
          </span>
        </div>
        <div className="flex flex-col ml-[8px] gap-[16px]">
          <Input
            label={"Username"}
            name={"username"}
            onChange={handleUsernameChange}
            minLength="3"
            maxLength="20"
            required
          />
          <Input
            label={"Password"}
            type={"password"}
            name={"password"}
            onChange={handlePasswordChange}
            minLength="6"
            maxLength="20"
            required
          />
          <Input
            label={"Repeat password"}
            type={"password"}
            name={"repeatPassword"}
            onChange={handleRepeatPasswordChange}
            minLength="6"
            maxLength="20"
            required
          />
          <div className="flex items-center gap-2">
            <Input
              label="Subscribe newsletter"
              type="checkbox"
              name="subscribe"
              value="true"
              onChange={handleSubscribeChange}
            />
            <span>By checking u will subscribe</span>
          </div>
          <div className="flex">
            <h3>Gender</h3>
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={(e) =>
                setUser((prevState) => {
                  return { ...prevState, gender: "male" };
                })
              }
              required
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) =>
                setUser((prevState) => {
                  return { ...prevState, gender: "female" };
                })
              }
            />
            <label>Female</label>
            <input
              type="radio"
              name="gender"
              value="other"
              onChange={(e) =>
                setUser((prevState) => {
                  return { ...prevState, gender: "other" };
                })
              }
            />
            <label>Other</label>
          </div>
          <div className="flex">
            <label>Status</label>

            <select
              name="status"
              onChange={(e) =>
                setUser((prevState) => {
                  return { ...prevState, status: e.target.value };
                })
              }
              required
            >
              <option value="" hidden>
                Select an option
              </option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <Input
          label="Year of birth"
          name="birth"
          type="number"
          onChange={handleBirthChange}
          min="1900"
          max="2024"
          required
        />
        {error && <span>{error}</span>}
        <div className="flex justify-end">
          <Button type="submit" dark>
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
