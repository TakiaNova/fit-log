import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pb-12">
      <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-4 sm:flex-row">
{/* Logo */}
<Link href="/" className="flex items-center gap-2">
  <Image
    src="/assets/logo.png"
    alt="FitLog Logo"
    width={32}
    height={32}
    className="object-contain"
  />
  <span className="text-xl font-medium tracking-tight">
    FITLOG
  </span>
</Link>
        {/* Footer Text */}
        <p className="text-sm font-normal text-base-content/60">
          © 2026 FitLog. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
