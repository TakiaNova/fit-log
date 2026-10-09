"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

const WorkoutLibrary = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();
        setWorkouts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <section
      id="library"
      className="mx-auto max-w-7xl px-6 py-20"
    >
      {/* Heading */}
      <div className="mb-10">
        <h2 className="text-4xl font-extrabold tracking-tight">
          THE LIBRARY
        </h2>

        <p className="mt-3 text-gray-400">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-20 text-center text-gray-400">
          Loading workouts...
        </div>
      )}

      {/* Workout Grid */}
      {!loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <Link
              key={workout.id}
              href={`/workout/${workout.id}`}
              className="group overflow-hidden border border-[#2A2D35] bg-[#15171D] transition duration-300 hover:border-[#C2F800]"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#1B1E25]">
                <img
                  src={workout.image}
                  alt={workout.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">

                {/* Category Tags */}
                <div className="mb-4 flex flex-wrap gap-2">
                  {workout.muscleGroups.map((group) => (
                    <span
                      key={group}
                      className="rounded-full border border-[#C2F800]/40 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-[#C2F800]"
                    >
                      {group.toUpperCase()}
                    </span>
                  ))}
                </div>

                {/* Name */}
                <h3 className="text-xl font-bold uppercase tracking-tight">
                  {workout.name}
                </h3>

                {/* Equipment */}
                <p className="mt-2 text-sm text-gray-400">
                  {workout.equipment}
                </p>

                {/* Stats */}
                <div className="mt-5 flex items-center gap-4 border-t border-[#2A2D35] pt-4 text-sm text-gray-400">

                  <span>
                    ⏱ {workout.duration} min
                  </span>

                  <span>
                    🔥 {workout.caloriesBurned} kcal
                  </span>

                  <span>
                    ★ {workout.rating}
                  </span>

                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default WorkoutLibrary;