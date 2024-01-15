import React from "react";

const Input = ({ label, onChange, ...props }) => {
  return (
    <div className="flex gap-[16px] items-center">
      {label && <label className="w-[82px] font-bold">{label}</label>}
      <input
        className="flex grow border px-[12px] py-[8px] rounded-[8px]"
        onChange={(e) => onChange(e.target.value)}
        {...props}
      />
    </div>
  );
};

export default Input;
