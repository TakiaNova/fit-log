"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const isWorkoutPage =
    pathname === "/workout" || pathname.startsWith("/workout/");

  const links = [
    {
      label: "Workouts",
      href: "/",
      active: pathname === "/" || isWorkoutPage,
    },
    {
      label: "My Plan",
      href: "/my-plan",
      active: pathname === "/my-plan",
    },
  ];

  return (
    <header className="m-0 w-full border-b border-white/10 bg-black p-0 text-white">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="FitLog home"
        >
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={36}
            height={36}
            priority
            className="h-9 w-9 object-contain"
          />

          <span className="text-xl font-black tracking-tight sm:text-2xl">
            FIT<span className="text-[#C2F800]">LOG</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                link.active
                  ? "bg-[#C2F800]/10 text-[#C2F800]"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Plan and Saved */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full bg-[#C2F800] px-3.5 py-2 text-xs font-bold text-black transition hover:bg-[#d5ff38] sm:px-4 sm:text-sm"
          >
            <span>Plan</span>
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black/10 px-1">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 rounded-full border border-white/15 px-3.5 py-2 text-xs font-semibold text-gray-300 transition hover:border-[#C2F800]/60 hover:text-[#C2F800] sm:px-4 sm:text-sm"
          >
            <span>Saved</span>
            <span>{saved.length}</span>
          </Link>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="flex gap-2 border-t border-white/5 px-5 py-2 sm:hidden">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-md px-3 py-2 text-sm font-medium transition ${
              link.active
                ? "text-[#C2F800]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
