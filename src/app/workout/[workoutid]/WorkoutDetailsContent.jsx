
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import WorkoutActions from "./WorkoutActions";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

function ErrorState({ title, message }) {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-2xl font-bold">{title}</h1>

        <p className="mt-3 text-gray-400">{message}</p>

        <Link
          href="/"
          className="mt-6 inline-flex rounded-md bg-[#C2F800] px-5 py-3 font-bold text-black transition hover:bg-[#d0ff33]"
        >
          Back to Workouts
        </Link>
      </div>
    </main>
  );
}

export default async function WorkoutDetailsContent({ params }) {
  const { workoutid } = await params;

  if (!workoutid) {
    notFound();
  }

  let response;

  // Fetch workout data
  try {
    response = await fetch(
      `${API_URL}/${encodeURIComponent(workoutid)}`,
      { cache: "no-store" }
    );
  } catch (error) {
    console.error("Workout fetch failed:", error);

    return (
      <ErrorState
        title="Unable to load workout"
        message="Please check your connection and try again."
      />
    );
  }

  // Handle missing workout
  if (response.status === 404) {
    notFound();
  }

  // Handle other API errors
  if (!response.ok) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We couldn't load this workout right now. Please try again later."
      />
    );
  }

  // Parse API response
  let workout;

  try {
    workout = await response.json();
  } catch (error) {
    console.error("Invalid workout response:", error);

    return (
      <ErrorState
        title="Unable to load workout"
        message="The workout data could not be read. Please try again later."
      />
    );
  }

  // Validate response shape
  if (
    !workout ||
    typeof workout !== "object" ||
    Array.isArray(workout)
  ) {
    notFound();
  }

  const workoutWithId = {
    ...workout,
    id: workout.id ?? workoutid,
  };

  if (workoutWithId.id == null) {
    notFound();
  }

  const muscleGroups = Array.isArray(workout.muscleGroups)
    ? workout.muscleGroups
    : [];

  const instructions = Array.isArray(workout.instructions)
    ? workout.instructions
    : [];

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-white sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        {/* Back link */}
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-400 transition hover:text-[#C2F800]"
        >
          <span aria-hidden="true">←</span>
          Back to Workouts
        </Link>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Workout image */}
          <div className="relative aspect-[4/3] overflow-hidden border border-[#2A2D35] bg-[#15171D]">
            {workout.image ? (
              <Image
                src={workout.image}
                alt={workout.name ?? "Workout"}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-500">
                No image available
              </div>
            )}
          </div>

          {/* Workout information */}
          <div className="min-w-0">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#C2F800]">
              WORKOUT DETAILS
            </p>

            <h1 className="mt-4 break-words text-4xl font-bold uppercase leading-tight tracking-tight sm:text-5xl">
              {workout.name || "Untitled Workout"}
            </h1>

            {muscleGroups.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {muscleGroups.map((group, index) => (
                  <span
                    key={`${group}-${index}`}
                    className="rounded-full border border-[#C2F800]/40 px-3 py-1 text-xs font-semibold tracking-wide text-[#C2F800]"
                  >
                    {group}
                  </span>
                ))}
              </div>
            )}

            {workout.description && (
              <p className="mt-6 leading-7 text-gray-400">
                {workout.description}
              </p>
            )}

            {/* Workout stats */}
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="border border-[#2A2D35] bg-[#15171D] p-4">
                <p className="text-sm text-gray-400">Duration</p>
                <p className="mt-2 text-xl font-bold">
                  {workout.duration ?? "—"}
                  {workout.duration != null ? " min" : ""}
                </p>
              </div>

              <div className="border border-[#2A2D35] bg-[#15171D] p-4">
                <p className="text-sm text-gray-400">Calories</p>
                <p className="mt-2 text-xl font-bold">
                  {workout.caloriesBurned ?? "—"}
                  {workout.caloriesBurned != null ? " kcal" : ""}
                </p>
              </div>

              <div className="border border-[#2A2D35] bg-[#15171D] p-4">
                <p className="text-sm text-gray-400">Rating</p>
                <p className="mt-2 text-xl font-bold">
                  <span className="text-[#C2F800]">★</span>{" "}
                  {workout.rating ?? "—"}
                </p>
              </div>

              <div className="border border-[#2A2D35] bg-[#15171D] p-4">
                <p className="text-sm text-gray-400">Equipment</p>
                <p className="mt-2 break-words font-semibold">
                  {workout.equipment ?? "Not specified"}
                </p>
              </div>

              {workout.difficulty && (
                <div className="border border-[#2A2D35] bg-[#15171D] p-4">
                  <p className="text-sm text-gray-400">Difficulty</p>
                  <p className="mt-2 font-semibold">
                    {workout.difficulty}
                  </p>
                </div>
              )}
            </div>

            {/* Add to Plan / Save for Later */}
            <WorkoutActions workout={workoutWithId} />
          </div>
        </div>

        {/* Workout instructions */}
        {instructions.length > 0 && (
          <section className="mt-16 border-t border-[#2A2D35] pt-10">
            <h2 className="text-2xl font-bold uppercase tracking-tight sm:text-3xl">
              HOW TO PERFORM
            </h2>

            <ol className="mt-6 space-y-4">
              {instructions.map((instruction, index) => (
                <li
                  key={index}
                  className="flex gap-4 border border-[#2A2D35] bg-[#15171D] p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#C2F800] text-sm font-bold text-black">
                    {index + 1}
                  </span>

                  <p className="min-w-0 break-words leading-7 text-gray-300">
                    {instruction}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </div>
    </main>
  );
}
