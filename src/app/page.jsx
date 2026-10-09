import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Main Content */}
      <div className="border-y border-[#2A2D35]">

        <Navbar />

        <Hero />

        <WorkoutLibrary />

      </div>

      {/* Footer */}
      <footer>
        {/* Footer will be added later */}
      </footer>

    </main>
  );
}