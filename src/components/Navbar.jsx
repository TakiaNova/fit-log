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
      label: "Workout",
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
      <header className="fixed inset-x-0 top-0 z-50 m-0 w-full border-b border-gray-800 bg-black p-0 text-white">
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
    className="h-9 w-9 shrink-0 object-contain"
  />
  <span className="inline-flex items-center text-xl font-medium leading-none tracking-tight sm:text-2xl">
    FITLOG
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
<div className="flex shrink-0 items-center gap-4">
  {/* Plan */}
  <Link
    href="/my-plan"
    className="flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#ccff00]"
  >
    <span>Plan</span>
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-[#ccff00] bg-[#ccff00] text-xs font-bold text-black">
      {plan.length}
    </span>
  </Link>

  {/* Saved */}
  <Link
    href="/my-plan"
    className="flex items-center gap-2 border-white/30 px-3 py-2 text-sm font-semibold text-white transition hover:border-[#ccff00]"
  >
    <span>Saved</span>
    <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/40 bg-black text-xs font-bold text-white">
      {saved.length}
    </span>
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
