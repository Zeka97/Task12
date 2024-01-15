import React from "react";

const Pocetna = () => {
  return (
    <div className="flex items-center h-[100vh] w-full flex-col">
      <div className="flex mx-10 md:mx-0 flex-col gap-4 items-center mt-[30%] md:mt-20">
        <h1 className="font-bold text-center px-4 py-2 bg-[#8BD039] text-white text-3xl md:text-6xl">
          WE ARE MONETIZEAD
        </h1>
        <h1 className="font-light text-center text-3xl md:text-6xl">
          Digital Martegint Agency of the Future!
        </h1>
      </div>
      <img
        src="./monetizecover.png"
        alt="logo"
        className="h-[500px] w-[100%] md:h-[500px] md:w-[50%] object-contain absolute bottom-0 bg-bottom object-bottom"
      />
    </div>
  );
};

export default Pocetna;
