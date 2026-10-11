
"use client";

import { usePlan } from "@/context/PlanContext";

export default function WorkoutActions({ workout }) {
  const { addToPlan, saveWorkout } = usePlan();

  const handleAddToPlan = () => {
    addToPlan(workout);
  };

  const handleSaveForLater = () => {
    saveWorkout(workout);
  };

  return (
    <div className="mt-10">
      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={handleAddToPlan}
          aria-label="Add workout to today's plan"
          className="flex items-center justify-center gap-2 rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
        >
          <span aria-hidden="true">＋</span>
          Add to today's plan
        </button>

        <button
          type="button"
          onClick={handleSaveForLater}
          aria-label="Save workout for later"
          className="flex items-center justify-center gap-2 rounded-md border border-[#2A2D35] px-6 py-3 text-sm font-bold text-white transition hover:border-[#C2F800] hover:text-[#C2F800]"
        >
          <span aria-hidden="true">♡</span>
          Save for later
        </button>
      </div>
    </div>
  );
}
