import React, { useState } from "react";
import HHImage from "./HHImage";
import { Link } from "react-router-dom";
import LoginComponent from "./LoginComponent";

import { useSelector } from "react-redux";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const userInfo = useSelector((state: any) => state.user.userInfo);
  
  return (
    <div className="w-full h-16 flex items-center justify-between px-4 mt-1 sm:px-6 md:px-8 rounded-2xl bg-white shadow-sm">
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center gap-2 md:gap-4 text-lg md:text-2xl font-bold"
      >
        <HHImage
          src="/logo.png"
          alt="logo 图片"
          width={32}
          height={32}
          className="rounded-lg"
        />
        <span className="hidden md:inline">你好啊李银河</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        {/* mobile button */}
        <div
          className="cursor-pointer text-2xl  "
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "✕" : "☰"}
        </div>

        {/* mobile link list */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center gap-8 font-medium text-lg  absolute top-16 transition-all ease-in-out  bg-[#e6e6ff] ${
            open ? "-right-0" : "-right-[100%]"
          }`}
        >
          <Link to="/" onClick={() => setOpen(false)}>
            主页
          </Link>
          <Link to="/popular" onClick={() => setOpen(false)}>
            热门
          </Link>
          <Link to="/trending" onClick={() => setOpen(false)}>
            趋势
          </Link>
          <Link to="/about" onClick={() => setOpen(false)}>
            关于
          </Link>
          <LoginComponent user={userInfo} />
        </div>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
        <Link to="/" className="hover:text-blue-600 transition">
          主页
        </Link>
        <Link to="/popular" className="hover:text-blue-600 transition">
          热门
        </Link>
        <Link to="/trending" className="hover:text-blue-600 transition">
          趋势
        </Link>
        <Link to="/about" className="hover:text-blue-600 transition">
          关于
        </Link>
        <LoginComponent user={userInfo} />
      </div>
    </div>
  );
};

export default Navbar;
