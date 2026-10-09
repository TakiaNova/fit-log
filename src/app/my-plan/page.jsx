"use client";

import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

export default function MyPlanPage() {
const { plan, ready, removeFromPlan, markAsDone } = usePlan();

if (!ready) {
return ( <main className="min-h-screen bg-black px-6 py-20 text-white"> <p className="text-center text-gray-400">Loading your plan...</p> </main>
);
}

const totalDuration = plan.reduce(
(total, workout) => total + Number(workout.duration || 0),
0
);

const totalCalories = plan.reduce(
(total, workout) => total + Number(workout.caloriesBurned || 0),
0
);

const completedCount = plan.filter((workout) => workout.done).length;

return ( <main className="min-h-screen bg-black px-6 py-12 text-white"> <div className="mx-auto max-w-6xl"> <Link
       href="/#library"
       className="text-sm text-gray-400 transition hover:text-[#C2F800]"
     >
← Back to Library </Link>
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

    {/* Summary */}
    <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <div className="border border-[#2A2D35] bg-[#15171D] p-5">
        <p className="text-xs font-semibold text-gray-500">TOTAL WORKOUTS</p>
        <p className="mt-3 text-3xl font-bold">{plan.length}/5</p>
      </div>

      <div className="border border-[#2A2D35] bg-[#15171D] p-5">
        <p className="text-xs font-semibold text-gray-500">COMPLETED</p>
        <p className="mt-3 text-3xl font-bold text-[#C2F800]">
          {completedCount}
        </p>
      </div>

      <div className="border border-[#2A2D35] bg-[#15171D] p-5">
        <p className="text-xs font-semibold text-gray-500">TOTAL DURATION</p>
        <p className="mt-3 text-3xl font-bold">{totalDuration}</p>
        <p className="mt-1 text-xs text-gray-500">minutes</p>
      </div>

      <div className="border border-[#2A2D35] bg-[#15171D] p-5">
        <p className="text-xs font-semibold text-gray-500">CALORIES</p>
        <p className="mt-3 text-3xl font-bold">{totalCalories}</p>
        <p className="mt-1 text-xs text-gray-500">kcal estimated</p>
      </div>
    </div>

    {/* Workout List */}
    <section className="mt-12">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold">Today's Workouts</h2>
        <span className="text-sm text-gray-500">
          {completedCount} of {plan.length} completed
        </span>
      </div>

      {plan.length === 0 ? (
        <div className="border border-dashed border-[#2A2D35] px-6 py-16 text-center">
          <div className="text-4xl">🏋️</div>

          <h3 className="mt-5 text-xl font-bold">
            Your plan is empty
          </h3>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-400">
            Explore the workout library and add up to 5 workouts to your plan.
          </p>

          <Link
            href="/#library"
            className="mt-6 inline-flex rounded-md bg-[#C2F800] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
          >
            Explore Workouts
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {plan.map((workout) => (
            <article
              key={workout.id}
              className={`border bg-[#15171D] p-5 transition sm:p-6 ${
                workout.done
                  ? "border-[#C2F800]/40"
                  : "border-[#2A2D35]"
              }`}
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                {workout.image && (
                  <div className="h-28 w-full shrink-0 overflow-hidden bg-black sm:w-36">
                    <img
                      src={workout.image}
                      alt={workout.name || "Workout"}
                      className={`h-full w-full object-cover ${
                        workout.done ? "opacity-60" : ""
                      }`}
                    />
                  </div>
                )}

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3
                      className={`text-lg font-bold ${
                        workout.done
                          ? "text-gray-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {workout.name}
                    </h3>

                    {workout.done && (
                      <span className="text-xs font-bold text-[#C2F800]">
                        COMPLETED
                      </span>
                    )}
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-gray-400">
                    {workout.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-gray-400">
                    <span>
                      ⏱ {workout.duration || 0} min
                    </span>
                    <span>
                      🔥 {workout.caloriesBurned || 0} kcal
                    </span>
                    {workout.difficulty && (
                      <span>{workout.difficulty}</span>
                    )}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    {!workout.done && (
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
                      onClick={() => removeFromPlan(workout.id)}
                      className="rounded-md border border-[#393C44] px-4 py-2 text-xs font-bold text-gray-300 transition hover:border-red-500 hover:text-red-400"
                    >
                      Remove
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
