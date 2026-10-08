import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <Hero />

      <section
        id="library"
        className="mx-auto min-h-screen max-w-7xl px-6 py-20"
      >
        <p className="text-sm tracking-[0.2em] text-[#C2F800]">
          THE LIBRARY
        </p>

        <h2 className="mt-3 text-4xl font-bold">
          WORKOUT LIBRARY
        </h2>

        <p className="mt-3 text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>
      </section>
    </main>
  );
}