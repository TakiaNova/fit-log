
import { Suspense } from "react";
import { PlanProvider } from "@/context/PlanContext";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Oswald } from "next/font/google";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a lift, build your daily workout plan, and track your progress with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full bg-black">
      <body
        className={`${oswald.className} m-0 min-h-screen bg-black p-0 text-white`}
      >
        <PlanProvider>
          <Suspense
            fallback={<div className="h-[112px] bg-black sm:h-[76px]" />}
          >
            <Navbar />
          </Suspense>

          <div className="pt-[140px] sm:pt-[100px]">
            {children}
            <Footer />
          </div>
        </PlanProvider>
      </body>
    </html>
  );
}
