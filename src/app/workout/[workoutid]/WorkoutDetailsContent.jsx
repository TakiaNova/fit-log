import Image from "next/image";
import Link from "next/link";
import WorkoutActions from "./WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export default async function WorkoutDetailsContent({ params }) {
const { workoutid } = await params;

const response = await fetch(`${API_URL}/${workoutid}`, {
cache: "no-store",
});

if (!response.ok) {
return ( <main className="min-h-screen bg-black px-6 py-20 text-white"> <div className="mx-auto max-w-4xl text-center"> <h1 className="text-3xl font-bold">Workout not found</h1>

      <Link
        href="/"
        className="mt-6 inline-flex rounded-md bg-[#C2F800] px-5 py-3 font-bold text-black"
      >
        Back to workouts
      </Link>
    </div>
  </main>
);


}

const workout = await response.json();

const workoutWithId = {
...workout,
id: workout.id ?? workoutid,
};

return ( <main className="min-h-screen bg-black text-white"> <div className="mx-6 my-12 border-y border-[#2A2D35]"> <div className="mx-auto max-w-7xl px-6 pt-8"> <Link
         href="/#library"
         className="text-sm text-gray-400 transition hover:text-[#C2F800]"
       >
← Back to Library </Link> </div>

    <section className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 lg:grid-cols-2">
      {/* Workout Image */}
      <div className="relative min-h-[500px] overflow-hidden border border-[#2A2D35] bg-[#15171D] lg:min-h-[700px]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Workout Information */}
      <div className="flex flex-col justify-center">
        <h1 className="text-4xl font-extrabold uppercase leading-tight tracking-tight lg:text-5xl">
          {workout.name}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-7 text-gray-400">
          {workout.description}
        </p>

        {/* Muscle Groups */}
        <div className="mt-6 flex flex-wrap gap-2">
          {workout.muscleGroups?.map((group) => (
            <span
              key={group}
              className="rounded-full border border-[#C2F800]/40 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[#C2F800]"
            >
              {group}
            </span>
          ))}
        </div>

        {/* Key Specs */}
        <div className="mt-10">
          <h2 className="mb-4 text-sm font-bold tracking-[0.2em] text-[#C2F800]">
            KEY SPECS
          </h2>

          <div className="border border-[#2A2D35] bg-[#15171D]">
            {[
              ["EQUIPMENT", workout.equipment],
              ["DIFFICULTY", workout.difficulty],
              ["SETS", workout.sets],
              ["REPS", workout.reps],
              ["DURATION", `${workout.duration} min`],
              ["CALORIES", `${workout.caloriesBurned} kcal`],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex justify-between border-b border-[#2A2D35] px-5 py-4"
              >
                <span className="text-xs font-medium text-gray-500">
                  {label}
                </span>
                <span className="text-sm text-gray-200">{value}</span>
              </div>
            ))}

            <div className="flex justify-between px-5 py-4">
              <span className="text-xs font-medium text-gray-500">
                RATING
              </span>
              <span className="text-sm text-[#C2F800]">
                ★ {workout.rating}
              </span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-10">
          <h2 className="mb-5 text-sm font-bold tracking-[0.2em] text-[#C2F800]">
            INSTRUCTIONS
          </h2>

          <ol className="space-y-4">
            {workout.instructions?.map((instruction, index) => (
              <li
                key={index}
                className="flex gap-4 text-sm leading-6 text-gray-300"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#C2F800]/40 text-xs font-bold text-[#C2F800]">
                  {index + 1}
                </span>
                <span>{instruction}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Functional Buttons */}
        <WorkoutActions workout={workoutWithId} />
      </div>
    </section>
  </div>
</main>
);
}
