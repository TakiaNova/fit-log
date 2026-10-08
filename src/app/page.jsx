import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto flex min-h-[600px] max-w-7xl items-center gap-12 px-6 py-16">
        
        {/* Left Content */}
        <div className="w-[55%]">
          <p className="mb-5 text-sm font-medium tracking-[0.2em] text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="whitespace-nowrap text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            <br />
            into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Right Banner Image */}
        <div className="flex w-[45%] justify-end">
          <div className="relative h-[460px] w-full">
            <Image
              src="/assets/banner.png"
              alt="FitLog workout banner"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* Workout Library */}
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

        {/* Workout cards will be added here */}
      </section>
    </main>
  );
}