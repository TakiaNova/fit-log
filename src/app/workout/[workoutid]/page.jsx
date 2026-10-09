import { Suspense } from "react";
import WorkoutDetailsContent from "./WorkoutDetailsContent";

function WorkoutLoading() {
  return (
    <main className="min-h-screen bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-36 bg-[#2A2D35]" />

        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div className="min-h-[500px] bg-[#15171D]" />

          <div className="space-y-5">
            <div className="h-10 w-3/4 bg-[#15171D]" />
            <div className="h-4 w-full bg-[#15171D]" />
            <div className="h-4 w-2/3 bg-[#15171D]" />
            <div className="mt-10 h-64 bg-[#15171D]" />
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

