"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="mx-6 mt-6 border border-[#2A2D35] bg-black px-6 py-4 text-white">
      <div className="flex items-center justify-between">

        {/* Logo */}
        <div>
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="FitLog logo"
              width={28}
              height={28}
              className="h-7 w-7"
            />

            <span className="text-xl font-bold tracking-tight">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          <Link
            href="/workout"
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              pathname === "/workout"
                ? "text-[#C2F800]"
                : "text-gray-400 hover:bg-[#C2F800]/10 hover:text-[#C2F800]"
            }`}
          >
            Workouts
          </Link>

          <Link
            href="/my-plan"
            className={`rounded-md px-4 py-2 text-sm font-medium transition ${
              pathname === "/my-plan"
                ? "text-[#C2F800]"
                : "text-gray-400 hover:bg-[#C2F800]/10 hover:text-[#C2F800]"
            }`}
          >
            My Plan
          </Link>
        </div>

        {/* Status Badges */}
        <div className="flex items-center gap-3">

          {/* Plan */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#C2F800] px-3 py-1.5 text-sm font-medium text-black transition hover:opacity-90"
          >
            <span>Plan</span>
            <span className="font-bold">0</span>
          </Link>

          {/* Saved */}
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-300 transition hover:border-[#C2F800] hover:text-[#C2F800]"
          >
            <span>Saved</span>
            <span>0</span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;