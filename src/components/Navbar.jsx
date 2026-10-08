"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="navbar bg-black px-6 py-3 text-white">

      {/* Logo */}
      <div className="navbar-start">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/logo.png"
            alt="FitLog logo"
            width={28}
            height={28}
            className="h-7 w-7"
          />

          <span className="text-xl font-bold text-white">
            FITLOG
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="navbar-center">
        <div className="flex items-center gap-2">

          <Link
            href="/workout"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname === "/workout"
                ? "text-[#C2F800]"
                : "text-gray-400 hover:bg-[#C2F800]/10 hover:text-[#C2F800]"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-md px-3 py-2 text-sm transition ${
              pathname === "/my-plan"
                ? "text-[#C2F800]"
                : "text-gray-400 hover:bg-[#C2F800]/10 hover:text-[#C2F800]"
            }`}
          >
            My Plan
          </Link>

        </div>
      </div>

      {/* Right */}
      <div className="navbar-end">
        <div className="flex items-center gap-6 text-sm">

          {/* Plan */}
          <Link
            href="/my-plan"
            className={`flex items-center gap-2 transition ${
              pathname === "/my-plan"
                ? "text-[#C2F800]"
                : "text-gray-400 hover:text-[#C2F800]"
            }`}
          >
            Plan

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#C2F800] text-xs font-bold text-black">
              0
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/saved"
            className={`flex items-center gap-2 transition ${
              pathname === "/saved"
                ? "text-[#C2F800]"
                : "text-gray-400 hover:text-[#C2F800]"
            }`}
          >
            Saved

            <span className="text-gray-400 border-gray">
              0
            </span>
          </Link>

        </div>
      </div>

    </div>
  );
};

export default Navbar;