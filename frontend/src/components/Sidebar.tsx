"use client";

import { useSidebar } from "@/context/SidebarContext";
import { X } from "lucide-react";
import clsx from "clsx";
import { FaRegUser } from "react-icons/fa";
import { PiSignOut } from "react-icons/pi";
import Link from "next/link";
import { sidebarTags } from "@/constants/canstants";

export default function Sidebar() {
  const { isOpen, closeSidebar } = useSidebar();

  return (
    <>
      {/* BACKDROP */}
      <div
        className={clsx(
          "fixed inset-0 bg-opacity-40 transition-opacity duration-300 z-20",
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={closeSidebar}
      />

      {/* SIDEBAR */}
      <div
        className={clsx(
          "fixed top-0 right-0 h-full w-[20%] bg-white shadow-lg transition-transform duration-600 z-50 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="flex justify-end items-center p-4">
          <button onClick={closeSidebar}>
            <X size={24} />
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col flex-1 px-4">
          <div className="flex flex-col gap-8">
            {sidebarTags.map((tag) => (
              <Link
                onClick={closeSidebar}
                href={tag.path}
                key={tag.name}
                className="text-sm uppercase font-medium text-slate-700 hover:text-slate-800 hover:font-semibold cursor-pointer"
              >
                {tag.name}
              </Link>
            ))}
          </div>
          <div className="mt-auto">
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
      </div>
    </>
  );
}
