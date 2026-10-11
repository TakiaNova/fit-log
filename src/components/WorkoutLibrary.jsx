
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid workout data");
        }

        setWorkouts(data);
      } catch (err) {
        if (err.name === "AbortError") return;

        console.error("Workout fetch failed:", err);
        setError("We couldn't load the workouts. Please try again.");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchWorkouts();
    return () => controller.abort();
  }, []);
  return (
    <section
      id="library"
      className="mx-auto max-w-7xl scroll-mt-36 px-4 py-12 sm:px-6 sm:py-16 lg:py-20"
    >
      {/* Heading */}
      <div className="mb-8 sm:mb-10">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-[#C2F800] sm:text-sm">
          FIND YOUR NEXT WORKOUT
        </p>
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          THE LIBRARY
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-6 text-gray-400 sm:text-base">
          Twelve lifts covering every major muscle group.
        </p>
      </div>
      {/* Loading */}
      {loading && (
        <div
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Loading workouts"
          aria-busy="true"
        >
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden border border-[#2A2D35] bg-[#15171D]"
            >
              <div className="aspect-[4/3] bg-[#1B1E25]" />
              <div className="space-y-4 p-5">
                <div className="h-4 w-2/5 rounded bg-[#2A2D35]" />
                <div className="h-6 w-3/4 rounded bg-[#2A2D35]" />
                <div className="h-4 w-1/2 rounded bg-[#2A2D35]" />
                <div className="h-4 w-full rounded bg-[#2A2D35]" />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Error */}
      {!loading && error && (
        <div
          role="alert"
          className="border border-[#2A2D35] bg-[#15171D] px-5 py-10 text-center"
        >
          <p className="text-white">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-5 rounded-md bg-[#C2F800] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
          >
            Try Again
          </button>
        </div>
      )}
      {/* Empty State */}
      {!loading && !error && workouts.length === 0 && (
        <div className="border border-[#2A2D35] bg-[#15171D] px-5 py-12 text-center">
          <h3 className="text-xl font-bold">NO WORKOUTS AVAILABLE</h3>
          <p className="mt-3 text-sm text-gray-400">
            Please check back later for available workouts.
          </p>
        </div>
      )}
      {/* Workout Grid */}
      {!loading && !error && workouts.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {workouts.map((workout) => {
            const muscleGroups = Array.isArray(workout.muscleGroups)
              ? workout.muscleGroups
              : [];
            return (
              <Link
                key={workout.id}
                href={`/workout/${workout.id}`}
                className="group min-w-0 overflow-hidden border border-[#2A2D35] bg-[#15171D] transition duration-300 hover:border-[#C2F800] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2F800]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1E25]">
                  {workout.image ? (
                    <Image
                      src={workout.image}
                      alt={workout.name || "Workout"}
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-gray-500">
                      No image available
                    </div>
                  )}
                </div>
                {/* Content */}
                <div className="p-4 sm:p-5">
                  {/* Category Tags */}
                  {muscleGroups.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
                      {muscleGroups.map((group, index) => (
                        <span
                          key={`${group}-${index}`}
                          className="rounded-full border border-[#C2F800]/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#C2F800]"
                        >
                          {String(group).toUpperCase()}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Name */}
                  <h3 className="break-words text-lg font-bold uppercase tracking-tight sm:text-xl">
                    {workout.name || "Untitled Workout"}
                  </h3>
                  {/* Equipment */}
                  <p className="mt-2 break-words text-sm text-gray-400">
                    {workout.equipment || "Equipment not specified"}
                  </p>
                  {/* Stats */}
                  <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[#2A2D35] pt-4 text-xs text-gray-400 sm:text-sm">
                    <span>
                      ⏱ {workout.duration ?? "—"} min
                    </span>
                    <span>
                      🔥 {workout.caloriesBurned ?? "—"} kcal
                    </span>
                    <span>
                      <span className="text-[#C2F800]">★</span>{" "}
                      {workout.rating ?? "—"}
                    </span>
                  </div>
                  {/* View Details */}
                  <p className="mt-5 text-xs font-bold tracking-wider text-[#C2F800] transition group-hover:text-white">
                    VIEW DETAILS <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
export default WorkoutLibrary;
