"use client";

import { useCallback } from "react";
import toast from "react-hot-toast";
import { FiSearch, FiFeather, FiClock } from "react-icons/fi";

function TopNav() {
  const justUi = useCallback(() => {
    toast.success("Just showing ui only");
  }, []);

  return (
    <div className="fixed top-0 left-0 h-[40px] bg-[#420d42] w-full flex flex-row items-center text-white px-[20px]">
      <div className="md:w-[370px] flex justify-end px-[10px]">
        <button type="button" onClick={justUi}>
          <FiClock size={16} />
        </button>
      </div>
      <button
        type="button"
        className="bg-white/20 h-[28px] w-[40%] rounded-[8px] flex items-center px-[10px] ml-[0px] md:ml-0"
        onClick={justUi}
      >
        <FiSearch size={16} className="inline-block mr-2" />
        <span className="text-sm">Search on workspace</span>
      </button>
      <button type="button" className="absolute right-[10px]" onClick={justUi}>
        <FiFeather size={16} />
      </button>
    </div>
  );
}
export default TopNav;
