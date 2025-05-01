"use client";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { useState } from "react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const { toggleSidebar } = useSidebar();

  return (
    <nav className="w-full bg-white top-0 left-0 right-0 z-10 shadow px-8 py-4 sticky">
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <button className="text-xl md:text-2xl lg:text4xl font-medium uppercase">
              A<sub>9</sub> Blogs
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-10">
          <Link href={"/"}>
            <button className="text-gray-500 text-xl hover:text-black hidden md:block">
              Home
            </button>
          </Link>

          <button className="text-gray-500 text-xl hover:text-black hidden md:block">
            Blogs
          </button>

          <Link href={"/dashboard/blog/add"}>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-black">
              <FiEdit className="h-6 w-6" />
              <span className="text-xl">Write</span>
            </button>
          </Link>

          {/* Search Input */}
          <div className="border-2 border-transparent relative flex items-center bg-gray-100 pl-4 rounded-full">
            <button>
              <HiMiniMagnifyingGlass className="h-7 w-7" />
            </button>
            <input
              type="text"
              placeholder="Search"
              className="max-w-20 md:max-w-40 lg:max-w-60 py-2.5 px-4 bg-inherit rounded-full outline-none placeholder-gray-500 text-lg"
            />
          </div>

          {/* If Logged In */}
          {isLoggedIn ? (
            <div className="relative h-12 w-12 flex items-center justify-center">
              <button onClick={toggleSidebar}>
                <img
                  src="/avatar.jpg"
                  alt="profile"
                  className="h-full w-full border rounded-md aspect-square object-cover object-top"
                />
              </button>
            </div>
          ) : (
            <button className="flex items-center space-x-2 cursor-pointer">
              <FaRegUser className="h-5 w-5" />
              <span className="text-gray-700">SignUp / SignIn</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
