
import { Suspense } from "react";
import WorkoutDetailsContent from "./WorkoutDetailsContent";

function WorkoutLoading() {
  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl animate-pulse">
        {/* Back link skeleton */}
        <div className="h-4 w-36 rounded bg-[#2A2D35]" />

        <div className="mt-8 grid grid-cols-1 items-start gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-16">
          {/* Image skeleton */}
          <div className="aspect-[4/3] w-full border border-[#2A2D35] bg-[#15171D]" />

          {/* Workout information skeleton */}
          <div className="space-y-5">
            <div className="h-4 w-36 rounded bg-[#2A2D35]" />

            <div className="h-10 w-3/4 rounded bg-[#15171D]" />

            <div className="h-4 w-full rounded bg-[#15171D]" />
            <div className="h-4 w-5/6 rounded bg-[#15171D]" />
            <div className="h-4 w-2/3 rounded bg-[#15171D]" />

            {/* Stats skeleton */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="h-24 rounded border border-[#2A2D35] bg-[#15171D]" />
              <div className="h-24 rounded border border-[#2A2D35] bg-[#15171D]" />
              <div className="h-24 rounded border border-[#2A2D35] bg-[#15171D]" />
              <div className="h-24 rounded border border-[#2A2D35] bg-[#15171D]" />
            </div>

            {/* Action buttons skeleton */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="h-12 w-full rounded bg-[#15171D] sm:w-48" />
              <div className="h-12 w-full rounded border border-[#2A2D35] bg-[#15171D] sm:w-40" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function WorkoutDetailsPage({ params }) {
  return (
    <Suspense fallback={<WorkoutLoading />}>
      <WorkoutDetailsContent params={params} />
    </Suspense>
  );
}
