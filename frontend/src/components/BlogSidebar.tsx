"use client";

import {
  Menu,
  LogOut,
  User,
  HospitalIcon,
  ShieldPlus,
  Accessibility,
  Ambulance,
  Activity,
  ChevronDown,
  ChevronUp,
  PlusCircle,
  Edit,
  ClipboardPlus,
  CircleFadingPlus,
  Youtube,
  LucideHandshake,
  Trophy,
  TrophyIcon,
} from "lucide-react";
import { FaClinicMedical, FaInstagram, FaYoutube } from "react-icons/fa";
import { MdOutlineCampaign, MdOutlineMedicalInformation } from "react-icons/md";
import { SiYoutubeshorts } from "react-icons/si";
import { useEffect, useState } from "react";
// import { useNavigate, Link, useLocation } from "react-router-dom";
import { useRouter } from "next/router";
import Link from "next/link";

function Sidebar() {
  // const location = useLocation();
  //   const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isPostingOpen, setIsPostingOpen] = useState(false);
  const [isEditingOpen, setIsEditingOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState({ userId: "", role: "" });

  const navItems = [
    { icon: CircleFadingPlus, label: "Blogs", href: "/dashboard/blog" },
    {
      icon: FaInstagram,
      label: "Visual Stories",
      href: "/dashboard/visual-stories",
    },
    { icon: SiYoutubeshorts, label: "Shorts", href: "/dashboard/bank" },
    {
      icon: FaYoutube,
      label: "Video Stories",
      href: "/dashboard/homecare",
    },
    {
      icon: MdOutlineCampaign,
      label: "Brand Campaigns",
      href: "/dashboard/transport",
    },
    {
      icon: LucideHandshake,
      label: "Our Impact",
      href: "/dashboard/op",
    },
    {
      icon: TrophyIcon,
      label: "Event & Rewards",
      href: "/dashboard/diagnostics",
    },
  ];

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsOpen(window.innerWidth >= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    // navigate("/");
  }

  const toggleSidebar = () => {
    if (!isMobile) setIsOpen(!isOpen);
  };

  return (
    <div
      className={`flex flex-col bg-white text-gray-800 border-r transition-all duration-300 ${
        isOpen ? "w-64" : "w-24"
      } ${isMobile ? "w-24" : ""}`}
    >
      {/* Sidebar Toggle Button */}
      <div className="p-4">
        <button
          className={`text-gray-800 hover:bg-gray-100 p-2 rounded-md ${
            isMobile ? "hidden" : ""
          }`}
          onClick={toggleSidebar}
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle sidebar</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto">
        <ul className="space-y-2 p-4">
          {/* Posting Section */}
          <li>
            <button
              className="flex items-center justify-between text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full"
              onClick={() => setIsPostingOpen(!isPostingOpen)}
            >
              <div className="flex items-center">
                <PlusCircle className="h-5 w-5 flex-shrink-0" />
                {isOpen && !isMobile && <span className="ml-2">Posting</span>}
              </div>
              {isPostingOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {isPostingOpen && (
              <ul className="pl-6 space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      // to={`${item.href}/add`}
                      //   to={`${item.href}/add`}
                      href={`${item.href}/add`}
                      className="flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && !isMobile && (
                        <span className="ml-2">{item.label}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Editing Section */}
          <li>
            <button
              className="flex items-center justify-between text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full"
              onClick={() => setIsEditingOpen(!isEditingOpen)}
            >
              <div className="flex items-center">
                <Edit className="h-5 w-5 flex-shrink-0" />
                {isOpen && !isMobile && <span className="ml-2">Listing</span>}
              </div>
              {isEditingOpen ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {isEditingOpen && (
              <ul className="pl-6 space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      // to={`${item.href}/edit`}
                      //   to={`${item.href}/all`}
                      href={""}
                      className="flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2"
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && !isMobile && (
                        <span className="ml-2">{item.label}</span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Logout & Account Section */}
      <div className="p-4 space-y-2">
        <button
          onClick={handleLogout}
          className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full ${
            (!isOpen || isMobile) && "justify-center"
          }`}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {isOpen && !isMobile && <span className="ml-2">Logout</span>}
        </button>
        <Link
          //   to={`/user/${currentUser.userId}`}
          href={""}
          className={`flex items-center text-gray-800 hover:bg-gray-100 rounded-md p-2 w-full ${
            (!isOpen || isMobile) && "justify-center"
          }`}
        >
          <User className="h-5 w-5 flex-shrink-0" />
          {isOpen && !isMobile && <span className="ml-2">Account</span>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;
