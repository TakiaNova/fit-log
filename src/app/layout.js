import { PlanProvider } from "@/context/PlanContext";
import "./globals.css";
import Footer from "@/components/footer";

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a lift, build your daily workout plan, and track your progress with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full bg-black">
      <body className="m-0 min-h-screen bg-black p-0 text-white">
        <PlanProvider>
          {children}
          <Footer />
        </PlanProvider>
      </body>
    </html>
  );
}
