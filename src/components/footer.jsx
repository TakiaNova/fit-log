import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[#2A2D35] bg-[#0B0C0F] text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 sm:flex-row">
        
        {/* Left: Picture + Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo.png"
            alt="FitLog"
            width={36}
            height={36}
            priority
            className="h-9 w-9 object-contain"
            />

          <span className="text-xl font-extrabold tracking-tight">
            FIT<span className="text-[#C2F800]">LOG</span>
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-center text-sm text-gray-400 sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
