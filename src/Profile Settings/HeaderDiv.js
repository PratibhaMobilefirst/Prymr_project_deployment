import React from "react";
import left_arrow from "../assets/images/left_arrow.svg";
import Feather from "../assets/images/Feather Icon.svg";
import Play from "../assets/images/Play.svg";

const HeaderDiv = () => {
  return (
    <div className="w-full h-auto flex justify-between px-5 py-5 bg-black fixed top-0 z-10">
      <div className="flex items-center">
        <img className="w-[31px] h-[31px]" src={left_arrow} alt="back" />
        <div className="text-white text-[11px] font-bold capitalize tracking-tight ml-2">
          Back
        </div>
      </div>
      <div className="w-[72px] h-[35px] px-[5px] py-1 bg-stone-800 bg-opacity-50 rounded-xl justify-center items-center gap-0.5 inline-flex">
        <div className="w-6 h-6 justify-center items-center flex">
          <div className="w-6 h-6 relative">
            <img src={Feather} alt="Feather" />
          </div>
        </div>
        <div className="w-[25px] text-center text-white text-base font-bold leading-[17.76px]">
          1/1
        </div>
      </div>
      <div className="w-[84px] h-[35px] pl-[13px] pr-[9px] py-1.5 bg-sky-500 rounded-[55px] justify-center items-center gap-0.5 inline-flex">
        <div className="text-white text-[11px] font-bold capitalize tracking-tight">
          Demo
        </div>
        <div className="w-[26px] h-[26px] justify-center items-center flex">
          <div className="w-[26px] h-[26px] relative">
            <img src={Play} alt="Play" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderDiv;
