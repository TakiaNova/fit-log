import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-black px-6 py-20 text-center text-white">
      <p className="text-sm font-bold tracking-[0.2em] text-[#C2F800]">
        ERROR 404
      </p>

      <h1 className="mt-4 text-4xl font-extrabold uppercase sm:text-6xl">
        Workout Not Found
      </h1>

      <p className="mt-4 max-w-md text-gray-400">
        This workout does not exist or may have been removed.
      </p>

      <Link
        href="/"
        className="mt-8 inline-flex rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
      >
        Back to Workouts
      </Link>
    </main>
  );
}