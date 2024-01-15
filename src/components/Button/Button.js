import React from "react";
import classNames from "classnames";

const Button = ({ children, type, onClick, dark }) => {
  return (
    <button
      onClick={onClick}
      className={classNames("px-[16px] py-[8px] rounded-[6px]", {
        "bg-black text-white": dark,
        border: !dark,
      })}
    >
      {children}
    </button>
  );
};

export default Button;
