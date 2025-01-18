"use client";
import Link from "next/link";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import Logo from "../assets/logo1.svg";
import Image from "next/image";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 bg-white2 shadow-sm left-0 right-0">
      <main className="container py-4 flex justify-between items-center">
        <Image
          src={Logo}
          alt="logo"
          className="lg:w-56 w-40"
          draggable={false}
        />
        <button
          aria-label="Toggle menu"
          className={`${menuOpen?"hidden":"block"} lg:hidden text-gray-700 focus:outline-none`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon
            icon={menuOpen ? "ic:round-close" : "solar:hamburger-menu-linear"}
            className="w-6 h-6"
          />
        </button>
        <ul
          className={`fixed inset-0 bg-white2 flex flex-col items-center justify-center gap-6 transform transition-transform duration-500 ease-in-out ${
            menuOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-full scale-95 opacity-0"
          } lg:static lg:translate-x-0 lg:scale-100 lg:opacity-100 lg:flex-row lg:gap-4 lg:h-auto lg:bg-transparent lg:inset-auto`}
        >
          <button
            aria-label="Toggle menu"
            className="block lg:hidden absolute top-5 right-4  text-gray-700 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon
              icon={menuOpen ? "ic:round-close" : "solar:hamburger-menu-linear"}
              className="w-6 h-6"
            />
          </button>{" "}
          <li>
            <Link href={"/"}>
              <p className="text-lg px-4 py-2">Audio Narasi</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-lg px-4 py-2">Mini Dictionary</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-lg px-4 py-2">Conversation</p>
            </Link>
          </li>
          <li>
            <Link href={"/"}>
              <p className="text-lg px-4 py-2">Game</p>
            </Link>
          </li>
        </ul>
      </main>
    </nav>
  );
};

export default Navbar;
