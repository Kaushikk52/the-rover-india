"use client";

import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { FiEdit } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="w-full bg-white top-0 left-0 right-0 z-50 shadow px-8 py-4">
      <div className="flex justify-between items-center">
        <div>
          <Link href={"/"}>
            <button className="text-4xl font-medium uppercase">
              A<sub>9</sub> Blogs
            </button>
          </Link>
        </div>

        <div className="flex items-center justify-center space-x-10">
          <Link href={"/"}>
            <button className="text-gray-500 text-xl hover:text-black">
              Home
            </button>
          </Link>

          <button className="text-gray-500 text-xl hover:text-black">
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
              className="max-w-60 py-2.5 px-4 bg-inherit rounded-full outline-none placeholder-gray-500 text-lg"
            />

            {/* <div className="absolute left-0 top-14 min-w-[380px] min-h-fit bg-white rounded-xs shadow-lg border max-h-60 overflow-y-auto">
              <div className="p-2.5">
                <div className="px-2 mb-2">
                  <h1 className="uppercase font-light text-xl text-black flex gap-x-2 items-center mb-2">
                    <Newspaper />
                    Blogs
                  </h1>
                  <hr className="border-b" />
                </div>

                <div className="flex h-full py-2 px-2 space-x-4 cursor-pointer hover:bg-gray-100 rounded-xs">
                  <img
                    src="/example.jpg"
                    alt="Blog Title"
                    className="h-16 w-28 object-cover aspect-[3/2] rounded-xs"
                  />
                  <div className="flex flex-col items-start w-full">
                    <span className="text-sm font-medium line-clamp-2">
                      Blog Title Here
                    </span>
                    <span className="text-xs mt-0.5">Apr 25, 2025</span>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

          {/* If Logged In */}
          {isLoggedIn ? (
            <div className="relative h-12 w-12 flex items-center justify-center">
              <button>
                <img
                  src="/avatar.jpg"
                  alt="profile"
                  className="h-full w-full border rounded-md aspect-square object-cover object-top"
                />
              </button>

              <div className="absolute min-w-80 -left-64 top-14 bg-white shadow px-4">
                <a className="w-full flex items-center justify-start px-4 space-x-3 text-gray-500 hover:text-gray-900">
                  <FaRegUser className="h-5 w-5" />
                  <span className="text-lg font-medium py-5 cursor-pointer">
                    Profile
                  </span>
                </a>
                <hr className="border" />
                <button className="flex flex-col items-start py-4 px-4 group w-full cursor-pointer">
                  <h1 className="flex items-center text-lg font-medium text-red-500 mb-1.5">
                    <PiSignOut className="h-6 w-6 mr-2" /> Sign Out
                  </h1>
                  <p className="text-gray-500 group-hover:text-gray-900">
                    user@example.com
                  </p>
                </button>
              </div>
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
