
import Hero from "@/components/Hero";
import WorkoutLibrary from "@/components/WorkoutLibrary";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-3 mt-0 mb-6 border-y border-[#2A2D35] sm:mx-5 sm:mb-8 lg:mx-6 lg:mb-12">
        <Hero />
        <WorkoutLibrary />
      </div>
    </main>
  );
}
