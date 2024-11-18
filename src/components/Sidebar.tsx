"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { CiLogout } from "react-icons/ci";
import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: <AiOutlineHome /> },
  { href: "/dashboard/add", label: "Users", icon: <AiOutlineUser /> },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <AiOutlineSetting />,
  },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const activeLinkRef = useRef<HTMLLIElement | null>(null);
  const [highlightStyle, setHighlightStyle] = useState({ top: 0, height: 0 });
  const router = useRouter()

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/database/adminData", {
        method: "GET",
      });

      if (response.ok) {
        // Redirect ke halaman login setelah logout
        router.push("/verify");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Update posisi highlight saat URL berubah
  useEffect(() => {
    if (activeLinkRef.current) {
      const { offsetTop, clientHeight } = activeLinkRef.current;
      setHighlightStyle({ top: offsetTop, height: clientHeight });
    }
  }, [pathname]);

  return (
    <div className="flex">
      {/* Overlay untuk mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white p-5 z-50 shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        {/* Header Sidebar */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <button className="md:hidden text-2xl" onClick={toggleSidebar}>
            <AiOutlineClose />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="relative space-y-4">
          {/* Highlight Background */}
          <motion.div
            className="absolute left-0 w-full bg-blue-700 rounded-lg z-0"
            style={{
              top: highlightStyle.top,
              height: highlightStyle.height,
            }}
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />

          {/* Navigation Items */}
          {navLinks.map((link) => (
            <li
              key={link.href}
              ref={pathname === link.href ? activeLinkRef : null}
              className={`relative flex items-center space-x-2 p-2 rounded-lg cursor-pointer z-10 ${
                pathname === link.href ? "text-white" : "hover:bg-gray-800"
              }`}
            >
              <Link href={link.href} className="flex items-center w-full">
                {link.icon}
                <p className="px-2 py-1">{link.label}</p>
              </Link>
            </li>
          ))}
        </ul>
        <button
          className="p-3 rounded-md absolute bottom-5 z-50 text-white flex items-center gap-2 left-5 hover:bg-gray-800"
          onClick={handleLogout}
        >
          <CiLogout />
          <p>Logout</p>
        </button>
      </div>

      {/* Margin kiri pada konten utama untuk mengakomodasi sidebar di desktop view */}
      <div className={`flex-1 md:ml-64 md:p-5 p-0`}>
        {/* Konten utama akan ditempatkan di sini oleh pengguna komponen */}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-5 left-5 text-2xl text-gray-900 z-10 mx-auto"
        onClick={toggleSidebar}
      >
        {isOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
      </button>
    </div>
  );
};

export default Sidebar;
