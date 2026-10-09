import { PlanProvider } from "@/context/PlanContext";
import "./globals.css";

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Pick a lift, build your daily workout plan, and track your progress with FitLog.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>{children}</PlanProvider>
      </body>
    </html>
  );
}