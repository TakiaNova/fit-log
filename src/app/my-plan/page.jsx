
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    ready,
    removeFromPlan,
    removeFromSaved,
    markAsDone,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("default");

  const workouts = Array.isArray(plan) ? plan : [];
  const savedWorkouts = Array.isArray(saved) ? saved : [];

  const totalDuration = workouts.reduce(
    (total, workout) => total + Number(workout.duration || 0),
    0
  );

  const totalCalories = workouts.reduce(
    (total, workout) => total + Number(workout.caloriesBurned || 0),
    0
  );

  const completedCount = workouts.filter(
    (workout) => workout.done
  ).length;

  const displayedWorkouts = useMemo(() => {
    const items = [
      ...(activeTab === "plan" ? workouts : savedWorkouts),
    ];

    if (sortBy === "duration") {
      items.sort(
        (a, b) =>
          Number(a.duration || 0) - Number(b.duration || 0)
      );
    } else if (sortBy === "calories") {
      items.sort(
        (a, b) =>
          Number(b.caloriesBurned || 0) -
          Number(a.caloriesBurned || 0)
      );
    } else if (sortBy === "rating") {
      items.sort(
        (a, b) =>
          Number(b.rating || 0) - Number(a.rating || 0)
      );
    }

    return items;
  }, [activeTab, workouts, savedWorkouts, sortBy]);

  if (!ready) {
    return (
      <main className="min-h-screen bg-black px-6 py-20 text-white">
        <p className="text-center text-gray-400">
          Loading workouts...
        </p>
      </main>
    );
  }

  const isPlanTab = activeTab === "plan";

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/#library"
          className="text-sm text-gray-400 transition hover:text-[#C2F800]"
        >
          ← Back to Library
        </Link>

        {/* Page heading */}
        <div className="mt-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold tracking-[0.2em] text-[#C2F800]">
              YOUR WORKOUTS
            </p>

            <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">
              My Plan
            </h1>

            <p className="mt-3 text-gray-400">
              Build your routine. Complete your goals.
            </p>
          </div>

          <Link
            href="/#library"
            className="inline-flex w-fit rounded-md bg-[#C2F800] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
          >
            + Add Workout
          </Link>
        </div>

        {/* Summary cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-3">
          <div className="border border-[#2A2D35] bg-[#15171D] p-5">
            <p className="text-xs font-semibold text-gray-500">
              EXERCISES
            </p>
            <p className="mt-3 text-3xl font-bold">
              {workouts.length}/5
            </p>
          </div>

          <div className="border border-[#2A2D35] bg-[#15171D] p-5">
            <p className="text-xs font-semibold text-gray-500">
              TOTAL DURATION
            </p>
            <p className="mt-3 text-3xl font-bold">
              {totalDuration}
            </p>
            <p className="mt-1 text-xs text-gray-500">minutes</p>
          </div>

          <div className="border border-[#2A2D35] bg-[#15171D] p-5">
            <p className="text-xs font-semibold text-gray-500">
              CALORIES
            </p>
            <p className="mt-3 text-3xl font-bold">
              {totalCalories}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              kcal estimated
            </p>
          </div>
        </div>

        {/* Tabs and sorting */}
        <section className="mt-12">
          <div className="flex flex-col justify-between gap-5 border-b border-[#2A2D35] sm:flex-row sm:items-center">
            <div className="flex gap-6">
              <button
                type="button"
                onClick={() => setActiveTab("plan")}
                className={`border-b-2 pb-4 text-sm font-bold transition ${
                  isPlanTab
                    ? "border-[#C2F800] text-[#C2F800]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Today's Plan ({workouts.length})
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("saved")}
                className={`border-b-2 pb-4 text-sm font-bold transition ${
                  !isPlanTab
                    ? "border-[#C2F800] text-[#C2F800]"
                    : "border-transparent text-gray-400 hover:text-white"
                }`}
              >
                Saved ({savedWorkouts.length})
              </button>
            </div>

            <div className="flex items-center gap-3 pb-4">
              <label
                htmlFor="workout-sort"
                className="text-xs text-gray-400"
              >
                Sort by
              </label>

              <select
                id="workout-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-md border border-[#393C44] bg-[#15171D] px-3 py-2 text-sm text-white outline-none focus:border-[#C2F800]"
              >
                <option value="default">Default</option>
                <option value="duration">Duration: Shortest first</option>
                <option value="calories">Calories: Highest first</option>
                <option value="rating">Rating: Highest first</option>
              </select>
            </div>
          </div>

          <div className="mb-5 mt-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {isPlanTab ? "Today's Workouts" : "Saved Workouts"}
            </h2>

            {isPlanTab && (
              <span className="text-sm text-gray-500">
                {completedCount} of {workouts.length} completed
              </span>
            )}
          </div>

          {/* Empty state */}
          {displayedWorkouts.length === 0 ? (
            <div className="border border-dashed border-[#2A2D35] px-6 py-16 text-center">
              <div className="text-4xl">
                {isPlanTab ? "🏋️" : "🔖"}
              </div>

              <h3 className="mt-5 text-xl font-bold uppercase">
                {isPlanTab ? "Nothing Here Yet" : "No Saved Workouts"}
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
                {isPlanTab
                  ? "Browse the library and add a lift to get today moving."
                  : "Save workouts from the library to find them here later."}
              </p>

              <Link
                href="/#library"
                className="mt-6 inline-flex rounded-md bg-[#C2F800] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
              >
                Go to Workouts
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedWorkouts.map((workout) => (
                <article
                  key={workout.id}
                  className={`border bg-[#15171D] p-5 transition sm:p-6 ${
                    isPlanTab && workout.done
                      ? "border-[#C2F800]/40"
                      : "border-[#2A2D35]"
                  }`}
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                    {workout.image && (
                      <div className="h-36 w-full shrink-0 overflow-hidden bg-black sm:w-40">
                        <img
                          src={workout.image}
                          alt={workout.name || "Workout"}
                          className={`h-full w-full object-cover ${
                            isPlanTab && workout.done
                              ? "opacity-60"
                              : ""
                          }`}
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3
                          className={`text-lg font-bold ${
                            isPlanTab && workout.done
                              ? "text-gray-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {workout.name || "Untitled Workout"}
                        </h3>

                        {isPlanTab && workout.done && (
                          <span className="text-xs font-bold text-[#C2F800]">
                            ✓ COMPLETED
                          </span>
                        )}
                      </div>

                      <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                        {workout.description || "No description available."}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                        <span>⏱ {workout.duration || 0} min</span>
                        <span>
                          🔥 {workout.caloriesBurned || 0} kcal
                        </span>

                        {workout.difficulty && (
                          <span>{workout.difficulty}</span>
                        )}

                        {workout.rating != null && (
                          <span>★ {workout.rating}</span>
                        )}
                      </div>

                      <div className="mt-5 flex flex-wrap gap-3">
                        {isPlanTab && !workout.done && (
                          <button
                            type="button"
                            onClick={() => markAsDone(workout.id)}
                            className="rounded-md bg-[#C2F800] px-4 py-2 text-xs font-bold text-black transition hover:bg-[#d0ff33]"
                          >
                            ✓ Mark as Done
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            isPlanTab
                              ? removeFromPlan(workout.id)
                              : removeFromSaved(workout.id)
                          }
                          className="rounded-md border border-[#393C44] px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-red-500 hover:text-red-400"
                        >
                          {isPlanTab ? "Remove from Plan" : "Remove Saved"}
                        </button>

                        <Link
                          href={`/workout/${workout.id}`}
                          className="rounded-md border border-[#393C44] px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-[#C2F800] hover:text-[#C2F800]"
                        >
                          View Details →
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}